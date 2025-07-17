import React from "react";
const LinkButton = ({
  children,
  onClick,
  className = "",
  textClassName = "font-medium 3xl:text-[0.9dvw] text-primary-text",
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
      className={`group text-center  ${mobilePadding} ${defaultPadding} ${roundedStyle} ${
        isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }  flex items-center justify-center gap-2.5 ${className}`}
      {...props}
    >
      <div
        className={`${textSize} ${textClassName} ${
          loading ? "opacity-70" : ""
        }`}
      >
        {children}
      </div>
    </button>
  );
};
export default LinkButton;
