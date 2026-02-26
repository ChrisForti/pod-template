import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "product">(
    "landing",
  );

  return (
    <div>
      {/* Simple page toggle for development */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setCurrentPage("landing")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            currentPage === "landing"
              ? "bg-primary-600 text-white"
              : "bg-white text-gray-700 border-2 border-gray-300"
          }`}
        >
          Landing
        </button>
        <button
          onClick={() => setCurrentPage("product")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            currentPage === "product"
              ? "bg-primary-600 text-white"
              : "bg-white text-gray-700 border-2 border-gray-300"
          }`}
        >
          Product
        </button>
      </div>

      {currentPage === "landing" ? <LandingPage /> : <ProductDetail />}
    </div>
  );
}

export default App;
