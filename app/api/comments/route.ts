import { NextResponse } from "next/server";
import { mockComments } from "@/features/courses/constants/mock-data";
import { Comment } from "@/features/courses/models/types";

// In-memory store so newly posted comments show up while the server runs.
// Swap this whole module for real database calls later.
let comments: Comment[] = [...mockComments];

// GET /api/comments
export async function GET() {
  await new Promise((r) => setTimeout(r, 200));
  return NextResponse.json(comments);
}

// POST /api/comments  { body: string }
// Mock endpoint standing in for e.g. POST /courses/:id/comments on a real backend.
export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload.body !== "string" || !payload.body.trim()) {
    return NextResponse.json(
      { error: "Comment text is required." },
      { status: 400 },
    );
  }

  const newComment: Comment = {
    id: `c${Date.now()}`,
    authorName: "You",
    avatarUrl: "https://i.pravatar.cc/64?img=68",
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    body: payload.body.trim(),
  };

  comments = [newComment, ...comments];
  await new Promise((r) => setTimeout(r, 200));
  return NextResponse.json(newComment, { status: 201 });
}
