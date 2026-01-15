import { Blog, BlogState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createBlogAsync,
  deleteBlogAsync,
  editBlogAsync,
  getBlogsAsync,
  getUserBlogsAsync,
} from "./blogThunks";

const initialState: BlogState = {
  posts: [],
  post: null,
  modal: {
    purpose: "",
    active: false,
    id: null,
  },
  postId: null,
  status: "idle",
  error: null,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    createBlog: (state, action: PayloadAction<Blog>) => {
      const blogPost = action.payload;
      console.log("post: ", blogPost);
      state.posts.unshift(blogPost);
    },
    setBlogs: (state, action: PayloadAction<Blog[]>) => {
      state.posts = action.payload;
    },
    removeBlog: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);

      // clear states
      state.modal = {
        purpose: "",
        active: false,
        id: "",
      };
      state.postId = null;
    },
    setSelectedPost: (
      state,
      action: PayloadAction<{
        purpose: "delete" | "edit";
        active: boolean;
        id: string;
      }>
    ) => {
      state.modal = {
        purpose: action.payload.purpose,
        active: action.payload.active,
        id: action.payload.id,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlogAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBlogsAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createBlogAsync.fulfilled, (state, action) => {
        state.status = "success";
        const blogPost = action.payload;
        state.posts.unshift(blogPost);
      })
      .addCase(getBlogsAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload;
      })
      .addCase(getUserBlogsAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload;
      })
      .addCase(editBlogAsync.fulfilled, (state, action) => {
        // update the blog post to its position in posts array
        state.posts = state.posts.map((post) => {
          if (post.id === action.payload[0].id) {
            return action.payload[0];
          }
          return post;
        });

        state.status = "success";

        // clear states
        state.modal = {
          purpose: "",
          active: false,
          id: "",
        };
      })
      .addCase(deleteBlogAsync.fulfilled, (state, action) => {
        state.status = "success";

        console.log("deleted post:", action);
        const blogPost = action.payload;
        state.posts = state.posts.filter((post) => post.id !== action.payload);

        // clear states
        state.modal = {
          purpose: "",
          active: false,
          id: "",
        };
        state.postId = null;
      });
  },
});

export const { createBlog, setBlogs, removeBlog, setSelectedPost } =
  blogSlice.actions;

export default blogSlice.reducer;
