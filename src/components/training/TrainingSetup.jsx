import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Stepper, { Step } from "../influencer/Stepper";
import SectionLabel from "../influencer/SectionLabel";

import { useAccount } from "wagmi";
import RangeSlider from "../form/RangeSlider";
import CommonDropdown from "../form/CommonDropdown";
import { mode } from "viem/chains";
import { selectModel } from "../../store/slices/model";
import CommonSelector from "../form/CommonSelector";

const TrainingSetup = ({ onClose }) => {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
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
            defaultValue={models[0]}
            onSelect={(model) => dispatch(selectModel(model))}
          />
        </Step>

        {/* Step 2 */}
        <Step
          title={"Set Parameters"}
          logo="/assets/training/LinedLevels.svg"
          description="Choose key settings that control training, such as learning rate, batch size, and number of epochs. These parameters affect how quickly and effectively the model learns."
          showSubStep={showAdvancedSettings}
          subStep={
            <div
              title="Advanced Settings"
              description="Adjust extra configurations to fine-tune how the model trains and performs."
              logo="/assets/training/Settings.svg"
            >
              <p>Here are advanced settings...</p>
            </div>
          }
          onCloseSubStep={() => setShowAdvancedSettings(false)} // 👈 pass down
        >
          <SectionLabel
            heading={"SET INFLUENCE FROM EACH ACCOUNT"}
            description={"Control which influencer to prioritize more"}
          />
          <RangeSlider
            label="Learning Rate"
            description={
              "Controls how much to change the model in response to the estimated error each time the model weights are updated."
            }
            min={0.01}
            max={0.1}
            step={0.01}
            value={learningRate}
            onChange={setLearningRate}
          />

          <CommonSelector
            label="Model Type"
            description="Choose one model type to continue"
            options={["CNN", "RNN", "Transformer"]}
            defaultValue="CNN"
            multiple={false}
            // selected={selected}
            // onChange={setSelected}
          />

          {/* 👇 Button to open advanced settings */}
          <button
            onClick={() => setShowAdvancedSettings(true)}
            className="mt-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Open Advanced Settings
          </button>
        </Step>

        {/* Step 3 */}
        <Step
          title={"Select Dataset"}
          logo="/assets/training/Database.svg"
          disabled={false}
          loading={loading}
          description="Enter the name of a dataset from Hugging Face or choose from the list of commonly used datasets. Make sure the name matches the official dataset ID so it can be loaded correctly for training."
        >
          <SectionLabel heading={"Give your Agent a Name"} />
        </Step>
        <Step
          title={"Train"}
          logo="/assets/training/Dumbell.svg"
          disabled={false}
          loading={loading}
          description="Your model is now being trained using the selected dataset. This may take a few minutes depending on the model and data size. Sit tight while the Hive processes and evolves your model for better performance."
        >
          <SectionLabel heading={"Give your Agent a Name"} />
        </Step>
      </Stepper>
    </div>
  );
};

export default TrainingSetup;
