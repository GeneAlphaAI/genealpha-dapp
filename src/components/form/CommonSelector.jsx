import React, { useEffect } from "react";

export default function CommonSelector({
  label,
  description,
  options = [],
  defaultValue = null,
  multiple = false,
  selected = [],
  required = [], // NEW, safe default → []
  onChange,
  getLabel = (opt) => (typeof opt === "string" ? opt : opt.label),
  getValue = (opt) => (typeof opt === "string" ? opt : opt.value ?? opt),
}) {
  // Ensure one default selection
  useEffect(() => {
    if (!selected || selected.length === 0) {
      if (options.length > 0) {
        if (multiple) {
          const init = Array.isArray(defaultValue)
            ? defaultValue
            : [defaultValue || getValue(options[0])];
          onChange?.(init);
        } else {
          const init =
            defaultValue != null ? [defaultValue] : [getValue(options[0])];
          onChange?.(init);
        }
      }
    }
  }, [options, defaultValue, multiple, selected, onChange, getValue]);

  const toggleOption = (opt) => {
    const value = getValue(opt);
    const isSelected = selected.includes(value);
    const isRequired = required.includes(value);

    if (multiple) {
      if (isRequired && isSelected) return; // 🚫 required can't be deselected
      if (isSelected && selected.length === 1) return; // 🚫 prevent empty
      const updated = isSelected
        ? selected.filter((v) => v !== value)
        : [...selected, value];
      onChange?.(updated);
    } else {
      if (!isSelected) {
        onChange?.([value]);
      }
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {/* Header */}
      {(label || description) && (
        <div className="flex flex-col items-start font-jetbrains-mono gap-1 pb-2">
          {label && (
            <h4 className="text-xs text-low-opacity uppercase">{label}</h4>
          )}
          {description && (
            <p className="text-xxs uppercase text-dull-gray">{description}</p>
          )}
        </div>
      )}

      {/* Options */}
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => {
          const value = getValue(opt);
          const text = getLabel(opt);
          const isSelected = selected.includes(value);
          const isRequired = required.includes(value);

          return (
            <button
              key={value}
              onClick={() => toggleOption(opt)}
              disabled={isRequired && isSelected} // disable only if required+selected
              className={`px-3 py-1 rounded-full cursor-pointer border text-xs font-regular transition-colors
                ${
                  isSelected
                    ? "bg-primary-text text-primary border-white"
                    : "bg-transparent text-primary-text border-stroke-gray hover:border-white/60"
                }
                ${
                  isRequired && isSelected
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }
              `}
            >
              {text} {isRequired && isSelected && "(required)"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
