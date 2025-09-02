import React from "react";
import TrainingProgress from "./TrainingProgress";
import SecondaryButton from "../buttons/SecondaryButton";
import { CancelJob } from "../../services/apiFunctions"; // adjust path

const ModelCard = ({
  title,
  description,
  job,
  status,
  progress,
  id,
  onJobCancelled,
}) => {
  const handleCancel = async () => {
    const res = await CancelJob(id);
    if (res?.status === 200) {
      console.log("Job cancelled:", res);
      // notify parent so it can remove or refresh
      onJobCancelled?.(id);
    } else {
      console.error("Failed to cancel job", res);
    }
  };

  const statusInfo = () => {
    if (status?.toLowerCase() === "failed") {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
          <img src="/assets/training/Failed.svg" className="size-[46px]" />
          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-primary-text font-medium text-[18px]">
              Training Failed
            </h1>
            <p className="text-low-opacity text-sm max-w-[40ch] text-center">
              Unfortunately, the training process encountered an issue.
            </p>
          </div>
          {/* <SecondaryButton
            onClick={handleCancel}
            className="px-5 w-[8rem] h-[2.1rem]"
          >
            Delete Job
          </SecondaryButton> */}
        </div>
      );
    } else if (progress < 100) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-full flex flex-col gap-1 mb-5 items-center justify-center">
            <img
              src="/assets/training/DumbellWhite.svg"
              className="size-[86px]"
            />
            <h1 className="text-primary-text font-medium text-[18px]">
              Training in progress
            </h1>
          </div>

          <TrainingProgress
            jobId={id}
            progress={progress}
            status={status}
            isInsideCard={true}
          />
        </div>
      );
    } else {
      return (
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
      );
    }
  };

  return (
    <div className="bg-white/2 border-1 space-y-3 border-stroke-gray rounded-[10px] flex flex-col cursor-pointer w-full h-max md:h-[400px] xl:max-w-[500px] 2xl:min-w-[450px] 2xl:max-w-[450px] px-6 py-4">
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
      {statusInfo()}
    </div>
  );
};

export default ModelCard;
