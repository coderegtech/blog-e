"use client";

import RecentBlogs from "@/components/RecentBlogs";
import { Card } from "@/components/ui/card";
import { createBlog } from "@/features/blog/blogSlice";
import { createBlogAsync, getBlogsAsync } from "@/features/blog/blogThunks";
import { AppDispatch, RootState } from "@/store";
import { Blog } from "@/types";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { LuLoaderCircle } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

const BlogPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const { status, posts } = useSelector((state: RootState) => state.blog);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        await dispatch(getBlogsAsync());
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [dispatch]);

  const handleUploadPost = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      return;
    }

    if (!currentUser?.uid) return;

    try {
      const post: Blog = {
        uid: currentUser?.uid,
        title,
        content,
      };

      const res = await dispatch(createBlogAsync(post));

      if (res.type === "blog/createBlogAsync/fulfilled") {
        dispatch(createBlog(post));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className=" md:p-4 bg-white flex justify-center md:items-center relative">
      <Card>
        <header className="w-full flex justify-between items-center p-2 pb-4 border-b-2">
          <h2 className="text-2xl font-semibold">Blog Page</h2>

          <div className="flex items-center gap-x-2">
            <Link href={"/account"}>
              <IoPersonCircleOutline className="text-3xl" />
            </Link>
          </div>
        </header>

        <div className="h-[calc(100vh-150px)] sm:h-[calc(100vh-50px)] overflow-y-auto">
          <form
            onSubmit={handleUploadPost}
            className=" flex flex-col space-y-2 py-2 relative"
          >
            <input
              type="text"
              className="text-black placeholder:text-neutral-500 p-2 border"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />

            <textarea
              className="text-black placeholder:text-neutral-500 p-2 border resize-x-none "
              rows={3}
              placeholder="What's on your mind?"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>

            <button
              type="submit"
              disabled={!title || !content}
              className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 self-end cursor-pointer"
            >
              <AiOutlineSend className="text-md" />
              <p>POST</p>
            </button>
          </form>

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Recent Blogs</h2>
            {status === "loading" ? (
              <div className="w-full h-full py-10 flex items-center justify-center text-center">
                <LuLoaderCircle className="text-2xl animate-spin " />
                <p>loading...</p>
              </div>
            ) : (
              <RecentBlogs posts={posts} />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BlogPage;
