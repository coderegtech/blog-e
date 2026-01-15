export type UserPayload = {
  uid: string;
  username: string;
  email: string;
};

export type User = {
  id: string;
  uid: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type CurrentUserType = User | null;

export type UserState = {
  users: User[];
  currentUser: CurrentUserType;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
};
