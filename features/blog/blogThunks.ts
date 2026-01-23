import { Blog } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBlogAsync = createAsyncThunk(
  "blog/createBlogAsync",
  async (blog: Blog) => {
    try {
      const response = await fetch(`/api/blog`, {
        method: "POST",
        body: JSON.stringify(blog),
      });

      if (!response.ok) {
        return [];
      }
      const responseData = await response.json();
      return responseData?.data;
    } catch (error) {
      throw error;
    }
  },
);

export const getBlogsAsync = createAsyncThunk(
  "blog/getBlogsAsync",
  async () => {
    try {
      const response = await fetch("/api/blog");
      if (!response.ok) {
        return [];
      }
      console.log("from thunks: ", response);
      const responseData = await response.json();
      return responseData?.data;
    } catch (error) {
      throw error;
    }
  },
);

export const getBlogAsync = createAsyncThunk(
  "blog/getBlogAsync",
  async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`);
      if (!response.ok) {
        return [];
      }
      const responseData = await response.json();
      return responseData?.data;
    } catch (error) {
      throw error;
    }
  },
);

export const getUserBlogsAsync = createAsyncThunk(
  "blog/getUserBlogsAsync",
  async (uid: string) => {
    try {
      const response = await fetch(`/api/blog/user/${uid}`);
      if (!response.ok) {
        return [];
      }
      const responseData = await response.json();
      return responseData?.data;
    } catch (error) {
      throw error;
    }
  },
);

export const editBlogAsync = createAsyncThunk(
  "blog/editBlogAsync",
  async (blog: Blog) => {
    try {
      const response = await fetch(`/api/blog/${blog.id}`, {
        method: "PATCH",
        body: JSON.stringify(blog),
      });

      if (!response.ok) {
        return [];
      }
      const responseData = await response.json();
      return responseData?.data;
    } catch (error) {
      throw error;
    }
  },
);

export const deleteBlogAsync = createAsyncThunk(
  "blog/deleteBlogAsync",
  async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        return [];
      }
      const responseData = await response.json();
      return responseData?.data;
    } catch (error) {
      throw error;
    }
  },
);
