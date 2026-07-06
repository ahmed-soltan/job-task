// app/api/courses/[courseId]/leaderboard/route.ts
import { NextResponse } from "next/server";
import { mockLeaderboard } from "@/features/courses/constants/mock-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ courseId: string }> },
) {
  await new Promise((r) => setTimeout(r, 250));
  const { courseId } = await params;

  // Single mock course for now — swap for a real per-course lookup later.
  if (!courseId) {
    return NextResponse.json(
      { error: "courseId is required." },
      { status: 400 },
    );
  }

  return NextResponse.json(mockLeaderboard);
}
