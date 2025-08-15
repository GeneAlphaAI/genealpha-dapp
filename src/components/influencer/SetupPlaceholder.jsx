import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";

const SetupPlaceholder = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-[25px]">
      <img src="/assets/influencer/Setup.svg" />
      <div className="w-full text-center flex flex-col gap-[10px]">
        <h1 className="text-md text-primary-text font-medium">
          Let’s setup your influencer agent
        </h1>
        <p className="text-sm text-low-opacity text-center max-w-[60ch]">
          Customize your influencer pool and deploy a predictive agent that
          analyzes and summarizes their tweets to generate real-time market
          insights.
        </p>
      </div>

      <PrimaryButton onClick={onClick}>Start Setup</PrimaryButton>
    </div>
  );
};

export default SetupPlaceholder;
