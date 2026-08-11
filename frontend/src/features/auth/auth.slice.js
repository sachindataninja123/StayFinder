import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  getMe,
  login,
  logoutService,
  register,
  tokenRefresh,
} from "../../services/auth.service";

// ----- Async Thunks -----

const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await register(formData);
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Registration failed";
      return rejectWithValue(message);
    }
  },
);

const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await login(formData);
      return res.data;
    } catch (error) {
      error.response?.data?.detail ||
        error.response?.data?.message ||
        "Login failed";
      return rejectWithValue(message);
    }
  },
);

const getMeUser = createAsyncThunk(
  "auth/getme",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMe();
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "User fetch failed";
      return rejectWithValue(message);
    }
  },
);

const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await tokenRefresh();
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Token refresh failed";
      return rejectWithValue(message);
    }
  },
);

const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await logoutService();
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Logout failed";
      return rejectWithValue(message);
    }
  },
);

// ----- slice -----

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
      toast.success("Logged out");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        toast.success("Account created successfully");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Registration failed");
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        const { accessToken } = action.payload;
        if (accessToken) {
          localStorage.setItem("token", accessToken);
        }
        toast.success("Logged in successfully");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Login failed");
      })

      // getMe
      .addCase(getMeUser.pending, (state) => {
        state.loading = true;
        state.user = null;
      })
      .addCase(getMeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        const { accessToken } = action.payload;
        if (accessToken) {
          localStorage.setItem("token", accessToken);
        }
      })
      .addCase(getMeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // no toast here — this often runs silently on app load to check session
      })

      // refreshToken
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        const { accessToken } = action.payload || {};
        if (accessToken) {
          localStorage.setItem("token", accessToken);
        }
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem("token");
        // no toast here either — silent redirect to login is usually better UX
      })

      // logoutUser (API-based logout)
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Logout failed");
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export { registerUser, loginUser, getMeUser, refreshToken, logoutUser };
export default authSlice.reducer;
