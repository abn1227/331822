export interface LoggedInUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "user";
}

export interface LoginResponse {
  user: LoggedInUser;
  token: string;
}

export interface RegisterResponse {
  user: LoggedInUser;
  token: string;
}
