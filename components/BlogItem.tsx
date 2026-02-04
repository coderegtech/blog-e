"use client";
import { setSelectedPost } from "@/features/blog/blogSlice";
import { AppDispatch, RootState } from "@/store";
import { Blog } from "@/types";
import moment from "moment";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AiTwotoneEdit } from "react-icons/ai";
import { TiTrash } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";

type BlogItemProps = Blog;

const BlogItem = (props: BlogItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const comments = useSelector((state: RootState) => state.blog.comments);

  const commentsCount = comments.filter(
    (comment) => comment.blog?.id === props.id,
  ).length;

  const dispatch = useDispatch<AppDispatch>();

  const inViewPage = pathname === `/blog/${props.id}`;

  return (
    <div className="border p-4  space-y-2 cursor-pointer">
      <div className="border-b pb-2  flex justify-between ">
        <div className="max-w-xs">
          <h3 className="text-lg font-bold">
            {!inViewPage && props.title.length > 20
              ? props.title.substring(0, 30) + "..."
              : props.title}
          </h3>
          <p className="text-sm ">
            @{props?.users?.username}{" "}
            <span className="text-xs text-neutral-500">
              {moment(props?.created_at).fromNow()}
            </span>
          </p>
        </div>

        <div>
          {currentUser?.uid === props.uid && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex space-x-2 mb-1 justify-end"
            >
              <button
                onClick={() =>
                  dispatch(
                    setSelectedPost({
                      purpose: "delete",
                      active: true,
                      id: props.id!,
                    }),
                  )
                }
              >
                <TiTrash className="text-xl" />
              </button>
              <button
                onClick={() =>
                  dispatch(
                    setSelectedPost({
                      purpose: "edit",
                      active: true,
                      id: props.id!,
                    }),
                  )
                }
              >
                <AiTwotoneEdit />
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        onClick={() => router.push(`/blog/${props.id}`)}
        className="w-full h-full cursor-pointer"
      >
        {props.type === "text" ? (
          <p className="text-base font-medium">{props?.content}</p>
        ) : props.type === "image" ? (
          <Image
            src={props.image_url as string}
            alt={props.title}
            width={100}
            height={100}
            className={`w-full ${!inViewPage ? "max-h-56 object-cover" : "h-full object-contain"}`}
          />
        ) : null}
      </div>

      <div
        onClick={() => router.push(`/blog/${props.id}`)}
        className="flex gap-x-1 justify-end items-center"
      >
        {commentsCount}
        <p className="text-sm border-r border-neutral-300 pr-2 underline">
          comments
        </p>
      </div>
    </div>
  );
};

export default BlogItem;
