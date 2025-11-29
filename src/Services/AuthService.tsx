import { http } from "../api/http";
import type { AuthResponse } from "../Models/AuthResponse";
import type { LoginRequest } from "../Models/LoginRequest";
import type { RegisterRequest } from "../Models/RegisterRequest ";

export const AuthService = {
  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const response = await http.post<AuthResponse>("/auth/register", payload);
    return response.data;
  },

  async login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await http.post<AuthResponse>("/auth/login", payload);
    return response.data;
  },

  async refresh(): Promise<AuthResponse> {
    const response = await http.post<AuthResponse>("/auth/refresh");
    return response.data;
  },

  async me() {
    const response = await http.get("/auth/me");
    return response.data;
  },
};
