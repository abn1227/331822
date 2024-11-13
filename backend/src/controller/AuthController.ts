import { Request, Response } from "express";

import { UserRepository } from "../repositories/UserRepository";

import {
  LoginCommand,
  LoginCommandHandler,
} from "@/commands/auth/loginCommand";
import { AuthService } from "@/services/authService";

export class AuthController {
  private loginHandler: LoginCommandHandler;

  constructor() {
    const userRepository = new UserRepository();
    const authService = new AuthService();
    this.loginHandler = new LoginCommandHandler(userRepository, authService);
  }

  async login(req: Request, res: Response) {
    try {
      const command = new LoginCommand(req.body);
      const result = await this.loginHandler.execute(command);
      return res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
