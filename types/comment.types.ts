import { Blog } from "./blog.types";
import { User } from "./user.types";

export type Comment = {
  id: string;
  image_url: string;
  content: string;
  created_at: Date;
  updated_at?: Date;
  user?: User;
  blog?: Blog;
};

export type CommentPayload = {
  image_url?: string;
  content?: string;
  user: string;
  blog: string;
};
