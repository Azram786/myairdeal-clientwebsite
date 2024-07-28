// Loader.js
import React from "react";

const Loader = ({ text }) => {
  return (
    <div className="flex justify-center items-center h-full flex-col gap-3 m-32">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      <h1>{text}</h1>
    </div>
  );
};

export default Loader;
