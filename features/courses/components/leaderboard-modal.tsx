"use client";

import Image from "next/image";
import { Trophy } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { useGetLeaderboard } from "../services/use-get-leaderboard";

type LeaderboardModalProps = {
  courseId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const LeaderboardModal = ({
  courseId,
  open,
  onOpenChange,
}: LeaderboardModalProps) => {
  const { data, isLoading } = useGetLeaderboard(courseId, open);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl bg-white p-0 shadow-2xl overflow-hidden max-w-4xl">
        <DialogTitle className="sr-only">Course leaderboard</DialogTitle>

        <div
          className="flex w-full flex-col gap-5 bg-transparent p-5 shadow-2xl overflow-y-auto max-w-3xl"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-40 rounded-md" />
                <Skeleton className="h-6 w-32 rounded-md" />
              </>
            ) : (
              <>
                <span className="text-sm text-gray-600">
                  {data?.courseTitle}
                </span>
                <h2 className="text-xl font-bold text-gray-900">Leaderboard</h2>
              </>
            )}
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-brand-light bg-purple-50 p-4">
            <Trophy className="mt-0.5 size-5 shrink-0 text-purple-500" />
            {isLoading ? (
              <div className="flex w-full flex-col gap-2">
                <Skeleton className="h-3 w-full rounded-md" />
                <Skeleton className="h-3 w-4/5 rounded-md" />
                <Skeleton className="h-3 w-3/5 rounded-md" />
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-gray-700">
                {data?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {isLoading
              ? [1, 2, 3, 4, 5].map((n) => (
                  <Skeleton key={n} className="h-14 w-full rounded-xl" />
                ))
              : data?.entries.map((entry) => (
                  <div
                    key={entry.id}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-3 py-2.5",
                      entry.isCurrentUser
                        ? "border-purple-300 bg-purple-50"
                        : "border-gray-200 bg-white",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                        entry.rank === 1
                          ? "bg-yellow-400 text-yellow-900"
                          : entry.rank === 2
                            ? "bg-gray-300 text-gray-700"
                            : entry.rank === 3
                              ? "bg-amber-600 text-amber-50"
                              : "bg-gray-100 text-gray-500",
                      )}
                    >
                      {entry.rank}
                    </span>
                    <Image
                      src={entry.avatarUrl}
                      alt={entry.studentName}
                      width={8}
                      height={8}
                      className="size-8 shrink-0 rounded-full object-cover"
                    />
                    <span
                      className={cn(
                        "flex-1 truncate text-sm font-medium",
                        entry.isCurrentUser
                          ? "text-purple-700"
                          : "text-gray-800",
                      )}
                    >
                      {entry.studentName}
                    </span>
                    <span className="text-sm font-semibold text-gray-700">
                      {entry.score} pts
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
