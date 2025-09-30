import React from "react";

const formatTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? " PM" : " AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutesStr}${ampm}`;
};

const PredictionTable = () => {
  const now = new Date();
  const timeStr = formatTime(now);
  const rows = Array(8).fill({
    // increased to 20 for demo
    date: timeStr,
    time: timeStr,
    predictions: timeStr,
    actual: timeStr,
    error: timeStr,
  });

  return (
    <div className="w-full max-h-72 overflow-y-auto max-w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="sticky top-0 bg-table-head z-10">
          <tr>
            <th className="pb-2 pr-3 font-jetbrains-mono font-medium text-xxs text-low-opacity uppercase whitespace-nowrap">
              Date
            </th>
            <th className="pb-2 pr-3 font-jetbrains-mono font-medium text-xxs text-low-opacity uppercase whitespace-nowrap">
              Time
            </th>
            <th className="pb-2 pr-3 font-jetbrains-mono font-medium text-xxs text-low-opacity uppercase whitespace-nowrap">
              Predictions
            </th>
            <th className="pb-2 pr-3 font-jetbrains-mono font-medium text-xxs text-low-opacity uppercase whitespace-nowrap">
              Actual
            </th>
            <th className="pb-2 pr-3 font-jetbrains-mono font-medium text-xxs text-low-opacity uppercase whitespace-nowrap">
              Error
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="">
              <td className="py-1.5 pr-3 font-jetbrains-mono font-medium text-xxs text-primary-text whitespace-nowrap">
                {row.date}
              </td>
              <td className="py-1.5 pr-3 font-jetbrains-mono font-medium text-xxs text-primary-text whitespace-nowrap">
                {row.time}
              </td>
              <td className="py-1.5 pr-3 font-jetbrains-mono font-medium text-xxs text-primary-text whitespace-nowrap">
                {row.predictions}
              </td>
              <td className="py-1.5 pr-3 font-jetbrains-mono font-medium text-xxs text-primary-text whitespace-nowrap">
                {row.actual}
              </td>
              <td className="py-1.5 pr-3 font-jetbrains-mono font-medium text-xxs text-primary-text whitespace-nowrap">
                {row.error}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionTable;
