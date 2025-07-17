import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

const HourGlassAnimation = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const paths = svg.querySelectorAll("path");

    gsap.set(paths, { drawSVG: "0% 0%" });

    const tl = gsap.timeline({
      defaults: { ease: "power1.inOut" },
      delay: 1,
    });

    tl.to(paths, {
      duration: 3,
      drawSVG: "0% 100%",
      stagger: 0.1,
    }).to(
      svg,
      {
        duration: 1,
        rotation: 180,
        transformOrigin: "50% 50%",
        ease: "bounce.out",
      },
      "+=0.5"
    );
  }, []);

  const handleHover = () => {
    gsap.to(svgRef.current, {
      rotation: "+=180",
      transformOrigin: "50% 50%",
      duration: 1,
      ease: "bounce.out",
    });
  };

  return (
    <div onMouseEnter={handleHover}>
      <svg
        ref={svgRef}
        viewBox="0 0 76 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ cursor: "pointer" }}
        className="w-[55px] h-[55px] lg:w-[75px] lg:h-[75px] max-w-full mx-auto"
      >
        <path
          d="M23.9375 14.0625L14.5625 7.8125L23.9375 1.5625H50.5L58.3125 7.8125L50.5 14.0625H23.9375Z"
          stroke="#97979C"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M58.3125 7.8125V23.5031L36.4469 39.1281L14.5625 23.5031V7.8125"
          stroke="#97979C"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M58.3125 67.1875V54.7532L36.4469 39.1282L14.5625 54.7532V67.1875L23.9375 73.4375H50.5L58.3125 67.1875Z"
          stroke="#97979C"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M44.25 23.4375L36.4375 29.6875L28.625 23.4375"
          stroke="#97979C"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M50.5 65.625L36.4375 60.9375L22.375 65.625"
          stroke="#97979C"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M36.4468 48.4375V51.5625"
          stroke="#97979C"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M36.4469 57.8782L36.4375 60.9375"
          stroke="#97979C"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default HourGlassAnimation;
