import {
  deleteBlog,
  getBlogById,
  getSession,
  updateBlog,
} from "@/lib/supabase";
import { Blog } from "@/types/blog.types";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({
        status: 401,
        messages: "Unauthorized access.",
      });
    }

    const blog = await getBlogById(id);

    return NextResponse.json({ status: 200, messages: "", data: blog });
  } catch (error) {
    console.error("[v0] Fetch chat error:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({
        status: 401,
        messages: "Unauthorized access.",
      });
    }

    const blog = await deleteBlog(id);

    return NextResponse.json({
      status: 200,
      messages: "Blog deleted successfully",
      data: blog,
    });
  } catch (error) {
    console.error("[v0] Fetch chat error:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { title, content } = await request.json();

    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({
        status: 401,
        messages: "Unauthorized access.",
      });
    }

    const uid = session?.user.id;

    const newData: Blog = {
      id,
      uid,
      title,
      content,
    };

    const blog = await updateBlog(newData);

    return NextResponse.json({
      status: 200,
      messages: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    console.error("[v0] Fetch chat error:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}
