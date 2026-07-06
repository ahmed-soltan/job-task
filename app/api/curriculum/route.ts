import { NextResponse } from "next/server";
import { mockModules } from "@/features/courses/constants/mock-data";

// GET /api/curriculum
// Mock endpoint standing in for e.g. GET /courses/:id/curriculum on a real backend.
export async function GET() {
  await new Promise((r) => setTimeout(r, 250));
  return NextResponse.json(mockModules);
}
