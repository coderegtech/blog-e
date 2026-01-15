export type User = {
  id: string;
  uid: string;
  username: string;
  email: string;
  status?: "online" | "offline";
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
