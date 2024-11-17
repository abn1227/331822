import { ApiResponse } from "@/types/api";
import { LoggedInUser, LoginResponse, RegisterResponse } from "@/types/auth";
import { apiClient } from "../api/client";

class AuthService {
  private static instance: AuthService;
  private readonly basePath = "/auth";

  private constructor() {}

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<LoginResponse>(
      `${this.basePath}/login`,
      {
        email,
        password,
      }
    );
    return response;
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<ApiResponse<RegisterResponse>> {
    const response = await apiClient.post<RegisterResponse>(
      `${this.basePath}/register`,
      {
        email,
        password,
        firstName,
        lastName,
      }
    );
    return response;
  }

  async check(): Promise<ApiResponse<LoggedInUser>> {
    const response = await apiClient.get<LoggedInUser>(
      `${this.basePath}/check`
    );
    console.log(response);
    return response;
  }
}

export const authService = AuthService.getInstance();
