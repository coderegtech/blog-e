import { Blog } from "@/types";
import { supabaseClient } from ".";

export const createBlog = async (blog: Blog) => {
  try {
    const newPost = {
      uid: blog.uid,
      image_url: blog.image_url,
      title: blog.title,
      content: blog.content,
      type: blog.type,
    };

    const { data, error } = await supabaseClient.from("blogs").insert(newPost)
      .select(`
        id,
        image_url,
        title,
        content,
        type,
        uid,
        created_at,
        updated_at,
        users (
          uid,
          username
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

export const getBlogs = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("blogs")
      .select(
        `
        id,
        image_url,
        title,
        content,
        type,
        uid,
        created_at,
        updated_at,
        users (
          uid,
          username
        )
        `,
      )
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

export const updateBlog = async (blog: Blog) => {
  try {
    const { data, error } = await supabaseClient
      .from("blogs")
      .update({ ...blog })
      .eq("id", blog.id).select(`
        id,
        image_url,
        title,
        content,
        type,
        uid,
        created_at,
        updated_at,
        users (
          uid,
          username
        )
        `);

    if (error) {
      throw Error(error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const { data, error } = await supabaseClient
      .from("blogs")
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

export const getBlogById = async (id: string) => {
  try {
    const { data, error } = await supabaseClient
      .from("blogs")
      .select(
        `
        id,
        image_url,
        title,
        content,
        type,
        uid,
        created_at,
        updated_at,
        users (
          uid,
          username
        )
        `,
      )
      .eq("id", id);

    if (error) {
      throw Error(error.message);
    }

    return data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserBlogs = async (uid: string) => {
  try {
    const { data, error } = await supabaseClient
      .from("blogs")
      .select(
        `
        id,
        image_url,
        title,
        content,
        type,
        uid,
        created_at,
        updated_at,
        users (
          uid,
          username
        )
        `,
      )
      .eq("uid", uid)
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
