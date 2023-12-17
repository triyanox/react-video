import { MutableRefObject } from "react";
import { VideoSource } from "./video.types";

type UseVideoProps = {
  src: VideoSource;
  onProgress?: (currentTime: number) => void;
  onDuration?: (duration: number) => void;
  onEnded?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onFullscreenChange?: (isFullscreen: boolean) => void;
  onPictureInPictureChange?: (isPip: boolean) => void;
  onVolumeChange?: (volume: number) => void;
  onPlaybackRateChange?: (playbackRate: number) => void;
  showControls?: boolean;
  onLoad?: () => void;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  wrapperRef: React.MutableRefObject<HTMLElement | null>;
};

type UseVideoReturn = {
  isPlaying: boolean;
  isMuted: boolean;
  isFullscreen: boolean;
  isPip: boolean;
  isLoading: boolean;
  isLoaded: boolean;
  duration: number;
  currentTime: number;
  buffered: TimeRanges | null;
  volume: number;
  remainingTime: number;
  playbackRate: number;
  handlePlay: () => void;
  handlePause: () => void;
  handleMute: () => void;
  handleUnmute: () => void;
  handleVolumeChange: (value: number) => void;
  handlePlaybackRateChange: (value: number) => void;
  handleSeek: (value: number) => void;
  handleFullScreen: () => void;
  handleExitFullScreen: () => void;
  handlePip: () => void;
  handleExitPip: () => void;
  backBy: (seconds: number) => void;
  forwardBy: (seconds: number) => void;
  showControls: boolean;
};

export type { UseVideoProps, UseVideoReturn };
