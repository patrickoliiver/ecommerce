import { renderHook, act } from '@testing-library/react';
import { useCart } from '@/hooks';
import { Product } from '@/types';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'Test description',
  category: 'test',
  image: 'test.jpg',
  rating: {
    rate: 4.5,
    count: 100,
  },
};

describe('useCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart());
    
    expect(result.current.cart.items).toEqual([]);
    expect(result.current.cart.total).toBe(0);
    expect(result.current.cart.totalItems).toBe(0);
  });

  it('should add product to cart', () => {
    const { result } = renderHook(() => useCart());
    
    act(() => {
      result.current.addToCart(mockProduct);
    });
    
    expect(result.current.cart.items).toHaveLength(1);
    expect(result.current.cart.items[0].product).toEqual(mockProduct);
    expect(result.current.cart.items[0].quantity).toBe(1);
    expect(result.current.cart.total).toBe(29.99);
    expect(result.current.cart.totalItems).toBe(1);
  });

  it('should increase quantity when adding same product', () => {
    const { result } = renderHook(() => useCart());
    
    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
    });
    
    expect(result.current.cart.items).toHaveLength(1);
    expect(result.current.cart.items[0].quantity).toBe(2);
    expect(result.current.cart.total).toBe(59.98);
    expect(result.current.cart.totalItems).toBe(2);
  });

  it('should remove product from cart', () => {
    const { result } = renderHook(() => useCart());
    
    act(() => {
      result.current.addToCart(mockProduct);
    });
    
    expect(result.current.cart.items).toHaveLength(1);
    
    act(() => {
      result.current.removeFromCart(mockProduct.id);
    });
    
    expect(result.current.cart.items).toHaveLength(0);
    expect(result.current.cart.total).toBe(0);
    expect(result.current.cart.totalItems).toBe(0);
  });

  it('should update quantity', () => {
    const { result } = renderHook(() => useCart());
    
    act(() => {
      result.current.addToCart(mockProduct);
    });
    
    act(() => {
      result.current.updateQuantity(mockProduct.id, 3);
    });
    
    expect(result.current.cart.items[0].quantity).toBe(3);
    expect(result.current.cart.total).toBe(89.97);
    expect(result.current.cart.totalItems).toBe(3);
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useCart());
    
    act(() => {
      result.current.addToCart(mockProduct);
    });
    
    expect(result.current.cart.items).toHaveLength(1);
    
    act(() => {
      result.current.clearCart();
    });
    
    expect(result.current.cart.items).toHaveLength(0);
    expect(result.current.cart.total).toBe(0);
    expect(result.current.cart.totalItems).toBe(0);
  });

  it('should check if product is in cart', () => {
    const { result } = renderHook(() => useCart());
    
    expect(result.current.isInCart(mockProduct.id)).toBe(false);
    
    act(() => {
      result.current.addToCart(mockProduct);
    });
    
    expect(result.current.isInCart(mockProduct.id)).toBe(true);
  });

  it('should get item quantity', () => {
    const { result } = renderHook(() => useCart());
    
    expect(result.current.getItemQuantity(mockProduct.id)).toBe(0);
    
    act(() => {
      result.current.addToCart(mockProduct, 5);
    });
    
    expect(result.current.getItemQuantity(mockProduct.id)).toBe(5);
  });
});
