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
  const [loading, setLoading] = useState(false);
  const { status, modal } = useSelector((state: RootState) => state.blog);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeletePost = async (postId: string) => {
    if (!postId) return;

    setLoading(true);
    try {
      await dispatch(deleteBlogAsync(postId));
      dispatch(removeBlog(postId));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
          {loading ? "Deleting..." : "Delete"}
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
  const [loading, setLoading] = useState(false);
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

      setImagePreview(selectedPost.image_url as string);
    };
    fetchSelectedPost();
  }, [selectedPost, setImagePreview]);

  const handleEditPost = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const imageUrl = await uploadImageFile();

      const updatedPost: Blog = {
        ...selectedPost!,
        image_url: imageUrl || "",
        title,
        content,
      };

      const res = await dispatch(editBlogAsync(updatedPost));

      if (res.type === "blog/editBlogAsync/fulfilled") {
        alert("Post updated successfully!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

        <div className="p-2 h-full border relative">
          <textarea
            rows={3}
            placeholder="What's on your mind?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="text-black h-full w-full placeholder:text-neutral-500 focus:outline-none border-none resize-x-none "
          ></textarea>

          {/* preview image  */}
          {imagePreview && (
            <div className=" flex items-start">
              <span onClick={() => setImagePreview(null)}>
                <IoClose className="text-2xl hover:text-red-500 cursor-pointer" />
              </span>
              <Image
                src={imagePreview}
                alt={title}
                width={100}
                height={100}
                className="w-40 h-40 object-contain"
              />
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
              className="pt-2  cursor-pointer"
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
            {loading ? "Updating..." : "Update"}
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
