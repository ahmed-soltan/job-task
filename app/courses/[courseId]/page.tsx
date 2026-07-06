"use client";

import Link from "next/link";
import {
  CircleQuestionMark,
  LibraryBig,
  MessageCircleMore,
  Podium,
} from "lucide-react";

import { VideoPlayer } from "@/features/courses/components/video-player";
import { CourseModules } from "@/features/courses/components/course-modules";
import { CourseComments } from "@/features/courses/components/course-comments";
import { CourseMaterial } from "@/features/courses/components/course-material";
import { CourseProgress } from "@/features/courses/components/course-progress";

import { useIsMobile } from "@/hooks/use-mobile";
import { LeaderboardModal } from "@/features/courses/components/leaderboard-modal";
import { useState } from "react";
import { useCourseId } from "@/features/courses/hooks/use-course-id";

const courseActions = [
  { href: "#curriculum", icon: LibraryBig, label: "Curriculum" },
  { href: "#comments", icon: MessageCircleMore, label: "Comments" },
  { href: "#", icon: CircleQuestionMark, label: "Help" },
  { icon: Podium, label: "Leaderboard" },
];

const CourseActions = ({
  onOpenLeaderboard,
}: {
  onOpenLeaderboard: () => void;
}) => {
  return (
    <div className="flex items-center gap-3">
      {courseActions.map(({ href, icon: Icon, label }) =>
        href ? (
          <Link
            key={label}
            href={href}
            aria-label={label}
            className="rounded-full p-2 border-2 text-center size-12 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <Icon className="size-5 text-gray-500" />
          </Link>
        ) : (
          <button
            key={label}
            type="button"
            onClick={onOpenLeaderboard}
            aria-label={label}
            className="rounded-full p-2 border-2 text-center size-12 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <Icon className="size-5 text-gray-500" />
          </button>
        ),
      )}
    </div>
  );
};

const CoursesPage = () => {
  const isMobile = useIsMobile();
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const courseId = useCourseId();

  return (
    <div className="flex flex-col gap-4 w-full bg-neutral-100 min-h-full">
      {isMobile ? (
        <div className="flex w-full flex-col gap-8">
          <div className="sticky top-1 z-30 bg-neutral-100 pb-2">
            <VideoPlayer />
          </div>

          <CourseActions onOpenLeaderboard={()=>setLeaderboardOpen(true)} />

          <CourseMaterial />
          <CourseProgress />
          <CourseModules />
          <CourseComments />
        </div>
      ) : (
        <div className="grid w-full grid-cols-5 lg:gap-18">
          <div className="col-span-1 lg:col-span-3 flex w-full min-w-0 flex-col items-stretch gap-8">
            <VideoPlayer />
            <CourseActions onOpenLeaderboard={()=>setLeaderboardOpen(true)} />
            <CourseMaterial />
            <CourseComments />
          </div>
          <div className="col-span-1 lg:col-span-2 flex w-full min-w-0 flex-col items-stretch gap-10">
            <h1 className="text-3xl font-semibold">Topics For This Course</h1>
            <CourseProgress />
            <CourseModules />
          </div>
        </div>
      )}
      <LeaderboardModal
        courseId={courseId}
        open={leaderboardOpen}
        onOpenChange={setLeaderboardOpen}
      />
    </div>
  );
};

export default CoursesPage;
