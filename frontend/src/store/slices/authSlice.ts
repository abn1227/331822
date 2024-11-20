import { authService } from "@/services/authService";
import { LoggedInUser } from "@/types/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: LoggedInUser;
  token: string;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: {} as LoggedInUser,
  token: "",
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const checkAuth = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.check();
      return response.data;
    } catch (error) {
      console.debug(error);
      return rejectWithValue("Session expired or no token found");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.login(
        credentials.email,
        credentials.password
      );
      return response.data;
    } catch (error: any) {
      console.debug(error);
      return rejectWithValue(error?.message || "Invalid email or password");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    credentials: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.register(
        credentials.email,
        credentials.password,
        credentials.firstName,
        credentials.lastName
      );
      return response.data;
    } catch (error: any) {
      console.debug(error);
      return rejectWithValue(error?.message || "Error al registrar");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {} as LoggedInUser;
      state.token = "";
      state.error = null;
      state.isAuthenticated = false;
    },

    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.user = {} as LoggedInUser;
        // state.error = null;
        state.isAuthenticated = false;
        state.token = "";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = {} as LoggedInUser;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.token = "";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.user = {} as LoggedInUser;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.token = "";
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
