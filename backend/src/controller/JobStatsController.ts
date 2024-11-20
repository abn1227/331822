import { Request, Response } from "express";

import {
  ChangeRatingCommand,
  CreateJobStatsCommand,
  JobStatsCommandHandlers,
  UpdateJobStatusCommand,
} from "@/commands/jobStats";
import { JobStatsQueryHandlers } from "@/queries/jobStats";
import { JobStatsRepository } from "@/repositories/JobStatsRepository";

export class JobStatsController {
  private commandHandlers: JobStatsCommandHandlers;
  private queryHandlers: JobStatsQueryHandlers;

  constructor() {
    const jobStatsRepository = new JobStatsRepository();
    this.commandHandlers = new JobStatsCommandHandlers(jobStatsRepository);
    this.queryHandlers = new JobStatsQueryHandlers(jobStatsRepository);
  }

  async create(req: Request, res: Response) {
    try {
      const createJobStatsDto = req.body;

      const command = new CreateJobStatsCommand(createJobStatsDto);
      const jobStats = await this.commandHandlers.createJobStats(command);

      res.status(201).json(jobStats);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "internalServer" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateJobStatsDto = req.body;

      const command = new UpdateJobStatusCommand(id, updateJobStatsDto);
      const jobStats = await this.commandHandlers.updateJobStats(command);

      res.status(200).json(jobStats);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "internalServer" });
    }
  }

  async changeRating(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const rating = req.body.rating;

      const command = new ChangeRatingCommand(id, rating);
      const jobStats = await this.commandHandlers.changeRating(command);

      res.status(200).json(jobStats);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "internalServer" });
    }
  }
}
