import React from "react";
import TrainingProgress from "./TrainingProgress";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButton";

const ProgressPopup = ({ progress, status, onClose, jobId }) => {
  return (
    <div
      className="bg-black/5 backdrop-blur-[12px] fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="flex min-h-full flex-1 flex-col items-center justify-center p-4 sm:aspect-[4/3] md:aspect-[2/1]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto w-full max-w-[600px] bg-primary rounded-[20px] px-4 py-6 md:px-8 md:py-8 pb-2 border-[0.5px] border-stroke-gray shadow-xl">
          {/* Header */}
          <div className="flex w-full pb-2 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#f9f9f9] rounded-full p-1.5">
                <img
                  src={"/assets/training/Training.svg"}
                  alt="Logo"
                  className="size-[20px] md:size-[24px]"
                />
              </div>
              <h3 className="text-md font-medium text-primary-text">
                Training
              </h3>
            </div>
          </div>

          <p className="text-xs text-secondary-text">
            Your model is now being trained using the selected dataset. This may
            take a few minutes depending on the model and data size. Sit tight
            while the Hive processes and evolves your model for better
            performance.
          </p>

          <TrainingProgress jobId={jobId} progress={progress} status={status} />

          <div className="flex justify-end mt-6">
            {progress === 100 ? (
              <PrimaryButton
                onClick={onClose}
                className="px-10 w-[7rem] h-[2.0rem]"
              >
                Close
              </PrimaryButton>
            ) : (
              <SecondaryButton
                onClick={onClose}
                className="px-10 w-[7rem] h-[2.0rem]"
              >
                Close
              </SecondaryButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPopup;
