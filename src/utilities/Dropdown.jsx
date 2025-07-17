import React, { useState, useEffect, useCallback, useRef } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const Dropdown = ({
  options = [],
  onSelect,
  position = "right",
  defaultLabel,
  triggerClassName = "",
  labelClassName = "",
  iconClassName = "",
  contentClassName = "",
  itemClassName = "",
  selectedItemClassName = "",
  icon = "/icons/universal/down-arrow.svg",
  holderText = "",
}) => {
  const triggerRef = useRef(null);
  const [triggerWidth, setTriggerWidth] = useState(null);

  const initialLabel = defaultLabel || options[0]?.label || "Select";
  const [selectedLabel, setSelectedLabel] = useState(initialLabel);

  // Auto-select first item if no defaultLabel was passed
  useEffect(() => {
    if (!defaultLabel && options.length > 0) {
      setSelectedLabel(options[0].label);
      onSelect?.(options[0].value);
    }
  }, [defaultLabel, options, onSelect]);

  // Measure trigger width
  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [selectedLabel, triggerClassName, labelClassName]);

  const handleSelect = useCallback(
    (value, label) => {
      setSelectedLabel(label);
      onSelect?.(value);
    },
    [onSelect]
  );

  const getAlignPosition = () => (position === "left" ? "start" : "end");

  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          ref={triggerRef}
          className={`flex items-center justify-between shadow-lg px-3 py-2 h-full min-h-[2.2rem] focus:outline-none transition-all ${
            open ? "rounded-t-sm" : "rounded-sm"
          } ${triggerClassName}`}
        >
          <span className={`truncate text-start ${labelClassName}`}>
            {holderText}
            {selectedLabel}
          </span>
          <img
            src={icon}
            alt="Dropdown Icon"
            className={`transition-transform duration-300 ${iconClassName} ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`z-[10000] p-2 rounded-b-sm shadow-lg ${contentClassName}`}
          align={getAlignPosition()}
          style={{ width: triggerWidth ? `${triggerWidth}px` : "auto" }}
        >
          {options.map((option) => (
            <DropdownMenu.Item
              key={option.value}
              onSelect={() => handleSelect(option.value, option.label)}
              className={`px-2 py-1 text-white outline-0 hover:bg-white/15 transition-colors cursor-pointer rounded-sm ${
                selectedLabel === option.label
                  ? selectedItemClassName
                  : itemClassName
              }`}
            >
              {option.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
