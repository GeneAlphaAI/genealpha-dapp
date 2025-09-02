import React, { useEffect, useState } from "react";
import TrainingPlaceholder from "../../components/training/TrainingPlaceholder";
import TrainingSetup from "../../components/training/TrainingSetup";
import ModelList from "../../components/training/ModelList";
import ProgressPopup from "../../components/training/ProgressPopup";
import { GetAllJobs } from "../../services/apiFunctions";
import Loader from "../../components/loaders/Loader";

const Training = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [deployedJob, setDeployedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await GetAllJobs();
      if (response?.status === 200) {
        setJobs(response?.data?.jobs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
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

  return (
    <div className="flex w-full h-full">
      {jobs?.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <TrainingPlaceholder onClick={() => setIsOpen(true)} />
        </div>
      ) : (
        <ModelList jobs={jobs} toggleSetupPopup={() => setIsOpen(true)} />
      )}
      {isProgressOpen && (
        <ProgressPopup
          progress={deployedJob?.progress || 0}
          status={deployedJob?.status || "pending"}
          onClose={() => setIsProgressOpen(false)}
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
