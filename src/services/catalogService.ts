import type { Product } from "../types/models";

export interface ICatalogService {
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | null>;
}
