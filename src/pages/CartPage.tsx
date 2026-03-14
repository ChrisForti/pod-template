import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart</h1>
          <p className="text-gray-600 mb-8">
            Cart state is coming in Phase 4. This route is ready for wiring.
          </p>

          <div className="border border-dashed border-gray-300 rounded-xl p-10 text-center">
            <p className="text-gray-500 mb-6">No cart items yet.</p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
