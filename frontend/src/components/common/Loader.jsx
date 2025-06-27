import React from "react";
import "../../css/Loader.css"

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>

      <div className="z-10 text-center">
        <svg viewBox="25 25 50 50" className="spinner">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
        <p className="text-white text-sm mt-2 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
