import React, { useState, useEffect } from "react";
import {
  FaPlane,
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp,
  FaSuitcase,
  FaShoppingCart,
  FaConciergeBell,
} from "react-icons/fa";

// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import FareToolTip from "./FareTooltip";
import calculateDuration from "../../util/calculateDuration";

const RoundTripCard = ({
  logo,
  flightDetails,
  isSelected,
  selectedPriceIndex,
  onSelect,
  passenger,
  specialReturnMode,
  baggageDetails,
  mealDetails,
}) => {
  // console.log(flightDetails,
  //   isSelected,
  //   selectedPriceIndex,
  //   onSelect,
  //   passenger,
  //   specialReturnMode,"ROUNDTRIP")
  const [showAllPrices, setShowAllPrices] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showBaggageDetails, setShowBaggageDetails] = useState(false); // New state
  const [showMealDetails, setShowMealDetails] = useState(false); // New state

  const toggleBaggageDetails = () => setShowBaggageDetails(!showBaggageDetails);
  const toggleMealDetails = () => setShowMealDetails(!showMealDetails);

  const [activeTab, setActiveTab] = useState("Flight Details");
  // const [showAllPrices, setShowAllPrices] = useState(false);
  const [localSelectedPriceIndex, setLocalSelectedPriceIndex] = useState(
    selectedPriceIndex || 0
  );

  useEffect(() => {
    setLocalSelectedPriceIndex(selectedPriceIndex || 0);
  }, [selectedPriceIndex]);

  useEffect(() => {
    if (isSelected && selectedPriceIndex === null) {
      onSelect(0);
    }
  }, [isSelected, selectedPriceIndex, onSelect]);

  let data;
  let priceList = [];

  const calculateTotalPrice = (priceIndex) => {
    const selectedPrice = priceList[priceIndex];
    if (!selectedPrice) return 0;

    return Object.entries(selectedPrice.fd).reduce(
      (total, [passengerType, details]) => {
        return total + details.fC.TF * (passenger[passengerType] || 0);
      },
      0
    );
  };

  const totalPrice = calculateTotalPrice(localSelectedPriceIndex);

  if (!flightDetails) {
    return <div>Loading flights...</div>;
  }

  if (!Array.isArray(flightDetails)) {
    data = flightDetails.sI;
    priceList = flightDetails.totalPriceList || [];
  } else {
    data = flightDetails;
  }

  if (!data || data.length === 0) {
    return <div>No flight details available</div>;
  }

  const isConnectionFlight = data.length > 1;
  const startSegment = data[0];
  const endSegment = data[data.length - 1];

  const convertToHoursMinutes = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    if (hours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("en-US", options);
  };

  const departureTime = startSegment.dt;
  const arrivalTime = endSegment.at;

  const totalDuration = calculateDuration(departureTime, arrivalTime);

  const displayedPrices = specialReturnMode
    ? priceList.filter((price) => price.fareIdentifier === "SPECIAL_RETURN")
    : priceList.filter((price) => price.fareIdentifier !== "SPECIAL_RETURN");

  const handlePriceSelection = (index) => {
    setLocalSelectedPriceIndex(index);
    onSelect(index);
  };
  const calculateLayoverTime = (currentSegment, nextSegment) => {
    const currentArrival = new Date(currentSegment.at);
    const nextDeparture = new Date(nextSegment.dt);
    const layoverMinutes = (nextDeparture - currentArrival) / (1000 * 60);
    const hours = Math.floor(layoverMinutes / 60);
    const minutes = Math.floor(layoverMinutes % 60);
    return `${hours}h ${minutes}m`;
  };
  const getDayOfWeek = (dateTimeString) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const datePart = dateTimeString.split("T")[0];
    const date = new Date(datePart);
    const dayNumber = date.getDay();
    return daysOfWeek[dayNumber];
  };

  const renderTabs = () => {
    switch (activeTab) {
      case "Flight Details":
        return (
          <div>
            {data.map((segment, index) => (
              <div
                key={index}
                className="flex w-full overscroll-x-auto  flex-col  justify-start "
              >
                <div className="text-sm w-max ml-2  flex flex-col md:flex-row  text-black font-bold">
                  {segment.da.city} → {segment.aa.city}
                  <span className="text-[10px]  text-gray-500">
                    {" "}
                    {formatDateTime(segment.dt).split(",")[0]},
                    {getDayOfWeek(segment.dt)}
                  </span>
                </div>
                <div className="flex justify-center   mt-2   items-center md:items-start">
                  <div className="  min-w-12 mx-2 md:items-start">
                    <img
                      src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${segment?.fD?.aI.code}.png`}
                      alt={segment?.fD?.aI?.code}
                      className="md:size-10 size-8 rounded-md mr-0 md:mr-4"
                    />

                    <div className="font-bold text-xs mb-4">
                      <span className="text-[10px] text-gray-600 ">
                        {flightDetails.totalPriceList[0].fd.ADULT.cc}
                      </span>{" "}
                      <br />
                      {segment.fD.aI.name}
                      <br /> {segment.fD.fN}
                    </div>
                  </div>

                  <div className="   mx-2  flex gap-1  items-start  ">
                    <div className="text-left w-max  sm:min-w-28 ">
                      <div className="font-bold max-w-20 sm:w-max text-xs flex-wrap">
                        {formatDateTime(segment.dt)}
                        {/* {getDayOfWeek(segment.dt)} */}
                      </div>
                      <div className="text-[10px] max-w-28 text-gray-500">
                        {segment.da.city}, {segment.da.country}
                      </div>
                      <div className="text-[10px] max-w-28  text-gray-500 line-clamp-1">
                        {segment.da.name}
                      </div>
                      <div className="text-[10px] max-w-28 text-gray-500">
                        {segment.da.terminal || "N/A"}
                      </div>
                    </div>

                    <div className="mx-4 w-max sm:min-w-24  flex flex-col items-center ">
                      <div className="text-[10px] text-gray-500">
                        {segment.stops === 0
                          ? "Non-Stop"
                          : `${segment.stops} Stops`}
                      </div>
                      <FaPlane className="my-2  text-gray-400" />
                      <div className="text-[10px] text-gray-500">
                        {convertToHoursMinutes(segment.duration)}
                      </div>
                    </div>

                    <div className=" text-left ml-4 w-max sm:min-w-28 ">
                      <div className="text-xs font-bold max-w-20 sm:w-max">
                        {formatDateTime(segment.at)}
                      </div>
                      <div className="text-[10px] text-gray-500">
                        {segment.aa.city}, {segment.aa.country}
                      </div>
                      <div className="text-[10px] line-clamp-1 text-gray-500">
                        {segment.aa.name}
                      </div>
                      <div className="text-[10px] text-gray-500">
                        {segment.aa.terminal || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center">
                  {index < data.length - 1 && (
                    <div className="px-4  flex justify-around text-[10px]  py-1 mt-2 mb-4 md:w-1/ border border-gray-200 bg-gray-200 rounded-full ">
                      <span className=" font-bold">
                        Require to change Plane
                      </span>
                      <span>
                        <span className="font-bold ml-4">Layover Time:</span>{" "}
                        {calculateLayoverTime(segment, data[index + 1])}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      case "Fare Details":
        return (
          <div className="flex flex-col p-2">
            <div className="grid grid-cols-3 w-full place-items-center text-sm border-b pb-2 mb-2">
              <div className="font-bold">TYPE</div>
              <div className="font-bold">Fare</div>
              <div className="font-bold">Total</div>
            </div>
            {Object.entries(passenger).map(([passengerType, count]) => {
              if (count > 0) {
                const details =
                  priceList[localSelectedPriceIndex]?.fd[passengerType];
                if (details) {
                  return (
                    <div key={passengerType} className="mb-4  pl-4 text-xs">
                      <div className="grid grid-cols-3  w-full text-gray-600 mb-2">
                        <div className="w-max ">
                          Fare Details for {passengerType} (CB: {details.cB})
                        </div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="grid grid-cols-3 w-full mb-1">
                        <div>Base Price</div>
                        <div>
                          ₹{details.fC.BF.toFixed(2)} x {count}
                        </div>
                        <div>₹{(details.fC.BF * count).toFixed(2)}</div>
                      </div>
                      <div className="grid grid-cols-3 w-full mb-1">
                        <div className="flex items-center">
                          Taxes and fees
                          <FareToolTip taxDetails={details.afC.TAF} />
                        </div>
                        <div>
                          ₹{details.fC.TAF.toFixed(2)} x {count}
                        </div>
                        <div>₹{(details.fC.TAF * count).toFixed(2)}</div>
                      </div>
                    </div>
                  );
                }
              }
              return null;
            })}
            <div className="grid grid-cols-3  text-sm font-bold border-t pt-2 pl-4">
              <div>Total</div>
              <div></div>
              <div>
                ₹{calculateTotalPrice(localSelectedPriceIndex).toFixed(2)}
              </div>
            </div>
          </div>
        );
      case "Fare Rules":
        return (
          <div className="py-2 pl-6 text-xs ">
            <h2 className="font-bold mb-2">Fare Rules</h2>
            <p>Insert fare rules information here.</p>
          </div>
        );
      case "Baggage Information":
        return (
          <div className="grid py-2 grid-cols-3 text-xs pl-6 gap-4">
            <div className="font-bold">SECTOR</div>
            <div className="font-bold">CHECKIN</div>
            <div className="font-bold">CABIN</div>
            {priceList.map((item, index) => (
              <React.Fragment key={index}>
                <div className="text-xs max-w-16 ">
                  {startSegment.da.code} - {endSegment.aa.code}
                </div>
                <div className="text-xs  ">Adult {item?.fd?.ADULT?.bI?.iB}</div>
                <div className="text-xs">Adult {item?.fd?.ADULT?.bI?.cB}</div>
              </React.Fragment>
            ))}
          </div>
        );
      default:
        return null;
    }
  };
  const visiblePrices = showAllPrices
    ? displayedPrices
    : displayedPrices.slice(0, 2);

  return (
    <div className="border  bg-yellow-400 flex flex-col rounded-lg m-4 w-full overflow-x-auto">
      <div className="flex flex-col md:flex-row  justify-between items-stretch p-3  mb-2">
        <div className="flex flex-col  justify-center lg-custom:justify-normal w-full">
          <div className="flex gap-4 items-center justify-center md:justify-normal ">
            <div className="">
              <img
                src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${startSegment?.fD?.aI?.code}.png`}
                onError={(e) => (e.currentTarget.src = defaultAirline)}
                alt={startSegment?.fD?.aI?.code}
                className="size-12 hidden min-w-24"
              />
            </div>
            <div className="md:flex-row flex-col   flex justify-center items-center mb-4 md:mb-0">
              <img
                src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${startSegment?.fD?.aI?.code}.png`}
                alt={startSegment?.fD?.aI?.code}
                className="md:size-16 lg-custom:size-12 rounded-md mr-8 lg-custom:mr-4 md:flex hidden"
              />
              <div className="">
                <h1 className="text-base font-bold  min-w-20">
                  {startSegment?.da.code}
                </h1>
                {/* <h1 className="text-sm text-gray-500">
                  {startSegment.da.city}
                </h1> */}
                <h1 className="w-[50px] sm:w-max  text-xs">
                  {formatDateTime(startSegment?.dt)}
                </h1>
              </div>
            </div>
            <div className="flex  max-w-32 items-center jus  mb-4 md:mb-0">
              <div className="border-t  hidden md:flex border-dashed border-gray-400 w-6 md:w-16"></div>
              <div className="flex flex-col gap-2 text-center items-center text-xs font-semibold text-gray-500">
                <span className="">
                  {" "}
                  <span>{totalDuration}</span>
                </span>
                <FaPlane className="mx-2 text-blue-800 text-3xl" />
                <div className="flex items-center ">
                  {isConnectionFlight ? (
                    <span className="flex-wrap">
                      {data.length - 1} stop{data.length > 2 ? "s" : ""}
                      {data.length === 2 && ` via ${data[0].aa.city}`}
                    </span>
                  ) : (
                    <span className="text-[10px] w-max">Non-stop flight</span>
                  )}
                </div>
              </div>
              <div className="border-t hidden md:flex border-dashed border-gray-400 w-6 md:w-16"></div>
            </div>
            <div className="flex  md:text-start text-end  items-center mb-4 md:mb-0">
              <div>
                <h1 className="text-base font-bold">{endSegment?.aa.code}</h1>
                {/* <h1 className="text-sm text-gray-500">{endSegment?.aa.city}</h1> */}
                <h1 className="w-[50px] sm:w-max   text-xs">
                  {formatDateTime(endSegment?.at)}
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center  justify-between w-full ">
            <div className="flex flex-col w-full ">
              <div className="relative border-[1px] border-[#007EC4]  m-2 rounded-md">
                <div className="flex flex-wrap gap-2  overflow-x-auto  mt-3 p-2 items-center">
                  {visiblePrices?.map((price, index) => (
                    <div
                      key={index}
                      onClick={() => handlePriceSelection(index)}
                      className={`
                        text-xs text-start min-w-36 space-y-2 flex-shrink-0  md:w-fit p-1 mb-2 cursor-pointer
${
  localSelectedPriceIndex === index
    ? "border-[4px] border-[#007EC4] rounded-md"
    : "border border-gray-200 hover:border-blue-300 rounded-md"
}
            `}
                    >
                      <div className="flex flex-col text-xs">
                        <p className="font-semibold">
                          ₹ {calculateTotalPrice(index).toFixed(2)}
                        </p>
                        <p className="my-2 text-black flex flex-wrap items-center text-[10px]">
                          <span className="bg-gray-400 p-0.5 bg-opacity-50 mr-1  rounded-md text-black px-2 py-1">
                            {price?.fareIdentifier}
                          </span>{" "}
                          {price?.fd?.ADULT?.cc}
                        </p>
                        <p className="text-red-600 text-[10px]">
                          Seats left: {price?.fd?.ADULT?.sR}
                        </p>
                      </div>
                    </div>
                  ))}

                  {displayedPrices.length > 2 && (
                    <button
                      onClick={() => setShowAllPrices(!showAllPrices)}
                      className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#007EC4] text-white rounded-md py-1 px-2 flex items-center justify-center"
                      style={{ bottom: "-1.5rem" }}
                    >
                      <p className="mr-2 text-xs">
                        {showAllPrices ? "Show Less" : "Show More"}
                      </p>
                      {showAllPrices ? (
                        <FaChevronUp
                          className={`w-4 h-4 transition-transform duration-300 ${
                            showAllPrices ? "rotate-0" : "rotate-180"
                          }`}
                        />
                      ) : (
                        <FaChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            showAllPrices ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      )}
                    </button>
                  )}
                </div>
              </div>
              <div className="flex md:flex-row flex-col  items-start md:items-center md:justify-between justify-start">
                <div className="w-2/3 text-xs">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className=" text-sm mt-2"
                  >
                    {showDetails ? (
                      <span className="text-black">
                        {/* Fare Details :{" "} */}
                        <span className="text-[#007EC4]">Hide Details</span>
                      </span>
                    ) : (
                      <span className="text-black">
                        {/* Fare Details :{" "} */}
                        <span className="text-[#007EC4]">View Details</span>
                      </span>
                    )}
                  </button>
                </div>
                <div className=" flex items-end justify-end ">
                  <button
                    className={`${
                      isSelected ? "bg-green-500" : "bg-[#007EC4]"
                    } text-white md:w-20 px-7 py-2 rounded-md `}
                    onClick={() => onSelect(localSelectedPriceIndex)}
                  >
                    {isSelected ? "Selected" : "Select"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex   justify-center items-end md:border-l-2 pl-3 ">
          
        </div> */}
      </div>

      {showDetails && (
        <div>
          <div className="w-full text-xs mb-2 md:text-sm px-0 md:px-4 shrink-0 flex overflow-x-auto">
            {[
              "Flight Details",
              "Fare Details",
              "Fare Rules",
              "Baggage Information",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-2 shrink-0 text-[12px] ${
                  activeTab === tab
                    ? "text-[#007EC4]  font-bold border-b-2 border-[#007EC4]"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {renderTabs()}
        </div>
      )}
    </div>
  );
};

export default RoundTripCard;
