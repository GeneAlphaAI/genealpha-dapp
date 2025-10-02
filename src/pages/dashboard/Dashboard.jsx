import React, { useEffect, useState } from "react";
import ModelCard from "../../components/dashboard/ModelCard";
import Popup from "../../components/Popups/Popup";
import HistoricalPredictionCard from "../../components/dashboard/HistoricalPredictionCard";
import WaveGraph from "../../components/Graph/WaveGraph";
import Loader from "../../components/loaders/Loader";
import { GetEthPrice, GetPredictions } from "../../services/apiFunctions";
import { useSelector } from "react-redux";
import { formatPrice } from "../../utilities/helpers";
import useTokenBalance from "../../utilities/useTokenBalance";
import { useAccount } from "wagmi";
import WorkInProgress from "../../components/training/WorkInProgress";
const modelData = [
  {
    title: "LightGBM",
    key: "lightgbm",
    description:
      "Lightning-fast gradient boosting trees, handling categorical features and large datasets effortlessly well.",
  },
  {
    title: "Random Forest",
    key: "random_forest",
    description:
      "Ensemble of decision trees averaging predictions, reducing variance and guarding against overfitting.",
  },
  {
    title: "Ensemble",
    key: "ensemble",
    description:
      "Weighted ensemble combining LightGBM and RF predictions using optimal GA-derived weights for accuracy.",
  },
  // {
  //   title: "Prophet",
  //   description:
  //     "Facebook’s additive model capturing seasonality, holidays, trend shifts with interpretable forecast components.",
  // },
  // {
  //   title: "ARIMA",
  //   description:
  //     "Classical statistical model integrating autoregression and moving averages for mean-reverting price signals.",
  // },
  // {
  //   title: "TFT",
  //   description:
  //     "Attention-based architecture combining static, known, and observed features for interpretable probabilistic forecasts.",
  // },
];
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
const Dashboard = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // NEW
  const handleCardClick = (model) => {
    setSelectedModel(model);
  };
  const { isConnected, address } = useAccount();
  const [liveModels, setLiveModels] = useState(null);
  const { selectedToken } = useSelector((state) => state.token);
  const { balance, isFetched } = useTokenBalance(
    "0x5e6dd9a767894470e7e93e603c25f681a5adf1ae"
  );
  const isWhitelisted = (addr) =>
    addr && whitelist.map((a) => a.toLowerCase()).includes(addr.toLowerCase());
  const handleClosePopup = () => {
    setSelectedModel(null);
  };

  const GetLiveModels = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await GetPredictions(selectedToken);
      const predictions = res?.data?.predicted_price_next_hour || {};
      if (res?.status !== 200) {
        setErrorMessage("Server error while fetching predictions.");
      }
      const price = await GetEthPrice(
        "0xa93d86Af16fe83F064E3C0e2F3d129F7B7b002b0"
      );

      const transformedModels = modelData
        .map((model) => {
          if (predictions.hasOwnProperty(model.key) && price?.price) {
            const predicted = Number(predictions[model.key]);
            const actual = price.price;
            const error = Math.abs((predicted - actual) / actual) * 100; // Error percentage

            return {
              title: model.title,
              description: model.description,
              predictedPrice: formatPrice(predicted),
              currentPrice: actual,
              error: error.toFixed(2), // Keep 2 decimal places
            };
          }
          return null;
        })
        .filter(Boolean);

      setLiveModels({
        token: res?.data?.token,
        timestamp: res?.data?.timestamp,
        models: transformedModels,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (selectedToken && isConnected) {
      GetLiveModels();
    }
  }, [selectedToken, isConnected]);
  if (!isConnected) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <h1 className="text-inactive-text">
          Please connect your wallet to access the live models.
        </h1>
      </div>
    );
  }
  if (isLoading || !isFetched) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Loader />
      </div>
    );
  }
  const hasRequiredBalance =
    Number((Number(balance) / 10 ** 18).toFixed(3)) >= 25000;

  if (!hasRequiredBalance && !isWhitelisted(address)) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <h1 className="text-inactive-text">
          You need atleast 25,000 GA Tokens to access the live models.
        </h1>
      </div>
    );
  }

  if (errorMessage !== null) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <h1 className="text-inactive-text">{errorMessage}</h1>
      </div>
    );
  }

  if (liveModels?.models.length === 0 && !isLoading) {
    return <WorkInProgress />;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {liveModels?.models.map((model) => (
        <ModelCard
          key={model.title}
          title={model.title}
          description={model.description}
          currentPrice={model?.currentPrice}
          predictedPrice={model?.predictedPrice}
          error={model?.error}
          onClick={() => handleCardClick(model)}
        />
      ))}

      {selectedModel && (
        <Popup onClose={handleClosePopup}>
          <button
            className="absolute top-[10px] right-[10px] md:top-[15px] md:right-[15px]"
            onClick={handleClosePopup}
            aria-label="Close"
          >
            <img
              src="/assets/general/close-button.svg"
              alt="close"
              className="size-[24px] aspect-square"
            />
          </button>
          <div className="flex flex-col md:flex-row items-stretch gap-4 lg:gap-[30px] 3xl:gap-5">
            <ModelCard
              title={selectedModel?.title}
              description={selectedModel?.description}
              currentPrice={selectedModel?.currentPrice}
              predictedPrice={selectedModel?.predictedPrice}
              error={selectedModel?.error}
              titleTextSize="text-[18px] lg:text-md font-medium text-primary-text"
              descriptionTextSize="text-dull-white text-xxs lg:text-xs font-medium"
              className="items-start w-full max-w-full md:max-w-[400px] xl:max-w-[500px] px-4 lg:px-6 py-2 lg:py-4"
            />
            <HistoricalPredictionCard />
          </div>
          <div className="mt-4 lg:mt-[30px] 3xl:mt-5">
            <WaveGraph />
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Dashboard;
