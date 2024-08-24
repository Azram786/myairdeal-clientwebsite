import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import BagAndMeal from "./bagAndMeal";
import SeatSelection from "./seatSelection";
import axios from "axios";
// import {test, flightData, booking} from '../../BookFlight/Seats/dummy'
import { useSelector } from "react-redux";
import ReactJoyride from "react-joyride";

const AddonsCard = ({
  passengers,
  setPassengers,
  expanded,
  toggleCard,
  flightData,
  bookingId,
}) => {
  const [activeButton, setActiveButton] = useState("");
  const [seatMapData, setSeatMapData] = useState(null);
  const [checkLoading, setCheckLoading] = useState(false);
  const [Errors, setErrors] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const checkSeatSelection = async () => {
    setCheckLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}booking/seat-map`,
        {
          bookingId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        // console.log({ response });

        setSeatMapData(response?.data);
        console.log("seatMapData", response?.data);
      } else if (response.status === 400) {
        setSeatMapData("Seat Map is not available");
      }

      setCheckLoading(false);
    } catch (error) {
      console.error("SeatMapError:", error);
      setCheckLoading(false);
      setErrors(error?.response?.flightData?.errors);
    }
  };

  const [isSeatMapAvailable, setIsMapAvailable] = useState(
    flightData?.conditions?.isa
  );

  useEffect(() => {
    checkSeatSelection();
  }, []);

  const [runJoyride, setRunJoyride] = useState(true);

  // // Check sessionStorage for Joyride execution on first load
  // useEffect(() => {
  //   // Check if Joyride has been executed before
  //   const storedJoyride = sessionStorage.getItem("joyride");

  //   if (storedJoyride === "executed") {
  //     setRunJoyride(false); // Joyride has already run, don't run it again
  //   } else {
  //     setRunJoyride(true); // Joyride has not run, start it
  //     sessionStorage.setItem("joyride", "executed"); // Mark as executed
  //   }
  // }, []); // Empty dependency array to run this effect only once on component mount

  // Joyride steps
  const [joyrideSteps] = useState([
    {
      target: ".addons-seat",
      content: "Choose your travel type (One-way, Round-trip, or Multi-city)",
    },
    {
      target: ".addons-meals-and-baggage",
      content: "Select your departure city or airport.",
    },
  ]);
  return (
    <div className="">
      <ReactJoyride
        steps={joyrideSteps}
        run={runJoyride}
        continuous
        showSkipButton
        showProgress
        styles={{
          options: {
            zIndex: 10000, // Ensure Joyride modals are on top
          },
        }}
      />
      <div
        className="p-3 border-b border-gray-300 cursor-pointer flex justify-between items-center"
        onClick={toggleCard}
      >
        <div>
          <div className="font-bold text-lg ">Add Ons</div>
          <div className="text-sm text-gray-500">
            Select additional services for your flight.
          </div>
        </div>
        <div>{expanded ? <FaChevronUp /> : <FaChevronDown />}</div>
      </div>
      {expanded && (
        <div className="p-4">
          <div className="flex space-x-4 mb-4 ">
            <button
              onClick={() => setActiveButton("seatSelection")}
              className={`text-sm md:text-base px-4 py-2 rounded ${
                activeButton === "seatSelection"
                  ? "text-[#D7B56D] bg-[#1B1D29]"
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
              className={`text-sm md:text-base px-4 py-2 rounded  ${
                activeButton === "addBagAndMeal"
                  ? "text-[#D7B56D] bg-[#1B1D29]"
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
            <div></div>
          </div>
          {activeButton === "seatSelection" && (
            <SeatSelection
              seatMapData={seatMapData}
              passengers={passengers}
              setPassengers={setPassengers}
              flightReviewData={flightData}
              isSeatMapAvailable={isSeatMapAvailable}
            />
          )}
          {activeButton === "addBagAndMeal" && (
            <BagAndMeal
              setPassengers={setPassengers}
              flightData={flightData}
              passengers={passengers}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AddonsCard;
