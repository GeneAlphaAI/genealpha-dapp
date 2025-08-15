import React, { useState } from "react";
import SetupPlaceholder from "../../components/influencer/SetupPlaceholder";
import AgentSetup from "../../components/influencer/AgentSetup";

const InfluencerAgent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full h-full items-center justify-center">
      {/* Trigger to open the popup */}

      <SetupPlaceholder onClick={() => setIsOpen(true)} />

      {/* Render AgentSetup as a popup only when isOpen is true */}
      {isOpen && (
        <AgentSetup
          onClose={() => setIsOpen(false)} // Pass close handler
        />
      )}
    </div>
  );
};

export default InfluencerAgent;
