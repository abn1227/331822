import { Request, Response } from "express";

import {
  CreateUserCommand,
  DeleteUserCommand,
  UpdateUserCommand,
  UserCommandHandlers,
} from "@/commands/user";
import { CreateUserDto } from "@/dtos/user";
import {
  GetUserByEmailQuery,
  GetUserByIdQuery,
  UserQueryHandlers,
} from "@/queries/user";
import { UserRepository } from "@/repositories/UserRepository";

export class UserController {
  private commandHandlers: UserCommandHandlers;
  private queryHandlers: UserQueryHandlers;

  constructor() {
    const userRepository = new UserRepository();
    this.commandHandlers = new UserCommandHandlers(userRepository);
    this.queryHandlers = new UserQueryHandlers(userRepository);
  }

  async create(req: Request, res: Response) {
    try {
      const createUserDto = new CreateUserDto();
      Object.assign(createUserDto, req.body);

      const command = new CreateUserCommand(createUserDto);
      const user = await this.commandHandlers.createUser(command);

      res.status(201).json(user);
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
      const updateUserDto = new CreateUserDto();
      Object.assign(updateUserDto, req.body);

      const command = new UpdateUserCommand(id, updateUserDto);
      const user = await this.commandHandlers.updateUser(command);

      res.status(200).json(user);
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

      const command = new DeleteUserCommand(id);
      const result = await this.commandHandlers.deleteUser(command);

      res.status(200).json({ result });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "internalServer" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const query = new GetUserByIdQuery(id);

      const user = await this.queryHandlers.getUserById(query);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "internalServer" });
    }
  }

  async getByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;

      const query = new GetUserByEmailQuery(email);

      const user = await this.queryHandlers.getUserByEmail(query);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "internalServer" });
    }
  }
}
