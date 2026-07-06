import { NextResponse } from "next/server";
import { mockCourse } from "@/features/courses/constants/mock-data";

// GET /api/course
// Mock endpoint standing in for e.g. GET /courses/:id on a real backend.
export async function GET() {
  await new Promise((r) => setTimeout(r, 250));
  return NextResponse.json(mockCourse);
}
