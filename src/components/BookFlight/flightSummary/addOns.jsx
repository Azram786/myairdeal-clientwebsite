import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import BagAndMeal from "./bagAndMeal";
import SeatSelection from "./seatSelection";

const AddonsCard = ({
  passengers,
  setPassengers,
  expanded,
  toggleCard,
  data,
}) => {
  const [activeButton, setActiveButton] = useState("");

  console.log(passengers, "admones===");
  return (
    <div>
      <div
        className="p-4 border-b border-gray-300 cursor-pointer flex justify-between items-center"
        onClick={toggleCard}
      >
        <div>
          <div className="font-bold text-lg">Add Ons</div>
          <div className="text-sm text-gray-500">
            Select additional services for your flight.
          </div>
        </div>
        <div>
          {expanded ? (
            <FaChevronUp className="text-gray-500" />
          ) : (
            <FaChevronDown className="text-gray-500" />
          )}
        </div>
      </div>
      {expanded && (
        <div className="p-4">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveButton("seatSelection")}
              className={`px-4 py-2 rounded ${
                activeButton === "seatSelection"
                  ? "bg-[#007ec4] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Seat Selection
            </button>
            <button
              onClick={() => setActiveButton("addBagAndMeal")}
              className={`px-4 py-2 rounded ${
                activeButton === "addBagAndMeal"
                  ? "bg-[#007ec4] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Add Bag and Meal
            </button>
          </div>
          {activeButton === "seatSelection" && (
            <SeatSelection
              passengers={passengers}
              setPassengers={setPassengers}
              flightReviewData={data}
            />
          )}
          {activeButton === "addBagAndMeal" && (
            <BagAndMeal
              setPassenger={setPassengers}
              flightData={data}
              passengers={passengers}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AddonsCard;
