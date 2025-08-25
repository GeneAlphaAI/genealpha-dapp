import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";

const TrainingPlaceholder = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-[25px]">
      <img src="/assets/dashboard/HumanChip.svg" />
      <div className="w-full text-center flex flex-col gap-[10px]">
        <h1 className="text-md text-primary-text font-medium">
          Let’s start training your model
        </h1>
        <p className="text-sm text-low-opacity text-center max-w-[60ch]">
          Begin by choosing a dataset and a baseline model. The Hive will take
          over from there, improving your model through generations of training
          using genetic algorithms.
        </p>
      </div>

      <PrimaryButton onClick={onClick}>Start Training</PrimaryButton>
    </div>
  );
};

export default TrainingPlaceholder;
