import { http } from "../api/http";
import type { AuthResponse } from "../Models/AuthResponse";
import type { LoginRequest } from "../Models/LoginRequest";
import type { RegisterRequest } from "../Models/RegisterRequest ";
import type { CurrentUser } from "../Models/CurrentUser";

export const AuthService = {
  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const response = await http.post<AuthResponse>("/auth/register", payload);
    return response.data;
  },

  async logout() {
    const response = await http.post("/auth/logout");
    return response.data;
  },

  async login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await http.post<AuthResponse>("/auth/login", payload);
    return response.data;
  },

  async googleLogin(token: string): Promise<AuthResponse> {
    const response = await http.post<AuthResponse>("/auth/google-login", {
      token: token,
    });
    return response.data;
  },

  async refresh(): Promise<AuthResponse> {
    const response = await http.post<AuthResponse>("/auth/refresh");
    return response.data;
  },

  async me(): Promise<CurrentUser> {
    const response = await http.get<CurrentUser>("/auth/me");
    return response.data;
  },
};
