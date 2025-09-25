import React from "react";

const DatasetCard = ({
  name,
  status,
  description,
  rows,
  cols,
  models,
  tags = [],
}) => {
  return (
    <div className="bg-white/2 border border-stroke-gray rounded-[10px] p-4 flex flex-col cursor-pointer">
      {/* Title + Status */}
      <div className="flex items-center gap-3 mb-1">
        <h2 className="font-semibold text-md">{name}</h2>
        <div className="bg-white/4 text-inactive-text px-3 py-1 font-medium font-jetbrains-mono text-xs uppercase flex items-center justify-center rounded-[5px] h-max">
          {status}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-3 text-xs font-jetbrains-mono text-medium-opacity uppercase mb-3">
        <div className="flex items-center gap-1">
          <img
            src="/assets/dataset/Rows.svg"
            alt="rows"
            className="size-4 opacity-60"
          />
          <span>{rows}</span>
        </div>
        <div className="flex items-center gap-1">
          <img
            src="/assets/dataset/Cols.svg"
            alt="cols"
            className="size-4 opacity-60"
          />
          <span>{cols}</span>
        </div>
        <div className="flex items-center gap-1">
          <img
            src="/assets/dataset/Hive.svg"
            alt="models"
            className="size-4 opacity-60"
          />
          <span>{models}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-medium-opacity mb-3">{description}</p>
      <div className="text-inactive-text font-medium font-jetbrains-mono text-xs uppercase h-max mb-2">
        Tags
      </div>
      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <div
              key={tag}
              className={`px-3 py-1 rounded-full cursor-pointer border text-xs font-regular transition-colors bg-transparent text-primary-text border-stroke-gray hover:border-white/60`}
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DatasetCard;
