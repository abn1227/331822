import { Request, Response } from "express";

import {
  CreateHandyManCommand,
  DeleteHandyManCommand,
  HandyManCommandHandlers,
  UpdateHandyManCommand,
} from "@/commands/handyman";
import { HandyManQueryHandlers } from "@/queries/handyman";
import { HandyManRepository } from "@/repositories/HandyManRepository";
import { JobStatsRepository } from "@/repositories/JobStatsRepository";

export class HandyManController {
  private commandHandlers: HandyManCommandHandlers;
  private queryHandlers: HandyManQueryHandlers;

  constructor() {
    const handymanRepository = new HandyManRepository();
    const jobStatsRepository = new JobStatsRepository();
    this.commandHandlers = new HandyManCommandHandlers(handymanRepository);
    this.queryHandlers = new HandyManQueryHandlers(
      handymanRepository,
      jobStatsRepository
    );
  }

  async create(req: Request, res: Response) {
    try {
      const createHandyManDto = req.body;

      const command = new CreateHandyManCommand(createHandyManDto);
      const handyMan = await this.commandHandlers.createHandyMan(command);

      res.status(201).json(handyMan);
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
      const updateHandyManDto = req.body;

      const command = new UpdateHandyManCommand(id, updateHandyManDto);
      const handyMan = await this.commandHandlers.updateHandyMan(command);

      res.status(200).json(handyMan);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "internalServer" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const command = new DeleteHandyManCommand(id);
      const result = await this.commandHandlers.deleteHandyMan(command);

      res.status(200).json({ result });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "internalServer" });
    }
  }

  async getHandyManById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const handyMan = await this.queryHandlers.getHandyMan({
        id,
      });
      res.status(200).json(handyMan);
      return;
      // return res.status(200).json(handyMan);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "internalServer" });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { limit, offset, search, expertise, services, availability } =
        req.query;

      const handyMen = await this.queryHandlers.listHandyMen({
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
        filters: {
          search: search as string,
          expertise: expertise as string,
          services: services as string[],
          availability: availability as string[],
        },
      });

      res.status(200).json(handyMen);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "internalServer" });
    }
  }
}