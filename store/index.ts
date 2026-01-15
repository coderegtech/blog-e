import authSliceReducer from "@/features/auth/authSlice";
import blogSliceReducer from "@/features/blog/blogSlice";
import userSliceReducer from "@/features/user/userSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = () => {
  return configureStore({
    reducer: {
      auth: authSliceReducer,
      user: userSliceReducer,
      blog: blogSliceReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
