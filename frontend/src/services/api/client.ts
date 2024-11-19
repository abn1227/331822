import { StoreManager } from "@/store/storeMananer";
import { ApiResponse } from "@/types/api";

type ParamValue = string | string[] | number | boolean | undefined;
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl || "http://localhost:3000/api/v1";
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private getHeaders(): HeadersInit {
    const token = StoreManager.getAuthToken();
    return {
      ...this.defaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (response.status === 401) {
      window.dispatchEvent(new CustomEvent("auth:expired"));
    }

    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }

    const data = await response.json();
    return {
      data: data,
      status: response.status,
      pagination: data.pagination,
    };
  }

  private formatQueryParams(
    params: Record<string, ParamValue>
  ): URLSearchParams {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        return;
      }

      if (Array.isArray(value)) {
        if (value.length === 0) {
          return;
        }
        value.forEach((item) => {
          searchParams.append(key, item.toString());
        });
      } else {
        searchParams.append(key, value.toString());
      }
    });

    return searchParams;
  }

  async get<T>(
    path: string,
    params?: Record<string, ParamValue>
  ): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) {
      const searchParams = this.formatQueryParams(params);
      url.search = searchParams.toString();
    }

    const response = await fetch(url.toString(), {
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(path: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }
}

export const apiClient = new ApiClient(import.meta.env.VITE_API_BASE_URL);
