"use client";
import BlogItem from "@/components/BlogItem";
import { Card } from "@/components/ui/card";
import { RootState } from "@/store";
import { Blog } from "@/types";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const BlogViewPage: React.FC = () => {
  const { id: postId } = useParams();
  const router = useRouter();
  const { status, posts } = useSelector((state: RootState) => state.blog);
  const selectedPost = posts.find((post: Blog) => post.id == postId);

  if (!selectedPost) return;

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
