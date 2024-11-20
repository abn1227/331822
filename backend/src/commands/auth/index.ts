import { hash } from "bcryptjs";

import { LoginDto, RegisterDto } from "@/dtos/auth";
import { UserRepository } from "@/repositories/UserRepository";
import { AuthService } from "@/services/authService";
import { LoginResponse, RegisterResponse } from "@/types/authTypes";

export class LoginCommand {
  constructor(public readonly credentials: LoginDto) {}
}

export class RegisterCommand {
  constructor(public readonly data: RegisterDto) {}
}

export class AuthCommandHandlers {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async login(command: LoginCommand): Promise<LoginResponse> {
    const { email, password } = command.credentials;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("userNotFound");
    }

    const isValidPassword = await this.authService.validatePassword(
      user,
      password
    );
    if (!isValidPassword) {
      throw new Error("invalidPassword");
    }

    const token = this.authService.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    };
  }

  async register(command: RegisterCommand): Promise<RegisterResponse> {
    const { email, password, firstName, lastName } = command.data;

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new Error("userAlreadyExists");
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await this.userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: "user",
    });

    const token = this.authService.generateToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      },
      token,
    };
  }
}
