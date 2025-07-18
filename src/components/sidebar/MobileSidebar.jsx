import React from "react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "../../utilities/Dropdown";
import Refresh from "../header/Refresh";
import Balance from "../header/Balance";
import ModelStatus from "../header/ModelStatus";

const MobileSidebar = ({ isOpen }) => {
  const location = useLocation();

  const sidebarLinks = [
    {
      label: "Live Models",
      pathname: "/",
      image: "/assets/sidebar/Brain.svg",
    },
    {
      label: "Leaderboard",
      pathname: "/leaderboard",
      image: "/assets/sidebar/Trophy.svg",
    },
    {
      label: "Breeding",
      pathname: "/breeding",
      image: "/assets/sidebar/Dna.svg",
    },
    {
      label: "SwarmDAO",
      pathname: "/swarm",
      image: "/assets/sidebar/Bee.svg",
    },
  ];

  const options = [
    { label: "Ethereum", value: "eth" },
    { label: "Polygon", value: "polygon" },
    { label: "BNB", value: "bnb" },
  ];

  return (
    <div
      className={`fixed top-[64px] left-0 h-[calc(100%-64px)] w-full z-40 bg-primary/80 backdrop-blur-lg p-4 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } 1xl:hidden`}
    >
      <div className="flex lg:hidden flex-col border-b-[0.5px] border-stroke-gray mb-4">
        <h3 className="text-md font-jetbrains-mono text-low-opacity">
          GA Balance
        </h3>
        <p className="text-lg font-jetbrains-mono">0</p>
      </div>
      <div className="border-b-[0.5px] border-stroke-gray pb-4">
        <Dropdown
          options={options}
          holderText="Show Predictions: "
          icon="/assets/dashboard/DownArrow.svg"
          position="left"
          triggerClassName="bg-white/10 gap-2 w-full text-xs"
          labelClassName="text-dull-white"
          contentClassName="bg-white/10 backdrop-blur-lg text-xs"
        />
        <div className="flex lg:hidden w-full border-1 rounded-sm border-stroke-gray mt-3 justify-evenly">
          <div className="bg-white/5 w-full flex items-center justify-center rounded-l-sm py-1">
            <Refresh />
          </div>
          <div className="bg-white/5 w-full flex items-center border-l-1 border-stroke-gray py-1 justify-center rounded-r-sm">
            <ModelStatus />
          </div>
        </div>
      </div>

      <div className="mt-3">
        {sidebarLinks.map(({ label, pathname, image }) => {
          const isActive = location.pathname === pathname;
          return (
            <Link
              key={label}
              to={pathname}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive ? "bg-white/10 text-white" : "text-dull-white"
              }`}
            >
              <img src={image} alt={label} className="w-5 h-5" />
              <span className="text-sm">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileSidebar;
