"use client";

import { Card } from "@/components/ui/card";
import { registerAsync } from "@/features/auth/authThunks";
import { AppDispatch, RootState } from "@/store";
import { RegisterPayload } from "@/types";
import Link from "next/dist/client/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("Please fill up all fields.");
      return;
    }

    try {
      const payload: RegisterPayload = {
        username,
        email,
        password,
      };

      const res = await dispatch(registerAsync(payload));
      console.log("register: ", res);
      if (registerAsync.rejected.match(res)) {
        alert(res.error.message || "Registration failed");
        return;
      }

      alert("User created successful!");
      router.push("/login");
    } catch (error) {
      console.error("register Error: ", error);
    } finally {
      setUsername("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-slate-100">
      <Card className="max-w-sm w-full min-h-96 bg-white">
        <div className="p-4 h-full space-y-10 flex flex-col">
          <h2 className="text-xl md:text-3xl text-black font-medium">
            Register Account
          </h2>

          <form className="space-y-4  flex flex-col" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              className="text-black placeholder:text-neutral-500 p-2 border"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />

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

            <Link href="/login" className="text-black hover:underline">
              Already have an account?
            </Link>
            <button
              disabled={!username || !email || isLoading}
              type="submit"
              className="bg-orange-500 text-white p-2"
            >
              {isLoading ? "Processing..." : "Create Account"}
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
