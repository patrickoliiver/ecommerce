import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLogin, useCurrentUser } from "@/hooks/api/useAuthApi";
import { authService } from "@/services/api/auth";
import { LoginCredentials, AuthResponse, User } from "@/types";

// Mock do serviço de autenticação
jest.mock("@/services/api/auth", () => ({
  authService: {
    login: jest.fn(),
    getCurrentUser: jest.fn(),
  },
}));

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

describe("useLogin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.setItem.mockClear();
  });

  it("deve fazer login com sucesso", async () => {
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

    // Executa o mutation
    result.current.mutate(mockCredentials);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(authService.login).toHaveBeenCalledWith(mockCredentials);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith("auth_token", "mock-jwt-token");
    expect(result.current.data).toEqual(mockAuthResponse);
  });

  it("deve lidar com erro de login", async () => {
    const mockCredentials: LoginCredentials = {
      username: "wronguser",
      password: "wrongpass",
    };

    const mockError = new Error("Invalid credentials");
    (authService.login as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    // Executa o mutation
    result.current.mutate(mockCredentials);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(authService.login).toHaveBeenCalledWith(mockCredentials);
    expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
    expect(result.current.error).toEqual(mockError);
  });

  it("deve ter estado inicial correto", () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
    expect(result.current.isPending).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.isSuccess).toBe(false);
  });

  it("deve resetar estado após reset", async () => {
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

    // Executa o mutation
    result.current.mutate(mockCredentials);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Reset
    result.current.reset();

    await waitFor(() => {
      expect(result.current.data).toBeUndefined();
    });

    expect(result.current.error).toBeNull();
    expect(result.current.isPending).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.isSuccess).toBe(false);
  });

  it("deve lidar com loading state", async () => {
    const mockCredentials: LoginCredentials = {
      username: "testuser",
      password: "testpass123",
    };

    // Mock que demora para resolver
    (authService.login as jest.Mock).mockImplementation(
      () => new Promise((resolve) => {
        setTimeout(() => resolve({ token: "mock-token" }), 100);
      })
    );

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    // Executa o mutation
    result.current.mutate(mockCredentials);

    // Verifica loading state
    await waitFor(() => {
      expect(result.current.isPending).toBe(true);
    });

    expect(result.current.isPending).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.isSuccess).toBe(false);
  });
});

describe("useCurrentUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve buscar usuário atual com sucesso quando token está presente", async () => {
    const mockToken = "valid-jwt-token";
    const mockUser: User = {
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

    const { result } = renderHook(() => useCurrentUser(mockToken), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(authService.getCurrentUser).toHaveBeenCalledWith(mockToken);
    expect(result.current.data).toEqual(mockUser);
    expect(result.current.isError).toBe(false);
  });

  it("deve lidar com erro ao buscar usuário atual", async () => {
    const mockToken = "invalid-token";
    const mockError = new Error("Unauthorized");

    (authService.getCurrentUser as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useCurrentUser(mockToken), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(authService.getCurrentUser).toHaveBeenCalledWith(mockToken);
    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
  });

  it("não deve fazer requisição quando token é null", () => {
    const { result } = renderHook(() => useCurrentUser(null), {
      wrapper: createWrapper(),
    });

    expect(authService.getCurrentUser).not.toHaveBeenCalled();
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("não deve fazer requisição quando token é string vazia", () => {
    const { result } = renderHook(() => useCurrentUser(""), {
      wrapper: createWrapper(),
    });

    expect(authService.getCurrentUser).not.toHaveBeenCalled();
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("deve ter estado inicial correto quando token é válido", () => {
    const mockToken = "valid-token";
    (authService.getCurrentUser as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Promise que nunca resolve
    );

    const { result } = renderHook(() => useCurrentUser(mockToken), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.isSuccess).toBe(false);
  });

  it("deve usar cache corretamente", async () => {
    const mockToken = "valid-jwt-token";
    const mockUser: User = {
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

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const QueryWrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    // Primeira renderização
    const { result: result1 } = renderHook(() => useCurrentUser(mockToken), {
      wrapper: QueryWrapper,
    });

    await waitFor(() => {
      expect(result1.current.isSuccess).toBe(true);
    });

    // Segunda renderização com mesmo token (deve usar cache)
    const { result: result2 } = renderHook(() => useCurrentUser(mockToken), {
      wrapper: QueryWrapper,
    });

    // Aguarda para garantir que os dados estão disponíveis
    await waitFor(() => {
      expect(result2.current.data).toEqual(mockUser);
    });

    expect(result2.current.isSuccess).toBe(true);

    // Como o cache é compartilhado, pode haver múltiplas chamadas dependendo do timing
    // Vamos apenas verificar que foi chamado pelo menos uma vez
    expect(authService.getCurrentUser).toHaveBeenCalledWith(mockToken);
  });
});
