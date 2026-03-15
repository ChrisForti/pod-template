import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8"
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed
          </h1>
          <p className="text-gray-600 mb-8">
            Success route is ready. It will be populated with real order details
            in Phase 4.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition"
          >
            Return Home
          </Link>
        </div>
      </main>
    </div>
  );
}
