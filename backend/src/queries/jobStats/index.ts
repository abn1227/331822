import { IJobStats } from "@/models/JobStats";
import { JobStatsRepository } from "@/repositories/JobStatsRepository";

export class GetHandyMenJobStatsQuery {
  constructor(public readonly handyManIds: string[]) {}
}

export class JobStatsQueryHandlers {
  constructor(private jobStatsRepository: JobStatsRepository) {}
}
