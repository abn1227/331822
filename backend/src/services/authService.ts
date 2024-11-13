import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

import { config } from "@/config";
import { IUser } from "@/models/User";
import { TokenPayload } from "@/types/authTypes";

export class AuthService {
  generateToken(payload: TokenPayload) {
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpirationTime,
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, config.jwtSecret) as TokenPayload;
  }

  async validatePassword(user: IUser, password: string) {
    return compare(password, user.password);
  }

  extractTokenFromHeader(header: string | undefined): string | null {
    if (!header) return null;

    const [type, token] = header.split(" ");

    if (type.toLowerCase() !== "bearer") return null;

    return token;
  }
}
