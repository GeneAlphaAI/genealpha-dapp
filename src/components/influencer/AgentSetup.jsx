import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeInfluencer,
  resetInfluencerState,
  setAgentName,
} from "../../store/slices/influencer";
import Stepper, { Step } from "./Stepper";
import SectionLabel from "./SectionLabel";
import ExpandingSearchBar from "./ExpandingSearchbar";
import InfluenceList from "./InfluenceList";
import CategorySelector from "./CategorySelector";
import CommonInput from "../form/CommonInput";
import { CreateAgent } from "../../services/apiFunctions";
import { useAccount } from "wagmi";

const AgentSetup = ({ onClose }) => {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { selectedInfluencers, agentName, selectedCategories } = useSelector(
    (state) => state.influencer
  );
  const [loading, setLoading] = useState();
  const handleSubmit = async () => {
    setLoading(true);
    let payload = {
      walletAddress: address,
      agentName: agentName,
      accounts: selectedInfluencers,
      categories: selectedCategories,
    };

    try {
      const response = await CreateAgent(payload);

      if (response?.status === 200) {
        showToast(
          "success",
          "Agent Setup Successful",
          "/assets/Toast/Success.svg"
        );
        onClose();
        dispatch(resetInfluencerState());
      } else {
      }
    } catch (error) {
      console.error("Submit Error", error);
      showToast("error", "Agent Setup Successful", "/assets/Toast/Error.svg");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black/5 backdrop-blur-[12px] fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
      <Stepper
        initialStep={0}
        onStepChange={(step) => {}}
        onFinalStepCompleted={handleSubmit}
        backButtonText="Previous"
        nextButtonText="Next"
        onClose={onClose}
      >
        <Step
          title={"Select Influencers"}
          logo="/assets/influencer/SelectInfluencer.svg"
          disabled={selectedInfluencers?.length == 0 ? true : false}
          description="Select the influencers you want your agent to follow. The agent will monitor their tweets in real time, extracting signals, sentiment, and patterns to fuel predictive insights based on their activity."
        >
          <SectionLabel heading={"Enter X (Twitter) Username"} />

          <ExpandingSearchBar />
          {selectedInfluencers.length != 0 && (
            <h5 className="text-xs font-jetbrains-mono text-center w-full py-4 text-low-opacity uppercase">
              {selectedInfluencers.length}/5 Selected influencers
            </h5>
          )}

          {selectedInfluencers.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedInfluencers.map((influencer) => (
                <div
                  key={influencer.username}
                  className="flex items-center text-xs text-primary-text hover:text-primary-text/90 border-stroke-gray border-[0.5px] text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  <img
                    src={influencer.profile_image_url}
                    alt="profile image"
                    className="size-[20px] rounded-full mr-1"
                  />
                  {influencer.name}
                  {influencer.isVerified && (
                    <img
                      src={"/assets/influencer/Verified.svg"}
                      alt="verified"
                      className="size-4 ml-1 rounded-full"
                    />
                  )}
                  <button
                    onClick={() =>
                      dispatch(
                        removeInfluencer({ username: influencer.username })
                      )
                    }
                    className="ml-2 cursor-pointer"
                  >
                    <img
                      src={"/assets/influencer/Close.svg"}
                      alt="Close"
                      className="size-[12px]"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Step>

        <Step
          title={"Preferences & Biases"}
          logo="/assets/influencer/Preferences.svg"
          description="Set your agent’s preferences and biases to align with your strategy. Control how it weighs sentiment, and prioritizes certain influencers for more tailored predictions."
        >
          <SectionLabel
            heading={"SET INFLUENCE FROM EACH ACCOUNT"}
            description={"Control which influencer to prioritize more"}
          />
          <InfluenceList />
          <br></br>
          <SectionLabel
            heading={`Categories to track`}
            description={"Select categories that interest you to track"}
          />
          <CategorySelector
            categories={["crypto", "stocks"]}
            defaultCategory={"crypto"}
          />
        </Step>

        <Step
          title={"Deploy"}
          logo="/assets/influencer/Deploy.svg"
          disabled={agentName.length < 5}
          loading={loading}
          description="Deploy your agent to start monitoring influencer activity in real time. The agent will process tweets, and will surface relevant market signals as they unfold."
        >
          <SectionLabel heading={"Give your Agent a Name"} />
          <CommonInput
            value={agentName}
            onChange={(val) => dispatch(setAgentName(val))}
            placeholder="Enter agent name"
            minLength={5}
            maxLength={20}
          />
          <div className="flex w-full justify-between mt-6 mb-2">
            <SectionLabel
              heading={`Accounts (${selectedInfluencers?.length}/5 selected)`}
            />{" "}
            <SectionLabel heading={"Influence"} />
          </div>
          <div className="flex flex-col gap-3">
            {[...selectedInfluencers]
              .sort((a, b) => b.influence - a.influence)
              .map((inf) => (
                <div className="flex items-center w-full justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={inf.profile_image_url}
                      alt={inf.name}
                      className="size-[30px] rounded-full object-cover"
                    />

                    <div className="flex flex-col">
                      <span className="flex text-xs items-center gap-1 font-medium">
                        {inf.name}
                        {inf.verified && (
                          <img
                            src={"/assets/influencer/Verified.svg"}
                            alt="verified"
                            className="size-4 rounded-full"
                          />
                        )}
                      </span>
                      <span className="text-xxs text-low-opacity font-jetbrains-mono font-regular uppercase">
                        @{inf.username}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className=" text-xs font-jetbrains-mono text-primary-text">
                      {inf.influence}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <br></br>
          <SectionLabel heading={`Categories selected`} />
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <span
                key={category}
                className={`px-3 py-1 bg-primary-text text-primary border-white rounded-full cursor-pointer border text-xs font-regular transition-colors`}
              >
                {category}
              </span>
            ))}
          </div>
        </Step>
      </Stepper>
    </div>
  );
};

export default AgentSetup;
