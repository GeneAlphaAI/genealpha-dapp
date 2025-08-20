import React, { useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import AgentCard from "./AgentCard";
import AgentPopup from "./AgentPopup";

const AgentsList = ({ agents, addAgent }) => {
  const [selectedAgent, setSelectedAgent] = useState(null);

  const handleCardClick = (agent) => {
    setSelectedAgent(agent);
  };

  const closePopup = () => {
    setSelectedAgent(null);
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
          <AgentCard
            key={agent.agentName}
            name={agent.agentName}
            sources={agent.sources}
            combinedPrediction={agent.combinedPrediction.text}
            profiles={agent.combinedPrediction.profiles}
            predictions={agent.predictions}
            onClick={() => handleCardClick(agent)}
          />
        ))}
      </div>

      {/* Popup */}
      {selectedAgent && (
        <AgentPopup
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </div>
  );
};

export default AgentsList;
