import React, { useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import AgentCard from "./AgentCard";
import AgentPopup from "./AgentPopup";
import DeletePopup from "./DeletePopup";
import EditPopup from "./EditPopup";
import { useDispatch } from "react-redux";
import {
  addInfluencersFromAccounts,
  resetInfluencerState,
  setAgentName,
} from "../../store/slices/influencer";

const AgentsList = ({ agents, addAgent }) => {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [agentPopup, setAgentPopup] = useState(false);
  const [name, setName] = useState(null);
  const dispatch = useDispatch();
  const handleCardClick = (agent) => {
    setSelectedAgent(agent);
    setAgentPopup(true);
  };

  return (
    <div className="w-full md:mx-2 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row pt-2 pb-6 gap-3 border-b border-stroke-gray items-start lg:justify-between lg:items-center w-full">
        <div>
          <div className="flex gap-2 items-center">
            <h1 className="text-md font-medium">Influencer Agents</h1>
            <span className="bg-white/4 text-inactive-text px-4 font-medium font-jetbrains-mono text-xxs lg:text-xs uppercase flex items-center justify-center rounded-[5px] h-max p-1">
              {agents?.length}/5 deployed
            </span>
          </div>
          <p className="font-regular  text-sm text-secondary-text max-w-[60ch] 2xl:max-w-[80ch]">
            View all the influencer agents you’ve created in one place. Compare
            performance, analyze tweet-driven predictions, and decide which
            agents to adjust, or deploy into live tracking.
          </p>
        </div>
        <PrimaryButton onClick={addAgent} className="px-10 h-[2.2rem]">
          Add Agent
        </PrimaryButton>
      </div>

      {/* Agent Cards */}
      <div className="flex flex-wrap gap-4">
        {agents?.map((agent) => (
          <>
            <AgentCard
              key={agent?.agent}
              name={agent?.agent}
              sources={agent?.accounts}
              combinedPrediction={agent?.combined_prediction?.reasoning}
              profiles={agent?.combinedPrediction?.profiles}
              predictions={agent?.predictions}
              onClick={() => handleCardClick(agent)}
              toggleEditPopup={() => {
                setEditPopup(!editPopup);
                dispatch(addInfluencersFromAccounts(agent?.accounts));
                dispatch(setAgentName(agent?.agent));
                setSelectedAgent(agent);
              }}
              toggleDeletePopup={(name) => {
                setDeletePopup(!deletePopup);
                setName(name);
              }}
            />
          </>
        ))}
      </div>

      {/* Popup */}
      {agentPopup && (
        <AgentPopup
          agent={selectedAgent}
          onClose={() => {
            setSelectedAgent(null);
            setAgentPopup(false);
          }}
        />
      )}
      {deletePopup && (
        <DeletePopup
          onClose={() => setDeletePopup(!deletePopup)}
          agentName={name}
        />
      )}
      {editPopup && (
        <EditPopup
          onClose={() => {
            setEditPopup(false);
          }}
          agent={selectedAgent}
        />
      )}
    </div>
  );
};

export default AgentsList;
