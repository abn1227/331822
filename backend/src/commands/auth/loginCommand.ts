import { LoginDto } from "@/dtos/auth";
import { UserRepository } from "@/repositories/UserRepository";
import { AuthService } from "@/services/authService";
import { LoginResponse } from "@/types/authTypes";

export class LoginCommand {
  constructor(public readonly credentials: LoginDto) {}
}

export class LoginCommandHandler {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async execute(command: LoginCommand): Promise<LoginResponse> {
    const { email, password } = command.credentials;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await this.authService.validatePassword(
      user,
      password
    );
    if (!isValidPassword) {
      throw new Error("Invalid password");
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
        name: user.name,
        role: user.role,
      },
      token,
    };
  }
}
