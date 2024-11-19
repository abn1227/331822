import { ApiResponse, ListResponse } from "@/types/api";
import { IHandyMan, IHandyManRecord } from "@/types/handyman";
import { apiClient } from "../api/client";
import { HandyManFilters } from "../../../../backend/src/models/HandyMan";

class HandyManService {
  private static instance: HandyManService;
  private readonly basePath = "/handyman";

  private constructor() {}

  static getInstance() {
    if (!HandyManService.instance) {
      HandyManService.instance = new HandyManService();
    }
    return HandyManService.instance;
  }

  async list(
    limit: number,
    offset: number,
    filters?: HandyManFilters
  ): Promise<ApiResponse<ListResponse<IHandyManRecord>>> {
    const response = await apiClient.get<ListResponse<IHandyManRecord>>(
      `${this.basePath}/`,
      {
        limit,
        offset,
        search: filters?.search || "",
        expertise: filters?.expertise || "",
        services: filters?.services || [],
        availability: filters?.availability || [],
      }
    );
    return response;
  }

  async create(data: IHandyMan): Promise<ApiResponse<IHandyManRecord>> {
    const response = await apiClient.post<IHandyManRecord>(
      `${this.basePath}/`,
      data
    );
    return response;
  }

  async update(
    id: string,
    data: IHandyManRecord
  ): Promise<ApiResponse<IHandyManRecord>> {
    const response = await apiClient.put<IHandyManRecord>(
      `${this.basePath}/${id}`,
      data
    );
    return response;
  }
}

export const handymanService = HandyManService.getInstance();
