// API Services
export * from "./api/products";
export * from "./api/auth";
export * from "./api/external";

// Legacy compatibility
export { productService as apiService } from "./api/products";

// Other Services
export * from "./orderService";
