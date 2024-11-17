import { CreateUserCommand, UserCommandHandlers } from "@/commands/user";
import { UserRepository } from "@/repositories/UserRepository";

const adminSeeder = async () => {
  const userRepository = new UserRepository();
  const commandHandlers = new UserCommandHandlers(userRepository);

  const command = new CreateUserCommand({
    email: "admin@servy.com",
    password: "12345678",
    firstName: "Admin",
    lastName: "Servy",
    role: "admin",
  });

  try {
    const user = await commandHandlers.createUser(command);
    console.log(user);
  } catch (error) {
    console.error(error);
  }
};

export default adminSeeder;
