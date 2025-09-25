import React from "react";

const SecondaryButton = ({
  children,
  onClick,
  className = "h-[2.2rem]",
  textClassName = "font-regular 3xl:text-[0.7dvw] text-primary-text",
  textSize = "text-xs",
  mobilePadding = "px-3 py-1",
  defaultPadding = "px-5 py-1",
  roundedStyle = "rounded-sm",
  disabled = false,
  loading = false,
  type = "button",
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled || loading}
      className={`group text-center bg-primary-text/2 border-[0.5px] backdrop-blur-sm border-stroke-gray  ${mobilePadding} ${defaultPadding} ${roundedStyle} ${
        isDisabled ? " cursor-not-allowed" : "cursor-pointer"
      } hover:bg-primary-text/5 flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {loading ? (
        <div className="flex space-x-1">
          <span className="size-1 bg-primary-text rounded-full animate-[dotBounce_1s_ease-in-out_infinite] [animation-delay:0s]"></span>
          <span className="size-1 bg-primary-text rounded-full animate-[dotBounce_1s_ease-in-out_infinite] [animation-delay:0.2s]"></span>
          <span className="size-1 bg-primary-text rounded-full animate-[dotBounce_1s_ease-in-out_infinite] [animation-delay:0.4s]"></span>
        </div>
      ) : (
        <div
          className={`${textSize} ${textClassName} ${
            loading ? "opacity-70" : ""
          }`}
        >
          {children}
        </div>
      )}
    </button>
  );
};

export default SecondaryButton;
