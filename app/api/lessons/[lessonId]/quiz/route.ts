import { mockQuizzesByLessonId } from "@/features/courses/constants/mock-data";
import { Quiz } from "@/features/courses/models/types";
import { NextResponse } from "next/server";


export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lessonId: string }> },
) {
  await new Promise((r) => setTimeout(r, 250));

  const { lessonId } = await params;

  const quiz = mockQuizzesByLessonId[lessonId];

  if (!quiz) {
    return NextResponse.json(
      { error: `No quiz found for lesson "${lessonId}".` },
      { status: 404 },
    );
  }

  // Never send correctOptionId to the client.
  const publicQuiz: Quiz = {
    lessonId: quiz.lessonId,
    durationSeconds: quiz.durationSeconds,
    questions: quiz.questions.map(({ id, question, options }) => ({
      id,
      question,
      options,
    })),
  };

  return NextResponse.json(publicQuiz);
}
