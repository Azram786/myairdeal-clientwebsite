import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import BagAndMeal from "./bagAndMeal";
import SeatSelection from "./seatSelection";
import axios from "axios";

const AddonsCard = ({
  passengers,
  setPassengers,
  expanded,
  toggleCard,
  data,
  bookingId,
}) => {
  const [activeButton, setActiveButton] = useState("");
  const [seatMapData, setSeatMapData] = useState(null);
  const [checkLoading, setCheckLoading] = useState(false);
  const [Errors, setErrors] = useState(null);

  console.log(data, "Hello");

  const checkSeatSelection = async () => {
    setCheckLoading(true);

    try {
      const response = await axios.post(
        "https://myairdeal-backend.onrender.com/booking/seat-map",
        {
          bookingId,
        }
      );
      if (response.status == 200) {
        setSeatMapData(response.data);
      }
      console.log("Seat Map Data:", response);
      setCheckLoading(false);
    } catch (error) {
      console.error("SeatMapError:", error);
      setCheckLoading(false);
      setErrors(error?.response?.data?.errors);
    }
  };

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
            <button onClick={checkSeatSelection} disabled={checkLoading}>
              {checkLoading ? "Checking..." : "Check Seat Availability"}
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
          <div>
            {Errors?.map((item) => (
              <div>Message : {item?.message}</div>
            ))}
            <div></div>
          </div>
          {activeButton === "seatSelection" && (
            <SeatSelection
              seatMapData={seatMapData}
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
