import React, { useState, useRef, useEffect } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const ActionDropdown = ({
  icon = "/assets/general/ThreeDots.svg",
  items = [],
  triggerClassName = "",
  contentClassName = "",
  itemClassName = "",
  setIsOpen, // 👈 from parent
}) => {
  const triggerRef = useRef(null);
  const [triggerWidth, setTriggerWidth] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerClassName]);

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    setIsOpen?.(isOpen); // 👈 notify parent
  };

  return (
    <DropdownMenu.Root open={open} onOpenChange={handleOpenChange}>
      <DropdownMenu.Trigger asChild>
        <button
          ref={triggerRef}
          className={`flex items-center cursor-pointer justify-center px-2 py-2 h-full min-h-[2.2rem] rounded-sm focus:outline-none transition-all ${triggerClassName}`}
        >
          <img
            src={icon}
            alt="Dropdown Icon"
            className={`transition-transform duration-300 ${
              open ? "opacity-80" : ""
            }`}
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`z-[10000] p-2 rounded-sm shadow-lg bg-neutral-900 min-w-[5rem] ${contentClassName}`}
          align="end"
        >
          {items.map((item, idx) => (
            <DropdownMenu.Item
              key={idx}
              onSelect={(e) => {
                e.preventDefault();
                e.stopPropagation();
                item.action?.();
                setOpen(false);
                setIsOpen?.(false);
              }}
              className={`px-2 py-1 text-white outline-0 hover:bg-white/10 transition-colors cursor-pointer rounded-sm ${itemClassName}`}
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ActionDropdown;
