import { createClient } from "./server";

export const getSession = async () => {
  try {
    const supabaseServer = await createClient();
    const { data, error } = await supabaseServer.auth.getSession();

    if (error) {
      throw Error(error.message);
    }

    return data?.session;
  } catch (error) {
    console.error("Get Session Error: ", error);
  }
};
