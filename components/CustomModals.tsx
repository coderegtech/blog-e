"use client";
import { removeBlog, setSelectedPost } from "@/features/blog/blogSlice";
import { deleteBlogAsync, editBlogAsync } from "@/features/blog/blogThunks";
import { AppDispatch, RootState } from "@/store";
import { Blog } from "@/types";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./ui/modal";
export const DeletePostModal = () => {
  const { status, modal } = useSelector((state: RootState) => state.blog);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeletePost = async (postId: string) => {
    try {
      await dispatch(deleteBlogAsync(postId));
      dispatch(removeBlog(postId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={modal.purpose === "delete" && modal.active}>
      <h2 className="text-lg font-bold">Confirm Deletion</h2>
      <p>Do you want to delete this post?</p>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => handleDeletePost(modal.id!)}
          className="bg-red-500 text-white px-4 py-2 mr-2"
        >
          {status === "loading" ? "Deleting..." : "Delete"}
        </button>
        <button
          onClick={() =>
            dispatch(
              setSelectedPost({ purpose: "delete", active: false, id: "" })
            )
          }
          className="bg-gray-300 text-black px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export const EditPostModal = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const { status, modal, posts } = useSelector(
    (state: RootState) => state.blog
  );
  const dispatch = useDispatch<AppDispatch>();
  const selectedPost = posts.find((post: Blog) => post.id === modal.id);

  useEffect(() => {
    const fetchSelectedPost = async () => {
      if (!selectedPost) return;
      setTitle(selectedPost.title);
      setContent(selectedPost.content);
    };
    fetchSelectedPost();
  }, [selectedPost]);

  const handleEditPost = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const updatedPost: Blog = {
        ...selectedPost!,
        title,
        content,
      };

      const res = await dispatch(editBlogAsync(updatedPost));

      if (res.type === "blog/editBlogAsync/fulfilled") {
        alert("Post updated successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal className="" isOpen={modal.purpose === "edit" && modal.active}>
      <h2 className="text-lg font-bold">Edit Post</h2>

      <form
        onSubmit={handleEditPost}
        className="h-full flex flex-col space-y-2 py-2 relative"
      >
        <input
          type="text"
          className="text-black placeholder:text-neutral-500 p-2 border"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />

        <textarea
          className="min-h-40 text-black placeholder:text-neutral-500 p-2 border resize-x-none "
          rows={4}
          placeholder="What's on your mind?"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 mr-2"
          >
            {status === "loading" ? "Updating..." : "Update"}
          </button>
          <button
            onClick={() =>
              dispatch(
                setSelectedPost({ purpose: "edit", active: false, id: "" })
              )
            }
            className="bg-gray-300 text-black px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
