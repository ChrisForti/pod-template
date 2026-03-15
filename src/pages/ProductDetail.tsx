import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Product, ProductVariant } from "../types/models";
import { catalogService } from "../services/mockCatalogService";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [boatName, setBoatName] = useState("");
  const [activeView, setActiveView] = useState<"Front" | "Back" | "Detail">(
    "Front",
  );
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const loadProduct = useCallback(() => {
    // Reset all derived state before every fetch so stale values never bleed
    // through when navigating between products (including invalid → valid).
    setProduct(null);
    setNotFound(false);
    setFetchError(null);
    setLoading(true);

    const numericId = Number(id);
    if (!numericId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    catalogService
      .getProductById(numericId)
      .then((result) => {
        if (!result) {
          setNotFound(true);
        } else {
          setProduct(result);
          const variants = result.variants ?? [];
          const firstInStock = variants.find((v) => v.inStock);
          setSelectedSize(firstInStock?.size ?? variants[0]?.size ?? "");
          setSelectedColor(firstInStock?.color ?? variants[0]?.color ?? "");
        }
      })
      .catch((err: unknown) => {
        const msg =
          err instanceof Error ? err.message : "Failed to load product";
        setFetchError(msg);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  // Revoke the object URL whenever it changes or the component unmounts to
  // prevent blob URL memory leaks.
  useEffect(() => {
    return () => {
      if (logoPreviewUrl) URL.revokeObjectURL(logoPreviewUrl);
    };
  }, [logoPreviewUrl]);

  const variants = product?.variants ?? [];

  const sizes = useMemo(
    () => [...new Set(variants.map((v) => v.size))],
    [variants],
  );

  const colors = useMemo(
    () => [...new Set(variants.map((v) => v.color))],
    [variants],
  );

  const selectedVariant: ProductVariant | undefined = useMemo(
    () =>
      variants.find(
        (v) => v.size === selectedSize && v.color === selectedColor,
      ),
    [variants, selectedSize, selectedColor],
  );

  const isSizeAvailableForColor = (size: string) =>
    variants.some(
      (v) => v.size === size && v.color === selectedColor && v.inStock,
    );

  const isColorAvailableForSize = (color: string) =>
    variants.some(
      (v) => v.color === color && v.size === selectedSize && v.inStock,
    );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading product…
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900 mb-2">
            Product not found
          </p>
          <Link to="/" className="text-primary-600 hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-sm">
          <p className="text-xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </p>
          <p className="text-sm text-gray-500 mb-6">{fetchError}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={loadProduct}
              className="px-5 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition"
            >
              Try again
            </button>
            <Link
              to="/"
              className="px-5 py-2 rounded-lg border border-gray-300 text-sm text-gray-600 hover:border-gray-400 transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const displayPrice = selectedVariant?.price ?? product.price;
  // When variants exist, a missing selectedVariant means the size/color
  // combination is invalid — treat that as out-of-stock so the button stays
  // disabled. Only fall back to true when the product has no variants at all.
  const inStock =
    variants.length > 0 ? (selectedVariant?.inStock ?? false) : true;

  const viewImages = {
    Front: product.images?.front ?? product.image,
    Back: product.images?.back ?? product.image,
    Detail: product.images?.detail ?? product.image,
  } as const;

  const handleLogoFile = (file: File) => {
    const allowed = ["image/png", "image/jpeg", "image/webp", "image/gif"];
    if (!allowed.includes(file.type) || file.size > 10 * 1024 * 1024) return;
    setLogoFile(file);
    setLogoPreviewUrl(URL.createObjectURL(file));
    // Clear the input value so selecting the same file again triggers onChange.
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const handleAddToCart = () => {
    if (!product || !inStock) return;
    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      name: selectedVariant
        ? `${product.name} — ${selectedVariant.color} / ${selectedVariant.size}`
        : product.name,
      image: product.image,
      unitPrice: displayPrice,
      quantity: 1,
      customization: boatName
        ? { boatName, templateId: "classic-text" }
        : undefined,
    });
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
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
          Back to Home
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Product Preview Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-8">
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={viewImages[activeView]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-3">
                  {(["Front", "Back", "Detail"] as const).map((view) => (
                    <button
                      key={view}
                      onClick={() => setActiveView(view)}
                      className={`flex-1 aspect-square rounded-lg overflow-hidden border-2 transition ${
                        activeView === view
                          ? "border-primary-500 ring-2 ring-primary-200"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={viewImages[view]}
                        alt={`${product.name} — ${view} view`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info + Customizer */}
          <div className="space-y-6">
            {/* Product Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-4">
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  {product.category}
                </span>
                <h1 className="text-2xl font-bold text-gray-900 mt-1">
                  {product.name}
                </h1>
                {product.description && (
                  <p className="text-sm text-gray-600 mt-2">
                    {product.description}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${displayPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {selectedVariant ? "selected variant" : "Starting price"}
                  </span>
                </div>
                {inStock ? (
                  <p className="text-sm text-green-600 mt-1">
                    ✓ In stock, ready to customize
                  </p>
                ) : (
                  <p className="text-sm text-red-500 mt-1">
                    ✗ Out of stock for this combination
                  </p>
                )}
              </div>

              {/* Size Selector */}
              {sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold text-gray-900">
                      Size
                    </label>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => {
                      const available = isSizeAvailableForColor(size);
                      const selected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          disabled={!available}
                          aria-disabled={!available}
                          aria-pressed={selected}
                          className={`py-2 px-4 rounded-lg border-2 font-medium transition ${
                            selected
                              ? "border-primary-600 bg-primary-50 text-primary-700"
                              : available
                                ? "border-gray-300 hover:border-gray-400"
                                : "border-gray-200 text-gray-300 cursor-not-allowed opacity-50"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {colors.length > 0 && (
                <div className="mb-6">
                  <label className="text-sm font-semibold text-gray-900 block mb-3">
                    Color
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {colors.map((color) => {
                      const available = isColorAvailableForSize(color);
                      const selected = selectedColor === color;
                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          disabled={!available}
                          aria-disabled={!available}
                          aria-pressed={selected}
                          className={`py-2 px-4 rounded-lg border-2 font-medium transition ${
                            selected
                              ? "border-primary-600 bg-primary-50 text-primary-700"
                              : available
                                ? "border-gray-300 hover:border-gray-400"
                                : "border-gray-200 text-gray-300 cursor-not-allowed opacity-50"
                          }`}
                        >
                          {color}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Customizer Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Customize Your Gear
              </h3>

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

              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Upload Logo (Optional)
                </label>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleLogoFile(file);
                  }}
                />
                <div
                  onClick={() => logoInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleLogoFile(file);
                  }}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                    dragActive
                      ? "border-primary-500 bg-primary-50"
                      : logoFile
                        ? "border-green-400 bg-green-50"
                        : "border-gray-300 hover:border-primary-400"
                  }`}
                >
                  {logoFile && logoPreviewUrl ? (
                    <div className="flex items-center justify-center gap-3">
                      <img
                        src={logoPreviewUrl}
                        alt="Logo preview"
                        className="w-12 h-12 object-contain rounded"
                      />
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-800 truncate max-w-[160px]">
                          {logoFile.name}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Revocation is handled by the logoPreviewUrl effect;
                            // just clear state here.
                            setLogoFile(null);
                            setLogoPreviewUrl(null);
                            if (logoInputRef.current)
                              logoInputRef.current.value = "";
                          }}
                          className="text-xs text-red-500 hover:underline mt-0.5"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
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
                        PNG, JPG, WebP up to 10MB
                      </p>
                    </>
                  )}
                </div>
              </div>

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
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md mb-3 flex items-center justify-center gap-2 ${
                  inStock
                    ? "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg active:scale-[0.98]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {inStock ? (
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Add to Cart &mdash; ${displayPrice.toFixed(2)}
                  </>
                ) : (
                  "Out of Stock"
                )}
              </button>

              <div className="pt-4 border-t border-gray-200 space-y-2">
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

        {/* Product Details Card */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Product Details
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="space-y-2 text-gray-600">
                {[
                  "UPF 50+ sun protection",
                  "Moisture-wicking performance fabric",
                  "Quick-dry technology",
                  "Lightweight and breathable",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Material & Care
              </h3>
              <ul className="space-y-2 text-gray-600">
                {[
                  "100% polyester performance fabric",
                  "Machine wash cold, tumble dry low",
                  "Do not bleach or iron design",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
