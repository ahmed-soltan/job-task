import { useQuery } from "@tanstack/react-query";

import { Course } from "@/features/courses/models/types";

export const useGetCourse = () => {
  const query = useQuery<Course>({
    queryKey: ["course"],
    queryFn: async () => {
      const res = await fetch("/api/course");
      if (!res.ok) {
        throw new Error("Failed to fetch course");
      }
      return res.json();
    },
  });

  return {
    isLoading: query.isLoading,
    data: query.data,
  };
};
