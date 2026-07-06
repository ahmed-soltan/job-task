import { mockQuizzesByLessonId } from "@/features/courses/constants/mock-data";
import { NextResponse } from "next/server";

export const POST = async (
  request: Request,
  { params }: { params: Promise<{ lessonId: string }> },
) => {
  const { lessonId } = await params;
  const { answers } = await request.json();

    const quiz = mockQuizzesByLessonId[lessonId];

    if (!quiz) {
        return NextResponse.json(
            { error: `No quiz found for lesson "${lessonId}".` },
            { status: 404 },
        );
    }

    // Check if the answers are correct
    const correctAnswers = quiz.questions.reduce((acc, question) => {
        acc[question.id] = question.correctOptionId!;
        return acc;
    }, {} as Record<string, string>);

    let correctCount = 0;
    const results = quiz.questions.map((question) => {
        const isCorrect = answers[question.id] === correctAnswers[question.id];
        if (isCorrect) correctCount++;
        return {
            questionId: question.id,
            correct: isCorrect,
            correctOptionId: correctAnswers[question.id],
        };
    }
    );

    const score = (correctCount / quiz.questions.length) * 100;
    return NextResponse.json({ score, results }); 

}
