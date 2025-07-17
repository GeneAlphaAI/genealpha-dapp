import React from "react";
import PredictionTable from "./PredictionTable";
import Dropdown from "../../utilities/Dropdown";

const HistoricalPredictionCard = () => {
    const options = [
      { label: "1 HOUR", value: "1" },
      { label: "4 HOURS", value: "4" },
      { label: "24 HOURS", value: "24" },
      { label: "7 DAYS", value: "168" },
      { label: "1 MONTH", value: "720" },
    ];
  return (
    <div className="bg-white/2 border-1 space-y-3 border-stroke-gray w-full h-full md:max-w-[400px] xl:max-w-[500px] rounded-[10px] px-4 lg:px-6 py-2 lg:py-4 flex flex-col cursor-pointer">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h2 className="text-[18px] lg:text-md font-medium text-primary-text">
            Historical Predictions
          </h2>
          <div className="ml-auto ">
            <Dropdown
            options={options}
            icon="/assets/dashboard/DownArrow.svg"
            position="right"
            triggerClassName="bg-white/10 backdrop-blur-lg gap-2 border-stroke-gray text-xxs"
            labelClassName="text-dull-white"
            contentClassName="bg-white/10 backdrop-blur-lg border-1 border-stroke-gray text-xxs min-w-max"
          />
          </div>
        </div>
        <p className="text-dull-white text-xxs lg:text-xs font-medium">
          Recorded predictions with each error is determined by the difference
          between the predicted and actual values.
        </p>
      </div>
      <PredictionTable />
    </div>
  );
};

export default HistoricalPredictionCard;