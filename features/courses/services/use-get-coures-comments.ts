import { useQuery } from "@tanstack/react-query";

import { Comment } from "@/features/courses/models/types";

export const useGetCourseComments = () => {
  const query = useQuery<Comment[]>({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await fetch("/api/comments");
      if (!res.ok) {
        throw new Error("Failed to fetch comments");
      }
      return res.json();
    },
  });

  return {
    isLoading: query.isLoading,
    data: query.data,
    isFetching: query.isFetching,
  };
};
