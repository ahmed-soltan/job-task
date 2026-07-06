import { create } from "zustand";

const DEFAULT_DURATION_SECONDS = 10 * 60;

type QuizAttempt = {
  currentIndex: number;
  answers: Record<string, string>; // questionId -> optionId
  secondsLeft: number;
};

type QuizStore = {
  attempts: Record<string, QuizAttempt>; // lessonId -> attempt
  initAttempt: (lessonId: string, durationSeconds?: number) => void;
  setCurrentIndex: (lessonId: string, index: number) => void;
  setAnswer: (lessonId: string, questionId: string, optionId: string) => void;
  tick: (lessonId: string) => void;
  resetAttempt: (lessonId: string) => void;
};

export const useQuizStore = create<QuizStore>((set, get) => ({
  attempts: {},

  initAttempt: (lessonId, durationSeconds = DEFAULT_DURATION_SECONDS) => {
    if (get().attempts[lessonId]) return;
    set((state) => ({
      attempts: {
        ...state.attempts,
        [lessonId]: {
          currentIndex: 0,
          answers: {},
          secondsLeft: durationSeconds,
        },
      },
    }));
  },

  setCurrentIndex: (lessonId, index) =>
    set((state) => {
      const attempt = state.attempts[lessonId];
      if (!attempt) return state;
      return {
        attempts: {
          ...state.attempts,
          [lessonId]: { ...attempt, currentIndex: index },
        },
      };
    }),

  setAnswer: (lessonId, questionId, optionId) =>
    set((state) => {
      const attempt = state.attempts[lessonId];
      if (!attempt) return state;
      return {
        attempts: {
          ...state.attempts,
          [lessonId]: {
            ...attempt,
            answers: { ...attempt.answers, [questionId]: optionId },
          },
        },
      };
    }),

  tick: (lessonId) =>
    set((state) => {
      const attempt = state.attempts[lessonId];
      if (!attempt) return state;
      return {
        attempts: {
          ...state.attempts,
          [lessonId]: {
            ...attempt,
            secondsLeft: Math.max(0, attempt.secondsLeft - 1),
          },
        },
      };
    }),

  resetAttempt: (lessonId) =>
    set((state) => {
      const { [lessonId]: _removed, ...rest } = state.attempts;
      return { attempts: rest };
    }),
}));
