"use client";

import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetCourse } from "../services/use-get-course";

export const CourseProgress = () => {
  const { data, isLoading } = useGetCourse();
  const progress = data?.progressPercent ?? 0;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <Skeleton className="h-3 w-full rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative w-full pt-9 pb-7">
        <div
          className="absolute -top-5 z-10 flex -translate-x-1/2 flex-col items-center gap-1"
          style={{ left: `${progress}%` }}
        >
          <div className="relative rounded-full size-9 text-center flex items-center justify-center text-[9px] font-semibold uppercase border-2 border-gray-300">
            you
            <div className="absolute top-10 size-1 rounded-full bg-gray-300" />
          </div>
        </div>

        <Progress
          value={progress}
          className="h-3 w-full rounded-full"
          aria-label="Course progress"
          aria-valuetext={`${progress}% complete`}
        />
        <div
          className="absolute bottom-2 z-10 flex -translate-x-1/2 flex-col items-center gap-1"
          style={{ left: `${progress}%` }}
        >
          <span className="text-xs font-medium text-gray-600 tabular-nums">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};
