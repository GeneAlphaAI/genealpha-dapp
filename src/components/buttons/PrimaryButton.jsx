import React from "react";

const PrimaryButton = ({
  children,
  onClick,
  className = "",
  textClassName = "font-regular 3xl:text-[0.9dvw] text-primary",
  textSize = "sm:text-sm",
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
      className={`group text-center white-gradient ${mobilePadding} ${defaultPadding} ${roundedStyle} ${
        isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } group-hover:animate-gradient flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {loading ? (
        <div className="flex space-x-1">
          <span className="w-2 h-2 bg-primary rounded-full animate-blink [animation-delay:0ms]"></span>
          <span className="w-2 h-2 bg-primary rounded-full animate-blink [animation-delay:200ms]"></span>
          <span className="w-2 h-2 bg-primary rounded-full animate-blink [animation-delay:400ms]"></span>
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

export default PrimaryButton;
