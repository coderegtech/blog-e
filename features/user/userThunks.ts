import { getUserById } from "@/lib/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserByIdAsync = createAsyncThunk(
  "blog/getUserByIdAsync",
  async (userId: string) => {
    const response = await getUserById(userId);
    return response;
  }
);
