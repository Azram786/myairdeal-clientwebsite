import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import BagAndMeal from "./bagAndMeal";
import SeatSelection from "./seatSelection";
import axios from "axios";
// import {test, flightData, booking} from '../../BookFlight/Seats/dummy'
import { useSelector } from "react-redux";

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
  const token = useSelector((state) => state.auth.token);

  console.log(passengers, "Hello");
  console.log(bookingId, "bookingId");

  const checkSeatSelection = async () => {
    setCheckLoading(true);
  
    try {
      const response = await axios.post(
        "https://myairdeal-backend.onrender.com/booking/seat-map",
        {
          bookingId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
  
  
      if (response.status === 200) {
        console.log("Seat Map Data:", response.data);
        setSeatMapData(response?.data);
      } else if (response.status === 400) {
        console.log("Error Response Data:", response.data);
        setSeatMapData("Seat Map is not available");
      }
  
      setCheckLoading(false);
    } catch (error) {
      console.error("SeatMapError:", error);
      setCheckLoading(false);
      setErrors(error?.response?.data?.errors);
    }
  };
  

  const [isSeatMapAvailable, setIsMapAvailable] = useState(
    data?.conditions?.isa
  );

  useEffect(() => {
    checkSeatSelection();
  }, []);
  return (
    <div className="">
      <div
        className="p-3 border-b border-gray-300 cursor-pointer flex justify-between items-center"
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
            <FaChevronUp/>
          ) : (
            <FaChevronDown  />
          )}
        </div>
      </div>
      {
      expanded &&
       (
        <div className="p-4">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveButton("seatSelection")}
              className={`text-sm md:text-base px-4 py-2 rounded ${
                activeButton === "seatSelection"
                  ? "bg-[#007ec4] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Seat Selection
            </button>
            {/* <button onClick={checkSeatSelection} disabled={checkLoading}>
              {checkLoading ? "Checking..." : "Check Seat Availability"}
            </button> */}
            <button
              onClick={() => setActiveButton("addBagAndMeal")}
              className={`text-sm md:text-base px-4 py-2 rounded ${
                activeButton === "addBagAndMeal"
                  ? "bg-[#007ec4] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Add Bag and Meal
            </button>
          </div>
          <div>
            {/* {Errors?.map((item) => (
              <div>Message : {item?.message}</div>
            ))} */}
            <div>
            </div>
          </div>
          {activeButton === "seatSelection" && (
            <SeatSelection
              seatMapData={seatMapData}
              passengers={passengers}
              setPassengers={setPassengers}
              flightReviewData={data}
              isSeatMapAvailable={isSeatMapAvailable}
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
