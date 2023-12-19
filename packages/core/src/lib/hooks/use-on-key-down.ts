import { useEffect } from "react";

const useOnKeyDown = (key: string, callback: () => void) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        event.preventDefault();
        event.stopPropagation();
        callback();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [key, callback]);
};

export default useOnKeyDown;
