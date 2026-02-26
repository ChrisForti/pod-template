export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">
            Rybo<span className="text-primary-600">POD</span>
          </div>

          <div className="hidden md:flex space-x-8">
            <a
              href="#products"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              Products
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-primary-600 transition">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
