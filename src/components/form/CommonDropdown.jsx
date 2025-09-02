import { useEffect, useRef, useState } from "react";

export default function CommonDropdown({
  options = [],
  value = null, // controlled value (string or object.value)
  onSelect,
  getLabel = (opt) => (typeof opt === "string" ? opt : opt.label),
  getValue = (opt) => (typeof opt === "string" ? opt : opt.value),
}) {
  const [open, setOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({});
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Update dropdown position
  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);

  // Close if click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSelect = (option) => {
    onSelect?.(getValue(option)); // pass back value only
    setOpen(false);
  };

  // Resolve the current selected label
  const selectedOption = options.find((opt) => getValue(opt) === value);
  const selectedLabel = selectedOption
    ? getLabel(selectedOption)
    : "Select option";

  return (
    <>
      {/* Trigger Button */}
      <div
        ref={buttonRef}
        className="w-full rounded-[5px] border-[0.5px] border-stroke-gray bg-primary text-primary-text shadow-sm cursor-pointer px-4 py-2 flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <span>{selectedLabel}</span>
        <img
          src="/assets/dashboard/DownArrow.svg"
          alt="▼"
          className={`size-4 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className="fixed z-[9999] bg-primary border-[0.5px] border-stroke-gray rounded-[5px] shadow-lg"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
          }}
        >
          {options.length > 0 ? (
            options.map((opt, idx) => {
              const optValue = getValue(opt);
              const isSelected = value === optValue;
              return (
                <div
                  key={idx}
                  onMouseDown={() => handleSelect(opt)}
                  className={`px-4 py-2 cursor-pointer hover:bg-white/5 text-sm flex justify-between items-center ${
                    isSelected ? "bg-white/5" : ""
                  }`}
                >
                  <span>{getLabel(opt)}</span>
                  {isSelected && (
                    <span className="ml-2 text-xs text-secondary-text">
                      Selected
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <div className="px-4 py-2 text-xs text-gray-500">No options</div>
          )}
        </div>
      )}
    </>
  );
}
