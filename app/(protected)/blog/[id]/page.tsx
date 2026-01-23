"use client";
import BlogItem from "@/components/BlogItem";
import CommentList from "@/components/CommentList";
import { Card } from "@/components/ui/card";
import {
  addCommentAsync,
  getBlogAsync,
  getBlogCommentsAsync,
} from "@/features/blog/blogThunks";
import { useUpload } from "@/hooks/use-upload";
import { AppDispatch, RootState } from "@/store";
import { CommentPayload } from "@/types/comment.types";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { FcGallery } from "react-icons/fc";
import { IoClose, IoPersonCircleOutline } from "react-icons/io5";
import { LuLoaderCircle } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

const BlogViewPage: React.FC = () => {
  const { id: postId } = useParams();
  const router = useRouter();
  const [content, setContent] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { status, post, comments } = useSelector(
    (state: RootState) => state.blog,
  );

  const {
    imageFile,
    imagePreview,
    imageRef,
    setImagePreview,
    uploadImageFile,
    handleImageOnChange,
  } = useUpload();

  const fetchBlog = useCallback(async () => {
    if (!postId) return;
    try {
      // fetch blog details
      await dispatch(getBlogAsync(postId as string));

      // fetch blog comments
      await dispatch(getBlogCommentsAsync(postId as string));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, postId]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postId && currentUser?.uid) return;

    if (!content && !imageFile) return;
    try {
      const imageUrl = await uploadImageFile();

      const newComment: CommentPayload = {
        image_url: imageUrl || "",
        content: content,
        user: currentUser?.uid as string,
        blog: postId as string,
      };

      await dispatch(addCommentAsync(newComment));
    } catch (error) {
      console.log(error);
    } finally {
      setContent("");
      setImagePreview(null);
    }
  };

  return (
    <div className="min-h-screen md:p-4 bg-white flex justify-center md:items-center relative">
      <Card>
        <header className="w-full flex justify-between items-center p-2 pb-4 border-b-2">
          <div className="flex items-center gap-2 ">
            <button onClick={() => router.back()}>
              <BsArrowLeft className="text-xl" />
            </button>
            <h2 className="text-2xl font-semibold">View Page</h2>
          </div>

          <div className="flex items-center gap-x-2">
            <Link href={"/account"}>
              <IoPersonCircleOutline className="text-3xl" />
            </Link>
          </div>
        </header>

        <div className="max-h-[calc(100dvh-200px)] md:pb-20 overflow-y-auto py-4 ">
          {status === "loading" ? (
            <div className="w-full h-full py-10 flex items-center justify-center text-center">
              <LuLoaderCircle className="text-2xl animate-spin " />
              <p>loading...</p>
            </div>
          ) : post !== null ? (
            <BlogItem
              id={post?.id}
              uid={post?.uid}
              image_url={post?.image_url}
              type={post?.type}
              title={post?.title}
              content={post?.content}
              users={post?.users}
              created_at={post?.created_at}
              updated_at={post?.updated_at}
            />
          ) : null}

          <div className="py-4 pb-8 ">
            <h2 className="text-xl font-semibold">Comments</h2>

            <CommentList comments={comments} />

            <form
              onSubmit={handleAddComment}
              className="absolute left-4 right-4 bottom-4 bg-white pt-4"
            >
              {imagePreview && (
                <div className=" bg-white h-fit relative mb-2">
                  <Image
                    src={imagePreview}
                    alt={""}
                    width={100}
                    height={100}
                    className="ml-8 max-h-24 object-cover"
                  />

                  <span onClick={() => setImagePreview(null)}>
                    <IoClose className="absolute top-0 text-2xl hover:text-red-500 cursor-pointer" />
                  </span>
                </div>
              )}

              <div className="w-full flex gap-x-2">
                <div className="p-2 w-full border relative">
                  <textarea
                    rows={2}
                    placeholder="Add a comment..."
                    className="text-black h-full w-full placeholder:text-neutral-500 focus:outline-none border-none resize-x-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>

                  <input
                    ref={imageRef}
                    onChange={handleImageOnChange}
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg, image/jpg"
                    hidden
                  />

                  <div
                    onClick={() => imageRef.current?.click()}
                    className="absolute bottom-2 right-2  cursor-pointer"
                  >
                    <FcGallery className="text-2xl text-black" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-4 h-10 bg-orange-500 text-white rounded-md"
                >
                  <AiOutlineSend className="text-md" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BlogViewPage;
