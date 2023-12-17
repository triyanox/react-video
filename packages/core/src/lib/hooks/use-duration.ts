import { useEffect, useState } from "react";

const useDuration = (
  video: HTMLVideoElement | null,
  callback?: (duration: number) => void
) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (video?.duration) {
      setDuration(video.duration);
      callback?.(video.duration);
    }
  }, [video?.duration]);

  const handleSeek = (value: number) => {
    if (!video) {
      return;
    }
    if (value > video.duration) {
      setCurrentTime(video.duration);
      video.currentTime = video.duration;
      return;
    }
    if (value < 0) {
      setCurrentTime(0);
      video.currentTime = 0;
      return;
    }
    setCurrentTime(value);
    video.currentTime = value;
  };

  const backBy = (seconds: number) => {
    if (!video) {
      return;
    }
    if (video.currentTime - seconds < 0) {
      video.currentTime = 0;
      return;
    }
    setCurrentTime(video.currentTime - seconds);
    video.currentTime -= seconds;
  };

  const forwardBy = (seconds: number) => {
    if (!video) {
      return;
    }
    if (video.currentTime + seconds > video.duration) {
      video.currentTime = video.duration;
      return;
    }
    setCurrentTime(video.currentTime + seconds);
    video.currentTime += seconds;
  };

  return {
    duration,
    handleSeek,
    backBy,
    forwardBy,
    currentTime,
    setCurrentTime,
  };
};

export default useDuration;
