"use client";

import RecentBlogs from "@/components/RecentBlogs";
import { Card } from "@/components/ui/card";
import { createBlog } from "@/features/blog/blogSlice";
import { createBlogAsync, getBlogsAsync } from "@/features/blog/blogThunks";
import { AppDispatch, RootState } from "@/store";
import { Blog } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { LuLoaderCircle } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

const BlogPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const { status, posts } = useSelector((state: RootState) => state.blog);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsloading(true);
      try {
        setTimeout(async () => {
          await dispatch(getBlogsAsync());
          setIsloading(false);
        }, 500);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [dispatch]);

  const handleUploadPost = async (e: FormEvent) => {
    e.preventDefault();
    setIsloading(true);
    if (!title || !content) {
      return;
    }
    try {
      const post: Blog = {
        uid: currentUser?.uid,
        title,
        content,
      };

      const res = await dispatch(createBlogAsync(post));

      if (res.type === "blog/createBlogAsync/fulfilled") {
        dispatch(createBlog(post));
        setIsloading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTitle("");
      setContent("");
      setIsloading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-slate-100 flex justify-center items-center relative">
      <Card className="h-[calc(100vh-100px)] max-w-md w-full bg-white overflow-hidden">
        <header className="w-full flex justify-between items-center p-2 pb-4 border-b-2">
          <h2 className="text-2xl font-semibold">Blog Page</h2>

          <div className="flex items-center gap-x-2">
            <Link href={"/account"}>
              <IoPersonCircleOutline className="text-3xl" />
            </Link>
          </div>
        </header>

        <div className="h-[calc(100vh-200px)] overflow-y-auto">
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
            {isLoading ? (
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
