import { Blog, BlogState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addCommentAsync,
  createBlogAsync,
  deleteBlogAsync,
  editBlogAsync,
  getBlogAsync,
  getBlogCommentsAsync,
  getBlogsAsync,
  getUserBlogsAsync,
} from "./blogThunks";

const initialState: BlogState = {
  posts: [],
  post: null,
  comments: [],
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
      }>,
    ) => {
      state.modal = {
        purpose: action.payload.purpose,
        active: action.payload.active,
        id: action.payload.id,
      };

      state.post =
        state.posts.find((post) => post.id === action.payload.id) ?? null;
    },
  },
  extraReducers: (builder) => {
    builder
      // for pending
      .addCase(createBlogAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBlogsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBlogAsync.pending, (state) => {
        state.status = "loading";
        state.post = null;
      })
      .addCase(getUserBlogsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editBlogAsync.pending, (state) => {
        state.status = "loading";
      })
      // for fulfilled
      .addCase(createBlogAsync.fulfilled, (state, action) => {
        state.status = "success";
        const blogPost = action.payload;
        state.posts.unshift(blogPost);
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.status = "success";
        const comment = action.payload;
        state.comments.unshift(comment);
      })
      .addCase(getBlogsAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload;
      })
      .addCase(getBlogAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.post = action.payload;
      })
      .addCase(getUserBlogsAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload;
      })
      .addCase(getBlogCommentsAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.comments = action.payload;
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
