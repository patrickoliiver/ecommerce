// API Types
export * from "./api";

// Cart Types
export * from "./cart";

// Form Types
export * from "./forms";

// Order Types
export * from "./order";

// Filter Types
export interface ProductFilters {
  category?: string;
  search?: string;
  sortBy?: "price-asc" | "price-desc" | "name-asc" | "name-desc" | "rating";
  minPrice?: number;
  maxPrice?: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Utility Types
export type SortOption = {
  value: ProductFilters["sortBy"];
  label: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

// Toast Types
export interface ToastOptions {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
}
