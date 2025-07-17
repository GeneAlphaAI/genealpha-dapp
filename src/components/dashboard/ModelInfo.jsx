import React from "react";

const ModelInfo = ({
  title,
  value,
  valueClassName = "text-sm",
  infoClassName = "items-start",
}) => {
  return (
    <div className={`flex flex-col h-full gap-[6px] ${infoClassName}`}>
      <h4
        className={`text-xs font-jetbrains-mono font-medium text-inactive-text uppercase`}
      >
        {title}
      </h4>
      <p
        className={`${valueClassName} font-jetbrains-mono text-grayish-white font-regular`}
      >
        {value}
      </p>
    </div>
  );
};

export default ModelInfo;
