import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Content */}
            <div className="p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                pod-template
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                High-performance apparel designed for sport fishing
                professionals. Add your boat name, captain branding, or team
                logos to premium gear.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products/1"
                  className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition shadow-sm text-center"
                >
                  Start Customizing
                </Link>
                <Link
                  to="/#products"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-primary-600 hover:text-primary-600 transition text-center"
                >
                  View Catalog
                </Link>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative h-64 md:h-full min-h-100 bg-linear-to-br from-primary-100 to-primary-50">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-64 h-64 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
