import React from "react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "../../utilities/Dropdown";

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
      <Dropdown
        options={options}
        holderText="Show Predictions: "
        icon="/assets/dashboard/DownArrow.svg"
        position="left"
        triggerClassName="bg-white/10 gap-2 w-full text-xs"
        labelClassName="text-dull-white"
        contentClassName="bg-white/10 backdrop-blur-lg text-xs"
      />
      <div className="py-10">
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
