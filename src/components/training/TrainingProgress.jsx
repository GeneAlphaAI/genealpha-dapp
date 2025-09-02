import React, { useEffect, useState } from "react";
import { GetJobStatus } from "../../services/apiFunctions";

const TrainingProgress = ({
  progress: initialProgress,
  status: initialStatus,
  isInsideCard = false,
  jobId,
}) => {
  const [progress, setProgress] = useState(initialProgress ?? 0);
  const [status, setStatus] = useState(initialStatus ?? "pending");
  const [animatedWidth, setAnimatedWidth] = useState(initialProgress ?? 0);

  const isComplete = progress >= 100;
  const isFailed = status?.toLowerCase() === "failed";

  // Sync state with props if they change
  useEffect(() => {
    setProgress(initialProgress ?? 0);
    setStatus(initialStatus ?? "pending");
  }, [initialProgress, initialStatus]);

  // Poll job status API until complete or failed
  useEffect(() => {
    if (!jobId) return;

    let interval;

    const fetchStatus = async () => {
      const res = await GetJobStatus(jobId);
      if (res) {
        console.log(jobId, res);
        setProgress(res.progress ?? 0);
        setStatus(res.status ?? "pending");

        // stop polling when complete or failed
        if (
          (res.progress >= 100 || res.status?.toLowerCase() === "failed") &&
          interval
        ) {
          clearInterval(interval);
        }
      }
    };

    fetchStatus(); // fetch immediately

    interval = setInterval(fetchStatus, 5000); // then poll every 5s

    return () => clearInterval(interval);
  }, [jobId]);

  // Animate width on progress change
  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedWidth(progress), 100);
    return () => clearTimeout(timeout);
  }, [progress]);

  const renderStatus = () => (
    <div className="flex justify-between mt-4 items-center mb-2 text-gray-500">
      {isComplete ? (
        <div className="flex items-center gap-1 text-xs font-jetbrains-mono font-normal">
          COMPLETED
          <svg
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6.5" cy="7" r="6.5" fill="#47BF4B" />
            <path
              d="M3.41504 7.21842L5.11797 8.92138C5.31324 9.11664 5.62983 9.11664 5.82509 8.92137L9.6543 5.09197"
              stroke="#F9F9F9"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ) : isFailed ? (
        <div className="flex items-center gap-1 text-xs font-jetbrains-mono font-normal text-red-500">
          FAILED
        </div>
      ) : (
        <div className="font-jetbrains-mono text-xs uppercase">{status}</div>
      )}
      <div className="text-right text-xs font-jetbrains-mono">{progress}%</div>
    </div>
  );

  return (
    <div className="w-full">
      {!isInsideCard && renderStatus()}

      <div className="w-full h-1 rounded-full overflow-hidden bg-white/10">
        <div
          className="h-full rounded-full transition-[width] duration-700 ease-out"
          style={{
            width: `${animatedWidth}%`,
            background:
              "linear-gradient(90deg, #B4B4B4 0%, #FFF 49.52%, #949494 100%)",
          }}
        />
      </div>

      {isInsideCard && renderStatus()}
    </div>
  );
};

export default TrainingProgress;
