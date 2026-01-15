import { Blog } from "@/types";
import { supabase } from ".";

export const createBlog = async (blog: Blog): Promise<Blog> => {
  try {
    const newPost = {
      uid: blog.uid,
      title: blog.title,
      content: blog.content,
    };

    const { data, error } = await supabase
      .from("blogs")
      .insert(newPost)
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

export const getBlogs = async (): Promise<Blog[]> => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select()
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
    const { data, error } = await supabase
      .from("blogs")
      .update({ ...blog })
      .eq("id", blog.id)
      .select();

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
    const { data, error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
      throw Error(error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBlogById = async (id: string) => {
  try {
    const { data, error } = await supabase.from("blogs").select().eq("id", id);

    if (error) {
      throw Error(error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserBlogs = async (uid: string) => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select()
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
