import React from "react";

const ModelCard = ({ title, description }) => {
  return (
    <button
      className={`bg-white/2 border-1 space-y-3 border-stroke-gray rounded-[10px] flex flex-col cursor-pointer w-full h-max md:h-[400px] xl:max-w-[500px] 2xl:min-w-[450px] 2xl:max-w-[450px] px-6 py-4`}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h2 className="text-md font-medium">{title}</h2>
        </div>
        <div className="space-y-2">
          <p className="text-dull-white text-left text-sm font-medium">
            {description}
          </p>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
        <img src="/assets/general/Tick.svg" />
        <div className="flex flex-col items-center text-center gap-2">
          <h1 className="text-primary-text font-medium text-[18px]">
            Model training completed
          </h1>
          <p className="text-low-opacity text-sm max-w-[40ch] text-center">
            You should be able to see the predictions on the live models.
          </p>
        </div>
      </div>
    </button>
  );
};

export default ModelCard;
