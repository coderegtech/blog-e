"use client";

import { setSelectedComment } from "@/features/blog/blogSlice";
import {
  deleteCommentAsync,
  editCommentAsync,
} from "@/features/blog/blogThunks";
import { useUpload } from "@/hooks/use-upload";
import { AppDispatch, RootState } from "@/store";
import { Comment, CommentPayload } from "@/types/comment.types";
import moment from "moment";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { AiOutlineSend, AiTwotoneEdit } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FcGallery } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { LuLoaderCircle } from "react-icons/lu";
import { TiTrash } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./ui/modal";

type CommentListProps = {
  comments: Comment[];
};

const CommentList = ({ comments }: CommentListProps) => {
  const [activeOptions, setActiveOptions] = useState<string | null>(null);
  const [editComment, setEditComment] = useState<Comment | null>(null);

  const toggleOptions = (commentId: string) => {
    setActiveOptions((prev) => (prev === commentId ? null : commentId));
  };

  return (
    <div
      onClick={() => {
        setActiveOptions(null);
      }}
      className="py-4"
    >
      <DeleteCommentModal />

      {comments.length === 0 ? (
        <p className="text-center text-neutral-500">No comments yet.</p>
      ) : (
        <ul className="space-y-2">
          {comments?.map((comment, index: number) => {
            return (
              <li key={index} className="border p-4 relative">
                <p className="text-sm">@{comment.user?.username}</p>

                {editComment?.id === comment.id ? (
                  <EditCommentForm
                    comment={comment}
                    close={() => setEditComment(null)}
                  />
                ) : (
                  <>
                    <div className="flex flex-col">
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
                  </>
                )}

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-4 right-4 flex flex-col items-end space-y-2"
                >
                  <span className="" onClick={() => toggleOptions(comment.id)}>
                    <BsThreeDots />
                  </span>

                  {activeOptions === comment.id && (
                    <OptionButton
                      id={comment.id}
                      setEditComment={() => setEditComment(comment)}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const EditCommentForm = ({
  comment,
  close,
}: {
  comment: Comment;
  close: () => void;
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [content, setContent] = useState(comment.content || "");
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
    setImagePreview(comment.image_url || null);
  }, [comment.image_url, setImagePreview]);

  const handleEditComment = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const imageUrl = await uploadImageFile();

      const updatedComment: CommentPayload = {
        id: comment.id,
        content: content,
        image_url: imageUrl || "",
      };

      await dispatch(editCommentAsync(updatedComment));
    } catch (error) {
      console.log(error);
    } finally {
      close();
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleEditComment}
      className=" flex flex-col space-y-2 py-2 relative"
    >
      <div className="p-2 h-full border relative">
        <textarea
          rows={2}
          placeholder="Add a comment..."
          className="text-black h-full w-full placeholder:text-neutral-500 focus:outline-none border-none resize-x-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        {/* preview image  */}
        {imagePreview && (
          <div className="flex items-start gap-x-2">
            <span onClick={() => setImagePreview(null)}>
              <IoClose className="text-xl hover:text-red-500 cursor-pointer" />
            </span>
            <Image
              src={imagePreview}
              alt={comment.content || "comment image"}
              width={100}
              height={100}
              className="w-24 h-24 object-contain"
            />
          </div>
        )}

        {!imagePreview && (
          <div
            onClick={() => imageRef.current?.click()}
            className="w-fit pt-2 cursor-pointer"
          >
            <input
              ref={imageRef}
              onChange={handleImageOnChange}
              type="file"
              name="image"
              accept="image/png, image/jpeg, image/jpg"
              hidden
            />
            <FcGallery className="text-2xl text-black" />
          </div>
        )}
      </div>

      <div className="w-full flex justify-between items-center">
        <span
          onClick={close}
          className="text-sm hover:underline cursor-pointer"
        >
          Cancel
        </span>
        <button
          type="submit"
          className=" px-4 h-10 bg-orange-500 text-white rounded-md"
          disabled={submitting}
        >
          {submitting ? (
            <LuLoaderCircle className="text-xl animate-spin text-white" />
          ) : (
            <AiOutlineSend className="text-md" />
          )}
        </button>
      </div>
    </form>
  );
};

const DeleteCommentModal = () => {
  const [loading, setLoading] = useState(false);

  const { status, modal } = useSelector((state: RootState) => state.blog);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteComment = async (commentId: string) => {
    setLoading(true);
    try {
      await dispatch(deleteCommentAsync(commentId));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={modal.purpose === "delete" && modal.active}>
      <h2 className="text-lg font-bold">Confirm Deletion</h2>
      <p>Do you want to delete this comment?</p>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => handleDeleteComment(modal.id!)}
          className="bg-red-500 text-white px-4 py-2 mr-2"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
        <button
          onClick={() =>
            dispatch(
              setSelectedComment({ purpose: "delete", active: false, id: "" }),
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

const OptionButton = ({
  id,
  setEditComment,
}: {
  id: string;
  setEditComment: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className=" bg-white shadow-md  z-10">
      <span
        onClick={() =>
          dispatch(
            setSelectedComment({
              purpose: "delete",
              active: true,
              id: id,
            }),
          )
        }
        className="flex gap-x-2 items-center cursor-pointer hover:bg-neutral-100 p-2"
      >
        <TiTrash className="text-xl" />
        <p className="text-sm">Delete</p>
      </span>

      <span
        onClick={() => setEditComment()}
        className="flex gap-x-2 items-center cursor-pointer hover:bg-neutral-100 p-2"
      >
        <AiTwotoneEdit />
        <p className="text-sm">Edit</p>
      </span>
    </div>
  );
};

export default CommentList;
