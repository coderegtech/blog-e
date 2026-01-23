import { Blog } from "@/types";
import { CommentPayload } from "@/types/comment.types";
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
      console.log("blog payload:", blog);
      console.log("blog created: ", responseData?.data);

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

// Comments thunks
export const addCommentAsync = createAsyncThunk(
  "blog/addCommentAsync",
  async (comment: CommentPayload) => {
    try {
      const response = await fetch(`/api/comment`, {
        method: "POST",
        body: JSON.stringify(comment),
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

export const getBlogCommentsAsync = createAsyncThunk(
  "blog/getBlogCommentsAsync",
  async (blogId: string) => {
    try {
      const response = await fetch(`/api/comment/${blogId}`);
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
