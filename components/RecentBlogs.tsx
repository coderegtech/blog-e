"use client";
import { Blog } from "@/types";
import { useState } from "react";
import BlogList from "./BlogList";

const RecentBlogs = ({ posts }: { posts: Blog[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts: Blog[] = posts?.slice(
    startIndex,
    startIndex + postsPerPage
  );

  return (
    <div>
      <BlogList posts={paginatedPosts} />

      {posts.length > postsPerPage && (
        <ul className="pt-2 gap-x-1 flex justify-end">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`cursor-pointer px-2 border ${
                currentPage === page ? "bg-orange-500 text-white" : ""
              }`}
            >
              {page}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentBlogs;
