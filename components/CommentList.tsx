"use client";

import { Comment } from "@/types/comment.types";
import moment from "moment";
import Image from "next/image";

type CommentListProps = {
  comments: Comment[];
};

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="py-4">
      {comments.length === 0 ? (
        <p className="text-center text-neutral-500">No comments yet.</p>
      ) : (
        <ul className="space-y-2">
          {comments?.map((comment, index: number) => {
            return (
              <li key={index} className="border p-4 relative">
                <div className="flex flex-col">
                  <p className="text-sm">@{comment.user?.username}</p>
                  {comment.content && (
                    <h3 className="text-base font-semibold">
                      {comment.content}
                    </h3>
                  )}
                  {comment.image_url && (
                    <Image
                      src={comment.image_url}
                      alt={comment.content || "comment image"}
                      className="max-w-44 w-full h-full object-contain py-2"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
                <span className="absolute right-2 bottom-2 text-xs text-neutral-500">
                  {moment(comment.created_at).fromNow()}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
