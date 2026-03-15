import type { Product } from "../types/models";
import type { ICatalogService } from "./catalogService";
import { mockProducts } from "../data/mockProducts";

class MockCatalogService implements ICatalogService {
  async getProducts(): Promise<Product[]> {
    return mockProducts;
  }

  async getProductById(id: number): Promise<Product | null> {
    return mockProducts.find((p) => p.id === id) ?? null;
  }
}

export const catalogService: ICatalogService = new MockCatalogService();
