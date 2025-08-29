import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Stepper, { Step } from "../influencer/Stepper";
import SectionLabel from "../influencer/SectionLabel";
import { ModelSchema } from "../../services/ModelSchema";
import { useAccount } from "wagmi";
import CommonDropdown from "../form/CommonDropdown";

import { resetModelParams, selectModel } from "../../store/slices/model";
import CommonSelector from "../form/CommonSelector";
import ParameterConfigurator from "./ParameterConfigurator";
import { DatasetSchema } from "../../services/DatasetSchema";
import {
  setSelectedDataset,
  setSelectedFeatures,
} from "../../store/slices/dataset";

const TrainingSetup = ({ onClose }) => {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const { selectedDataset, selectedFeatures } = useSelector(
    (state) => state.dataset
  );
  const { models, selectedModel } = useSelector((state) => state.model);

  const [loading, setLoading] = useState();
  const handleSubmit = async () => {
    setLoading(true);

    try {
    } catch (error) {
      console.error("Submit Error", error);
    } finally {
      setLoading(false);
    }
  };
  const [learningRate, setLearningRate] = useState(0.02);

  return (
    <div className="bg-black/5 backdrop-blur-[12px] fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
      <Stepper
        initialStep={0}
        onFinalStepCompleted={handleSubmit}
        backButtonText="Previous"
        nextButtonText="Next"
        onClose={onClose}
      >
        {/* Step 1 */}
        <Step
          title={"Select a model to train"}
          logo="/assets/training/BeeHive.svg"
          disabled={false}
          description="Choose a baseline model from the available options to start training. Each model uses a different method for making predictions, like tree-based, statistical, or time-series. Pick the one that fits your dataset best."
        >
          <SectionLabel heading={"Select Model"} />
          <CommonDropdown
            options={models}
            value={selectedModel || models[0]}
            onSelect={(model) => dispatch(selectModel(model))}
          />
        </Step>

        {/* Step 2 */}
        <Step
          title={"Set Parameters"}
          logo="/assets/training/LinedLevels.svg"
          description="Choose key settings that control training, such as learning rate, batch size, and number of epochs. These parameters affect how quickly and effectively the model learns."
          showSubStep={showAdvancedSettings}
          hoverSection={
            <div className="flex items-center justify-between w-full mt-4">
              <button
                onClick={() => dispatch(resetModelParams(selectedModel))}
                className="text-medium-opacity hover:opacity-70 cursor-pointer flex items-center text-xs"
              >
                <img
                  src="/assets/general/reset.svg"
                  alt="settings"
                  className="inline size-4 mr-1"
                />
                Reset All
              </button>

              {/* Only render if selectedModel has advanced params */}
              {ModelSchema.find(
                (m) => m.model === selectedModel
              )?.parameters.some((p) => p.advanced) && (
                <button
                  onClick={() => setShowAdvancedSettings(true)}
                  className="text-medium-opacity hover:opacity-70 cursor-pointer flex items-center text-xs"
                >
                  <img
                    src="/assets/general/advanced-settings.svg"
                    alt="settings"
                    className="inline size-4 mr-1"
                  />
                  Advanced Settings
                </button>
              )}
            </div>
          }
          subStep={
            <div
              title="Advanced Settings"
              description="Adjust extra configurations to fine-tune how the model trains and performs."
              logo="/assets/training/Settings.svg"
            >
              <ParameterConfigurator isAdvanced={true} />
            </div>
          }
          onCloseSubStep={() => setShowAdvancedSettings(false)}
        >
          <ParameterConfigurator />

          {/* 👇 Button to open advanced settings */}
        </Step>

        {/* Step 3 */}
        <Step
          title={"Select Dataset"}
          logo="/assets/training/Database.svg"
          disabled={false}
          loading={loading}
          description="Enter the name of a dataset from Hugging Face or choose from the list of commonly used datasets. Make sure the name matches the official dataset ID so it can be loaded correctly for training."
        >
          <SectionLabel heading={"Select dataset"} />
          <CommonDropdown
            options={DatasetSchema.map((ds) => ds.name)}
            value={selectedDataset}
            onSelect={(val) => dispatch(setSelectedDataset(val))}
          />
        </Step>
        <Step
          title={"Select Features"}
          logo="/assets/training/Features.svg"
          disabled={false}
          loading={loading}
          description="This process filters out unnecessary data and keeps only what truly drives performance, ensuring a faster, smarter, and more accurate model."
        >
          <SectionLabel heading={"Select Features"} />

          {selectedDataset && (
            <CommonSelector
              label={`${selectedDataset} Selected Features`}
              description="Select features you want to use for training"
              options={
                DatasetSchema.find((d) => d.name === selectedDataset)
                  ?.features || []
              }
              selected={selectedFeatures}
              required={
                DatasetSchema.find((d) => d.name === selectedDataset)
                  ?.required || []
              }
              multiple={true}
              // dispatch properly
              onChange={(features) => dispatch(setSelectedFeatures(features))}
            />
          )}
        </Step>
      </Stepper>
    </div>
  );
};

export default TrainingSetup;
