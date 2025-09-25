import React from "react";

const SectionHeader = ({ title }) => {
  return (
    <div className="border-b-[1px] border-stroke-gray w-full py-2">
      <h3 className="font-jetbrains-mono text-sm text-medium-opacity uppercase">
        {title}
      </h3>
    </div>
  );
};

export default SectionHeader;
