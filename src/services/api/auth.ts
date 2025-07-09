import { User, LoginCredentials, AuthResponse } from "@/types";
import { BaseApiService } from "./base";

class AuthService extends BaseApiService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async getCurrentUser(token: string): Promise<User> {
    return this.request<User>("/users/1", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getUsers(): Promise<User[]> {
    return this.request<User[]>("/users");
  }

  async getUser(id: number): Promise<User> {
    return this.request<User>(`/users/${id}`);
  }
}

export const authService = new AuthService();
