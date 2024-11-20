import { ApiResponse, ListResponse } from "@/types/api";
import { apiClient } from "../api/client";
import { IJobPetitionRecord } from "@/types/jobPetition";

class JobPetitionService {
  private static instance: JobPetitionService;
  private readonly basePath = "/job-petition";

  private constructor() {}

  static getInstance() {
    if (!JobPetitionService.instance) {
      JobPetitionService.instance = new JobPetitionService();
    }
    return JobPetitionService.instance;
  }

  async list(
    limit: number,
    offset: number,
    filters?: any
  ): Promise<ApiResponse<ListResponse<IJobPetitionRecord>>> {
    const response = await apiClient.get<ListResponse<IJobPetitionRecord>>(
      `${this.basePath}/`,
      {
        limit,
        offset,
        search: filters?.search || "",
        status: filters?.status || "",
        service: filters?.service || "",
        availability: filters?.availability || "",
      }
    );
    return response;
  }

  async listMyPetitions(
    limit: number,
    offset: number,
    filters?: any
  ): Promise<ApiResponse<ListResponse<IJobPetitionRecord>>> {
    const response = await apiClient.get<ListResponse<IJobPetitionRecord>>(
      `${this.basePath}/my-petitions`,
      {
        limit,
        offset,
        search: filters?.search || "",
        status: filters?.status || "",
        service: filters?.service || "",
      }
    );
    return response;
  }

  async create(data: any): Promise<ApiResponse<IJobPetitionRecord>> {
    const response = await apiClient.post<IJobPetitionRecord>(
      `${this.basePath}/`,
      data
    );
    return response;
  }

  async getById(id: string): Promise<ApiResponse<IJobPetitionRecord>> {
    const response = await apiClient.get<IJobPetitionRecord>(
      `${this.basePath}/${id}`
    );
    return response;
  }

  async getDetailedById(id: string): Promise<ApiResponse<IJobPetitionRecord>> {
    const response = await apiClient.get<IJobPetitionRecord>(
      `${this.basePath}/${id}/detailed`
    );
    return response;
  }

  async update(
    id: string,
    data: Partial<IJobPetitionRecord>
  ): Promise<ApiResponse<IJobPetitionRecord>> {
    const response = await apiClient.put<IJobPetitionRecord>(
      `${this.basePath}/${id}`,
      data
    );
    return response;
  }

  async changeStatus(
    id: string,
    status: IJobPetitionRecord["status"]
  ): Promise<ApiResponse<IJobPetitionRecord>> {
    const response = await apiClient.put<IJobPetitionRecord>(
      `${this.basePath}/${id}/status`,
      {
        status,
      }
    );
    return response;
  }

  async changeRating(
    id: string,
    rating: number
  ): Promise<ApiResponse<IJobPetitionRecord>> {
    const response = await apiClient.put<IJobPetitionRecord>(
      `${this.basePath}/${id}/change-rating`,
      {
        rating,
      }
    );
    return response;
  }
}

export const jobPetitionService = JobPetitionService.getInstance();
