import { Request, Response } from "express";

import { UserRepository } from "../repositories/UserRepository";

import {
  LoginCommand,
  AuthCommandHandlers,
  RegisterCommand,
} from "@/commands/auth";
import { AuthService } from "@/services/authService";

export class AuthController {
  private authHandler: AuthCommandHandlers;

  constructor() {
    const userRepository = new UserRepository();
    const authService = new AuthService();
    this.authHandler = new AuthCommandHandlers(userRepository, authService);
  }

  async login(req: Request, res: Response) {
    try {
      const command = new LoginCommand(req.body);
      const result = await this.authHandler.login(command);
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const command = new RegisterCommand(req.body);
      const result = await this.authHandler.register(command);
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async check(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      return res.status(200).json({
        id: user.id,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
