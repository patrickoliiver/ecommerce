import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/api/auth";
import { LoginCredentials, AuthResponse } from "@/types";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (data: AuthResponse) => {
      // Store token in localStorage only if we're on the client
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", data.token);
      }
      // Invalidate and refetch user queries
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useCurrentUser = (token: string | null) => {
  return useQuery({
    queryKey: ["user", "current"],
    queryFn: () => authService.getCurrentUser(token!),
    enabled: !!token,
  });
};
