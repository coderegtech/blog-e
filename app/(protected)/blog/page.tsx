"use client";

import RecentBlogs from "@/components/RecentBlogs";
import { Card } from "@/components/ui/card";
import { createBlogAsync, getBlogsAsync } from "@/features/blog/blogThunks";
import { useUpload } from "@/hooks/use-upload";
import { AppDispatch, RootState } from "@/store";
import { Blog } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { FcGallery } from "react-icons/fc";
import { IoClose, IoPersonCircleOutline } from "react-icons/io5";
import { LuLoaderCircle } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

const BlogPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { currentUser } = useSelector((state: RootState) => state.auth);

  const { status, posts } = useSelector((state: RootState) => state.blog);
  const dispatch = useDispatch<AppDispatch>();

  const {
    imageFile,
    imagePreview,
    imageRef,
    setImagePreview,
    uploadImageFile,
    handleImageOnChange,
  } = useUpload();

  useEffect(() => {
    dispatch(getBlogsAsync());
  }, [dispatch]);

  const handleUploadPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      return;
    }

    if (!currentUser?.uid) return;

    try {
      const imageUrl = await uploadImageFile();

      const post: Blog = {
        uid: currentUser?.uid,
        image_url: imageUrl || "",
        title,
        content: content,
        type: imageUrl ? "image" : "text",
      };

      await dispatch(createBlogAsync(post));
    } catch (error) {
      console.log(error);
    } finally {
      setTitle("");
      setContent("");
      setImagePreview(null);
    }
  };

  return (
    <div className="min-h-screen md:p-4 bg-white flex justify-center md:items-center relative">
      <Card>
        <header className="w-full flex justify-between items-center p-2 pb-4 border-b-2">
          <h2 className="text-2xl font-semibold">Blog Page</h2>

          <div className="flex items-center gap-x-2">
            <Link href={"/account"}>
              <IoPersonCircleOutline className="text-3xl" />
            </Link>
          </div>
        </header>

        <div className="h-[calc(100dvh-100px)] md:h-[calc(100vh-200px)] overflow-y-auto">
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

            <div className="p-2 h-full border relative">
              <textarea
                rows={3}
                placeholder="What's on your mind?"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className="text-black h-auto w-full placeholder:text-neutral-500 focus:outline-none border-none resize-none"
              ></textarea>

              {/* preview image  */}
              {imagePreview && (
                <div className="flex items-start">
                  <span onClick={() => setImagePreview(null)}>
                    <IoClose className="text-2xl hover:text-red-500 cursor-pointer" />
                  </span>
                  <Image
                    src={imagePreview}
                    alt={title}
                    width={100}
                    height={100}
                    className="w-40 h-40 object-contain"
                  />
                </div>
              )}

              <input
                ref={imageRef}
                onChange={handleImageOnChange}
                type="file"
                name="image"
                accept="image/png, image/jpeg, image/jpg"
                hidden
              />

              {!imagePreview && (
                <div
                  onClick={() => imageRef.current?.click()}
                  className="pt-2  cursor-pointer"
                >
                  <FcGallery className="text-2xl text-black" />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!title || status === "loading"}
              className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 self-end cursor-pointer"
            >
              <AiOutlineSend className="text-md" />
              <p>POST</p>
            </button>
          </form>

          <div className="mt-4 ">
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
