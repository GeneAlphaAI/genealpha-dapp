import React from "react";
import ModelCard from "../../components/dashboard/ModelCard";

const Dashboard = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <ModelCard
        title={"LightGBM"}
        description={
          "Lightning-fast gradient boosting trees, handling categorical features and large datasets effortlessly well."
        }
      />
      <ModelCard
        title={"XGBoost"}
        description={
          "Battle-tested boosting algorithm delivering consistent accuracy on structured tabular data and time-series."
        }
      />
      <ModelCard
        title={"Random Forest"}
        description={
          "Ensemble of decision trees averaging predictions, reducing variance and guarding against overfitting."
        }
      />
      <ModelCard
        title={"Prophet"}
        description={
          "Facebook’s additive model capturing seasonality, holidays, trend shifts with interpretable forecast components."
        }
      />
      <ModelCard
        title={"ARIMA"}
        description={
          "Classical statistical model integrating autoregression and moving averages for mean-reverting price signals."
        }
      />
      <ModelCard
        title={"TFT"}
        description={
          "Attention-based architecture combining static, known, and observed features for interpretable probabilistic forecasts."
        }
      />
    </div>
  );
};

export default Dashboard;
