// src/pages/NoFlightsFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NoFlights = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-100 text-center">
      <h1 className="text-2xl font-bold mb-4">No Flights Found</h1>
      <p className="mb-6">We couldn't find any flights for the selected route.</p>
      <button
        onClick={() => navigate("/")}
        className="bg-[#1B1D29] text-[#D7B56D] px-4  text-semibold py-2 rounded"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default NoFlights;
