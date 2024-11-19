import Loader from "@/components/Loader";
import { AuthContext } from "@/contexts/AuthContext";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  checkAuth,
  login as loginUser,
  logout,
  register as registerUser,
} from "@/store/slices/authSlice";
import { useEffect } from "react";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { user, token, loading, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (token && !isAuthenticated) {
      dispatch(checkAuth());
    }
  }, [dispatch, token, isAuthenticated]);

  const login = async (email: string, password: string) => {
    await dispatch(loginUser({ email, password }));
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    await dispatch(registerUser({ email, password, firstName, lastName }));
    dispatch(checkAuth());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, token, login, register, logout: handleLogout }}
    >
      {loading && <Loader fullScreen variant="accent" size="lg" />}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;