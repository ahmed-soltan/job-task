import { useMutation } from "@tanstack/react-query";

export const useSubmitQuiz = (lessonId: string) => {
  return useMutation({
    mutationFn: async (answers: Record<string, string>) => {
      const res = await fetch(`/api/lessons/${lessonId}/quiz/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) throw new Error("Failed to submit quiz");
      return res.json();
    },
  });
};
