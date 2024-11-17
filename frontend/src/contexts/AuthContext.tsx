import { LoggedInUser } from "@/types/auth";
import { createContext } from "react";

interface AuthContextProps {
  user: LoggedInUser;
  token: string;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
