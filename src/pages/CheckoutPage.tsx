import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600 mb-8">
            Checkout form shell is in place. Form validation and payload wiring
            are planned in Phase 4.
          </p>

          <form className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Full name"
              className="md:col-span-2 px-4 py-3 border-2 border-gray-300 rounded-lg"
              disabled
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-3 border-2 border-gray-300 rounded-lg"
              disabled
            />
            <input
              type="text"
              placeholder="Phone"
              className="px-4 py-3 border-2 border-gray-300 rounded-lg"
              disabled
            />
            <input
              type="text"
              placeholder="Address"
              className="md:col-span-2 px-4 py-3 border-2 border-gray-300 rounded-lg"
              disabled
            />
            <div className="md:col-span-2 flex gap-3 pt-2">
              <Link
                to="/cart"
                className="px-5 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold"
              >
                Back to Cart
              </Link>
              <button
                type="button"
                disabled
                className="px-5 py-3 rounded-lg bg-primary-300 text-white font-semibold cursor-not-allowed"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
