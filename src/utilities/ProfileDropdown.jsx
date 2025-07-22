import React, { useState, useEffect, useCallback, useRef } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { truncateMiddle } from "./helpers";
import { useAccount, useDisconnect } from "wagmi";

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
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
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
          className={`flex items-center justify-center px-3 py-2 h-[2.2rem] w-[140px] rounded-sm focus:outline-none ${triggerClassName}`}
        >
          <span className={`text-start ${labelClassName}`}>
            {truncateMiddle(address, 13)}
          </span>
          {/* <img
            src={icon}
            alt="Dropdown Icon"
            className={`transition-transform duration-300 ${iconClassName}`}
          /> */}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`z-[10000] rounded-md space-y-2 w-[140px] ${contentClassName}`}
          align={getAlignPosition()}
          // style={{ width: triggerWidth ? `${triggerWidth}px` : "auto" }}
          sideOffset={5}
        >
          {/* <DropdownMenu.Item
            // key={option.value}
            // onSelect={() => handleSelect(option.value, option.label)}
            className={`text-white px-3 outline-0 transition-color cursor-pointer rounded-sm`}
          >
            1085 <span className="font-bold">GA</span>
          </DropdownMenu.Item> */}

          <DropdownMenu.Item
          // key={option.value}
          // onSelect={() => handleSelect(option.value, option.label)}
          >
            <button
              onClick={() => disconnect()}
              className={` w-full flex item-center justify-center rounded-b-sm py-2  text-white outline-0 transition-color hover:bg-white/15 cursor-pointer flex items-center gap-2`}
            >
              <img
                src={"/assets/dashboard/Disconnect.svg"}
                alt="Dropdown Icon"
                className={`size-[12px] ${iconClassName}`}
              />
              Disconnect
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ProfileDropdown;
