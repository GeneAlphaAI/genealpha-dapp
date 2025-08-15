import React from "react";

const SectionLabel = ({ heading, description }) => {
  return (
    <div className="flex flex-col items-start font-jetbrains-mono gap-1 pb-2">
      <h4 className="text-xs text-low-opacity uppercase">{heading}</h4>
      {description && (
        <p className="text-xxs uppercase text-dull-gray">{description}</p>
      )}
    </div>
  );
};

export default SectionLabel;
