"use client";
import { setSelectedPost } from "@/features/blog/blogSlice";
import { getUserById } from "@/lib/supabase";
import { AppDispatch, RootState } from "@/store";
import { Blog } from "@/types";
import moment from "moment";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { TiTrash } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";

type BlogItemProps = Blog;

const BlogItem = (props: BlogItemProps) => {
  const pathname = usePathname();
  const [username, setUsername] = useState("");
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const data = await getUserById(props.uid);
        setUsername(data?.username ?? "");
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsername();
  }, [props?.uid]);

  return (
    <div className="border p-4  space-y-2">
      <div className="border-b pb-2  flex justify-between ">
        <div className="max-w-xs">
          <h3 className="text-lg font-semibold">{props?.title}</h3>
          <p className="text-sm ">
            @{username}{" "}
            <span className="text-xs text-neutral-500">
              {moment(props?.created_at).fromNow()}
            </span>
          </p>
        </div>

        <div>
          {currentUser?.uid === props.uid && (
            <div className="flex space-x-2 mb-1 justify-end">
              <button
                onClick={() =>
                  dispatch(
                    setSelectedPost({
                      purpose: "delete",
                      active: true,
                      id: props.id!,
                    })
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
                    })
                  )
                }
              >
                <AiTwotoneEdit />
              </button>
            </div>
          )}
        </div>
      </div>
      <div>{props?.content}</div>

      {pathname === `/blog` || pathname === `/account` ? (
        <Link
          href={`/blog/${props.id}`}
          className="flex justify-end text-sm underline"
        >
          view post
        </Link>
      ) : null}
    </div>
  );
};

export default BlogItem;
