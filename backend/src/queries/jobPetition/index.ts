import { IJobPetition, JobPetitionFilters } from "@/models/JobPetition";
import { JobPetitionRepository } from "@/repositories/JobPetitionRepository";

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
  constructor(private jobPetitionRepository: JobPetitionRepository) {}

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
