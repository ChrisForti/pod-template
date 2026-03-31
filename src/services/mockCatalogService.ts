import { apiRequest } from "./apiClient";
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

class ApiCatalogService implements ICatalogService {
  async getProducts(): Promise<Product[]> {
    return apiRequest<Product[]>("/api/products");
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      return await apiRequest<Product>(`/api/products/${id}`);
    } catch (err) {
      if (err instanceof Error && err.message.includes("404")) return null;
      throw err;
    }
  }
}

export const catalogService: ICatalogService =
  import.meta.env.VITE_USE_MOCK_CATALOG === "false"
    ? new ApiCatalogService()
    : new MockCatalogService();
