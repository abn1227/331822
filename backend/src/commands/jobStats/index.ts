import { CreateJobStatsDto, UpdateJobStatsDto } from "@/dtos/jobStats";
import { IJobStats } from "@/models/JobStats";
import { JobStatsRepository } from "@/repositories/JobStatsRepository";

export class CreateJobStatsCommand {
  constructor(public readonly data: CreateJobStatsDto) {}
}

export class UpdateJobStatusCommand {
  constructor(
    public readonly id: string,
    public readonly data: UpdateJobStatsDto
  ) {}
}

export class ChangeRatingCommand {
  constructor(
    public readonly id: string,
    public readonly rating: number
  ) {}
}

export class JobStatsCommandHandlers {
  constructor(private jobStatsRepository: JobStatsRepository) {}

  async createJobStats(command: CreateJobStatsCommand): Promise<IJobStats> {
    const { handyManId, jobPetitionId, rating } = command.data;

    const existingJobStats =
      await this.jobStatsRepository.findByJobPetitionId(jobPetitionId);

    if (existingJobStats) {
      existingJobStats.handyManId = handyManId;
      await this.jobStatsRepository.update(
        existingJobStats._id,
        existingJobStats
      );
      return existingJobStats;
    }

    const jobStats = await this.jobStatsRepository.create({
      handyManId,
      jobPetitionId,
      rating,
    });

    return jobStats;
  }

  async updateJobStats(command: UpdateJobStatusCommand): Promise<IJobStats> {
    const { id, data } = command;

    const { handyManId, rating } = data;

    const jobStats = await this.jobStatsRepository.findById(id);

    if (!jobStats) {
      throw new Error("jobStatsNotFound");
    }

    if (handyManId) {
      jobStats.handyManId = handyManId;
    }

    if (rating) {
      jobStats.rating = rating;
    }

    await this.jobStatsRepository.update(id, jobStats);

    return jobStats;
  }

  async changeRating(command: ChangeRatingCommand): Promise<IJobStats> {
    const { id, rating } = command;
    const jobStats = await this.jobStatsRepository.findByJobPetitionId(id);

    if (!jobStats) {
      throw new Error("jobStatsNotFound");
    }

    if (rating < 0 || rating > 5) {
      throw new Error("invalidRating");
    }

    jobStats.rating = rating;

    await this.jobStatsRepository.update(jobStats._id, jobStats);

    return jobStats;
  }
}
