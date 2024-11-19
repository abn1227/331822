import { ApiResponse, ListResponse } from "@/types/api";
import { apiClient } from "../api/client";
import { ICategoryRecord } from "@/types/categories";

class CategoryService {
  private static instance: CategoryService;
  private readonly basePath = "/category";

  private constructor() {}

  static getInstance() {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

  async list(): Promise<ApiResponse<ICategoryRecord[]>> {
    const response = await apiClient.get<ICategoryRecord[]>(
      `${this.basePath}/`
    );
    return response;
  }
}

export const categoryService = CategoryService.getInstance();
