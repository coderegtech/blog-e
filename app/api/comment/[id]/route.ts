import { getComments, getSession } from "@/lib/supabase";
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
