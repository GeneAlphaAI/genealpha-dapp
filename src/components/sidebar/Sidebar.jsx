import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
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

  return (
    <div className="flex flex-col w-[200px] md:min-w-[200px] 2xl:min-w-[250px] 2xl:w-[250px] h-full border-r-1 border-stroke-gray py-4 px-2">
      {" "}
      {sidebarLinks.map(({ label, pathname, image }) => {
        const isActive = location.pathname === pathname;

        return (
          <Link
            key={label}
            to={pathname}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive ? "bg-white/7 text-white" : "text-dull-white"
            }`}
          >
            <img src={image} alt={label} className="w-5 h-5" />
            <span className="text-sm">{label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
