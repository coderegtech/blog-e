import {
  createBlog,
  deleteBlog,
  getBlogs,
  getUserBlogs,
  updateBlog,
} from "@/lib/supabase";
import { Blog } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBlogAsync = createAsyncThunk(
  "blog/createBlogAsync",
  async (blog: Blog) => {
    const response = await createBlog(blog);
    return response;
  }
);

export const getBlogsAsync = createAsyncThunk(
  "blog/getBlogsAsync",
  async () => {
    const response = await getBlogs();
    return response;
  }
);

export const getUserBlogsAsync = createAsyncThunk(
  "blog/getUserBlogsAsync",
  async (uid: string) => {
    const response = await getUserBlogs(uid);
    return response;
  }
);

export const editBlogAsync = createAsyncThunk(
  "blog/editBlogAsync",
  async (blog: Blog) => {
    const response = await updateBlog(blog);
    return response;
  }
);

export const deleteBlogAsync = createAsyncThunk(
  "blog/deleteBlogAsync",
  async (id: string) => {
    const response = await deleteBlog(id);
    return response;
  }
);
