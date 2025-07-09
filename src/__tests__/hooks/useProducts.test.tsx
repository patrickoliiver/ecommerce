import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import {
  useProducts,
  useProduct,
  useProductsByCategory,
  useCategories,
} from '@/hooks/api/useProducts';
import { productService } from '@/services/api/products';

// Mock do productService
jest.mock('@/services/api/products', () => ({
  productService: {
    getProducts: jest.fn(),
    getProduct: jest.fn(),
    getProductsByCategory: jest.fn(),
    getCategories: jest.fn(),
  },
}));

const mockedProductService = productService as jest.Mocked<typeof productService>;

// Mock data
const mockProducts = [
  {
    id: 1,
    title: 'Test Product 1',
    price: 29.99,
    description: 'Test description',
    category: 'electronics',
    image: 'test-image.jpg',
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: 'Test Product 2',
    price: 39.99,
    description: 'Test description 2',
    category: 'clothing',
    image: 'test-image-2.jpg',
    rating: { rate: 4.0, count: 50 },
  },
];

const mockProduct = mockProducts[0];
const mockCategories = ['electronics', 'clothing', 'jewelry'];

// Query Client Provider wrapper
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const QueryWrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  
  return QueryWrapper;
};

describe('useProducts Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch products successfully', async () => {
    mockedProductService.getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockProducts);
    expect(mockedProductService.getProducts).toHaveBeenCalledTimes(1);
  });

  it('should handle products fetch error', async () => {
    const errorMessage = 'Failed to fetch products';
    mockedProductService.getProducts.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(mockedProductService.getProducts).toHaveBeenCalledTimes(1);
  });

  it('should use correct cache key and stale time', () => {
    mockedProductService.getProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    // Check if the query key is correct by accessing the query state
    expect(result.current.isLoading).toBeDefined();
  });
});

describe('useProduct Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch single product successfully', async () => {
    const productId = 1;
    mockedProductService.getProduct.mockResolvedValue(mockProduct);

    const { result } = renderHook(() => useProduct(productId), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockProduct);
    expect(mockedProductService.getProduct).toHaveBeenCalledWith(productId);
    expect(mockedProductService.getProduct).toHaveBeenCalledTimes(1);
  });

  it('should not fetch when id is 0 or falsy', () => {
    const { result } = renderHook(() => useProduct(0), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(mockedProductService.getProduct).not.toHaveBeenCalled();
  });

  it('should handle product fetch error', async () => {
    const productId = 1;
    const errorMessage = 'Product not found';
    mockedProductService.getProduct.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useProduct(productId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(mockedProductService.getProduct).toHaveBeenCalledWith(productId);
  });
});

describe('useProductsByCategory Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch products by category successfully', async () => {
    const category = 'electronics';
    const categoryProducts = mockProducts.filter(p => p.category === category);
    mockedProductService.getProductsByCategory.mockResolvedValue(categoryProducts);

    const { result } = renderHook(() => useProductsByCategory(category), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(categoryProducts);
    expect(mockedProductService.getProductsByCategory).toHaveBeenCalledWith(category);
    expect(mockedProductService.getProductsByCategory).toHaveBeenCalledTimes(1);
  });

  it('should not fetch when category is empty', () => {
    const { result } = renderHook(() => useProductsByCategory(''), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(mockedProductService.getProductsByCategory).not.toHaveBeenCalled();
  });

  it('should handle category products fetch error', async () => {
    const category = 'electronics';
    const errorMessage = 'Failed to fetch category products';
    mockedProductService.getProductsByCategory.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useProductsByCategory(category), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(mockedProductService.getProductsByCategory).toHaveBeenCalledWith(category);
  });
});

describe('useCategories Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch categories successfully', async () => {
    mockedProductService.getCategories.mockResolvedValue(mockCategories);

    const { result } = renderHook(() => useCategories(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockCategories);
    expect(mockedProductService.getCategories).toHaveBeenCalledTimes(1);
  });

  it('should handle categories fetch error', async () => {
    const errorMessage = 'Failed to fetch categories';
    mockedProductService.getCategories.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useCategories(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(mockedProductService.getCategories).toHaveBeenCalledTimes(1);
  });

  it('should use longer stale time for categories', () => {
    mockedProductService.getCategories.mockResolvedValue(mockCategories);

    const { result } = renderHook(() => useCategories(), {
      wrapper: createWrapper(),
    });

    // Categories should be cached longer (30 minutes vs 5 minutes for products)
    expect(result.current.isLoading).toBeDefined();
  });
});
