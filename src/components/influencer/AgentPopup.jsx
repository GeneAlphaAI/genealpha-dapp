import React, { useState, useMemo } from "react";
import CloseButton from "../buttons/CloseButton";

const AgentPopup = ({ onClose, agent }) => {
  const [selectedProfile, setSelectedProfile] = useState("all");

  const handleBackdropClick = () => {
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const getBadgeColor = (category) => {
    switch (category) {
      case "stock":
        return "bg-orange-ten-percent text-light-orange border-orange-twenty-percent";
      default:
        return "bg-green-ten-percent text-light-green border-green-twenty-percent";
    }
  };

  const getPredictionColor = (category) => {
    switch (category) {
      case "stock":
        return "bg-orange-ten-percent border-orange-twenty-percent";
      default:
        return "bg-green-ten-percent  border-green-twenty-percent";
    }
  };

  // Filter + Sort predictions
  const filteredPredictions = useMemo(() => {
    if (!agent?.predictions) return [];
    let preds = [...agent.predictions];

    if (selectedProfile !== "all") {
      preds = preds.filter((p) => p.account_info?.username === selectedProfile);
    }

    // Sort by created_at date, newest to oldest
    return preds.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }, [agent?.predictions, selectedProfile]);

  return (
    <div
      data-testid="agent-popup-backdrop"
      className="bg-black/5 backdrop-blur-[12px] fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-main-background border border-white/10 w-full h-screen sm:w-max xl:min-w-[1000px] rounded-[10px] px-5 xl:px-[38px] py-[48px] w-max lg:max-h-[90dvh] lg:h-[90dvh] relative flex flex-col overflow-hidden"
        onClick={handleContentClick}
      >
        <div className="absolute top-0 right-0 p-4">
          <CloseButton onClick={onClose} />
        </div>

        {/* ---- Header & Top Section ---- */}
        <div className="gap-5 sm:border-[0.5px] border-stroke-gray rounded-[10px] sm:p-4 flex-shrink-0">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-md font-medium">{agent?.agent}</h2>
              <div className="bg-white/4 text-inactive-text px-4 font-medium font-jetbrains-mono text-xs uppercase flex items-center justify-center rounded-[5px] h-max p-1">
                {agent?.accounts?.length} sources
              </div>
            </div>
          </div>

          {/* Combined Prediction + Categories + Sources */}
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
            {/* Combined Prediction */}
            <div className="flex flex-col gap-1 items-start text-left">
              <div className="flex items-center gap-2">
                <h4 className="text-xs text-low-opacity font-jetbrains-mono uppercase">
                  Combined Prediction
                </h4>
                <div className="flex -space-x-2">
                  {agent?.combinedPrediction?.profiles?.map((profile, idx) => (
                    <img
                      key={idx}
                      src={profile.image}
                      alt={profile.name}
                      className="w-5 h-5 rounded-full border-[0.5px] border-stroke-gray object-cover"
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-primary-text max-w-[80ch]">
                {agent?.combined_prediction?.reasoning ||
                  " A combined prediction will appear once influencers start discussing similar trends."}
              </p>
            </div>

            {/* Categories */}
            <div className="flex gap-10">
              <div className="flex flex-col gap-2 items-start text-left">
                <h4 className="text-xs text-low-opacity font-jetbrains-mono uppercase">
                  Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {agent?.categories?.map((cat, idx) => (
                    <span
                      key={idx}
                      className={`text-xs uppercase font-jetbrains-mono p-1 px-2 border-[0.5px] rounded-[5px] ${getBadgeColor(
                        cat
                      )}`}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sources */}
              <div className="flex flex-col gap-2 items-start text-left">
                <h4 className="text-xs text-low-opacity font-jetbrains-mono uppercase">
                  Sources
                </h4>
                <div className="flex flex-wrap gap-2 -space-x-3">
                  {agent?.accounts?.map((src, idx) => (
                    <img
                      key={idx}
                      src={src.account_info?.profile_image_url}
                      alt={src.name}
                      className="size-8 rounded-full border-[0.5px] border-stroke-gray object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Tab Selector ---- */}
        <div className="mt-6 no-scrollbar max-w-full overflow-x-auto lg:w-max flex gap-3 overflow-x-auto border-[0.5px] border-stroke-gray rounded-full items-center py-2 px-3 bg flex-shrink-0">
          {/* "All" tab */}
          <button
            onClick={() => setSelectedProfile("all")}
            className={`flex items-center cursor-pointer justify-center gap-2 px-3 py-1.5 rounded-full text-xxs font-medium transition ${
              selectedProfile === "all"
                ? "bg-white/10"
                : "text-low-opacity hover:bg-white/5"
            }`}
          >
            <span className="font-jetbrains-mono">All</span>
          </button>

          {/* Influencer tabs */}
          {agent?.accounts?.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedProfile(src?.account_info?.username)}
              className={`flex items-center justify-center cursor-pointer font-jetbrains-mono uppercase gap-1 px-3 py-1.5 rounded-full text-xxs uppercase font-medium transition ${
                selectedProfile === src.name
                  ? "bg-white/10 border-[0.5px] border-stroke-gray text-white"
                  : "text-low-opacity hover:bg-white/5"
              }`}
            >
              <img
                src={src.account_info?.profile_image_url}
                alt={src.account_info?.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="truncate">@{src?.account_info?.username}</span>
              {src.isVerified && (
                <img
                  src={"/assets/influencer/Verified.svg"}
                  alt="verified"
                  className="size-4 ml-1 rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* ---- Predictions Table ---- */}
        <div className="mt-4 flex-1 min-h-0 overflow-hidden">
          <div className="h-full overflow-auto">
            {" "}
            <table className="w-full text-xs border-collapse border-separate border-spacing-x-4 border-spacing-y-4">
              <thead className="sticky top-0 bg-main-background z-10">
                <tr className="font-jetbrains-mono uppercase text-low-opacity">
                  <th className="p-2 font-light text-left">Timestamp</th>
                  <th className="p-2 font-light text-left">Influencer</th>
                  <th className="p-2 font-light text-left">Asset</th>
                  <th className="p-2 font-light text-left">Prediction</th>
                  <th className="p-2 font-light text-left">Predicted Price</th>
                  <th className="p-2 font-light text-left">Actual Price</th>
                  <th className="p-2 font-light text-center">Accuracy</th>
                  <th className="p-2 font-light text-right">Category</th>
                </tr>
              </thead>
              <tbody className="">
                {filteredPredictions.map((pred, idx) => {
                  let actualPrice = pred?.summary?.current_price
                    ? `${pred?.summary?.token}: $${pred?.summary?.current_price}`
                    : "N/A";
                  let predictedPrice = pred?.summary?.predicted_price
                    ? `${pred?.summary?.token}: $${pred?.summary?.predicted_price}`
                    : "N/A";
                  let accuracy = "N/A";
                  if (
                    pred?.summary?.current_price &&
                    pred?.summary?.predicted_price
                  ) {
                    const absoluteError = Math.abs(
                      pred?.summary?.predicted_price -
                        pred?.summary?.current_price
                    );
                    const percentageError =
                      (absoluteError / pred?.summary?.current_price) * 100;

                    accuracy =
                      Math.max(0, 100 - percentageError).toFixed(0) + "%";
                  }

                  return (
                    <tr key={idx} className="align-middle ">
                      <td className="p-2 text-center align-middle font-jetbrains-mono uppercase text-low-opacity">
                        <div className="flex flex-col items-start">
                          {/* Date */}
                          <span>
                            {new Date(pred.created_at).getFullYear()}-
                            {String(
                              new Date(pred.created_at).getMonth() + 1
                            ).padStart(2, "0")}
                            -
                            {String(
                              new Date(pred.created_at).getDate()
                            ).padStart(2, "0")}
                          </span>

                          {/* Time */}
                          <span className="text-xs text-low-opacity">
                            {new Date(pred.created_at).toLocaleTimeString(
                              undefined,
                              {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </span>
                        </div>
                      </td>

                      <td className="p-2 text-left align-middle">
                        <div
                          className={` flex items-start w-max gap-2`}
                          onMouseDown={() =>
                            dispatch(toggleSelectInfluencer(item))
                          }
                        >
                          <img
                            src={pred?.account_info?.profile_image_url}
                            alt={pred?.account_info?.name}
                            className="size-[30px] rounded-full"
                          />
                          <div className="flex flex-col">
                            <span className="flex items-center gap-1 text-xs font-medium">
                              {pred?.account_info?.name}
                              {pred?.account_info?.verified && (
                                <img
                                  src={"/assets/influencer/Verified.svg"}
                                  alt="verified"
                                  className="size-4 rounded-full"
                                />
                              )}
                            </span>
                            <span className="text-xxs text-low-opacity font-jetbrains-mono font-regular uppercase">
                              @{pred?.account_info?.username}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-2 text-left align-middle font-jetbrains-mono min-w-[150px] max-w-[200px] uppercase text-low-opacity">
                        {pred?.summary?.token || "N/A"}
                      </td>

                      <td
                        className={`p-2 text-left align-middle border-[0.5px] w-[400px] min-w-[400px] max-w-[400px]  text-primary-text ${getPredictionColor(
                          pred.category
                        )} rounded-[5px]`}
                      >
                        {pred?.summary?.reason}
                        <button
                          onClick={() =>
                            window.open(
                              `https://x.com/${pred?.account_info?._id}/status/${pred?.tweet_id}`,
                              "_blank"
                            )
                          }
                          className="bg-primary/40 cursor-pointer flex px-2 py-2 mt-2 rounded-[5px]  w-max"
                        >
                          <span className="max-w-[45ch] text-xxs text-low-opacity truncate">
                            {pred?.text}
                          </span>

                          <img
                            src="/assets/general/external-link.svg"
                            alt="quote"
                            className="size-4  ml-2"
                          />
                        </button>
                      </td>
                      <td className="p-2 text-left text-primary-text font-jetbrains-mono uppercase align-middle min-w-[200px] max-w-[500px]">
                        {predictedPrice}
                      </td>
                      <td className="p-2 text-left text-primary-text font-jetbrains-mono uppercase align-middle min-w-[200px] max-w-[500px]">
                        {actualPrice}
                      </td>

                      <td className="p-2 text-center align-middle">
                        <span>{accuracy}</span>
                      </td>

                      <td className="p-2  align-right">
                        <div
                          className={`px-2 py-1 text-xxs w-[60px] font-jetbrains-mono uppercase flex justify-center items-center font-medium rounded border ${getBadgeColor(
                            pred.category
                          )}`}
                        >
                          <span>{pred.category || "crypto"}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPopup;
