import type { Product } from "../types/models";
import type { ICatalogService } from "./catalogService";
import { mockProducts } from "../data/mockProducts";

class MockCatalogService implements ICatalogService {
  async getProducts(): Promise<Product[]> {
    // WIRE-UP: replace with GET ${VITE_API_BASE_URL}/api/products (backend proxies to Printful)
    return mockProducts;
  }

  async getProductById(id: number): Promise<Product | null> {
    // WIRE-UP: replace with GET ${VITE_API_BASE_URL}/api/products/:id
    return mockProducts.find((p) => p.id === id) ?? null;
  }
}

export const catalogService: ICatalogService = new MockCatalogService();
