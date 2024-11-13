import { IUser } from "@/models/User";
import { UserRepository } from "@/repositories/UserRepository";

export class GetUserByIdQuery {
  constructor(public readonly id: string) {}
}

export class GetUserByEmailQuery {
  constructor(public readonly email: string) {}
}

export class UserQueryHandlers {
  constructor(private userRepository: UserRepository) {}

  async getUserById(query: GetUserByIdQuery): Promise<IUser> {
    const { id } = query;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error(`User not found with id: ${id}`);
    }

    return user;
  }

  async getUserByEmail(query: GetUserByEmailQuery): Promise<IUser> {
    const { email } = query;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error(`User not found with email: ${email}`);
    }

    return user;
  }
}
