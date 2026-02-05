"use server";

import { LoginPayload, RegisterPayload } from "@/types";
import { createUser, getUserByEmail, supabaseClient } from ".";

export const registerUser = async (auth: RegisterPayload) => {
  try {
    // check if user exist in table
    const isUserExist = await getUserByEmail(auth.email);

    if (isUserExist) {
      throw Error("Email already exist!");
    }

    const { data, error } = await supabaseClient.auth.signUp({
      email: auth.email,
      password: auth.password,
    });

    if (error) {
      throw Error(error.message);
    }

    if (!data.user) {
      throw new Error("User not authenticated");
    }

    await createUser({
      uid: data.user?.id,
      username: auth.username,
      email: auth.email,
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signinUser = async (auth: LoginPayload) => {
  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: auth.email,
      password: auth.password,
    });

    if (error) {
      throw Error(error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      console.log("logout error: ", error);
      throw Error(error.message);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
