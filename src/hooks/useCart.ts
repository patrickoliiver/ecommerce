import { useState, useEffect, useCallback } from "react";
import { Cart, CartItem, Product } from "@/types";

const CART_STORAGE_KEY = "ecommerce_cart";

const initialCart: Cart = {
  items: [],
  total: 0,
  totalItems: 0,
};

export const useCart = () => {
  const [cart, setCart] = useState<Cart>(initialCart);

  // Load cart from localStorage on mount
  useEffect(() => {
    // Verificar se estamos no cliente (evitar problemas de hidratação)
    if (typeof window === "undefined") {
      return;
    }

    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    // Verificar se estamos no cliente
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const calculateTotals = (
    items: CartItem[]
  ): { total: number; totalItems: number } => {
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    return { total, totalItems };
  };

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.id === product.id
      );

      let newItems: CartItem[];

      if (existingItem) {
        // Update existing item quantity
        newItems = prevCart.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [
          ...prevCart.items,
          {
            id: product.id,
            product,
            quantity,
          },
        ];
      }

      const { total, totalItems } = calculateTotals(newItems);

      return {
        items: newItems,
        total,
        totalItems,
      };
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.id !== productId);
      const { total, totalItems } = calculateTotals(newItems);

      return {
        items: newItems,
        total,
        totalItems,
      };
    });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );

      const { total, totalItems } = calculateTotals(newItems);

      return {
        items: newItems,
        total,
        totalItems,
      };
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart(initialCart);
  }, []);

  const getItemQuantity = useCallback((productId: number): number => {
    const item = cart.items.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  }, [cart.items]);

  const isInCart = useCallback((productId: number): boolean => {
    return cart.items.some((item) => item.id === productId);
  }, [cart.items]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
  };
};
