import { createBlog } from "@/lib/supabase";
import { Blog } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBlogAsync = createAsyncThunk(
  "blog/createBlogAsync",
  async (blog: Blog) => {
    const response = await createBlog(blog);
    return response;
  },
);

export const getBlogsAsync = createAsyncThunk(
  "blog/getBlogsAsync",
  async () => {
    const response = await fetch("/api/blog");
    if (!response.ok) {
      return [];
    }
    console.log("from thunks: ", response);
    const responseData = await response.json();
    return responseData?.data;
  },
);

export const getUserBlogsAsync = createAsyncThunk(
  "blog/getUserBlogsAsync",
  async (uid: string) => {
    const response = await fetch(`/api/blog/user/${uid}`);
    if (!response.ok) {
      return [];
    }
    const responseData = await response.json();
    return responseData?.data;
  },
);

export const editBlogAsync = createAsyncThunk(
  "blog/editBlogAsync",
  async (blog: Blog) => {
    const response = await fetch(`/api/blog/${blog.id}`, {
      method: "PATCH",
      body: JSON.stringify(blog),
    });

    if (!response.ok) {
      return [];
    }
    const responseData = await response.json();
    return responseData?.data;
  },
);

export const deleteBlogAsync = createAsyncThunk(
  "blog/deleteBlogAsync",
  async (id: string) => {
    const response = await fetch(`/api/blog/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return [];
    }
    const responseData = await response.json();
    return responseData?.data;
  },
);
