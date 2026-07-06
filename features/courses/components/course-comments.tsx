"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import { Comment } from "@/features/courses/models/types";
import { useGetCourseComments } from "../services/use-get-coures-comments";

export const CourseComments = () => {
  const { isLoading, data, isFetching } = useGetCourseComments();

  console.log(isLoading, isFetching);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 w-full">
        <Skeleton className="h-8 w-40 rounded-md" />
        <div className="flex items-start gap-5 flex-col w-full">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start gap-4 w-full">
              <Skeleton className="size-16 rounded-full" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-start flex-col gap-2">
                  <Skeleton className="h-5 w-36 rounded-md" />
                  <Skeleton className="h-4 w-24 rounded-md" />
                </div>
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-4/5 rounded-md" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start gap-3 w-full">
          <Skeleton className="h-37.5 w-full rounded-md" />
          <Skeleton className="h-16 w-48 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full" id="comments">
      <h1 className="text-3xl font-semibold">Comments</h1>
      <div className="flex items-start gap-5 flex-col w-full max-h-[300px] overflow-auto md:h-full">
        {data?.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
      <AddComment />
    </div>
  );
};

const CommentCard = ({ comment }: { comment: Comment }) => {
  return (
    <div className="flex items-start gap-4 w-full">
      <Avatar className="size-16">
        <AvatarImage src={comment.avatarUrl} alt={comment.authorName} />
        <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-start flex-col gap-1">
          <h3 className="font-semibold text-gray-500">{comment.authorName}</h3>
          <p className="text-sm text-muted-foreground">{comment.date}</p>
        </div>
        <p className="text-muted-foreground">{comment.body}</p>
      </div>
    </div>
  );
};

const AddComment = () => {
  return (
    <div className="flex flex-col items-start gap-3">
      <Textarea
        placeholder="Write a comment..."
        className="w-full h-37.5 bg-white shadow-sm border-none rounded-md"
        rows={5}
      />
      <Button className="w-48 h-16 text-lg" size="lg" variant="success">
        Submit Review <ArrowRight className="size-4" />
      </Button>
    </div>
  );
};
