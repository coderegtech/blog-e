import type { CurrentUserType } from "./user.types";

export type AuthSession = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  expires_in: number;
  token_type: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string | null;
  currentUser: CurrentUserType;
  session: AuthSession | null;
  error?: string | null;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};
