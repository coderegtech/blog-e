"use client";
import BlogItem from "@/components/BlogItem";
import { Card } from "@/components/ui/card";
import { RootState } from "@/store";
import { Blog } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const BlogViewPage = () => {
  const { id: postId } = useParams();
  const router = useRouter();
  const { posts } = useSelector((state: RootState) => state.blog);
  const selectedPost = posts.find((post: Blog) => post.id == postId);

  return (
    <div className="min-h-screen p-4 bg-slate-100 flex justify-center items-center relative">
      <Card className=" max-w-md w-full bg-white overflow-hidden">
        <header className="w-full flex justify-between items-center p-2 pb-4 border-b-2">
          <div className="flex items-center gap-2 ">
            <button onClick={() => router.back()}>
              <BsArrowLeft className="text-xl" />
            </button>
            <h2 className="text-2xl font-semibold">View Page</h2>
          </div>

          <div className="flex items-center gap-x-2">
            <span>
              <IoPersonCircleOutline className="text-3xl" />
            </span>
          </div>
        </header>

        <div className="h-[calc(100vh-200px)] overflow-y-auto py-4">
          <BlogItem
            id={selectedPost?.id}
            uid={selectedPost?.uid}
            title={selectedPost?.title}
            content={selectedPost?.content}
            created_at={selectedPost?.created_at}
            updated_at={selectedPost?.updated_at}
          />
        </div>
      </Card>
    </div>
  );
};

export default BlogViewPage;
