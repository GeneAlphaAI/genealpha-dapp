import React, { useState, useEffect } from "react";
import SetupPlaceholder from "../../components/influencer/SetupPlaceholder";
import AgentSetup from "../../components/influencer/AgentSetup";
import AgentsList from "../../components/influencer/AgentsList";
import Loader from "../../components/loaders/Loader";
import { GetAgents } from "../../services/apiFunctions";
import { useAccount } from "wagmi";
import { addPredictionsToAgents } from "../../utilities/helpers";

const InfluencerAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  // 🔹 Fetch agents from API
  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await GetAgents(address);
      console.log(response);
      if (response?.status === 200) {
        let updatedAgents = addPredictionsToAgents(response?.data?.agents);

        setAgents(updatedAgents);
      }
    } catch (err) {
      console.error(err);
      setAgents([]); // fallback empty
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="flex w-full h-full">
      {/* Trigger to open the popup */}
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader />
        </div>
      ) : agents.length > 0 ? (
        <AgentsList agents={agents} addAgent={() => setIsOpen(true)} />
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <SetupPlaceholder onClick={() => setIsOpen(true)} />
        </div>
      )}

      {/* Render AgentSetup as a popup only when isOpen is true */}
      {isOpen && (
        <AgentSetup
          onClose={() => {
            setIsOpen(false);
            fetchAgents(); // 🔄 refresh agents list after closing setup
          }}
        />
      )}
    </div>
  );
};

export default InfluencerAgent;
