import React from "react";

const Popup = ({ children }) => {
  return (
    <div className="bg-black/5 backdrop-blur-[12px] fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
      <div className="bg-main-background border border-white/10 rounded-[10px] px-5  xl:px-[38px] py-[48px] w-max max-h-[90dvh] overflow-y-auto relative">
        {children}
      </div>
    </div>
  );
};

export default Popup;
