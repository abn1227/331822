import { Request, Response } from "express";

import {
  CreateJobPetitionCommand,
  JobPetitionCommandHandlers,
  UpdateJobPetitionCommand,
} from "@/commands/jobPetition";
import { JobPetitionQueryHandlers } from "@/queries/jobPetition";
import { JobPetitionRepository } from "@/repositories/JobPetitionRepository";

export class JobPetitionController {
  private commandHandlers: JobPetitionCommandHandlers;
  private queryHandlers: JobPetitionQueryHandlers;

  constructor() {
    const jobPetitionRepository = new JobPetitionRepository();
    this.commandHandlers = new JobPetitionCommandHandlers(
      jobPetitionRepository
    );
    this.queryHandlers = new JobPetitionQueryHandlers(jobPetitionRepository);
  }

  async create(req: Request, res: Response) {
    try {
      const createJobPetitionDto = req.body;

      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const command = new CreateJobPetitionCommand({
        ...createJobPetitionDto,
        userId: req.user.id,
      });

      const jobPetition = await this.commandHandlers.createJobPetition(command);

      res.status(201).json(jobPetition);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      let updateJobPetitionDto;
      if (req.user.role === "admin") {
        updateJobPetitionDto = req.body;
      } else {
        updateJobPetitionDto = {
          date: req.body.date,
          description: req.body.description,
          time: req.body.time,
        };
      }

      const command = new UpdateJobPetitionCommand(id, updateJobPetitionDto);
      const jobPetition = await this.commandHandlers.updateJobPetition(command);

      res.status(200).json(jobPetition);
      return;
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async changeStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const status = req.body.status;

      const command = new UpdateJobPetitionCommand(id, {
        status,
      });
      const jobPetition = await this.commandHandlers.updateJobPetition(command);

      res.status(200).json(jobPetition);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async changeHandyMan(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const handyManId = req.body.handyManId;

      const command = new UpdateJobPetitionCommand(id, {
        handyManId,
      });
      const jobPetition = await this.commandHandlers.updateJobPetition(command);

      res.status(200).json(jobPetition);
      return;
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getJobPetitionById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const jobPetition = await this.queryHandlers.getJobPetition({
        id,
      });
      res.status(200).json(jobPetition);
      return;
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { limit, offset, search, status, userId, handyManId, service } =
        req.query;

      const jobPetitions = await this.queryHandlers.listJobPetitions({
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
        filters: {
          search: search as string,
          status: status as string,
          userId: userId as string,
          handyManId: handyManId as string,
          service: service as string,
        },
      });

      res.status(200).json(jobPetitions);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getCurrentUserJobPetitions(req: Request, res: Response) {
    try {
      const { limit, offset, search, status, service } = req.query;

      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userId = req.user.id;

      const jobPetitions = await this.queryHandlers.listJobPetitions({
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
        filters: {
          search: search as string,
          status: status as string,
          service: service as string,
          userId,
        },
      });

      res.status(200).json(jobPetitions);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
