import { apiRequest } from "./apiClient";
import type { Product } from "../types/models";
import type { ICatalogService } from "./catalogService";

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

export const catalogService: ICatalogService = new ApiCatalogService();
