import { uploadImage } from "@/lib/utils";
import { useRef, useState } from "react";

export const useUpload = () => {
  const [imageFile, setUploadImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>("");
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleImageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    setUploadImage(file);
  };

  const uploadImageFile = async (): Promise<string | null> => {
    try {
      let imageUrl: string | null = null;
      if (imageFile) {
        const res = await uploadImage(imageFile);
        imageUrl = res.imageUrl;
      }

      return imageUrl;
    } catch (error) {
      console.error("Image upload failed: ", error);
      return null;
    }
  };

  return {
    imageFile,
    imagePreview,
    imageRef,
    setImagePreview,
    uploadImageFile,
    handleImageOnChange,
  };
};
