import { hash } from "bcryptjs";

import { CreateUserDto, UpdateUserDto } from "@/dtos/user";
import type { IUser } from "@/models/User";
import { UserRepository } from "@/repositories/UserRepository";

export class CreateUserCommand {
  constructor(public readonly data: CreateUserDto) {}
}

export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly data: UpdateUserDto
  ) {}
}

export class DeleteUserCommand {
  constructor(public readonly id: string) {}
}

export class UserCommandHandlers {
  constructor(private userRepository: UserRepository) {}

  async createUser(command: CreateUserCommand): Promise<IUser> {
    const { name, email, password, role } = command.data;

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error(`User already exists with email: ${email}`);
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return user;
  }

  async updateUser(command: UpdateUserCommand): Promise<IUser> {
    const { id, data } = command;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error(`User not found with id: ${id}`);
    }

    const { name, password } = data;

    if (name) {
      user.name = name;
    }

    if (password) {
      const hashedPassword = await hash(password, 10);
      user.password = hashedPassword;
    }
    await this.userRepository.update(id, user);

    return user;
  }

  async deleteUser(command: DeleteUserCommand): Promise<boolean> {
    const { id } = command;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error(`User not found with id: ${id}`);
    }

    return await this.userRepository.delete(id);
  }
}
