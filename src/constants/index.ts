/**
 * Constantes da aplicação
 */

// API URLs
export const API_ENDPOINTS = {
  BASE_URL: 'https://fakestoreapi.com',
  VIACEP_URL: 'https://viacep.com.br/ws',
} as const;

// LocalStorage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  CART_DATA: 'cart_data',
  ORDERS: 'orders',
} as const;

// Validation Patterns
export const VALIDATION_PATTERNS = {
  CEP: /^\d{5}-\d{3}$/,
  PHONE: /^\(\d{2}\) \d{4,5}-\d{4}$/,
  CARD_EXPIRY: /^\d{2}\/\d{2}$/,
  CVC: /^\d{3,4}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit-card',
  DEBIT_CARD: 'debit-card',
  PIX: 'pix',
} as const;

// Order Status
export const ORDER_STATUS = {
  PENDING: 'Pendente',
  PROCESSING: 'Processando',
  PROCESSED: 'Processado',
  SHIPPED: 'Enviado',
  DELIVERED: 'Entregue',
  CANCELLED: 'Cancelado',
} as const;

// UI Constants
export const UI_CONSTANTS = {
  LOADING_DELAY: 500,
  TOAST_DURATION: 3000,
  ANIMATION_DURATION: 200,
} as const;
