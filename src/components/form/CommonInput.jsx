import React from "react";

export default function CommonInput({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border-[0.5px] rounded-[5px] border-stroke-gray focus:outline-none ${className}`}
    />
  );
}
