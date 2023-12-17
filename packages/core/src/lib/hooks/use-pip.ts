import { useEffect, useState } from "react";

const usePip = (
  element: HTMLVideoElement | null,
  callback?: (isPip: boolean) => void
) => {
  const [isPip, setIsPip] = useState(false);

  useEffect(() => {
    const onEnterPip = () => {
      callback?.(true);
      setIsPip(true);
    };
    const onExitPip = () => {
      callback?.(false);
      setIsPip(false);
    };
    document.addEventListener("enterpictureinpicture", onEnterPip);
    document.addEventListener("leavepictureinpicture", onExitPip);
    return () => {
      document.removeEventListener("enterpictureinpicture", onEnterPip);
      document.removeEventListener("leavepictureinpicture", onExitPip);
    };
  }, [callback]);

  const handlePip = () => {
    if (!element) {
      return;
    }
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
      setIsPip(false);
    } else {
      element.requestPictureInPicture();
      setIsPip(true);
    }
  };

  const handleExitPip = () => {
    if (!element) {
      return;
    }
    document.exitPictureInPicture();
    setIsPip(false);
  };

  return {
    handlePip,
    isPip,
    handleExitPip,
  };
};

export default usePip;
