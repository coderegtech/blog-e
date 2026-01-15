import { logoutUser, registerUser, signinUser } from "@/lib/supabase";
import { LoginPayload, RegisterPayload } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (auth: LoginPayload) => {
    const response = await signinUser(auth);
    return response;
  }
);

export const registerAsync = createAsyncThunk(
  "auth/registerAsync",
  async (auth: RegisterPayload) => {
    const response = await registerUser(auth);
    return response;
  }
);

export const logoutAsync = createAsyncThunk("auth/signOutAsync", async () => {
  const response = await logoutUser();
  return response;
});
