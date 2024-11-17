import { Request, Response, NextFunction } from "express";

import { UserRepository } from "@/repositories/UserRepository";
import { AuthService } from "@/services/authService";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email: string;
      role: "admin" | "user";
    };
  }
}

export class AuthMiddleware {
  private authService: AuthService;
  private userRepository: UserRepository;

  constructor() {
    this.authService = new AuthService();
    this.userRepository = new UserRepository();
  }

  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = this.authService.extractTokenFromHeader(
        req.headers.authorization
      );
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const payload = this.authService.verifyToken(token);

      const user = await this.userRepository.findById(payload.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Invalid token" });
    }
  };

  requireRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      next();
    };
  };
}
