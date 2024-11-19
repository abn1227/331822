/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IJobPetition,
  JobPetition,
  JobPetitionFilters,
} from "@/models/JobPetition";

export class JobPetitionRepository {
  async create(jobPetitionData: Partial<IJobPetition>): Promise<IJobPetition> {
    const jobPetition = new JobPetition(jobPetitionData);
    return jobPetition.save();
  }

  async findByServiceAndUser(
    service: string,
    userId: string
  ): Promise<IJobPetition | null> {
    return await JobPetition.findOne({ service, userId });
  }

  async findById(id: string): Promise<IJobPetition | null> {
    return await JobPetition.findById(id);
  }

  async list(
    limit: number,
    offset: number,
    filters?: JobPetitionFilters
  ): Promise<{
    data: IJobPetition[];
    pagination: {
      total: number;
      totalPages: number;
      limit: number;
      offset: number;
    };
  }> {
    const query: any = {};

    if (filters) {
      if (filters.search) {
        query.$or = [
          { description: { $regex: filters.search, $options: "i" } },
        ];
      }

      if (filters.status) {
        query.status = { $eq: filters.status };
      }

      if (filters.userId) {
        query.userId = { $eq: filters.userId };
      }

      if (filters.handyManId) {
        query.handyManId = { $eq: filters.handyManId };
      }

      if (filters.service) {
        query.service = { $eq: filters.service };
      }

      if (filters.dateRange?.start || filters.dateRange?.end) {
        query.date = {};
        if (filters.dateRange.start) {
          query.date.$gte = filters.dateRange.start;
        }
        if (filters.dateRange.end) {
          query.date.$lte = filters.dateRange.end;
        }
      }
    }
    const data = await JobPetition.find(query)
      .limit(limit)
      .skip(offset)
      .sort({ date: -1 });

    const total = await JobPetition.countDocuments(query);

    return {
      data,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        limit,
        offset,
      },
    };
  }

  async update(
    id: string,
    jobPetitionData: Partial<IJobPetition>
  ): Promise<IJobPetition | null> {
    return await JobPetition.findByIdAndUpdate(id, jobPetitionData, {
      new: true,
    });
  }
}
