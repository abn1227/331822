export interface TokenPayload {
  userId: string;
  email: string;
  role: "admin" | "user";
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "admin" | "user";
  };
  token: string;
}

export interface RegisterResponse extends LoginResponse {}
