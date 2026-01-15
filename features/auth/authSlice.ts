import { AuthState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { loginAsync, registerAsync } from "./authThunks";

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  currentUser: null,
  userId: null,
  session: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.session = null;
      state.currentUser = null;
    },
    setUserId: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.userId = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    setSession: (state, action) => {
      state.isAuthenticated = true;
      state.session = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // for pending
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      // for fulfilled
      .addCase(loginAsync.fulfilled, (state, action) => {
        console.log("login payload: ", action.payload);

        state.isLoading = false;
        state.isAuthenticated = true;
        state.session = action.payload.session;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        console.log("registration payload: ", action.payload);

        state.isLoading = false;
        state.isAuthenticated = true;
        state.session = action.payload.session;
      })
      // for rejected
      .addCase(loginAsync.rejected, (state, action) => {
        console.log("Login Rejected: ", action);

        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        console.log("registration Rejected: ", action);

        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      });
  },
});

export const { logout, setSession, loginSuccess, setUserId, setCurrentUser } =
  authSlice.actions;

export default authSlice.reducer;
