// components/ProgressBar.jsx
import React from "react";

const formatCountdown = (ms) => {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const FrameProgress = ({ progress, timeLeft }) => {
  const barColor = progress >= 50 ? "#6CCB70" : "#CBEACC";

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs uppercase text-dull-white">
        <span className="text-xs font-jetbrains-mono font-regular">
          {timeLeft == 0 ? (
            <>Closed</>
          ) : (
            <>Closing in {formatCountdown(timeLeft)}</>
          )}
        </span>
        <span className="text-xs font-jetbrains-mono font-regular">
          {progress.toFixed(0)}%
        </span>
      </div>
      <div className="w-full h-1 bg-white/10 overflow-hidden rounded-full">
        <div
          data-testid="progress-bar"
          className="h-full transition-all rounded-full duration-300"
          style={{
            width: `${progress}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
    </div>
  );
};

export default FrameProgress;
