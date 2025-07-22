import React, { useState, useEffect, useCallback, useRef } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const Dropdown = ({
  options = [],
  onSelect,
  position = "right",
  selectedValue, // 👈 comes from redux
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
  const [open, setOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label ||
    defaultLabel ||
    options[0]?.label ||
    "Select";

  // Auto-select first option if selectedValue is undefined/null
  useEffect(() => {
    if (!selectedValue && options.length > 0) {
      onSelect?.(options[0].value);
    }
  }, [selectedValue, options, onSelect]);

  const handleSelect = useCallback(
    (value) => {
      onSelect?.(value);
      setOpen(false);
    },
    [onSelect]
  );

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [selectedLabel, triggerClassName, labelClassName]);

  const getAlignPosition = () => (position === "left" ? "start" : "end");

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          ref={triggerRef}
          className={`flex items-center justify-between px-3 py-2 h-full min-h-[2.2rem] focus:outline-none transition-all ${
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
              onSelect={() => handleSelect(option.value)}
              className={`px-2 py-1 text-white outline-0 hover:bg-white/10 transition-colors cursor-pointer rounded-sm ${
                selectedValue === option.value
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
