import React, { useEffect, useState } from "react";
import UserInfo from "../../components/profile/UserInfo";
import SectionHeader from "../../components/profile/SectionHeader";
import ModelList from "../../components/training/ModelList";
import { useAccount } from "wagmi";
import { GetAllJobs } from "../../services/apiFunctions";
import DatasetCard from "../../components/profile/DatasetCard";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const { address } = useAccount();
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
  useEffect(() => {
    fetchJobs();
  }, []);
  const datasets = [
    {
      name: "BTC Historical Prices",
      status: "Active",
      description:
        "Daily OHLCV data for Bitcoin across multiple exchanges (2013–2025).",
      rows: 12000,
      cols: 6,
      models: 4,
      tags: ["bitcoin", "ohlcv", "timeseries"],
    },
    {
      name: "Ethereum On-chain Metrics",
      status: "Active",
      description:
        "Gas usage, transaction counts, and smart contract interactions for ETH.",
      rows: 8500,
      cols: 15,
      models: 3,
      tags: ["ethereum", "onchain", "metrics"],
    },
    {
      name: "Altcoin Market Data",
      status: "Inactive",
      description: "Aggregated daily prices and volumes for top 100 altcoins.",
      rows: 22000,
      cols: 10,
      models: 2,
      tags: ["altcoins", "marketcap", "volume"],
    },
  ];
  return (
    <div className="overflow-y-auto">
      <UserInfo />
      <br />
      <SectionHeader title="Models Deployed" />
      {jobs?.length === 0 ? (
        <div className="flex w-full h-full min-h-[200px]">
          <h1 className="text-inactive-text py-2">No models deployed yet.</h1>
        </div>
      ) : (
        <ModelList
          jobs={jobs}
          // onJobCancelled={handleJobCancelled}
          // toggleSetupPopup={() => setIsOpen(true)}
        />
      )}
      <SectionHeader title="Dataset Added" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px] py-4">
        {datasets.map((data, idx) => (
          <DatasetCard key={idx} {...data} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
