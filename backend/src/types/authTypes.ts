export interface TokenPayload {
  userId: string;
  email: string;
  role: "admin" | "user";
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: "admin" | "user";
  };
  token: string;
}
