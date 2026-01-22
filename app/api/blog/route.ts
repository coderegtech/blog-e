import { createBlog, getBlogs, getSession } from "@/lib/supabase";
import { Blog } from "@/types/blog.types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { uid, title, content }: Blog = await request.json();

    if (!uid || !title || !content) {
      return NextResponse.json({ messages: "Invalid fields." });
    }

    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({
        status: 401,
        messages: "Unauthorized access.",
      });
    }

    const responseData = await createBlog({ uid, title, content });

    return NextResponse.json({
      status: 201,
      messages: "Blog created!",
      data: responseData,
    });
  } catch (error) {
    console.error("[v0] Fetch chat error:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({
        status: 401,
        messages: "Unauthorized access.",
      });
    }

    const blogs = await getBlogs();

    return NextResponse.json({ status: 200, messages: "", data: blogs });
  } catch (error) {
    console.error("[v0] Fetch chat error:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}
