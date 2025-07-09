import { Product } from "@/types";
import { BaseApiService } from "./base";

class ProductService extends BaseApiService {
  async getProducts(): Promise<Product[]> {
    return this.request<Product[]>("/products");
  }

  async getProduct(id: number): Promise<Product> {
    return this.request<Product>(`/products/${id}`);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.request<Product[]>(`/products/category/${category}`);
  }

  async getCategories(): Promise<string[]> {
    return this.request<string[]>("/products/categories");
  }
}

export const productService = new ProductService();
