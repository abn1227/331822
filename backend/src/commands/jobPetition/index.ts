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
    const { userId, handyManId, status, description, service, date, time } =
      command.data;

    const existentJobPetition =
      await this.jobPetitionRepository.findByServiceAndUser(service, userId);

    if (existentJobPetition) {
      throw new Error("There is a petition of this service already created");
    }

    const availabilityDay = date.split("-")[2];

    const jobPetition = await this.jobPetitionRepository.create({
      userId,
      handyManId,
      status,
      description,
      service,
      availability: availabilityDay,
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
      throw new Error(`JobPetition not found with id: ${id}`);
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
