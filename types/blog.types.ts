export type Blog = {
  id?: string;
  uid: string;
  title: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
};

type Modal = {
  purpose: "delete" | "edit" | string;
  active: boolean;
  id: string;
};

export type BlogState = {
  posts: Blog[];
  post: Blog | null;
  modal: Modal;
  postId: string | null;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
};
