import { useEffect, useState } from "react";

const useMouseMoves = (
  element: HTMLElement | null,
  show?: boolean,
  isPlaying?: boolean
) => {
  const [isMoving, setIsMoving] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (!element) {
      return;
    }

    if (!show) {
      return;
    }

    const onMouseMove = () => {
      setIsMoving(true);
      setShowControls(true);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const id = window.setTimeout(() => {
        setIsMoving(false);
        setShowControls(false);
      }, 3000);

      setTimeoutId(id);
    };

    element.addEventListener("mousemove", onMouseMove);

    return () => {
      element.removeEventListener("mousemove", onMouseMove);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [element, timeoutId, isPlaying]);

  useEffect(() => {
    if (!show) {
      setShowControls(false);
      return;
    }
    if (!isPlaying) {
      setShowControls(true);
    } else {
      if (show) {
        setShowControls(true);
      } else {
        setShowControls(false);
      }
    }
  }, [isPlaying, show]);

  return {
    showControls,
    isMoving,
    isPlaying,
  };
};

export default useMouseMoves;
