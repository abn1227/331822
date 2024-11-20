import { ApiResponse } from "@/types/api";
import { apiClient } from "../api/client";
import { IJobStats } from "@/types/jobStats";

class JobStatsService {
  private static instance: JobStatsService;
  private readonly basePath = "/job-stats";

  private constructor() {}

  static getInstance() {
    if (!JobStatsService.instance) {
      JobStatsService.instance = new JobStatsService();
    }
    return JobStatsService.instance;
  }

  async create(data: IJobStats): Promise<ApiResponse<IJobStats>> {
    return await apiClient.post<IJobStats>(
      `${this.basePath}/create-or-update`,
      data
    );
  }

  async changeRating(
    id: string,
    rating: number
  ): Promise<ApiResponse<IJobStats>> {
    return await apiClient.put<IJobStats>(
      `${this.basePath}/${id}/change-rating`,
      {
        rating,
      }
    );
  }
}

export const jobStatsService = JobStatsService.getInstance();
