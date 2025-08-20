import React, { useState } from "react";
import SetupPlaceholder from "../../components/influencer/SetupPlaceholder";
import AgentSetup from "../../components/influencer/AgentSetup";
import AgentsList from "../../components/influencer/AgentsList";
const sampleData = [
  {
    name: "Income Shark",
    username: "incomeshark",
    isVerified: true,
    image: "/assets/sample/incomeshark.jpg",
  },
  {
    name: "Cheds Trading",
    username: "BigCheds",
    isVerified: true,
    image: "/assets/sample/bigcheds.jpg",
  },
  {
    name: "Crypto Tony",
    username: "CryptoTony__",
    isVerified: false,
    image: "/assets/sample/cryptotony.jpg",
  },
  {
    name: "il Capo of Crypto",
    username: "CryptoCapo_",
    isVerified: false,
    image: "/assets/sample/ilcapo.jpg",
  },
  {
    name: "Eliz",
    username: "eliz883",
    isVerified: true,
    image: "/assets/sample/eliz.jpg",
  },
];

const agents = [
  {
    agentName: "Agent Alpha",
    sources: [sampleData[0], sampleData[2], sampleData[4]],
    categories: ["crypto"],
    predictions: [
      {
        influencer: sampleData[0],
        assetName: "Ethereum",
        assetSymbol: "ETH",
        category: "crypto",
        actualAmount: 5000,
        timestamp: "2025-08-15T12:15:00Z",
        accuracy: 0.82,
        text: "ETH is starting to outpace BTC — momentum’s picking up again after a long lull, hinting at an early bullish shift.",
      },
      {
        influencer: sampleData[2],
        assetName: "Ethereum",
        assetSymbol: "ETH",
        category: "crypto",
        actualAmount: 6000,
        accuracy: 0.88,
        timestamp: "2025-08-15T15:20:00Z",
        text: "Ethereum looking ready to break the $6k mark if market sentiment stays bullish for the next month.",
      },
      {
        influencer: sampleData[4],
        assetName: "Palm Token",
        assetSymbol: "PALM",
        category: "crypto",
        actualAmount: 2.5,
        accuracy: 0.88,
        timestamp: "2025-08-15T16:00:00Z",
        text: "Palm Token is showing early breakout patterns — could double in the coming weeks.",
      },
      {
        influencer: sampleData[0],
        assetName: "Ethereum",
        assetSymbol: "ETH",
        category: "crypto",
        actualAmount: 5000,
        timestamp: "2025-08-15T12:15:00Z",
        accuracy: 0.82,
        text: "ETH is starting to outpace BTC — momentum’s picking up again after a long lull, hinting at an early bullish shift.",
      },
      {
        influencer: sampleData[2],
        assetName: "Ethereum",
        assetSymbol: "ETH",
        category: "crypto",
        actualAmount: 6000,
        accuracy: 0.88,
        timestamp: "2025-08-15T15:20:00Z",
        text: "Ethereum looking ready to break the $6k mark if market sentiment stays bullish for the next month.",
      },
      {
        influencer: sampleData[4],
        assetName: "Palm Token",
        assetSymbol: "PALM",
        category: "crypto",
        actualAmount: 2.5,
        accuracy: 0.88,
        timestamp: "2025-08-15T16:00:00Z",
        text: "Palm Token is showing early breakout patterns — could double in the coming weeks.",
      },
      {
        influencer: sampleData[0],
        assetName: "Ethereum",
        assetSymbol: "ETH",
        category: "crypto",
        actualAmount: 5000,
        timestamp: "2025-08-15T12:15:00Z",
        accuracy: 0.82,
        text: "ETH is starting to outpace BTC — momentum’s picking up again after a long lull, hinting at an early bullish shift.",
      },
      {
        influencer: sampleData[2],
        assetName: "Ethereum",
        assetSymbol: "ETH",
        category: "crypto",
        actualAmount: 6000,
        accuracy: 0.88,
        timestamp: "2025-08-15T15:20:00Z",
        text: "Ethereum looking ready to break the $6k mark if market sentiment stays bullish for the next month.",
      },
      {
        influencer: sampleData[4],
        assetName: "Palm Token",
        assetSymbol: "PALM",
        category: "crypto",
        actualAmount: 2.5,
        accuracy: 0.88,
        timestamp: "2025-08-15T16:00:00Z",
        text: "Palm Token is showing early breakout patterns — could double in the coming weeks.",
      },
      {
        influencer: sampleData[0],
        assetName: "Ethereum",
        assetSymbol: "ETH",
        category: "crypto",
        actualAmount: 5000,
        timestamp: "2025-08-15T12:15:00Z",
        accuracy: 0.82,
        text: "ETH is starting to outpace BTC — momentum’s picking up again after a long lull, hinting at an early bullish shift.",
      },
      {
        influencer: sampleData[2],
        assetName: "Ethereum",
        assetSymbol: "ETH",
        category: "crypto",
        actualAmount: 6000,
        accuracy: 0.88,
        timestamp: "2025-08-15T15:20:00Z",
        text: "Ethereum looking ready to break the $6k mark if market sentiment stays bullish for the next month.",
      },
      {
        influencer: sampleData[4],
        assetName: "Palm Token",
        assetSymbol: "PALM",
        category: "crypto",
        actualAmount: 2.5,
        accuracy: 0.88,
        timestamp: "2025-08-15T16:00:00Z",
        text: "Palm Token is showing early breakout patterns — could double in the coming weeks.",
      },
    ],
    combinedPrediction: {
      text: "All three sources anticipate that Ethereum will soar to between $5000 and $6000 within the next 3 to 4 weeks. Additionally, smaller tokens like Palm Token (PALM) may gain momentum.",
      profiles: [sampleData[0], sampleData[2], sampleData[4]],
    },
  },
  {
    agentName: "Agent Beta",
    sources: [sampleData[1], sampleData[3], sampleData[4]],
    categories: ["crypto", "stock"],
    predictions: [],
    combinedPrediction: {},
  },
  {
    agentName: "Agent Gamma",
    sources: [sampleData[2], sampleData[4], sampleData[3]],
    categories: ["crypto", "stock"],
    predictions: [
      {
        influencer: sampleData[2],
        assetName: "Solana",
        assetSymbol: "SOL",
        category: "crypto",
        actualAmount: 300,
        accuracy: 0.88,
        timestamp: "2025-08-14T17:50:00Z",
        text: "SOL is showing a bullish pennant — breakout could push price toward $300.",
      },
      {
        influencer: sampleData[3],
        assetName: "Nvidia",
        assetSymbol: "NVDA",
        category: "stock",
        actualAmount: 1400,
        accuracy: 0.88,
        timestamp: "2025-08-15T10:05:00Z",
        text: "NVDA could hit $1400 driven by strong AI chip demand and supply chain improvements.",
      },
      {
        influencer: sampleData[4],
        assetName: "Polygon",
        assetSymbol: "MATIC",
        category: "crypto",
        actualAmount: 2.2,
        accuracy: 0.88,
        timestamp: "2025-08-15T14:10:00Z",
        text: "MATIC may see renewed demand as new DeFi projects launch on Polygon.",
      },
    ],
    combinedPrediction: {
      text: "Expect SOL to aim for $300, MATIC to climb toward $2.20, and NVDA to approach $1400 as tech and crypto markets align bullishly.",
      profiles: [sampleData[2], sampleData[3], sampleData[4]],
    },
  },
];

const InfluencerAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex w-full h-full ">
      {/* Trigger to open the popup */}
      {agents.length > 0 ? (
        <AgentsList agents={agents} addAgent={() => setIsOpen(true)} />
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <SetupPlaceholder onClick={() => setIsOpen(true)} />
        </div>
      )}

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
