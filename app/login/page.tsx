"use client";

import { Card } from "@/components/ui/card";
import { loginAsync } from "@/features/auth/authThunks";
import { AppDispatch, RootState } from "@/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const { isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await dispatch(loginAsync({ email, password }));

      console.log("login res: ", res);
      if (loginAsync.rejected.match(res)) {
        alert(res.error.message || "Login failed");
        return;
      }

      alert("Login successful!");
      router.push("/blog");
    } catch (error) {
      console.error("Login Error: ", error);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-slate-100">
      <Card className="max-w-sm min-h-fit w-full bg-white">
        <div className="p-4 h-full space-y-12 flex flex-col">
          <h2 className="text-xl md:text-3xl text-black font-medium">
            Login Here
          </h2>

          <form className="space-y-4  flex flex-col" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              className="text-black placeholder:text-neutral-500 p-2 border"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
            <input
              type="password"
              name="password"
              className="text-black placeholder:text-neutral-500 p-2 border"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />

            <Link href="/register" className="text-black hover:underline">
              Don't have an account?
            </Link>
            <button
              disabled={!email || !password || isLoading}
              type="submit"
              className="bg-orange-500 text-white p-2"
            >
              {isLoading ? "Processing..." : "Login"}
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
