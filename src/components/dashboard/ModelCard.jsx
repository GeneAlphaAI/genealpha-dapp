// components/ModelCard.jsx
import React, { useState, useEffect } from "react";
import FrameSelector from "./FrameSelector";
import FrameProgress from "./FrameProgress";
import ModelInfo from "./ModelInfo";

const FRAMES = {
  "1 Hour": 3600 * 1000,
  "4 Hours": 4 * 3600 * 1000,
  "24 Hours": 24 * 3600 * 1000,
  "7 Days": 7 * 24 * 3600 * 1000,
  "1 Month": 30 * 24 * 3600 * 1000,
};

const ModelCard = ({
  title,
  description,
  badge,
  onClick,
  className = "w-full h-full md:h-[400px] xl:max-w-[500px] 2xl:min-w-[450px] 2xl:max-w-[450px] justify-between px-6 py-4",
  titleTextSize = "text-md font-medium",
  descriptionTextSize = "text-dull-white text-sm font-medium",
}) => {
  const [frame, setFrame] = useState("1 Hour");
  const [startTime, setStartTime] = useState(
    () => Date.now() - (3600 * 1000 - 5000)
  );
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(FRAMES[frame]);

  useEffect(() => {
    const total = FRAMES[frame];

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const remaining = total - elapsed;

      if (remaining <= 0) {
        setProgress(100);
        setTimeLeft(0);
        clearInterval(interval); // stop the timer
      } else {
        setProgress((elapsed / total) * 100);
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [frame, startTime]);

  const handleFrameChange = (newFrame) => {
    setFrame(newFrame);
    setStartTime(Date.now());
  };
  const width = window.innerWidth;
  console.log(width);
  return (
    <div
      className={`bg-white/2 border-1 space-y-3 border-stroke-gray rounded-[10px]  flex flex-col  cursor-pointer ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h2 className={titleTextSize}>{title}</h2>
          <div className="bg-white/4 text-inactive-text px-4 font-medium font-jetbrains-mono text-xs uppercase flex items-center justify-center rounded-[5px] h-max p-1">
            {badge || "Baseline"}
          </div>
        </div>
        <p className={descriptionTextSize}>{description}</p>
      </div>
      <div className="space-y-4 w-full">
        <FrameSelector
          frames={FRAMES}
          selectedFrame={frame}
          onChange={handleFrameChange}
        />

        <FrameProgress progress={progress} timeLeft={timeLeft} />
        <div className="flex justify-between">
          {" "}
          <ModelInfo
            title={window.innerWidth < 600 ? "Predicted" : "Predicted Price"}
            value={`$2657.36`}
          />
          <ModelInfo
            title={"Error"}
            value={`0.31%`}
            valueClassName="text-sm md:text-[20px]"
          />
          <ModelInfo
            title={window.innerWidth < 600 ? "Current" : "Current Price"}
            value={`$2645.50`}
            infoClassName="items-end"
          />
        </div>
        <div className="flex gap-5 md:gap-10">
          <ModelInfo
            title={"MAE"}
            value={`2.40%`}
            valueClassName="text-sm md:text-md"
          />
          <ModelInfo
            title={"RMSE"}
            value={`2.90%`}
            valueClassName="text-sm md:text-md"
          />
          <ModelInfo
            title={"MAPE"}
            value={`0.39%`}
            valueClassName="text-sm md:text-md"
          />
          <ModelInfo
            title={"DA"}
            value={`80%`}
            valueClassName="text-sm md:text-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
