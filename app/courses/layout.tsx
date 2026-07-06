import type { Metadata } from "next";

import { BreadcrumbsSection } from "@/components/breadcrumbs-section";
import { CourseHeader } from "@/features/courses/components/course-header";


export const metadata: Metadata = {
  title: "Starting SEO as your Home | Course Player",
  description: "Watch lessons, take quizzes, and track your progress.",
};

export default function CoursesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col items-start justify-start gap-3 bg-neutral-100">
      <div className="flex flex-col gap-6 bg-blue-50/70 p-4 lg:p-8 w-full">
        <BreadcrumbsSection />
        <CourseHeader />
      </div>
      <main className="px-4 lg:px-8 pb-8 w-full">{children}</main>
    </main>
  );
}
