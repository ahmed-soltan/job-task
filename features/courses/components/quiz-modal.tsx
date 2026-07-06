"use client";

import { useEffect, useMemo } from "react";
import { Check, ChevronLeft, Clock } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { useGetQuiz } from "../services/use-get-quiz";
import { useQuizStore } from "../hooks/use-quiz-store";
import { useSubmitQuiz } from "../services/use-submit-quiz";

type QuizModalProps = {
  lessonId: string;
  lessonTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export const QuizModal = ({
  lessonId,
  lessonTitle,
  open,
  onOpenChange,
}: QuizModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="
          flex h-dvh w-screen max-w-none lg:min-w-[50vw]
          items-center justify-center overflow-y-auto
          bg-transparent p-0 sm:p-6
          ring-0
        "
      >
        <DialogTitle className="sr-only">{lessonTitle} quiz</DialogTitle>

        {open && (
          <QuizBody
            key={lessonId}
            lessonId={lessonId}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

type QuizBodyProps = {
  lessonId: string;
  onClose: () => void;
};

function QuizBody({ lessonId, onClose }: QuizBodyProps) {
  const { data: quiz, isLoading } = useGetQuiz(lessonId, true);
  const { mutate: submitQuiz, isPending: isSubmitting } = useSubmitQuiz(lessonId);

  const attempt = useQuizStore((state) => state.attempts[lessonId]);
  const initAttempt = useQuizStore((state) => state.initAttempt);
  const setCurrentIndex = useQuizStore((state) => state.setCurrentIndex);
  const setAnswer = useQuizStore((state) => state.setAnswer);
  const tick = useQuizStore((state) => state.tick);
  const resetAttempt = useQuizStore((state) => state.resetAttempt);

  useEffect(() => {
    if (quiz) initAttempt(lessonId, quiz.durationSeconds);
  }, [quiz, lessonId, initAttempt]);

  const handleSubmit = () => {
    submitQuiz(attempt?.answers ?? {}, {
      onSuccess: () => {
        resetAttempt(lessonId);
        onClose();
      },
    });
  };

  useEffect(() => {
    if (isLoading || !attempt) return;
    const interval = setInterval(() => {
      const current = useQuizStore.getState().attempts[lessonId];
      if (!current) return;
      if (current.secondsLeft <= 1) {
        clearInterval(interval);
        tick(lessonId);
        handleSubmit();
        return;
      }
      tick(lessonId);
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, lessonId, !!attempt]);

  const questions = quiz?.questions ?? [];
  const currentIndex = attempt?.currentIndex ?? 0;
  const answers = attempt?.answers ?? {};
  const secondsLeft = attempt?.secondsLeft ?? quiz?.durationSeconds ?? 0;
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;
    setAnswer(lessonId, currentQuestion.id, optionId);
  };

  return (
    <div
      className="
        flex w-full flex-col gap-6 bg-blue-700 p-5 shadow-2xl
        h-dvh rounded-none
        sm:h-auto sm:max-h-[90vh] sm:w-full sm:max-w-md sm:rounded-[32px]
        md:max-w-3xl
        overflow-y-auto
      "
    >
      <div className="relative flex items-center justify-center">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quiz"
          className="absolute left-0 flex size-8 items-center justify-center rounded-full text-white/90 hover:bg-white/10"
        >
          <ChevronLeft className="size-6" />
        </button>
        <div className="flex items-center gap-1.5 rounded-full bg-yellow-400 px-4 py-1.5 text-sm font-semibold text-blue-900">
          <Clock className="size-4" />
          {formatTime(secondsLeft)}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {isLoading
          ? [1, 2, 3, 4, 5].map((n) => (
              <Skeleton key={n} className="size-8 rounded-full bg-blue-600" />
            ))
          : questions.map((q, idx) => (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(lessonId, idx)}
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition",
                  idx === currentIndex
                    ? "border-white bg-white text-blue-700"
                    : answers[q.id]
                    ? "border-white/70 bg-blue-600 text-white"
                    : "border-white/40 bg-transparent text-white/70 hover:border-white"
                )}
              >
                {idx + 1}
              </button>
            ))}
      </div>

      <div className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-md sm:p-6">
        {isLoading || !currentQuestion ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-5 w-3/4 rounded-md" />
            <Skeleton className="h-14 w-full rounded-md" />
            <Skeleton className="h-14 w-full rounded-md" />
            <Skeleton className="h-14 w-full rounded-md" />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-gray-900">
                {currentIndex + 1}.
              </span>
              <p className="font-medium text-gray-900">
                {currentQuestion.question}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = answers[currentQuestion.id] === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition",
                      isSelected
                        ? "border-blue-700 bg-blue-700 text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center rounded-[4px] border",
                        isSelected ? "border-white bg-white" : "border-gray-300 bg-white"
                      )}
                    >
                      {isSelected && (
                        <Check className="size-3 text-blue-700" strokeWidth={3} />
                      )}
                    </span>
                    {option.label}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(lessonId, Math.max(0, currentIndex - 1))}
          className="rounded-md border border-white/30 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-sm text-white/80">
          {answeredCount}/{questions.length} answered
        </span>
        {isLastQuestion ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-blue-900 disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              setCurrentIndex(lessonId, Math.min(questions.length - 1, currentIndex + 1))
            }
            className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-blue-900"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}