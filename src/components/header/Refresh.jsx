import React from "react";

const Refresh = ({ duration = 5 }) => {
  const size = 24; // 2rem in pixels
  const stroke = 1;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex gap-2.5 items-center">
      <style>
        {`
          @keyframes progress {
            0% {
              stroke-dashoffset: ${circumference};
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
      <div className="relative" style={{ width: size, height: size }}>
        {/* SVG Stroke Circle */}
        <svg width={size} height={size} className="absolute top-0 left-0">
          <circle
            stroke="#FACC15"
            fill="transparent"
            strokeWidth={stroke}
            r={radius}
            cx={size / 2}
            cy={size / 2}
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{
              animation: `progress ${duration}s linear infinite`,
              transform: "rotate(-90deg)",
              transformOrigin: "center",
            }}
          />
        </svg>

        {/* Background Circle + Pause Icon */}
        <div
          className="absolute top-0 left-0 flex items-center justify-center rounded-full bg-yellow/10"
          style={{ width: size, height: size }}
        >
          <img
            src="/assets/dashboard/Pause.svg"
            alt="Pause"
            className="h-[12px]"
          />
        </div>
      </div>
      <h4 className="text-dull-white text-xs">Pause Auto-Refresh</h4>
    </div>
  );
};

export default Refresh;
