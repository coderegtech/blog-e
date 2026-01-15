import { User } from "@/types";
import { supabase } from ".";

export const createUser = async (user: User) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .upsert({
        uid: user.uid,
        username: user.username,
        email: user.email,
      })
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

export const getUserById = async (id: string) => {
  try {
    const { data, error } = await supabase.from("users").select().eq("uid", id);

    if (error) {
      throw Error(error.message);
    }

    return data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", email)
      .limit(1);

    if (error) {
      throw Error(error.message);
    }

    return data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
