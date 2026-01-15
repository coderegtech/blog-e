"use client";
import RecentBlogs from "@/components/RecentBlogs";
import { Card } from "@/components/ui/card";
import { logout } from "@/features/auth/authSlice";
import { logoutAsync } from "@/features/auth/authThunks";
import { getUserBlogsAsync } from "@/features/blog/blogThunks";
import { AppDispatch, RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { LuLoaderCircle } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

const AccountPage: React.FC = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const { status, posts } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (!user) return;
      try {
        await dispatch(getUserBlogsAsync(user?.uid));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyPosts();
  }, [dispatch, user]);

  const handleLogout = async () => {
    dispatch(logoutAsync());
    dispatch(logout());
    alert("User logged out!");
    router.push("/login");
  };

  return (
    <div className=" md:p-4 bg-white flex justify-center md:items-center relative">
      <Card>
        <header className="w-full flex justify-between items-center p-2 pb-4 border-b-2">
          <div className="flex items-center gap-2 ">
            <button onClick={() => router.back()}>
              <BsArrowLeft className="text-xl" />
            </button>
            <h2 className="text-2xl font-semibold">My Account</h2>
          </div>

          <div className="flex items-center gap-x-2">
            <button
              className="bg-white text-black border-2 px-4 py-1"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          </div>
        </header>

        <div className="py-4 border-b">
          <h2 className="text-3xl font-bold">{user?.username}</h2>
          <p className="text-base">{user?.email}</p>
        </div>

        <div className="h-[calc(100vh-150px)] sm:h-[calc(100vh-50px)] overflow-y-auto">
          {/* <form
            onSubmit={() => {}}
            className="flex flex-col space-y-2 py-2 relative"
          >
            <input
              type="text"
              className="text-black placeholder:text-neutral-500 p-2 border"
              placeholder="Title"
              required
            />

            <textarea
              className="text-black placeholder:text-neutral-500 p-2 border resize-x-none "
              rows={3}
              placeholder="What's on your mind?"
            ></textarea>

            <button
              type="submit"
              className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 self-end cursor-pointer"
            >
              <AiOutlineSend className="text-md" />
              <p>POST</p>
            </button>
          </form> */}

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2 ">My Posts</h2>
            {status === "loading" ? (
              <div className="w-full h-full py-10 flex items-center justify-center text-center">
                <LuLoaderCircle className="text-2xl animate-spin " />
                <p>loading...</p>
              </div>
            ) : (
              <RecentBlogs posts={posts} />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccountPage;
