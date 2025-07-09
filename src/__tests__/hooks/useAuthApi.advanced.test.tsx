import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLogin, useCurrentUser } from "@/hooks/api/useAuthApi";
import { authService } from "@/services/api/auth";
import { LoginCredentials, AuthResponse } from "@/types";

// Mock do serviço de autenticação
jest.mock("@/services/api/auth", () => ({
  authService: {
    login: jest.fn(),
    getCurrentUser: jest.fn(),
  },
}));

// Mock do console.error para evitar logs desnecessários nos testes
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

// Mock do localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Função helper para criar wrapper do QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
  
  const QueryWrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
  
  return QueryWrapper;
};

describe("useLogin - Cenários Avançados", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.setItem.mockClear();
  });

  it("deve lidar com mutation cancelada", async () => {
    const mockCredentials: LoginCredentials = {
      username: "testuser",
      password: "testpass123",
    };

    // Mock que simula cancelamento
    const abortError = new Error("Request aborted");
    abortError.name = "AbortError";
    (authService.login as jest.Mock).mockRejectedValue(abortError);

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockCredentials);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(abortError);
  });

  it("deve invalidar queries corretas após login bem-sucedido", async () => {
    const mockCredentials: LoginCredentials = {
      username: "testuser",
      password: "testpass123",
    };

    const mockAuthResponse: AuthResponse = {
      token: "mock-jwt-token",
    };

    (authService.login as jest.Mock).mockResolvedValue(mockAuthResponse);

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');

    const QueryWrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useLogin(), {
      wrapper: QueryWrapper,
    });

    result.current.mutate(mockCredentials);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ["user"] });
  });

  it("deve lidar com diferentes tipos de erro", async () => {
    const mockCredentials: LoginCredentials = {
      username: "testuser",
      password: "testpass123",
    };

    const networkError = new TypeError("Network request failed");
    (authService.login as jest.Mock).mockRejectedValue(networkError);

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockCredentials);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(networkError);
  });

  it("deve usar mutateAsync corretamente", async () => {
    const mockCredentials: LoginCredentials = {
      username: "testuser",
      password: "testpass123",
    };

    const mockAuthResponse: AuthResponse = {
      token: "mock-jwt-token",
    };

    (authService.login as jest.Mock).mockResolvedValue(mockAuthResponse);

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    let response;
    
    // Usando act para garantir que todas as atualizações sejam aplicadas
    await act(async () => {
      response = await result.current.mutateAsync(mockCredentials);
    });

    expect(response).toEqual(mockAuthResponse);
    
    // Aguarda o estado ser atualizado
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith("auth_token", "mock-jwt-token");
  });
});

describe("useCurrentUser - Cenários Avançados", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve lidar com erro 401 (unauthorized)", async () => {
    const unauthorizedError = new Error("Unauthorized");
    // @ts-expect-error - Adicionando propriedade status ao erro
    unauthorizedError.status = 401;
    
    (authService.getCurrentUser as jest.Mock).mockRejectedValue(unauthorizedError);

    const { result } = renderHook(() => useCurrentUser("invalid-token"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(unauthorizedError);
  });

  it("deve usar stale time corretamente", async () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
      username: "testuser",
      password: "password123",
      name: {
        firstname: "John",
        lastname: "Doe",
      },
      address: {
        city: "New York",
        street: "123 Main St",
        number: 123,
        zipcode: "10001",
        geolocation: {
          lat: "40.7128",
          long: "-74.0060",
        },
      },
      phone: "555-1234",
    };

    (authService.getCurrentUser as jest.Mock).mockResolvedValue(mockUser);

    const { result, rerender } = renderHook(
      () => useCurrentUser("valid-token"),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Rerender para simular re-montagem do componente
    rerender();

    // Como não há stale time configurado, deve usar dados do cache
    expect(result.current.data).toEqual(mockUser);
    expect(result.current.isStale).toBe(true);
  });

  it("deve refetch quando forçado", async () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
      username: "testuser",
      password: "password123",
      name: {
        firstname: "John",
        lastname: "Doe",
      },
      address: {
        city: "New York",
        street: "123 Main St",
        number: 123,
        zipcode: "10001",
        geolocation: {
          lat: "40.7128",
          long: "-74.0060",
        },
      },
      phone: "555-1234",
    };

    (authService.getCurrentUser as jest.Mock).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useCurrentUser("valid-token"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Força refetch
    result.current.refetch();

    await waitFor(() => {
      expect(authService.getCurrentUser).toHaveBeenCalledTimes(2);
    });
  });
});
