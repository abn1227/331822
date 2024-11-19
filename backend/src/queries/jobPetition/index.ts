import { IHandyMan } from "@/models/HandyMan";
import {
  IJobPetition,
  IJobPetitionDetailed,
  JobPetitionFilters,
} from "@/models/JobPetition";
import { HandyManRepository } from "@/repositories/HandyManRepository";
import { JobPetitionRepository } from "@/repositories/JobPetitionRepository";
import { UserRepository } from "@/repositories/UserRepository";

export class GetJobPetitionQuery {
  constructor(
    public readonly id?: string,
    public readonly service?: string
  ) {}
}

export class ListJobPetitionQuery {
  constructor(
    public readonly limit?: number,
    public readonly offset?: number,
    public readonly filters?: JobPetitionFilters
  ) {}
}

export class JobPetitionQueryHandlers {
  constructor(
    private jobPetitionRepository: JobPetitionRepository,
    private userRepository: UserRepository,
    private handyManRepository: HandyManRepository
  ) {}

  async getJobPetition(query: GetJobPetitionQuery): Promise<IJobPetition> {
    const { id } = query;

    let jobPetition: IJobPetition | null = null;

    if (id) {
      jobPetition = await this.jobPetitionRepository.findById(id);
    }

    if (!jobPetition) {
      throw new Error(`JobPetition not found with id: ${id}`);
    }

    return jobPetition;
  }

  async getDetailedJobPetition(
    query: GetJobPetitionQuery
  ): Promise<IJobPetitionDetailed> {
    const { id } = query;

    let jobPetition: IJobPetitionDetailed | null = null;

    if (id) {
      jobPetition = await this.jobPetitionRepository.findById(id);
    }

    if (!jobPetition) {
      throw new Error(`JobPetition not found with id: ${id}`);
    }

    const user = await this.userRepository.findById(jobPetition.userId);

    let handyMan: IHandyMan | null = null;
    if (jobPetition.handyManId) {
      handyMan = await this.handyManRepository.findById(jobPetition.handyManId);
    }

    return {
      _id: jobPetition._id,
      service: jobPetition.service,
      description: jobPetition.description,
      date: jobPetition.date,
      time: jobPetition.time,
      status: jobPetition.status,
      availability: jobPetition.availability,
      handyManId: jobPetition.handyManId,
      userId: jobPetition.userId,
      userName: user ? `${user.firstName} ${user.lastName}` : "",
      handyManName: handyMan
        ? `${handyMan.firstName} ${handyMan.lastName}`
        : "",
    } as IJobPetitionDetailed;
  }

  async getJobPetitionByServiceAndUser(
    query: GetJobPetitionQuery
  ): Promise<IJobPetition> {
    const { id, service } = query;

    let jobPetition: IJobPetition | null = null;

    if (id && service) {
      jobPetition = await this.jobPetitionRepository.findByServiceAndUser(
        service,
        id
      );
    }

    if (!jobPetition) {
      throw new Error(`JobPetition not found with id: ${id}`);
    }

    return jobPetition;
  }

  async listJobPetitions(query: ListJobPetitionQuery): Promise<{
    data: IJobPetition[];
    pagination: {
      total: number;
      totalPages: number;
      limit: number;
      offset: number;
    };
  }> {
    const { limit, offset, filters } = query;
    return this.jobPetitionRepository.list(limit || 10, offset || 0, filters);
  }
}
