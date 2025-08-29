import React, { useState } from "react";
import TrainingPlaceholder from "../../components/training/TrainingPlaceholder";
import TrainingSetup from "../../components/training/TrainingSetup";
import ModelList from "../../components/training/ModelList";

const Training = () => {
  const [isOpen, setIsOpen] = useState(false);
  const liveModels = [""];
  return (
    <div className="flex w-full h-full">
      {liveModels?.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <TrainingPlaceholder onClick={() => setIsOpen(true)} />
        </div>
      ) : (
        <ModelList toggleSetupPopup={() => setIsOpen(true)} />
      )}

      {isOpen && <TrainingSetup onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default Training;
