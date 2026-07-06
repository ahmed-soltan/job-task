"use client";

import { Skeleton } from "@/components/ui/skeleton";

import { useGetCourse } from "../services/use-get-course";

export const CourseHeader = () => {
  const { data, isLoading } = useGetCourse();

  if(isLoading){
    return <Skeleton className="h-8 w-1/2 rounded-md" />
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-semibold">{data?.title}</h1>
    </div>
  );
};
