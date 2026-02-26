interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Apparel",
  },
  {
    id: 2,
    name: "Hoodie",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    category: "Apparel",
  },
  {
    id: 3,
    name: "Tote Bag",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop",
    category: "Accessories",
  },
  {
    id: 4,
    name: "Mug",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    category: "Home",
  },
];

export default function FeaturedProducts() {
  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden group"
            >
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  {product.category}
                </p>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-lg font-bold text-primary-600">
                    ${product.price}
                  </p>
                  <p className="text-xs text-gray-500">Starting price</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
