import {
  deleteComment,
  getComments,
  getSession,
  updateComment,
} from "@/lib/supabase";
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

    const comments = await getComments(id);

    console.log("comments: ", comments);

    return NextResponse.json({
      status: 200,
      messages: "",
      data: comments || [],
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { image_url, content } = await request.json();

    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({
        status: 401,
        messages: "Unauthorized access.",
      });
    }

    const updatedComment = await updateComment({
      id,
      image_url,
      content,
    });

    return NextResponse.json({
      status: 200,
      messages: "Comment updated successfully",
      data: updatedComment,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
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

    const comment = await deleteComment(id);

    return NextResponse.json({
      status: 200,
      messages: "Comment deleted successfully",
      data: comment,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
