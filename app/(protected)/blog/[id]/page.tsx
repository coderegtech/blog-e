"use client";
import BlogItem from "@/components/BlogItem";
import { Card } from "@/components/ui/card";
import { getBlogAsync } from "@/features/blog/blogThunks";
import { AppDispatch, RootState } from "@/store";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { LuLoaderCircle } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

const BlogViewPage: React.FC = () => {
  const { id: postId } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { status, post } = useSelector((state: RootState) => state.blog);

  const fetchBlog = useCallback(async () => {
    if (!postId) return;
    try {
      await dispatch(getBlogAsync(postId as string));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, postId]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

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

        <div className="h-[calc(100vh-150px)] sm:h-100 overflow-y-auto py-4">
          {status === "loading" ? (
            <div className="w-full h-full py-10 flex items-center justify-center text-center">
              <LuLoaderCircle className="text-2xl animate-spin " />
              <p>loading...</p>
            </div>
          ) : (
            <BlogItem
              id={post?.id}
              uid={post?.uid}
              title={post?.title}
              content={post?.content}
              created_at={post?.created_at}
              updated_at={post?.updated_at}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default BlogViewPage;
