import { CommentPayload } from "@/types/comment.types";
import { supabaseClient } from ".";

export const addComment = async (comment: CommentPayload) => {
  try {
    const { data, error } = await supabaseClient
      .from("comments")
      .insert(comment).select(`
            id,
            image_url,
            content,
            created_at,
            user (
                uid,
                username
            ),
            blog (
                  id
                )
            `);

    if (error) {
      throw Error(error.message);
    }

    return data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getComments = async (blogId: string) => {
  try {
    const { data, error } = await supabaseClient
      .from("comments")
      .select(
        `
            id,
            image_url,
            content,
            created_at,
            user (
                uid,
                username
            ),
            blog (
                  id
            )
            `,
      )
      .eq("blog", blogId)
      .order("created_at", { ascending: false });

    if (error) {
      throw Error(error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateComment = async (comment: CommentPayload) => {
  try {
    const { data, error } = await supabaseClient
      .from("comments")
      .update({ ...comment })
      .eq("id", comment.id).select(`
            id,
            image_url,
            content,
            created_at,
            user (
                uid,
                username
            ),
            blog (
                  id
            )
            `);

    if (error) {
      throw Error(error.message);
    }

    return data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteComment = async (id: string) => {
  try {
    const { data, error } = await supabaseClient
      .from("comments")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      throw Error(error.message);
    }

    return data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
