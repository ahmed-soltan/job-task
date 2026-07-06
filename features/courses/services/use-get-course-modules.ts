import { useQuery } from "@tanstack/react-query";

import { Module } from "@/features/courses/models/types";

export const useGetCourseModules = () => {
  const query = useQuery<Module[]>({
    queryKey: ["modules"],
    queryFn: async () => {
      const res = await fetch("/api/curriculum");
      if (!res.ok) {
        throw new Error("Failed to fetch modules");
      }
      return res.json();
    },
  });

  return {
    isLoading: query.isLoading,
    data: query.data,
  };
};
