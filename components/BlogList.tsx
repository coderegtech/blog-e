"use client";

import { Blog } from "@/types";
import BlogItem from "./BlogItem";

interface BlogListProps {
  posts: Blog[];
}

const BlogList = ({ posts }: BlogListProps) => {
  return (
    <div className="space-y-2 relative">
      {posts.length === 0 ? (
        <p className="text-center text-neutral-500">No posts yet.</p>
      ) : (
        posts?.map((item: Blog, index: number) => {
          return (
            <BlogItem
              key={index}
              id={item.id}
              uid={item.uid}
              title={item.title}
              content={
                item.content.length > 100
                  ? item.content.substring(0, 100) + "..."
                  : item.content
              }
              created_at={item?.created_at}
              updated_at={item?.updated_at}
            />
          );
        })
      )}
    </div>
  );
};

export default BlogList;
