import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import { orderService } from "../services/orderService";
import type { ShippingAddress } from "../types/models";

type FieldErrors = Partial<Record<keyof ShippingAddress, string>>;

function validateAddress(addr: ShippingAddress): FieldErrors {
  const errors: FieldErrors = {};
  if (!addr.fullName.trim()) errors.fullName = "Full name is required";
  if (!addr.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!addr.address1.trim()) errors.address1 = "Address is required";
  if (!addr.city.trim()) errors.city = "City is required";
  if (!addr.stateCode.trim()) errors.stateCode = "State is required";
  if (!addr.zip.trim()) {
    errors.zip = "ZIP is required";
  } else if (!/^\d{5}(-\d{4})?$/.test(addr.zip.trim())) {
    errors.zip = "Enter a valid ZIP code";
  }
  if (!addr.countryCode.trim()) errors.countryCode = "Country is required";
  return errors;
}

const EMPTY_ADDRESS: ShippingAddress = {
  fullName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  stateCode: "",
  zip: "",
  countryCode: "US",
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();

  const [addr, setAddr] = useState<ShippingAddress>(EMPTY_ADDRESS);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const shipping = subtotal >= 75 ? 0 : 7.99;
  const orderTotal = subtotal + shipping;

  function field(name: keyof ShippingAddress) {
    return {
      value: addr[name] ?? "",
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      ) => {
        setAddr((prev) => ({ ...prev, [name]: e.target.value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
      },
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validateAddress(addr);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    if (items.length === 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await orderService.submitOrder({
        items,
        shipping: addr,
      });
      clearCart();
      navigate("/order/success", {
        state: {
          orderId: result.orderId,
          status: result.status,
          email: addr.email,
        },
      });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Failed to place order. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link to="/" className="text-primary-600 hover:underline text-sm">
            ← Continue Shopping
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition mb-6"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Cart
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} noValidate>
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                  Shipping Information
                </h1>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      autoComplete="name"
                      {...field("fullName")}
                      className={`w-full px-4 py-2.5 border-2 rounded-lg transition ${errors.fullName ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-primary-500"}`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      autoComplete="email"
                      {...field("email")}
                      className={`w-full px-4 py-2.5 border-2 rounded-lg transition ${errors.email ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-primary-500"}`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      autoComplete="tel"
                      {...field("phone")}
                      className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-primary-500 transition"
                    />
                  </div>

                  {/* Address 1 */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      autoComplete="address-line1"
                      {...field("address1")}
                      className={`w-full px-4 py-2.5 border-2 rounded-lg transition ${errors.address1 ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-primary-500"}`}
                    />
                    {errors.address1 && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.address1}
                      </p>
                    )}
                  </div>

                  {/* Address 2 */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Apt, Suite, etc.{" "}
                      <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="text"
                      autoComplete="address-line2"
                      {...field("address2")}
                      className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-primary-500 transition"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      autoComplete="address-level2"
                      {...field("city")}
                      className={`w-full px-4 py-2.5 border-2 rounded-lg transition ${errors.city ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-primary-500"}`}
                    />
                    {errors.city && (
                      <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      autoComplete="address-level1"
                      maxLength={2}
                      placeholder="FL"
                      {...field("stateCode")}
                      className={`w-full px-4 py-2.5 border-2 rounded-lg transition uppercase ${errors.stateCode ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-primary-500"}`}
                    />
                    {errors.stateCode && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.stateCode}
                      </p>
                    )}
                  </div>

                  {/* ZIP */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      autoComplete="postal-code"
                      {...field("zip")}
                      className={`w-full px-4 py-2.5 border-2 rounded-lg transition ${errors.zip ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-primary-500"}`}
                    />
                    {errors.zip && (
                      <p className="text-xs text-red-500 mt-1">{errors.zip}</p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <select
                      autoComplete="country"
                      {...field("countryCode")}
                      className={`w-full px-4 py-2.5 border-2 rounded-lg transition ${errors.countryCode ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-primary-500"}`}
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                    {errors.countryCode && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.countryCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Payment ───────────────────────────────────────────── */}
              {/* WIRE-UP: replace this stub with Stripe Elements:
                    import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
                    On submit: const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                      payment_method: { card: elements.getElement(CardElement) }
                    });
                    Add VITE_STRIPE_PUBLIC_KEY to .env and load the Stripe provider in main.tsx. */}
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Payment</h2>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                  <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <p className="text-sm text-gray-400 font-medium">Payment fields will appear here</p>
                  <p className="text-xs text-gray-400 mt-1">Stripe Elements integration — see WIRE-UP comment above</p>
                </div>
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4 text-sm text-red-700">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md flex items-center justify-center gap-2 ${
                  submitting
                    ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                    : "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg active:scale-[0.98]"
                }`}
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Placing Order…
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Place Order — ${orderTotal.toFixed(2)}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h2>
              <ul className="divide-y divide-gray-100 mb-4">
                {items.map((item) => (
                  <li key={item.id} className="py-3 flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {item.name}
                      </p>
                      {item.customization?.boatName && (
                        <p className="text-xs text-gray-500">
                          {item.customization.boatName}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-gray-800 flex-shrink-0">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
