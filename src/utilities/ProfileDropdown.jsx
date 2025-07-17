import React, { useState, useEffect, useCallback, useRef } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ModelStatus from "../components/header/ModelStatus";
import Refresh from "../components/header/Refresh";

const ProfileDropdown = ({
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

  // Measure trigger width
  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerClassName, labelClassName]);

  const getAlignPosition = () => (position === "left" ? "start" : "end");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          ref={triggerRef}
          className={`flex items-center justify-between px-3 py-2 h-[2rem] w-[190px] rounded-sm focus:outline-none ${triggerClassName}`}
        >
          <span className={`truncate text-start ${labelClassName}`}>
            0xb8db5B8A8445d033870119a5c40cE95B485A5e40
          </span>
          <img
            src={icon}
            alt="Dropdown Icon"
            className={`transition-transform duration-300 ${iconClassName}`}
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`z-[10000] pt-2 rounded-md space-y-2 w-[190px] ${contentClassName}`}
          align={getAlignPosition()}
          sideOffset={5}
        >
          <DropdownMenu.Item
            // key={option.value}
            // onSelect={() => handleSelect(option.value, option.label)}
            className={`text-white px-3 outline-0 transition-color cursor-pointer rounded-sm`}
          >
            1085 <span className="font-bold">GA</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            // key={option.value}
            // onSelect={() => handleSelect(option.value, option.label)}
            className={`text-white px-3 outline-0 transition-color cursor-pointer rounded-sm`}
          >
            <ModelStatus />
          </DropdownMenu.Item>
          <DropdownMenu.Item
            // key={option.value}
            // onSelect={() => handleSelect(option.value, option.label)}
            className={`text-white px-3 outline-0 transition-color cursor-pointer rounded-sm`}
          >
            <Refresh />
          </DropdownMenu.Item>
          <DropdownMenu.Item
            // key={option.value}
            // onSelect={() => handleSelect(option.value, option.label)}
            className={`border-t-1 border-white/20 w-full flex item-center justify-center py-2 rounded-b-sm  text-white outline-0 transition-color hover:bg-white/15 cursor-pointer flex items-center gap-2`}
          >
            <img
              src={"/assets/dashboard/Disconnect.svg"}
              alt="Dropdown Icon"
              className={`size-[12px] ${iconClassName}`}
            />
            Disconnect
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ProfileDropdown;
