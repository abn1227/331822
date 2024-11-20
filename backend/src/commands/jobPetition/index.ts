import { CreateJobPetitionDto, UpdateJobPetitionDto } from "@/dtos/jobPetition";
import { IJobPetition } from "@/models/JobPetition";
import { JobPetitionRepository } from "@/repositories/JobPetitionRepository";

export class CreateJobPetitionCommand {
  constructor(public readonly data: CreateJobPetitionDto) {}
}

export class UpdateJobPetitionCommand {
  constructor(
    public readonly id: string,
    public readonly data: UpdateJobPetitionDto
  ) {}
}

export class JobPetitionCommandHandlers {
  constructor(private jobPetitionRepository: JobPetitionRepository) {}

  async createJobPetition(
    command: CreateJobPetitionCommand
  ): Promise<IJobPetition> {
    const {
      userId,
      handyManId,
      status,
      description,
      service,
      date,
      availability,
      time,
    } = command.data;

    const existentJobPetition = await this.jobPetitionRepository.list(100, 0, {
      status: ["pending"],
      userId: [userId],
      service: [service],
    });

    if (existentJobPetition.data.length > 0) {
      throw new Error("pendingJobPetition");
    }

    const jobPetition = await this.jobPetitionRepository.create({
      userId,
      handyManId,
      status,
      description,
      service,
      availability,
      date: new Date(date),
      time,
    });

    return jobPetition;
  }

  async updateJobPetition(
    command: UpdateJobPetitionCommand
  ): Promise<IJobPetition> {
    const { id, data } = command;

    const jobPetition = await this.jobPetitionRepository.findById(id);

    if (!jobPetition) {
      throw new Error("jobPetitionNotFound");
    }

    const { handyManId, status, description, date, time } = data;

    if (handyManId) {
      jobPetition.handyManId = handyManId;
    }

    if (status) {
      jobPetition.status = status;
    }

    if (description) {
      jobPetition.description = description;
    }

    if (date) {
      jobPetition.date = new Date(date);
    }

    if (time) {
      jobPetition.time = time;
    }

    await this.jobPetitionRepository.update(id, jobPetition);

    return jobPetition;
  }
}
