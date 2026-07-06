export type Lesson = {
  id: string;
  title: string;
  locked: boolean;
  type: "video" | "pdf" | "quiz";
  fileUrl?: string;
  questionCount?: number;
  durationMinutes?: number;
};

export type Module = {
  id: string;
  weekLabel: string;
  description: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  videoUrl: string;
  posterUrl: string;
  socials: { label: string; href: string }[];
  materials: {
    durationWeeks: number;
    lessons: number;
    enrolled: number;
    language: string;
  };
  progressPercent: number;
  learnerInitial: string;
};

export type Comment = {
  id: string;
  authorName: string;
  avatarUrl: string;
  date: string;
  body: string;
};

export type QuizOption = {
  id: string;
  label: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  correctOptionId?: string;
  options: QuizOption[];
};

export type Quiz = {
  lessonId: string;
  durationSeconds: number;
  questions: QuizQuestion[];
};

export type QuizWithAnswers = Quiz & {
  questions: (QuizQuestion & { correctOptionId: string })[];
};

export type QuizSubmitResult = {
  score: number;
  correctCount: number;
  total: number;
  results: { questionId: string; correct: boolean; correctOptionId: string }[];
};

export type LeaderboardEntry = {
  id: string;
  rank: number;
  studentName: string;
  avatarUrl: string;
  score: number;
  isCurrentUser?: boolean;
};

export type Leaderboard = {
  courseTitle: string;
  message: string;
  entries: LeaderboardEntry[];
};