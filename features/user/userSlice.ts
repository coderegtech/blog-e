import { UserState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  users: [],
  currentUser: null,
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
