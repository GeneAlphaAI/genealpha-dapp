import React, { useState, useEffect } from "react";
import SetupPlaceholder from "../../components/influencer/SetupPlaceholder";
import AgentSetup from "../../components/influencer/AgentSetup";
import AgentsList from "../../components/influencer/AgentsList";
import Loader from "../../components/loaders/Loader";
import { GetAgents } from "../../services/apiFunctions";
import { useAccount } from "wagmi";
import { addPredictionsToAgents } from "../../utilities/helpers";
import ConnectWalletPlaceholder from "../../components/connect/ConnectWalletPlaceholder";
import useTokenBalance from "../../utilities/useTokenBalance";
import { useDispatch, useSelector } from "react-redux";
import { setDataUpdated } from "../../store/slices/influencer";
const whitelist = [
  "0xB4DC7980B7b54a96003285C7390da53F739459Ec",
  "0xDc1427D281F26E48d8c136bCeEd363Df2b91A205",
  "0x78169CaFc8d9d3a9C3DA3B5D1F08fE01101D6af8",
  "0x82f936748318149331B2CFE6e9deE8ba37647063",
  "0xc79198cb232a77e425E02E4fd1c921DC154C968E",
  "0xF935d0A213c2eE0Cbbc5638994b8e0E3cF2F7a93",
  "0x867c228764E044D09B6686068B6031376db62e70",
  "0xEA688fDf236d28D896f6a59Bb56e3Fb184621aC0",
];
const InfluencerAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { address, isConnected } = useAccount();
  const { balance, isFetched } = useTokenBalance(
    "0x5e6dd9a767894470e7e93e603c25f681a5adf1ae"
  );
  const dispatch = useDispatch();
  const { dataUpdated } = useSelector((s) => s.influencer);
  const isWhitelisted = (addr) =>
    addr && whitelist.map((a) => a.toLowerCase()).includes(addr.toLowerCase());
  // 🔹 Fetch agents from API
  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await GetAgents(address);

      if (response?.status === 200) {
        let updatedAgents = addPredictionsToAgents(response?.data?.agents);

        setAgents(updatedAgents);
      }
    } catch (err) {
      console.error(err);
      setAgents([]); // fallback empty
    } finally {
      setLoading(false);
      dispatch(setDataUpdated(false));
    }
  };

  useEffect(() => {
    fetchAgents();
  }, [dataUpdated]);

  const hasRequiredBalance =
    Number((Number(balance) / 10 ** 18).toFixed(3)) >= 50000;

  if (!hasRequiredBalance && !isWhitelisted(address)) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <h1 className="text-inactive-text">
          You need atleast 50,000 GA Tokens to access the influencer agent.
        </h1>
      </div>
    );
  }

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
