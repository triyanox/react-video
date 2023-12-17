import { useEffect, useState } from "react";

const useBuffered = (video: HTMLVideoElement | null) => {
  const [buffered, setBuffered] = useState<TimeRanges | null>(null);

  useEffect(() => {
    if (!video) {
      return;
    }
    setBuffered(video.buffered);
  }, [video]);

  return {
    buffered,
    setBuffered,
  };
};

export default useBuffered;
