import { useQuery } from "@tanstack/react-query";

import { Quiz } from "@/features/courses/models/types";

export const useGetQuiz = (lessonId: string, enabled: boolean) => {
  return useQuery<Quiz>({
    queryKey: ["quiz", lessonId],
    queryFn: async () => {
      const res = await fetch(`/api/lessons/${lessonId}/quiz`);
      if (!res.ok) throw new Error("Failed to load quiz");
      return res.json();
    },
    enabled,
  });
};
