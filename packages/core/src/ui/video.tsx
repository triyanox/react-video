/**
 * `framer-motion` typescript definitions are not up to date.
 *  So, I have to use `@ts-ignore` to ignore the errors.
 * I will remove it once the definitions are up to date.
 */
import { cn } from "@/lib/utils";
import * as RadixSlider from "@radix-ui/react-slider";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { formatTime } from "../lib/format-time";
import useVideo from "../lib/hooks/use-video";
import { VideoProps } from "../types/video.types";
import Button from "./button";
import { If, IfElse } from "./helpers";
import {
  BackBy10,
  EnterPip,
  ExitFullScreen,
  ExitPip,
  ForwardBy10,
  FullScreen,
  Loading,
  Pause,
  Play,
  Volume,
} from "./icons";

/**
 * This a react video component built on top of `HTMLVideoElement`. It's highly customizable using `tailwindcss` and easy to use.
 *
 * @example
 * ```tsx
 * import { Video } from "@triyanox/react-video";
 *
 * export default function Page() {
 *  return (
 *   <div className="flex justify-center items-center w-full">
 *    <Video
 *      src="https://vjs.zencdn.net/v/oceans.mp4"
 *    />
 *  </div>
 * )}
 * ```
 */
function Video({
  src,
  title,
  subtitle,
  className,
  onDuration,
  onEnded,
  onPause,
  onPlay,
  onPlaybackRateChange,
  onProgress,
  onVolumeChange,
  onLoad,
  poster,
  classNames,
  hideSliderThumb = true,
  showControls = true,
  autoPlay = true,
  loop,
  icons,
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    if (Array.isArray(src)) {
      src.forEach((s) => {
        const source = document.createElement("source");
        source.src = s.src;
        source.type = s.type;
        videoRef.current?.appendChild(source);
      });
    } else if (typeof src === "string") {
      videoRef.current.src = src;
    } else {
      return;
    }
  }, [videoRef.current, src]);

  const {
    isPlaying,
    isMuted,
    isFullscreen,
    isPip,
    duration,
    currentTime,
    volume,
    handlePlay,
    handlePause,
    handleMute,
    handleUnmute,
    handleVolumeChange,
    handleSeek,
    handleFullScreen,
    handleExitFullScreen,
    handlePip,
    handleExitPip,
    remainingTime,
    backBy,
    forwardBy,
    isLoading,
    showControls: show,
    buffered,
    isLoaded,
  } = useVideo({
    src,
    onDuration,
    onEnded,
    onPause,
    onPlay,
    onPlaybackRateChange,
    onProgress,
    onVolumeChange,
    showControls,
    onLoad,
    videoRef,
    wrapperRef,
  });

  const _icons = {
    play: Play,
    pause: Pause,
    forwardBy10: ForwardBy10,
    backBy10: BackBy10,
    enterPip: EnterPip,
    exitPip: ExitPip,
    volume: Volume,
    fullScreen: FullScreen,
    exitFullScreen: ExitFullScreen,
    loading: Loading,
    ...icons,
  };

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative aspect-video",
        isLoaded ? "block" : "hidden",
        className,
        classNames?.base
      )}
    >
      <video
        crossOrigin="anonymous"
        controls={false}
        playsInline
        ref={videoRef}
        loop={loop}
        className={cn(
          {
            "rounded-xl": !isFullscreen,
          },
          {
            "h-full w-full": FullScreen,
          },
          classNames?.video
        )}
        poster={poster}
        preload="metadata"
        autoPlay={autoPlay}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          pointerEvents: "none",
        }}
      ></video>
      {/* @ts-ignore */}
      <AnimatePresence>
        {/* @ts-ignore */}
        <motion.div
          key={JSON.stringify(show)}
          initial={{ opacity: 0 }}
          animate={{
            opacity: show && !isFullscreen ? 0.5 : 0,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black via-transparent to-black",
            { "rounded-xl": !isFullscreen },
            classNames?.backdrop
          )}
        />
      </AnimatePresence>
      {/* @ts-ignore */}
      <AnimatePresence>
        {show && (
          // @ts-ignore
          <motion.div
            key={JSON.stringify(show)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className={cn(
              "absolute inset-0 flex justify-between px-4 h-fit xl:px-8 gap-2 xl:gap-2 py-3 top-0",
              classNames?.topWrapper
            )}
          >
            <div className="w-full flex">
              <If condition={!isPip}>
                <Button
                  size="lg"
                  radius="full"
                  className="bg-transparent z-50"
                  onClick={() => {
                    if (isFullscreen) {
                      handleExitFullScreen();
                    } else {
                      handleFullScreen();
                    }
                  }}
                >
                  <IfElse
                    fallback={<_icons.fullScreen />}
                    condition={isFullscreen}
                  >
                    <_icons.exitFullScreen />
                  </IfElse>
                </Button>
              </If>
              <If condition={!isFullscreen}>
                <Button
                  size="lg"
                  radius="full"
                  className="bg-transparent z-50"
                  onClick={() => {
                    if (isPip) {
                      handleExitPip();
                    } else {
                      handlePip();
                    }
                  }}
                >
                  <IfElse fallback={<_icons.enterPip />} condition={isPip}>
                    <_icons.exitPip />
                  </IfElse>
                </Button>
              </If>
            </div>
            <div className="w-full flex justify-end items-center h-fit">
              <Button
                size="lg"
                radius="full"
                className="bg-transparent z-50"
                onClick={() => {
                  if (isMuted) {
                    handleUnmute();
                  } else {
                    handleMute();
                  }
                }}
              >
                <_icons.volume isMuted={isMuted} volume={volume} />
              </Button>
              <RadixSlider.Root
                className={cn(
                  "relative z-50 items-center select-none touch-none w-full h-5 hidden lg:flex lg:w-1/4",
                  classNames?.volumeSlider?.root
                )}
                onValueChange={(value) => {
                  handleVolumeChange(Number(value));
                }}
                value={[volume]}
                min={0}
                max={1}
                step={0.01}
              >
                <RadixSlider.Track
                  className={cn(
                    "bg-white backdrop-filter overflow-hidden backdrop-blur-sm h-3 bg-opacity-20 relative grow rounded-full",
                    classNames?.volumeSlider?.track
                  )}
                >
                  <RadixSlider.Range
                    className={cn(
                      "absolute bg-white rounded-full h-full",
                      classNames?.volumeSlider?.range
                    )}
                  />
                </RadixSlider.Track>
                <If condition={!hideSliderThumb}>
                  <RadixSlider.Thumb
                    className={cn(
                      "block w-5 h-5 bg-white shadow-[0_2px_2px] shadow-black rounded-[10px] hover:bg-white focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-white/10",
                      classNames?.volumeSlider?.thumb
                    )}
                    aria-label="Volume"
                  />
                </If>
              </RadixSlider.Root>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* @ts-ignore */}
      <AnimatePresence>
        {show && (
          //@ts-ignore
          <motion.div
            key={JSON.stringify(show)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className={cn(
              "absolute inset-0 xl:mb-0 px-8 gap-8 flex justify-center w-full items-center",
              classNames?.centerWrapper,
              {
                "mb-8": Boolean(title || subtitle),
              }
            )}
          >
            <IfElse
              className="flex justify-center z-50"
              fallbackClassName="flex justify-center z-50"
              fallback={
                <div className="">
                  <_icons.loading />
                </div>
              }
              condition={!isLoading}
            >
              <Button size="lg" radius="full" onClick={(e) => backBy(10)}>
                <_icons.backBy10 />
              </Button>
              <Button
                onClick={() => {
                  if (isPlaying) {
                    handlePause();
                  } else {
                    handlePlay();
                  }
                }}
                size="lg"
                radius="full"
              >
                <If condition={isPlaying}>
                  <_icons.pause />
                </If>
                <If condition={!isPlaying}>
                  <_icons.play />
                </If>
              </Button>
              <Button onClick={() => forwardBy(10)} size="lg" radius="full">
                <_icons.forwardBy10 />
              </Button>
            </IfElse>
          </motion.div>
        )}
      </AnimatePresence>
      {/* @ts-ignore */}
      <AnimatePresence>
        {show && (
          // @ts-ignore
          <motion.div
            key={JSON.stringify(show)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className={cn(
              "absolute inset-0 flex flex-col justify-end px-6 xl:px-8 gap-2 lg:gap-3 py-4 xl:py-6 bottom-0",
              classNames?.bottomWrapper
            )}
          >
            <div className="w-full flex justify-between items-center gap-21">
              <If condition={Boolean(title || subtitle)}>
                <div className="flex flex-col">
                  <If condition={Boolean(subtitle)}>
                    <p
                      className={cn(
                        "text-[0.5rem] xl:text-base my-0 text-white/80",
                        classNames?.subtitle
                      )}
                    >
                      {subtitle ?? ""}
                    </p>
                  </If>
                  <If condition={Boolean(title)}>
                    <h2
                      className={cn(
                        "text-[1rem] xl:text-2xl my-0 font-semibold text-white",
                        classNames?.title
                      )}
                    >
                      {title ?? ""}
                    </h2>
                  </If>
                </div>
              </If>
            </div>
            <RadixSlider.Root
              className={cn(
                "relative flex items-center select-nones touch-none w-full",
                classNames?.playbackRateSlider?.root
              )}
              onValueChange={(value) => {
                handleSeek(Number(value));
              }}
              value={[currentTime <= duration ? currentTime : 0]}
              min={0}
              max={duration}
              step={0.01}
            >
              <RadixSlider.Track
                className={cn(
                  "bg-white backdrop-filter overflow-hidden backdrop-blur-sm h-2 lg:h-3 bg-opacity-20 relative grow rounded-full",
                  classNames?.playbackRateSlider?.track
                )}
              >
                <RadixSlider.Range
                  className={cn(
                    "absolute bg-white h-full",
                    hideSliderThumb ? "rounded-full" : "rounded-none",
                    classNames?.playbackRateSlider?.range
                  )}
                />
              </RadixSlider.Track>
              <If condition={!hideSliderThumb}>
                <RadixSlider.Thumb
                  className={cn(
                    "block w-3 h-3 lg:w-6 lg:h-6 bg-white rounded-full hover:bg-white focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-white",
                    classNames?.playbackRateSlider?.thumb
                  )}
                  aria-label="Volume"
                />
              </If>
            </RadixSlider.Root>
            <div className="flex justify-between items-center w-full h-2 xl:h-4">
              <p className="text-xs text-white">{formatTime(currentTime)}</p>
              <p className="text-xs text-white">
                {formatTime(remainingTime, true)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Video;
