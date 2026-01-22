import { getSession, getUserBlogs } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ uid: string }> },
) {
  try {
    const { uid } = await params;

    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json({
        status: 401,
        messages: "Unauthorized access.",
      });
    }

    const blog = await getUserBlogs(uid);

    return NextResponse.json({ status: 200, messages: "", data: blog });
  } catch (error) {
    console.error("[v0] Fetch chat error:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}
