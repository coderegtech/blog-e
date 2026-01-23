import { createBlog, getBlogs, getSession } from "@/lib/supabase";
import { Blog } from "@/types/blog.types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { uid, image_url, title, content, type }: Blog = await request.json();

    if (!uid || !title) {
      return NextResponse.json({ messages: "Invalid required fields." });
    }

    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({
        status: 401,
        messages: "Unauthorized access.",
      });
    }

    const responseData = await createBlog({
      uid,
      image_url,
      title,
      content,
      type,
    });

    console.log("create blog response: ", responseData);

    return NextResponse.json({
      status: 201,
      messages: "Blog created!",
      data: responseData,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
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
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
