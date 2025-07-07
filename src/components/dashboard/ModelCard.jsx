// components/ModelCard.jsx
import React, { useState, useEffect } from "react";
import FrameSelector from "./FrameSelector";
import FrameProgress from "./FrameProgress";

const FRAMES = {
  "1 Hour": 3600 * 1000,
  "4 Hours": 4 * 3600 * 1000,
  "24 Hours": 24 * 3600 * 1000,
  "7 Days": 7 * 24 * 3600 * 1000,
  "1 Month": 30 * 24 * 3600 * 1000,
};

const ModelCard = ({ title, description, badge }) => {
  const [frame, setFrame] = useState("1 Hour");
  const [startTime, setStartTime] = useState(Date.now());
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(FRAMES[frame]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const total = FRAMES[frame];
      const pct = Math.min(100, (elapsed / total) * 100);
      setProgress(pct);
      setTimeLeft(total - elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [frame, startTime]);

  const handleFrameChange = (newFrame) => {
    setFrame(newFrame);
    setStartTime(Date.now());
  };

  return (
    <div className="bg-white/2 border-1 space-y-3 border-stroke-gray xl:max-w-[500px] 2xl:min-w-[450px] 2xl:max-w-[450px] w-full min-h-[350px] max-h-[400px] h-full rounded-[10px] px-6 py-4 flex flex-col">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h2 className="text-md font-medium">{title}</h2>
          <div className="bg-white/4 text-inactive-text px-4 font-medium font-jetbrains-mono text-xs uppercase flex items-center justify-center rounded-[5px] h-max p-1">
            {badge || "Baseline"}
          </div>
        </div>
        <p className="text-dull-white text-sm font-medium">{description}</p>

        <FrameSelector
          frames={FRAMES}
          selectedFrame={frame}
          onChange={handleFrameChange}
        />
      </div>

      <FrameProgress progress={progress} timeLeft={timeLeft} />
    </div>
  );
};

export default ModelCard;
