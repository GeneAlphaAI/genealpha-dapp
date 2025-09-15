import React, { useEffect, useRef, useState } from "react";
import SectionLabel from "./SectionLabel";
import CategorySelector from "./CategorySelector";
import Stepper, { Step } from "./Stepper";
import ExpandingSearchBar from "./ExpandingSearchbar";
import InfluenceList from "./InfluenceList";
import {
  removeInfluencer,
  resetInfluencerState,
  setAgentName,
} from "../../store/slices/influencer";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";
import CommonInput from "../form/CommonInput";
import { UpdateAgent } from "../../services/apiFunctions";
import showToast from "../../utilities/showToast";

const EditPopup = ({ onClose, agent }) => {
  const { address } = useAccount();
  const dispatch = useDispatch();
  const { selectedInfluencers, agentName, selectedCategories } = useSelector(
    (state) => state.influencer
  );
  const popupRef = useRef(null);

  const [loading, setLoading] = useState();
  const buildUpdatePayload = () => {
    const payload = {
      wallet: address,
      agent_name: agent.agent,
    };

    // 1. Check for new agent name
    if (agentName && agentName !== agent.agent) {
      payload.new_agent_name = agentName;
    }

    // 2. Diff accounts
    const originalAccounts = agent.accounts || [];
    const originalMap = Object.fromEntries(
      originalAccounts.map((acc) => [acc.username, acc.influence])
    );

    const currentMap = Object.fromEntries(
      selectedInfluencers.map((inf) => [inf.username, inf.influence])
    );

    const update_influences = {};
    const add_accounts = [];
    const remove_accounts = [];

    // Check updates + additions
    for (const [username, influence] of Object.entries(currentMap)) {
      if (originalMap[username] != null) {
        // existed before → check for influence change
        if (originalMap[username] !== influence) {
          update_influences[username] = influence;
        }
      } else {
        // new account
        const acc = selectedInfluencers.find((i) => i.username === username);
        add_accounts.push({ username, influence });
      }
    }

    // Check removals
    for (const orig of originalAccounts) {
      if (!currentMap[orig.username]) {
        remove_accounts.push(orig.username);
      }
    }

    if (Object.keys(update_influences).length > 0) {
      payload.update_influences = update_influences;
    }
    if (add_accounts.length > 0) {
      payload.add_accounts = add_accounts;
    }
    if (remove_accounts.length > 0) {
      payload.remove_accounts = remove_accounts;
    }

    // 3. Categories
    const categoriesChanged =
      JSON.stringify(agent.categories.sort()) !==
      JSON.stringify([...selectedCategories].sort());

    if (categoriesChanged) {
      payload.categories = selectedCategories;
    }

    return payload;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = buildUpdatePayload();
      const keys = Object.keys(payload);
      if (keys.length <= 2) {
        showToast("error", "No changes detected", "/assets/Toast/Error.svg");
        return;
      }
      console.log(payload);
      const response = await UpdateAgent(payload);
      if (response?.status == 200) {
        showToast(
          "success",
          "Agent Updated Successfully",
          "/assets/Toast/Success.svg"
        );
      }
    } catch (error) {
      console.log(error);
      showToast(
        "error",
        "Unusal Error Occured During Update",
        "/assets/Toast/Error.svg"
      );
    } finally {
      setLoading(false);
      dispatch(resetInfluencerState());
      onClose();
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
        dispatch(resetInfluencerState());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className="bg-black/5 backdrop-blur-[12px] fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
      <div ref={popupRef}>
        <Stepper
          initialStep={0}
          onStepChange={(step) => {}}
          onFinalStepCompleted={handleSubmit}
          backButtonText="Previous"
          nextButtonText="Next"
          onClose={onClose}
        >
          <Step
            title={"Update Influencers"}
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
            title={"Update"}
            logo="/assets/influencer/Deploy.svg"
            disabled={agentName.length < 5}
            loading={loading}
            description="Update your agent to start monitoring influencer activity in real time. The agent will process tweets, and will surface relevant market signals as they unfold."
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
    </div>
  );
};

export default EditPopup;
