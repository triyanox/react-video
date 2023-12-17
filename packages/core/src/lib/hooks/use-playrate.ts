import { useEffect, useState } from "react";

const usePlaybackRate = (
  video: HTMLVideoElement | null,
  callback?: (playbackRate: number) => void
) => {
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    if (video?.playbackRate) {
      setPlaybackRate(video.playbackRate);
      callback?.(video.playbackRate);
    }
  }, [video?.playbackRate]);

  const handlePlaybackRateChange = (value: number) => {
    if (!video) {
      return;
    }
    video.playbackRate = value;
    setPlaybackRate(value);
  };

  return {
    handlePlaybackRateChange,
    playbackRate,
    setPlaybackRate,
  };
};

export default usePlaybackRate;
