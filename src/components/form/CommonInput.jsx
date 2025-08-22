import React from "react";

export default function CommonInput({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  minLength,
  maxLength,
}) {
  const showError =
    value?.length > 0 &&
    ((minLength && value.length < minLength) ||
      (maxLength && value.length > maxLength));

  return (
    <div className="w-full flex flex-col">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border-[0.5px] rounded-[5px] border-stroke-gray focus:outline-none ${className}`}
        minLength={minLength}
        maxLength={maxLength}
      />
      {showError && (
        <span className="text-xs text-low-opacity mt-1">
          {minLength && maxLength
            ? `Must be between ${minLength} and ${maxLength} characters`
            : minLength && value.length < minLength
            ? `Must be at least ${minLength} characters`
            : maxLength && value.length > maxLength
            ? `Must be at most ${maxLength} characters`
            : ""}
        </span>
      )}
    </div>
  );
}
