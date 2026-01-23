"use client";

import { logout, setCurrentUser, setUserId } from "@/features/auth/authSlice";
import { getUserById, supabaseClient } from "@/lib/supabase";
import { AppDispatch } from "@/store";
import { AuthChangeEvent } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const { data } = supabaseClient.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session) => {
        const userId = session?.user.id as string;

        if (!userId) return;

        const currentUser = await getUserById(userId);
        dispatch(setUserId(userId));
        dispatch(setCurrentUser(currentUser));

        if (_event === "SIGNED_OUT") {
          // redirect back to login page
          dispatch(logout());
          router.push("/login");
        }
      },
    );

    return () => {
      data.subscription.unsubscribe();
    };
  }, [dispatch, router]);

  return children;
};
