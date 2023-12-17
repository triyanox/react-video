const formatTime = (time: number, negative = false) => {
  const minutes = Math.abs(Math.floor(time / 60));
  const seconds = Math.abs(Math.floor(time - minutes * 60));
  if (negative) {
    return `-${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

export { formatTime };
