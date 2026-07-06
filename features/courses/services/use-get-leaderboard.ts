import { useQuery } from "@tanstack/react-query";

import { Leaderboard } from "@/features/courses/models/types";

export const useGetLeaderboard = (courseId: string, enabled: boolean) => {
  return useQuery<Leaderboard>({
    queryKey: ["leaderboard", courseId],
    queryFn: async () => {
      const res = await fetch(`/api/course/${courseId}/leaderboard`);
      if (!res.ok) throw new Error("Failed to load leaderboard");
      return res.json();
    },
    enabled: enabled && Boolean(courseId),
  });
};
