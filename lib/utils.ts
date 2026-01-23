import { supabaseClient } from "./supabase";

export const uploadImage = async (file: File) => {
  try {
    const folder = "uploads";
    const STORAGE_BUCKET = "blog_storage";

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabaseClient.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file);

    if (error) {
      throw Error(error.message);
    }

    const {
      data: { publicUrl },
    } = supabaseClient.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);

    console.log("image: ", publicUrl);

    return { imageUrl: publicUrl };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
