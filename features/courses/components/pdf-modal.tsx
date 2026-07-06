"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type PdfModalProps = {
  lessonTitle: string;
  fileUrl: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const PdfModal = ({
  lessonTitle,
  fileUrl,
  open,
  onOpenChange,
}: PdfModalProps) => {
  if (!open) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-none w-screen lg:min-w-[70vw] h-screen sm:rounded-none p-0 gap-0 overflow-hidden"
      >
        <DialogTitle className="sr-only">{lessonTitle} PDF</DialogTitle>
        <div className="flex h-full w-full flex-col bg-neutral-900">
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <span className="truncate font-medium">{lessonTitle}</span>
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close PDF"
              className="rounded-md p-1 hover:bg-white/10"
            >
              <X className="size-5" />
            </Button>
          </div>
          <iframe
            src={fileUrl ?? ""}
            title={lessonTitle}
            className="w-full flex-1 bg-white"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
