import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateInfluence } from "../../store/slices/influencer";

export default function InfluenceList() {
  const dispatch = useDispatch();
  const { selectedInfluencers } = useSelector((s) => s.influencer);

  const MIN = 10;
  const roundToOne = (v) => Math.round(v * 10) / 10;

  return (
    <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto">
      {selectedInfluencers.map((inf) => {
        const n = selectedInfluencers.length;
        const maxAllowed = 100 - MIN * (n - 1);
        const value = Math.max(MIN, Math.min(inf.influence, maxAllowed));
        const percent = roundToOne(value);

        return (
          <div
            key={inf.username}
            className="flex flex-col items-center gap-2 bg-black p-2  rounded-lg"
          >
            <div className="flex items-end w-full justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={inf.image}
                  alt={inf.name}
                  className="size-[30px] rounded-full object-cover"
                />

                <div className="flex flex-col">
                  <span className="flex text-xs items-center gap-1 font-medium">
                    {inf.name}
                    {inf.isVerified && (
                      <img
                        src={"/assets/influencer/Verified.svg"}
                        alt="verified"
                        className="size-4 rounded-full"
                      />
                    )}
                  </span>
                  <span className="text-xxs text-low-opacity font-jetbrains-mono font-regular uppercase">
                    @{inf.username}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className=" text-xs font-jetbrains-mono text-low-opacity">
                  {percent}%
                </span>
              </div>
            </div>
            <div className="flex flex-col w-full">
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

                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={percent}
                  onChange={(e) => {
                    const raw = Number(e.target.value);
                    const clamped = Math.max(MIN, Math.min(raw, maxAllowed));
                    dispatch(
                      updateInfluence({
                        username: inf.username,
                        influence: roundToOne(clamped),
                      })
                    );
                  }}
                  className="absolute inset-0 w-full h-full bg-transparent appearance-none z-10 custom-thumb"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
