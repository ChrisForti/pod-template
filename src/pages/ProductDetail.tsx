import { useState } from "react";

export default function ProductDetail() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Navy");
  const [boatName, setBoatName] = useState("");

  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];
  const colors = ["Navy", "Black", "White", "Gray"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Product Preview Card (60-70% width) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-8">
              {/* Main Product Image */}
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-400 p-12">
                  <svg
                    className="w-48 h-48 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-lg font-medium">Product Mockup Preview</p>
                  <p className="text-sm mt-2">
                    {boatName
                      ? `"${boatName}" on Performance Long-Sleeve`
                      : "Add boat name to see preview"}
                  </p>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-3">
                  {["Front", "Back", "Detail"].map((view) => (
                    <button
                      key={view}
                      className="flex-1 aspect-square bg-gray-100 rounded-lg hover:ring-2 hover:ring-primary-500 transition flex items-center justify-center text-sm text-gray-600"
                    >
                      {view}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Info & Customizer Cards (30-40% width) */}
          <div className="space-y-6">
            {/* Product Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-4">
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  Performance Apparel
                </span>
                <h1 className="text-2xl font-bold text-gray-900 mt-1">
                  UPF 50+ Long-Sleeve Shirt
                </h1>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    $49.99
                  </span>
                  <span className="text-sm text-gray-500">Starting price</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  ✓ In stock, ready to customize
                </p>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-gray-900">
                    Size
                  </label>
                  <button className="text-sm text-primary-600 hover:underline">
                    Size guide
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-4 rounded-lg border-2 font-medium transition ${
                        selectedSize === size
                          ? "border-primary-600 bg-primary-50 text-primary-700"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-900 block mb-3">
                  Color
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`py-2 px-4 rounded-lg border-2 font-medium transition ${
                        selectedColor === color
                          ? "border-primary-600 bg-primary-50 text-primary-700"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Customizer Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Customize Your Gear
              </h3>

              {/* Boat Name Input */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Boat Name
                </label>
                <input
                  type="text"
                  value={boatName}
                  onChange={(e) => setBoatName(e.target.value)}
                  placeholder="The Reel Deal"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition"
                  maxLength={30}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {boatName.length}/30 characters
                </p>
              </div>

              {/* Logo Upload */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Upload Logo (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition cursor-pointer">
                  <svg
                    className="w-10 h-10 mx-auto text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </div>

              {/* Design Template Selector */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Design Template
                </label>
                <select className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-500 transition">
                  <option>Classic Text Only</option>
                  <option>Marlin Design</option>
                  <option>Tuna Design</option>
                  <option>Waves & Fish</option>
                </select>
              </div>
            </div>

            {/* Add to Cart Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <button className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition shadow-sm mb-3">
                Add to Cart - $49.99
              </button>

              {/* Shipping Info */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Ships in 3-5 business days</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Free shipping on orders $75+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Card (Full Width Below) */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Product Details
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>UPF 50+ sun protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>Moisture-wicking performance fabric</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>Quick-dry technology</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>Lightweight and breathable</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Material & Care
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>100% polyester performance fabric</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>Machine wash cold, tumble dry low</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>Do not bleach or iron design</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
