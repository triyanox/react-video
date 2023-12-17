import { useEffect, useState } from "react";

const useVolume = (
  video: HTMLVideoElement | null,
  callback?: (volume: number) => void
) => {
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (video?.volume) {
      setVolume(video.volume);
      callback?.(video.volume);
    }
  }, [video?.volume]);

  const handleVolumeChange = (value: number) => {
    if (!video) {
      return;
    }
    setIsMuted(false);
    video.muted = false;
    if (value > 1) {
      video.volume = 1;
      setVolume(1);
      return;
    }
    if (value <= 0) {
      video.volume = 0;
      setVolume(0);
      setIsMuted(true);
      video.muted = true;
      return;
    }
    video.volume = value;
    setVolume(value);
    setIsMuted(value === 0);
  };

  const handleMute = () => {
    if (!video) {
      return;
    }
    video.muted = true;
    setVolume(0);
    setIsMuted(true);
  };

  const handleUnmute = () => {
    if (!video) {
      return;
    }
    video.muted = false;
    setVolume(video.volume + 0.1);
    setIsMuted(false);
  };

  return {
    handleMute,
    handleUnmute,
    handleVolumeChange,
    volume,
    isMuted,
  };
};

export default useVolume;
