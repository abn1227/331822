import { Request, Response } from "express";

import {
  CreateHandyManCommand,
  DeleteHandyManCommand,
  HandyManCommandHandlers,
  UpdateHandyManCommand,
} from "@/commands/handyman";
import { HandyManQueryHandlers } from "@/queries/handyman";
import { HandyManRepository } from "@/repositories/HandyManRepository";

export class HandyManController {
  private commandHandlers: HandyManCommandHandlers;
  private queryHandlers: HandyManQueryHandlers;

  constructor() {
    const handymanRepository = new HandyManRepository();
    this.commandHandlers = new HandyManCommandHandlers(handymanRepository);
    this.queryHandlers = new HandyManQueryHandlers(handymanRepository);
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

      return res.status(500).json({ message: "Internal server error" });
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

      return res.status(500).json({ message: "Internal server error" });
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

      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
