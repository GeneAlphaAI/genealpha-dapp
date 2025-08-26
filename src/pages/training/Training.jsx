import React from "react";
import TrainingPlaceholder from "../../components/training/TrainingPlaceholder";
import TrainingSetup from "../../components/training/TrainingSetup";

const Training = () => {
  return (
    <div className="flex w-full h-full">
      <div className="flex items-center justify-center w-full h-full">
        <TrainingSetup />
      </div>
    </div>
  );
};

export default Training;
