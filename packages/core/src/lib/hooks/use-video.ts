import { useEffect, useMemo, useState } from "react";
import { UseVideoProps, UseVideoReturn } from "../../types/use-video.types";
import { isVideo } from "../utils";
import useBuffered from "./use-buffered";
import useDuration from "./use-duration";
import useFullscreen from "./use-fullscreen";
import useMouseMoves from "./use-mouse-moves";
import useOnKeyDown from "./use-on-key-down";
import usePip from "./use-pip";
import usePlayPause from "./use-play";
import usePlaybackRate from "./use-playrate";
import useVolume from "./use-volume";

export const useVideo = ({
  src,
  onProgress,
  onDuration,
  onEnded,
  onPlay,
  onPause,
  onVolumeChange,
  onPlaybackRateChange,
  onPictureInPictureChange,
  onFullscreenChange,
  showControls: show,
  onLoad,
  wrapperRef,
  videoRef,
}: UseVideoProps): UseVideoReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { buffered, setBuffered } = useBuffered(videoRef.current);
  const { handlePlaybackRateChange, playbackRate, setPlaybackRate } =
    usePlaybackRate(videoRef.current, onPlaybackRateChange);
  const { handleMute, handleUnmute, handleVolumeChange, isMuted, volume } =
    useVolume(videoRef.current, onVolumeChange);
  const { handlePlay, handlePause, isPlaying, setIsPlaying } = usePlayPause(
    videoRef.current,
    (isPlaying) => {
      if (isPlaying) {
        onPlay?.();
      } else {
        onPause?.();
      }
    }
  );
  const { handleExitFullScreen, handleFullScreen, isFullscreen } =
    useFullscreen(wrapperRef.current, videoRef.current, onFullscreenChange);
  const { handlePip, handleExitPip, isPip } = usePip(
    videoRef.current,
    onPictureInPictureChange
  );
  const {
    duration,
    handleSeek,
    backBy,
    forwardBy,
    currentTime,
    setCurrentTime,
  } = useDuration(videoRef.current, onDuration);
  const { showControls } = useMouseMoves(wrapperRef.current, show, isPlaying);

  const remainingTime = useMemo(
    () => duration - currentTime,
    [duration, currentTime]
  );

  useOnKeyDown(" ", () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  });
  useOnKeyDown("ArrowLeft", () => backBy(5));
  useOnKeyDown("ArrowRight", () => forwardBy(5));
  useOnKeyDown("ArrowUp", () => handleVolumeChange(volume + 0.1));
  useOnKeyDown("ArrowDown", () => handleVolumeChange(volume - 0.1));
  useOnKeyDown("f", () => {
    if (isFullscreen) {
      handleExitFullScreen();
    } else {
      handleFullScreen();
    }
  });
  useOnKeyDown("p", () => {
    if (isPip) {
      handleExitPip();
    } else {
      handlePip();
    }
  });
  useOnKeyDown("m", () => {
    if (isMuted) {
      handleUnmute();
    } else {
      handleMute();
    }
  });
  useOnKeyDown("Escape", () => {
    if (isFullscreen) {
      handleExitFullScreen();
    }
    if (isPip) {
      handleExitPip();
    }
  });

  useEffect(() => {
    const video = videoRef.current as HTMLVideoElement;
    if (!isVideo(video)) {
      return;
    }
    const handlers = {
      loadeddata: () => {
        setIsLoading(false);
        setIsLoaded(true);
        onLoad?.();
      },
      progress: () => {
        setBuffered(video.buffered);
      },
      timeupdate: () => {
        setCurrentTime(video.currentTime);
        onProgress?.(video.currentTime);
        setIsLoading(false);
        setIsPlaying(!video.paused);
      },
      ended: () => {
        setIsPlaying(false);
        onEnded?.();
      },
      ratechange: () => {
        setPlaybackRate(video.playbackRate);
        onPlaybackRateChange?.(video.playbackRate);
      },
      loadstart: () => {
        setIsLoading(true);
      },
      waiting: () => {
        setIsLoading(true);
      },
      seeking: () => {
        setIsLoading(true);
      },
    };

    video.addEventListener("loadstart", handlers.loadstart);
    video.addEventListener("loadeddata", handlers.loadeddata);
    video.addEventListener("seeking", handlers.seeking);
    video.addEventListener("waiting", handlers.waiting);
    video.addEventListener("progress", handlers.progress);
    video.addEventListener("timeupdate", handlers.timeupdate);
    video.addEventListener("ended", handlers.ended);
    video.addEventListener("ratechange", handlers.ratechange);

    return () => {
      video.removeEventListener("loadstart", handlers.loadstart);
      video.removeEventListener("loadeddata", handlers.loadeddata);
      video.removeEventListener("waiting", handlers.waiting);
      video.removeEventListener("progress", handlers.progress);
      video.removeEventListener("timeupdate", handlers.timeupdate);
      video.removeEventListener("ended", handlers.ended);
      video.removeEventListener("ratechange", handlers.ratechange);
      video.removeEventListener("seeking", handlers.seeking);
    };
  }, [videoRef.current, src]);

  return {
    isPlaying,
    isMuted,
    isFullscreen,
    isPip,
    duration,
    currentTime,
    buffered,
    volume,
    remainingTime,
    playbackRate,
    handlePlay,
    handlePause,
    handleMute,
    handleUnmute,
    handleVolumeChange,
    handlePlaybackRateChange,
    handleSeek,
    handleFullScreen,
    handleExitFullScreen,
    handlePip,
    handleExitPip,
    backBy,
    forwardBy,
    isLoading,
    isLoaded,
    showControls,
  };
};

export default useVideo;
