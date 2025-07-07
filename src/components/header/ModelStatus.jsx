import React from "react";

const ModelStatus = () => {
  return (
    <div className="flex items-center">
      <img
        src="/assets/dashboard/GreenStatus.svg"
        alt="Pause"
        className="size-[30px]"
      />
      <h4 className="text-xs text-dull-white">All Models Live</h4>
    </div>
  );
};

export default ModelStatus;
