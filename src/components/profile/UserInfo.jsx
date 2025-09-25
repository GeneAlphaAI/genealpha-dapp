import React from "react";
import SecondaryButton from "../buttons/SecondaryButton";
import { gradientStyle } from "../../utilities/helpers";
import { useAccount } from "wagmi";

const UserInfo = () => {
  const { address } = useAccount();
  const links = [
    {
      icon: "/assets/general/Telegram.svg",
      url: "https://twitter.com",
      username: "@JohnDoe",
    },
    {
      icon: "/assets/general/X.svg",
      url: "https://twitter.com",
      username: "@JohnDoe",
    },
    {
      icon: "/assets/general/Github.svg",
      url: "https://twitter.com",
      username: "@JohnDoe",
    },
  ];
  return (
    <div className="bg-[#0D0D0D] p-5 sm:p-8 w-full gap-5 flex flex-col md:flex-row md:items-center justify-between rounded-[10px] relative">
      <div className="flex gap-5">
        <div
          className="w-[60px] h-[60px] sm:w-[124px] sm:h-[124px] rounded-[5px] sm:rounded-[10px]"
          style={gradientStyle(address || "0x1234...abcd")}
        ></div>
        <div className="flex flex-col">
          <div className="text-md sm:text-lg font-semibold">John Doe</div>
          <div className="flex items-center gap-3">
            <div className="text-xs font-jetbrains-mono uppercase text-medium-opacity">
              @JohnDoe
            </div>
            <div className="bg-white/10 text-medium-opacity px-2 py-[1px] items-center rounded text-xs font-jetbrains-mono w-max uppercase">
              0x1234...abcd
            </div>
          </div>

          <div className="hidden sm:flex flex-wrap w-full gap-3 mt-3">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center border-[1px] border-stroke-gray gap-2 rounded-[5px] px-2 py-1 text-xs text-medium-opacity hover:text-white font-jetbrains-mono uppercase transition"
              >
                <img
                  src={link.icon}
                  alt={link.username}
                  className="size-[16px]"
                />
                <span>{link.username}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="flex sm:hidden w-full gap-2 sm:gap-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center border-[1px] border-stroke-gray gap-2 rounded-[5px] px-2 py-1 text-xxs text-medium-opacity hover:text-white font-jetbrains-mono uppercase transition"
          >
            <img src={link.icon} alt={link.username} className="size-[16px]" />
            <span>{link.username}</span>
          </a>
        ))}
      </div>

      <div className="h-full gap-3 flex flex-row md:flex-col z-1">
        <SecondaryButton className="w-[8rem] h-[2.2rem] ">
          Edit Profile
        </SecondaryButton>
        <SecondaryButton className="w-[8rem] h-[2.2rem] ">
          Settings
        </SecondaryButton>
      </div>
      <img
        src="/assets/general/Hive.svg"
        className="absolute right-0 bottom-0 z-0"
      />
    </div>
  );
};

export default UserInfo;
