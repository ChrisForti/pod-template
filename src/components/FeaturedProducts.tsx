import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/models";
import { catalogService } from "../services/mockCatalogService";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(() => {
    setLoading(true);
    setError(null);
    catalogService
      .getProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Featured Products
        </h2>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={loadProducts}
              className="mt-4 px-5 py-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:border-primary-600 hover:text-primary-600 transition text-sm font-medium"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden group"
              >
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-lg font-bold text-primary-600">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">Starting price</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
