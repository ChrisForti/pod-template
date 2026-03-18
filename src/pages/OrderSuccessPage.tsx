import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";

interface SuccessState {
  orderId: string | number;
  status: string;
  email: string;
}

export default function OrderSuccessPage() {
  const location = useLocation();
  const state = location.state as SuccessState | null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 mx-auto mb-5 flex items-center justify-center">
            <svg
              className="w-9 h-9"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Order Confirmed!
          </h1>

          {state ? (
            <>
              <p className="text-gray-600 mb-2">
                Thanks for your order. We'll send updates to{" "}
                <span className="font-medium text-gray-800">{state.email}</span>
                .
              </p>
              <div className="inline-block bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 my-5">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Order ID
                </p>
                <p className="text-lg font-mono font-semibold text-primary-700">
                  {state.orderId}
                </p>
              </div>
              <p className="text-sm text-gray-500 mb-8">
                Status:{" "}
                <span className="capitalize font-medium text-gray-700">
                  {state.status}
                </span>
              </p>
            </>
          ) : (
            <p className="text-gray-600 mb-8">
              Your order has been placed. Check your email for confirmation.
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:border-primary-400 transition"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
