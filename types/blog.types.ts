import { Comment } from "./comment.types";
import { User } from "./user.types";

export type Blog = {
  id?: string;
  uid: string;
  image_url?: string | File;
  title: string;
  content: string;
  type?: "text" | "image";
  created_at?: Date;
  updated_at?: Date;
  users?: User;
};

type Modal = {
  purpose: "delete" | "edit" | string;
  active: boolean;
  id: string | null;
};

export type BlogState = {
  posts: Blog[];
  post: Blog | null;
  comments: Comment[];
  modal: Modal;
  postId: string | null;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
};
