import React, { useState, useRef, useEffect } from "react";

const AgentCard = ({
  onClick,
  name,
  sources,
  combinedPrediction,
  profiles,
  predictions,
}) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollRef = useRef(null);

  // Background color based on category
  const getBgColor = (category) => {
    switch (category) {
      case "stock":
        return "bg-orange-ten-percent border-orange-twenty-percent"; // soft yellow
      default:
        return "bg-green-ten-percent border-green-twenty-percent";
    }
  };

  const getBadgeColor = (category) => {
    switch (category) {
      case "stock":
        return "bg-orange-ten-percent text-light-orange"; // soft yellow
      default:
        return "bg-green-ten-percent text-light-green";
    }
  };

  // Track scroll position
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const atBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 1; // +1 to handle rounding
      setIsAtBottom(atBottom);
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll(); // run on mount
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={`bg-white/2 border-1 space-y-3 border-stroke-gray rounded-[10px] flex flex-col cursor-pointer w-full h-max md:h-[400px] xl:max-w-[500px] 2xl:min-w-[450px] 2xl:max-w-[450px] px-6 py-4`}
      onClick={() => {
        if (predictions?.length > 0) {
          onClick();
        }
      }}
    >
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h2 className="text-md font-medium">{name}</h2>
          <div className="bg-white/4 text-inactive-text px-4 font-medium font-jetbrains-mono text-xs uppercase flex items-center justify-center rounded-[5px] h-max p-1">
            {sources?.length} sources
          </div>
        </div>
      </div>

      {/* Combined Prediction */}
      {combinedPrediction && (
        <div className="flex flex-col gap-1 items-start text-left">
          <div className="flex items-center gap-2">
            <h4 className="text-xs text-low-opacity font-jetbrains-mono uppercase">
              Combined Prediction
            </h4>
            <div className="flex -space-x-2">
              {profiles?.map((profile, idx) => (
                <img
                  key={idx}
                  src={profile?.profile_image_url}
                  alt={profile.name}
                  className="w-5 h-5 rounded-full border-[0.5px] border-stroke-gray object-cover"
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-primary-text">{combinedPrediction}</p>
        </div>
      )}

      {/* Predictions List */}
      {predictions?.length > 0 ? (
        <div className="flex flex-col gap-2 items-start text-left flex-1 min-h-0">
          <h4 className="text-xs text-low-opacity font-jetbrains-mono uppercase flex-shrink-0">
            {predictions?.length} Predictions
          </h4>

          <div className="relative w-full flex-1 min-h-0">
            <div
              ref={scrollRef}
              className="flex flex-col gap-2 w-full overflow-y-auto pr-2 h-full"
            >
              {predictions?.map((pred, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-3 rounded-[5px] border-[0.5px] ${getBgColor(
                    pred.category || "crypto"
                  )}`}
                >
                  <img
                    src={pred.account_info?.profile_image_url}
                    alt={pred.account_info.name}
                    className="size-10 rounded-full border-[0.5px] border-stroke-gray object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col text-xs w-full">
                    <div className="flex gap-2 items-center">
                      <span className="font-medium uppercase font-jetbrains-mono text-xxs text-medium-opacity">
                        @{pred.account_info?.username}
                      </span>
                      <span
                        className={`text-xxs uppercase font-jetbrains-mono p-1 px-2 rounded-[5px] ${getBadgeColor(
                          pred.category || "crypto"
                        )}`}
                      >
                        {pred.category || "crypto"}
                      </span>
                    </div>
                    <p className="text-primary-text line-clamp-3 mt-1">
                      {pred.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Fade overlay */}
            {!isAtBottom && (
              <div
                className={`absolute bottom-0 left-0 w-full h-5 pointer-events-none bg-gradient-to-t from-primary to-transparent transition-opacity duration-800 ease-in-out ${
                  isAtBottom ? "opacity-0" : "opacity-100"
                }`}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
          <img src="/assets/dashboard/Empty.svg" />
          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-primary-text font-medium text-[18px]">
              Your Influencers haven’t posted yet
            </h1>
            <p className="text-low-opacity text-sm max-w-[40ch] text-center">
              Once they do, their predictions will appear here for you to view!
            </p>
          </div>
        </div>
      )}
    </button>
  );
};

export default AgentCard;
