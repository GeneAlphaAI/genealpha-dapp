import React from "react";

const WorkInProgress = () => {
  return (
    <div className="flex flex-col items-center w-full h-full justify-center gap-[25px]">
      <img src="/assets/general/WorkInProgress.svg" />
      <div className="text-center flex flex-col gap-[10px]">
        <h1 className="text-md text-primary-text font-medium">
          We Are Cooking Something Great
        </h1>
        <p className="text-sm text-low-opacity text-center max-w-[60ch]">
          Please be patient and check back soon for updates as we develop
          exciting new features just for you.
        </p>
      </div>

      {/* <PrimaryButton onClick={onClick}>Start Training</PrimaryButton> */}
    </div>
  );
};

export default WorkInProgress;
