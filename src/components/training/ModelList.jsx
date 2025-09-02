import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import ModelCard from "./ModelCard";

const MODEL_METADATA = [
  {
    title: "LightGBM",
    key: "lightgbm",
    description:
      "Lightning-fast gradient boosting trees, handling categorical features and large datasets effortlessly well.",
  },
  {
    title: "Random Forest",
    key: "random_forest",
    description:
      "Ensemble of decision trees averaging predictions, reducing variance and guarding against overfitting.",
  },
  {
    title: "Linear Regression",
    key: "linear_regression",
    description:
      "Simple yet powerful model capturing linear relationships, easy to interpret and fast to train.",
  },
];

const ModelList = ({ jobs, toggleSetupPopup }) => {
  return (
    <div className="w-full md:mx-2 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row pt-2 pb-6 gap-3 border-b border-stroke-gray items-start lg:justify-between lg:items-center w-full">
        <div>
          <div className="flex gap-2 items-center">
            <h1 className="text-md font-medium">Trained Models</h1>
            {/* <span className="bg-white/4 text-inactive-text px-4 font-medium font-jetbrains-mono text-xxs lg:text-xs uppercase flex items-center justify-center rounded-[5px] h-max p-1">
              1/5 Trained
            </span> */}
          </div>
          <p className="font-regular  text-sm text-secondary-text max-w-[60ch] 2xl:max-w-[80ch]">
            View all the models you've trained in the Hive. Track metrics,
            compare results, and choose which models to refine, breed, or deploy
            next.
          </p>
        </div>
        <PrimaryButton onClick={toggleSetupPopup} className="px-10 h-[2.2rem]">
          Train Model
        </PrimaryButton>
      </div>

      {/* Model Cards */}
      <div className="flex flex-wrap gap-2">
        {jobs?.map((job) => {
          const metadata = MODEL_METADATA.find(
            (m) => m.key === job?.model_type
          );
          console.log("Job:", metadata, job?.model_type);

          return (
            <ModelCard
              key={job?.job_id}
              id={job?.job_id}
              title={metadata ? metadata.title : job?.model_type}
              description={metadata ? metadata.description : ""}
              progress={job?.progress}
              status={job?.status}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ModelList;
