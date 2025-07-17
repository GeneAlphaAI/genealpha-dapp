import React, { useState } from "react";
import ModelCard from "../../components/dashboard/ModelCard";
import Popup from "../../components/Popups/Popup";
import HistoricalPredictionCard from "../../components/dashboard/HistoricalPredictionCard";
import WaveGraph from "../../components/Graph/WaveGraph";
const modelData = [
  {
    title: "LightGBM",
    description:
      "Lightning-fast gradient boosting trees, handling categorical features and large datasets effortlessly well.",
  },
  {
    title: "XGBoost",
    description:
      "Battle-tested boosting algorithm delivering consistent accuracy on structured tabular data and time-series.",
  },
  {
    title: "Random Forest",
    description:
      "Ensemble of decision trees averaging predictions, reducing variance and guarding against overfitting.",
  },
  {
    title: "Prophet",
    description:
      "Facebook’s additive model capturing seasonality, holidays, trend shifts with interpretable forecast components.",
  },
  {
    title: "ARIMA",
    description:
      "Classical statistical model integrating autoregression and moving averages for mean-reverting price signals.",
  },
  {
    title: "TFT",
    description:
      "Attention-based architecture combining static, known, and observed features for interpretable probabilistic forecasts.",
  },
];

const Dashboard = () => {
  const [selectedModel, setSelectedModel] = useState(null);

  const handleCardClick = (model) => {
    setSelectedModel(model);
  };

  const handleClosePopup = () => {
    setSelectedModel(null);
  };

  return (
    <div className="flex flex-wrap gap-4">
      {modelData.map((model) => (
        <ModelCard
          key={model.title}
          title={model.title}
          description={model.description}
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
              title={selectedModel.title}
              description={selectedModel.description}
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
