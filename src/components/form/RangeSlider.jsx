import React from "react";
import SectionLabel from "../influencer/SectionLabel";

const RangeSlider = ({
  label = "",
  description,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
}) => {
  // percent progress (for active ticks)
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <>
      <div className="flex flex-col items-start font-jetbrains-mono gap-1 pb-2">
        <h4 className="text-xs text-low-opacity uppercase">{label}</h4>
        {description && (
          <p className="text-xxs uppercase text-dull-gray">{description}</p>
        )}
      </div>
      <div className="flex flex-col w-full ">
        <div className="relative w-full h-6 flex items-center">
          {/* Dull ticks */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-full"
            style={{
              height: "13px",
              background:
                "repeating-linear-gradient(to right, rgba(255,255,255,0.2) 0 1px, transparent 1px 4px)",
            }}
          />

          {/* Bright active ticks */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2"
            style={{
              height: "13px",
              width: `${percent}%`,
              background:
                "repeating-linear-gradient(to right, white 0 1px, transparent 1px 4px)",
            }}
          />

          {/* Range Input */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            defaultValue={defaultValue}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 w-full h-full bg-transparent appearance-none z-10 custom-thumb"
          />
        </div>

        {/* Display current value */}
        <div className="w-full flex item-center text-low-opacity font-jetbrains-mono text-xxs justify-between">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </>
  );
};

export default RangeSlider;
