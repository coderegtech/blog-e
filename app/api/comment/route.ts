import { addComment, getSession } from "@/lib/supabase";
import { CommentPayload } from "@/types/comment.types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      image_url,
      content,
      blog: blog_id,
      user: user_id,
    }: CommentPayload = await request.json();

    if (!image_url && !content) {
      return NextResponse.json({ messages: "Invalid required fields." });
    }

    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({
        status: 401,
        messages: "Unauthorized access.",
      });
    }

    const responseData = await addComment({
      image_url,
      content,
      blog: blog_id,
      user: user_id,
    });

    return NextResponse.json({
      status: 201,
      messages: "Comment added!",
      data: responseData,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
