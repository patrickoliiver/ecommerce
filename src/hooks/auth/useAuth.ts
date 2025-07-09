import { useState, useEffect, useCallback } from "react";
import { User } from "@/types";

const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
    }
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    // Verificar se estamos no cliente (evitar problemas de hidratação)
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userData = localStorage.getItem(USER_DATA_KEY);

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout();
      }
    }

    setLoading(false);
  }, [logout]);

  const login = useCallback((token: string, userData: User) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    }
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  const getToken = useCallback((): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }, []);

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    getToken,
  };
};
