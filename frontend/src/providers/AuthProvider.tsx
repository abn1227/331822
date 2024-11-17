import Loader from "@/components/Loader";
import { AuthContext } from "@/contexts/AuthContext";
import { authService } from "@/services/authService";
import { LoggedInUser } from "@/types/auth";
import { useEffect, useState } from "react";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<LoggedInUser>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );

  // Check if user is logged in
  const checkToken = async () => {
    setLoading(true);
    try {
      const response = await authService.check();
      setUser(response.data);
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkToken();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const response = await authService.login(email, password);
    setUser(response.data.user);
    setToken(response.data.token);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    setLoading(false);
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    const response = await authService.register(
      email,
      password,
      firstName,
      lastName
    );
    setUser(response.data.user);
    setToken(response.data.token);
    localStorage.setItem("token", response.data.token);
  };

  const logout = () => {
    setUser({} as LoggedInUser);
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, token, login, register, logout }}
    >
      {loading && <Loader fullScreen variant="accent" size="lg" />}
      {!loading && children}
    </AuthContext.Provider>
  );
};
