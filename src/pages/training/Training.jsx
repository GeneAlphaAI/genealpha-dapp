import React, { useEffect, useState } from "react";
import TrainingPlaceholder from "../../components/training/TrainingPlaceholder";
import TrainingSetup from "../../components/training/TrainingSetup";
import ModelList from "../../components/training/ModelList";
import ProgressPopup from "../../components/training/ProgressPopup";
import { GetAllJobs } from "../../services/apiFunctions";
import Loader from "../../components/loaders/Loader";
import { useAccount } from "wagmi";
import useTokenBalance from "../../utilities/useTokenBalance";
const whitelist = [
  "0xB4DC7980B7b54a96003285C7390da53F739459Ec",
  "0xDc1427D281F26E48d8c136bCeEd363Df2b91A205",
  "0x78169CaFc8d9d3a9C3DA3B5D1F08fE01101D6af8",
  "0x82f936748318149331B2CFE6e9deE8ba37647063",
  "0xc79198cb232a77e425E02E4fd1c921DC154C968E",
  "0xF935d0A213c2eE0Cbbc5638994b8e0E3cF2F7a93",
];
const Training = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [deployedJob, setDeployedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const { balance, isFetched } = useTokenBalance(
    "0x5e6dd9a767894470e7e93e603c25f681a5adf1ae"
  );
  const handleJobCancelled = (jobId) => {
    setJobs((prev) => prev.filter((j) => j.job_id !== jobId));
  };
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await GetAllJobs();
      console.log("Jobs Response:", response);
      if (response?.status === 200) {
        setJobs(response?.data?.jobs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const hasRequiredBalance =
    Number((Number(balance) / 10 ** 18).toFixed(3)) >= 50000;

  useEffect(() => {
    if (hasRequiredBalance || isWhitelisted(address)) {
      fetchJobs();
    }
  }, [deployedJob]);

  if (loading) {
    return (
      <div className="flex w-full h-full">
        <div className="flex items-center justify-center w-full h-full">
          <Loader />
        </div>
      </div>
    );
  }
  const isWhitelisted = (addr) =>
    addr && whitelist.map((a) => a.toLowerCase()).includes(addr.toLowerCase());

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
      {jobs?.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <TrainingPlaceholder onClick={() => setIsOpen(true)} />
        </div>
      ) : (
        <ModelList
          jobs={jobs}
          onJobCancelled={handleJobCancelled}
          toggleSetupPopup={() => setIsOpen(true)}
        />
      )}
      {isProgressOpen && (
        <ProgressPopup
          progress={deployedJob?.progress || 0}
          status={deployedJob?.status || "pending"}
          onClose={() => setIsProgressOpen(false)}
          jobId={deployedJob?.job_id}
        />
      )}

      {isOpen && (
        <TrainingSetup
          setDeployedJob={setDeployedJob}
          openProgressPopup={() => setIsProgressOpen(true)}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Training;
