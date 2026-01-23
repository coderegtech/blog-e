"use client";
import { removeBlog, setSelectedPost } from "@/features/blog/blogSlice";
import { deleteBlogAsync, editBlogAsync } from "@/features/blog/blogThunks";
import { useUpload } from "@/hooks/use-upload";
import { AppDispatch, RootState } from "@/store";
import { Blog } from "@/types";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { FcGallery } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
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
              setSelectedPost({ purpose: "delete", active: false, id: "" }),
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

  const {
    status,
    modal,
    post: selectedPost,
  } = useSelector((state: RootState) => state.blog);
  const dispatch = useDispatch<AppDispatch>();

  const {
    imageFile,
    imagePreview,
    imageRef,
    setImagePreview,
    uploadImageFile,
    handleImageOnChange,
  } = useUpload();

  useEffect(() => {
    const fetchSelectedPost = async () => {
      if (!selectedPost) return;
      setTitle(selectedPost.title);
      setContent(selectedPost.content);

      if (selectedPost?.image_url) {
        setImagePreview(selectedPost.image_url as string);
      }
    };
    fetchSelectedPost();
  }, [selectedPost]);

  const handleEditPost = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImageFile();

      const updatedPost: Blog = {
        ...selectedPost!,
        image_url: imageUrl || (selectedPost?.image_url as string) || "",
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

        <div className="p-2 h-40 border relative">
          {!imagePreview && (
            <textarea
              rows={3}
              placeholder="What's on your mind?"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="text-black h-full w-full placeholder:text-neutral-500 focus:outline-none border-none resize-x-none"
            ></textarea>
          )}

          {/* preview image  */}
          {imagePreview && (
            <div className="absolute inset-2 ">
              <Image
                src={imagePreview}
                alt={title}
                width={100}
                height={100}
                className="w-full h-full object-contain"
              />

              <span onClick={() => setImagePreview(null)}>
                <IoClose className="absolute top-0 text-2xl hover:text-red-500 cursor-pointer" />
              </span>
            </div>
          )}

          <input
            ref={imageRef}
            onChange={handleImageOnChange}
            type="file"
            name="image"
            accept="image/png, image/jpeg, image/jpg"
            hidden
          />

          {!imagePreview && (
            <div
              onClick={() => imageRef.current?.click()}
              className="absolute bottom-2 left-2  cursor-pointer"
            >
              <FcGallery className="text-2xl text-black" />
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 mr-2"
          >
            {status === "loading" ? "Updating..." : "Update"}
          </button>
          <button
            onClick={() => {
              dispatch(
                setSelectedPost({ purpose: "edit", active: false, id: "" }),
              );

              // clear image preview on close
              setImagePreview(null);
            }}
            className="bg-gray-300 text-black px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
