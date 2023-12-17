import { useEffect, useState } from "react";

const usePlayPause = (
  video: HTMLVideoElement | null,
  callback?: (isPlaying: boolean) => void
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    const onPlay = () => {
      callback?.(true);
    };
    const onPause = () => {
      callback?.(false);
    };
    video?.addEventListener("play", onPlay);
    video?.addEventListener("pause", onPause);
    return () => {
      video?.removeEventListener("play", onPlay);
      video?.removeEventListener("pause", onPause);
    };
  }, [video, callback]);

  const handlePlay = () => {
    if (!video) {
      return;
    }
    video.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (!video) {
      return;
    }
    video.pause();
    setIsPlaying(false);
  };

  return {
    handlePlay,
    handlePause,
    isPlaying,
    setIsPlaying,
  };
};

export default usePlayPause;
