"use client";

import Link from "next/link";
import { useState } from "react";
import { FileText, Lock } from "lucide-react";

import { QuizModal } from "./quiz-modal";
import { PdfModal } from "./pdf-modal";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Module, Lesson } from "@/features/courses/models/types";
import { useGetCourseModules } from "../services/use-get-course-modules";

export const CourseModules = () => {
  const { data, isLoading } = useGetCourseModules();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-start flex-col gap-10 w-full">
        {[1, 2].map((module) => (
          <div
            key={module}
            className="flex flex-col gap-6 p-4 py-8 border w-full"
          >
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-44 rounded-md" />
              <Skeleton className="h-4 w-full max-w-130 rounded-md" />
            </div>
            <div className="flex flex-col gap-2 border-y py-2">
              {[1, 2, 3].map((lesson) => (
                <div
                  key={lesson}
                  className="flex items-center gap-2 justify-between w-full border-b py-3"
                >
                  <div className="flex items-center gap-2 w-full">
                    <Skeleton className="size-4 rounded-sm" />
                    <Skeleton className="h-4 w-2/3 rounded-md" />
                  </div>
                  <Skeleton className="h-4 w-20 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const defaultValue = data?.[0]?.id ? [data[0].id] : [];

  return (
    <>
      <Accordion
        multiple
        id="curriculum"
        className="flex items-start flex-col gap-10 w-full"
        defaultValue={defaultValue}
      >
        {data?.map((module: Module) => (
          <AccordionItem
            key={module.id}
            value={module.id}
            className="border w-full p-3"
          >
            <AccordionTrigger className="w-full hover:no-underline border-b py-3">
              <div className="flex flex-col gap-2 w-full text-left">
                <h2 className="text-lg font-semibold">{module.weekLabel}</h2>
                <p className="text-gray-600 text-md">{module.description}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 py-2">
                {module.lessons.map((lesson) => {
                  if (lesson.locked) {
                    return (
                      <div
                        key={lesson.id}
                        className="flex items-center gap-2 justify-between w-full border-b py-3"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="size-4" />
                          <span className="text-gray-500">{lesson.title}</span>
                        </div>
                        <Lock className="size-4" />
                      </div>
                    );
                  }

                  if (lesson.type === "video") {
                    return (
                      <Link
                        href={`/courses/lesson/${lesson.id}`}
                        key={lesson.id}
                        className="flex items-center gap-2 justify-between w-full border-b py-3"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="size-4" />
                          <span className="text-gray-500">{lesson.title}</span>
                        </div>
                        <span className="text-green-500">Unlocked</span>
                      </Link>
                    );
                  }

                  return (
                    <button
                      type="button"
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      className="flex items-center gap-2 justify-between w-full border-b py-3 text-left"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="size-4" />
                        <span className="text-gray-500">{lesson.title}</span>
                      </div>
                      {lesson.type === "quiz" ? (
                        <div className="flex items-center gap-2">
                          <span className="bg-success/10 text-success uppercase p-1 text-xs md:text-sm">{lesson.questionCount} questions</span>
                          <span className="bg-destructive/10 text-destructive uppercase p-1 text-xs md:text-sm">{lesson.durationMinutes} minutes</span>
                        </div>
                      ): (

                        <span className="text-green-500">Unlocked</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <QuizModal
        lessonId={activeLesson?.id ?? ""}
        lessonTitle={activeLesson?.title ?? ""}
        open={activeLesson?.type === "quiz"}
        onOpenChange={(open) => !open && setActiveLesson(null)}
      />

      <PdfModal
        lessonTitle={activeLesson?.title ?? ""}
        fileUrl={activeLesson?.fileUrl ?? ""}
        open={activeLesson?.type === "pdf"}
        onOpenChange={(open) => !open && setActiveLesson(null)}
      />
    </>
  );
};
