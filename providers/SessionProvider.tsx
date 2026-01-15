"use client";

import {
  logout,
  setCurrentUser,
  setSession,
  setUserId,
} from "@/features/auth/authSlice";
import { getUserById, supabase } from "@/lib/supabase";
import { AppDispatch } from "@/store";
import { AuthChangeEvent } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session) => {
        console.log("Auth session: ", session);

        dispatch(setSession(session));

        if (session?.user) {
          const userId = session?.user.id as string;
          const currentUser = await getUserById(userId);
          dispatch(setUserId(userId));
          dispatch(setCurrentUser(currentUser));

          router.push("/blog/");
          return;
        }

        if (_event === "SIGNED_OUT") {
          // redirect back to login page
          dispatch(logout());
          router.push("/login");
        }
      }
    );

    return () => {
      data.subscription.unsubscribe();
    };
  }, [dispatch, router]);

  return <>{children}</>;
};
