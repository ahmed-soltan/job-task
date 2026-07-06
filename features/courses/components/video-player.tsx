"use client";

import "@vidstack/react/player/styles/base.css";

import { useRef } from "react";
import { Play, Pause, Maximize } from "lucide-react";
import {
  MediaPlayer,
  MediaProvider,
  Controls,
  PlayButton,
  FullscreenButton,
  useMediaState,
  Time,
  MediaPlayerInstance,
  TimeSlider,
} from "@vidstack/react";

import { Skeleton } from "@/components/ui/skeleton";

import { useGetCourse } from "../services/use-get-course";

function CenterPlayButton() {
  const started = useMediaState("started");
  const paused = useMediaState("paused");

  if (started) return null;

  return (
    <PlayButton
      className="
        absolute
        left-1/2
        top-1/2
        z-20
        flex
        h-20
        w-20
        -translate-x-1/2
        -translate-y-1/2
        items-center
        justify-center
        rounded-full
        bg-orange-50
        text-orange-600
        backdrop-blur-sm
        transition
        hover:scale-110
      "
    >
      {paused ? (
        <Play className="size-6 fill-current" />
      ) : (
        <Pause className="size-6 fill-current" />
      )}
    </PlayButton>
  );
}

function PlayPause() {
  const paused = useMediaState("paused");

  return (
    <PlayButton className="rounded-md p-2 hover:bg-white/10">
      {paused ? (
        <Play className="size-5 fill-current text-white" />
      ) : (
        <Pause className="size-5 fill-current text-white" />
      )}
    </PlayButton>
  );
}

function BottomControls() {
  const started = useMediaState("started");

  if (!started) return null;

  return (
    <Controls.Root
      className="
        absolute
        inset-x-0
        bottom-0
        z-20
        bg-gradient-to-t
        from-black/70
        to-transparent
        p-4
      "
    >
      <Controls.Group className="flex items-center justify-between">
        <PlayPause />
        <div className="text-sm text-white flex items-center gap-1">
          <Time type="current" /> / <Time type="duration" />
        </div>
        <TimeSlider.Root className="group relative mx-[7.5px] inline-flex h-10 w-full cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
          <TimeSlider.Track className="relative ring-neutral-400 z-0 h-[5px] w-full rounded-sm bg-white/30 group-data-[focus]:ring-[3px]">
            <TimeSlider.TrackFill className="bg-white absolute h-full w-[var(--slider-fill)] rounded-sm will-change-[width]" />
            <TimeSlider.Progress className="absolute z-10 h-full w-[var(--slider-progress)] rounded-sm bg-white/50 will-change-[width]" />
          </TimeSlider.Track>
          <TimeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity group-data-[active]:opacity-100 group-data-[dragging]:ring-4 will-change-[left]" />
        </TimeSlider.Root>
        <FullscreenButton className="rounded-md p-2 text-white hover:bg-white/10">
          <Maximize className="size-5" />
        </FullscreenButton>
      </Controls.Group>
    </Controls.Root>
  );
}

export const VideoPlayer = () => {
  const { isLoading, data } = useGetCourse();

  const player = useRef<MediaPlayerInstance>(null);

  const handleClick = () => {
    const media = player.current;

    if (!media) return;

    if (media.paused) {
      media.play();
    } else {
      media.pause();
    }
  };

  return (
    <div className="relative aspect-video w-full min-w-0 self-stretch overflow-hidden rounded-md bg-black">
      <MediaPlayer
        className={`absolute inset-0 block size-full min-w-0 ${isLoading ? "opacity-0" : "opacity-100"}`}
        src={data?.videoUrl}
        title={data?.title}
        poster={data?.posterUrl}
        ref={player}
        onClick={handleClick}
      >
        <MediaProvider />

        <CenterPlayButton />

        <BottomControls />
      </MediaPlayer>

      {isLoading ? (
        <Skeleton className="absolute inset-0 block size-full min-w-0 rounded-none" />
      ) : null}
    </div>
  );
};
