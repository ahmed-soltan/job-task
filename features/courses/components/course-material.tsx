"use client";

import { Clock3, Globe, LibraryBig, UserPen } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

import { useGetCourse } from "../services/use-get-course";

export const CourseMaterial = () => {
  const { data, isLoading } = useGetCourse();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 w-full">
        <Skeleton className="h-8 w-52 rounded-md" />
        <div className="bg-white rounded-sm p-5 flex items-center justify-between w-full gap-5 flex-wrap shadow-md">
          <div className="flex flex-col gap-2 w-full max-w-112.5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between w-full border-b py-3"
              >
                <Skeleton className="h-5 w-32 rounded-md" />
                <Skeleton className="h-5 w-28 rounded-md" />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 w-full max-w-112.5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between w-full border-b py-3"
              >
                <Skeleton className="h-5 w-32 rounded-md" />
                <Skeleton className="h-5 w-28 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <h1 className="text-3xl font-semibold">Course Material</h1>
      <div className="bg-white rounded-sm p-5 flex items-center justify-between w-full gap-5 flex-wrap shadow-md">
        <div className="flex flex-col gap-2 w-full max-w-112.5">
          <div className="flex items-center justify-between w-full border-b py-3">
            <h2 className="text-md  text-gray-600 flex items-center gap-2">
              <Clock3 className="size-5" /> Duration:
            </h2>
            <h2 className="text-md  text-gray-800 font-semibold">
              {data?.materials.durationWeeks} Weeks
            </h2>
          </div>
          <div className="flex items-center justify-between w-full border-b py-3">
            <h2 className="text-md  text-gray-600 flex items-center gap-2">
              <LibraryBig className="size-5" /> Lessons:
            </h2>
            <h2 className="text-md  text-gray-800 font-semibold">
              {data?.materials.lessons}
            </h2>
          </div>
          <div className="flex items-center justify-between w-full border-b py-3">
            <h2 className="text-md  text-gray-600 flex items-center gap-2">
              <UserPen className="size-5" /> Enrolled:
            </h2>
            <h2 className="text-md  text-gray-800 font-semibold">
              {data?.materials.enrolled} Students
            </h2>
          </div>
          <div className="flex items-center justify-between w-full py-3">
            <h2 className="text-md  text-gray-600 flex items-center gap-2">
              <Globe className="size-5" /> Language:
            </h2>
            <h2 className="text-md  text-gray-800 font-semibold">
              {data?.materials.language}
            </h2>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full max-w-112.5">
          <div className="flex items-center justify-between w-full border-b py-3">
            <h2 className="text-md  text-gray-600 flex items-center gap-2">
              <Clock3 className="size-5" /> Duration:
            </h2>
            <h2 className="text-md  text-gray-800 font-semibold">
              {data?.materials.durationWeeks} Weeks
            </h2>
          </div>
          <div className="flex items-center justify-between w-full border-b py-3">
            <h2 className="text-md  text-gray-600 flex items-center gap-2">
              <LibraryBig className="size-5" /> Lessons:
            </h2>
            <h2 className="text-md  text-gray-800 font-semibold">
              {data?.materials.lessons}
            </h2>
          </div>
          <div className="flex items-center justify-between w-full border-b py-3">
            <h2 className="text-md  text-gray-600 flex items-center gap-2">
              <UserPen className="size-5" /> Enrolled:
            </h2>
            <h2 className="text-md  text-gray-800 font-semibold">
              {data?.materials.enrolled} Students
            </h2>
          </div>
          <div className="flex items-center justify-between w-full py-3">
            <h2 className="text-md  text-gray-600 flex items-center gap-2">
              <Globe className="size-5" /> Language:
            </h2>
            <h2 className="text-md  text-gray-800 font-semibold">
              {data?.materials.language}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
