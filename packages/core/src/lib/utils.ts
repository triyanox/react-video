import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isVideo = (element: HTMLVideoElement | null) => {
  if (!element) {
    return false;
  }
  return element instanceof HTMLVideoElement;
};
