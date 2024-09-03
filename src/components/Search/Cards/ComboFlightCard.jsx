import React, { useState, useEffect } from "react";
import {
  FaPlane,
  FaChevronDown,
  FaChevronUp,
  FaInfoCircle,
} from "react-icons/fa";

import defaultAirline from "../../../assets/home/logo/defaultAirline.png";
import FareToolTip from "./FareTooltip";
import calculateDuration from "../../util/calculateDuration";
import { useRef } from "react";
const ComboFlightCard = ({
  flightDetails,
  isSelected,
  selectedPriceIndex,
  onSelect,
  passenger,
}) => {
  const [showAllPrices, setShowAllPrices] = useState(false);
  const [localSelectedPriceIndex, setLocalSelectedPriceIndex] = useState(
    selectedPriceIndex || 0
  );
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("Flight Details");

  let data;
  let priceList = [];

  useEffect(() => {
    if (isSelected && selectedPriceIndex === null) {
      onSelect(0);
    }
  }, [isSelected, selectedPriceIndex, onSelect]);

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

  function calculateTotalDuration(segments) {
    if (!segments || segments.length === 0) return "N/A";

    let totalDuration = 0;

    for (let i = 0; i < segments.length; i++) {
      // Add flight duration
      totalDuration += segments[i].duration;

      // Add layover time if there's a next segment
      if (i < segments.length - 1) {
        const arrivalTime = new Date(segments[i].at);
        const departureTime = new Date(segments[i + 1].dt);
        const layoverTime = (departureTime - arrivalTime) / (1000 * 60); // in minutes
        totalDuration += layoverTime;
      }
    }

    const hours = Math.floor(totalDuration / 60);
    const minutes = Math.round(totalDuration % 60);
    return `${hours}h ${minutes}m`;
  }
  function groupFlightsBySN(flightOffer) {
    const groupedFlights = [];
    let currentGroup = [];

    flightOffer.sI.forEach((flight) => {
      if (flight.sN === 0) {
        // If there's already a group, push it to groupedFlights before starting a new one
        if (currentGroup.length > 0) {
          groupedFlights.push(currentGroup);
        }
        // Start a new group
        currentGroup = [flight];
      } else {
        // Add the flight to the current group
        currentGroup.push(flight);
      }
    });

    // Push the last group if it exists
    if (currentGroup.length > 0) {
      groupedFlights.push(currentGroup);
    }

    return groupedFlights;
  }

  const groupedFlights = groupFlightsBySN(flightDetails);

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

  const totalPrice = calculateTotalPrice(selectedPriceIndex);

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

  function convertMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  const handlePriceSelection = (index) => {
    setLocalSelectedPriceIndex(index);
    onSelect(index);
  };

  const renderTabs = () => {
    switch (activeTab) {
      case "Flight Details":
        return (
          <div className="w-full bg-[#f0e1c0] ">
            {Object.keys(groupedFlights).map((date, dateIndex) => {
              const flightsForDate = groupedFlights[date];
              const sourceCity = flightsForDate[0]?.da?.city;
              const finalDestinationCity =
                flightsForDate[flightsForDate.length - 1]?.aa?.city;

              console.log({ flightsForDate }, "fligyts");
              return (
                <div key={dateIndex} className="mb-8">
                  {/* Source to Destination Header */}
                  <div className="text-sm md:text-lg font-bold bg-[#1B1D29] text-[#D7B56D] mb-4 pl-4 py-2  justify-between flex items-center">
                    <div>
                      {sourceCity} to {finalDestinationCity},{" "}
                      <span className="text-white text-sm">
                        On{" "}
                        {new Date(flightsForDate[0].at).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="pr-4 text-white text-sm font-medium">
                      Total Duration : {calculateTotalDuration(flightsForDate)}
                    </div>
                  </div>
                  <div className="w-full bg-[#f0e1c0]  ">
                    {flightsForDate.map((segment, index) => (
                      <div>
                        <div
                          key={index}
                          className="flex  w-full flex-col lg-custom:flex-row gap-2 items-center justify-between px-4 py-4 border-b"
                        >
                          <div className="flex items-center  w-full text-left pl-0 md:pl-6 lg-custom:pl-0 lg-custom:w-[20%] ">
                            <img
                              src={`${
                                import.meta.env.VITE_SERVER_URL
                              }uploads/AirlinesLogo/${segment.fD.aI.code}.png`}
                              onError={(e) =>
                                (e.currentTarget.src = defaultAirline)
                              }
                              alt={segment?.fD?.aI?.code}
                              className="md:size-10 size-8 rounded-md mr-4"
                            />
                            <div className="flex flex-col ">
                              <div className="text-xs font-bold text-[#1B1D29]">
                                {segment.da.city} → {segment.aa.city}
                              </div>
                              <div className="font-bold text-sm">
                                <span className="text-[10px] text-gray-600">
                                  {flightDetails.totalPriceList[0].fd.ADULT.cc}
                                </span>
                                <br />
                                {segment.fD.aI.name} {segment.fD.fN}
                              </div>
                              {/* <div className="text-xs text-gray-500 bg-red-400">
                                {formatDateTime(segment.dt)}
                              </div> */}
                            </div>
                          </div>

                          <div className="flex gap-2 mt-2 items-center w-full lg-custom:w-[75%] justify-around  ">
                            <div className="p-2  text-left  min-w-[30%]">
                              <div className="font-bold text-xs md:text-sm">
                                {new Date(segment.dt).toLocaleString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                                ,
                                {new Date(segment.dt).toLocaleString("en-US", {
                                  weekday: "short",
                                })}
                                ,
                                {new Date(segment.dt).toLocaleString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })}
                              </div>
                              <div className="text-xs text-gray-500 line-clamp-2">
                                {segment.da.city}, {segment.da.country}
                              </div>
                              <div className="relative group">
                                <div className="text-xs text-gray-500 line-clamp-2">
                                  {segment.da.name}
                                </div>

                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/4 transform -translate-x-1/2 mb-0.5 z-50 w-max hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1">
                                  {segment.da.name}
                                </div>
                              </div>

                              <div className="text-xs text-gray-500">
                                {segment.da.terminal || "N/A"}
                              </div>
                            </div>

                            <div className="flex justify-center  min-w-[20%]  flex-col items-center">
                              <div className="text-xs text-gray-500 ">
                                {convertToHoursMinutes(segment.duration)}
                              </div>

                              <FaPlane className="my-2 text-gray-400" />
                              <div className="text-[10px] md:text-xs text-end text-gray-500">
                                {segment.stops === 0
                                  ? "Non-Stop"
                                  : `${segment.stops} Stop(s)`}
                              </div>
                            </div>

                            <div className="text-left p-2 min-w-[30%] ml-0 ">
                              <div className="font-bold text-xs md:text-sm ">
                                {new Date(segment.at).toLocaleString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                                ,
                                {new Date(segment.at).toLocaleString("en-US", {
                                  weekday: "short",
                                })}
                                ,
                                {new Date(segment.at).toLocaleString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })}
                              </div>
                              <div className="text-xs text-gray-500 line-clamp-2">
                                {segment.aa.city}, {segment.aa.country}
                              </div>
                              <div className="relative group">
                                <div className="text-xs text-gray-500 line-clamp-2">
                                  {segment.aa.name}
                                </div>

                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/4 transform -translate-x-1/2 mb-0.5 w-max z-50 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1">
                                  {segment.aa.name}
                                </div>
                              </div>
                              <div className="text-xs text-gray-500">
                                {segment.aa.terminal || "N/A"}
                              </div>
                            </div>
                          </div>

                          {/* Display Layover Time for Connecting Flights */}
                        </div>
                        <div className="w-full flex justify-center">
                          {index < flightsForDate.length - 1 && (
                            <div className="px-4 flex justify-between py-2 lg-custom:w-1/2 border border-gray-200 bg-gray-100 rounded-full text-xs md:text-sm">
                              <span className="font-bold">
                                Require to change Plane
                              </span>
                              <span>
                                <span className="font-bold ml-4">
                                  Layover Time:
                                </span>{" "}
                                {convertMinutesToHours(flightsForDate[0]?.cT)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Group of Flights for the Same Date */}
                </div>
              );
            })}
          </div>
        );

      case "Fare Details":
        return (
          <div className="w-full bg-[#f0e1c0] ">
            <div className="grid grid-cols-3 w-full border-b text-sm pb-2 mb-2">
              <div className="font-bold">TYPE</div>
              <div className="font-bold">Fare</div>
              <div className="font-bold">Total</div>
            </div>
            {Object.entries(passenger).map(([passengerType, count]) => {
              if (count > 0) {
                const details =
                  priceList[selectedPriceIndex]?.fd[passengerType];
                if (details) {
                  return (
                    <div key={passengerType} className="mb-4">
                      <div className="grid grid-cols-3 w-full text-xs text-gray-600 mb-2">
                        <div>
                          Fare Details for {passengerType} (CB: {details.cc})
                        </div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="grid grid-cols-3 w-full mb-1">
                        <div>Base Price</div>
                        <div>
                          ₹{details?.fC?.BF?.toFixed(2)} x {count}
                        </div>
                        <div> ₹{(details?.fC?.BF * count).toFixed(2)}</div>
                      </div>
                      <div className="grid grid-cols-3 w-full mb-1">
                        <div className="flex items-center">
                          Taxes and fees
                          <FareToolTip taxDetails={details?.afC?.TAF} />
                        </div>
                        <div>
                          ₹{details?.fC?.TAF?.toFixed(2)} x {count}
                        </div>
                        <div>₹{(details?.fC?.TAF * count).toFixed(2)}</div>
                      </div>
                    </div>
                  );
                }
              }
              return null;
            })}
            <div className="grid grid-cols-3 text-sm w-full font-bold border-t pt-2">
              <div>Total</div>
              <div></div>
              <div>₹{totalPrice.toFixed(2)}</div>
            </div>
          </div>
        );
      case "Fare Rules":
        return (
          <div className="text-xs bg-[#f0e1c0] ">
            <h2 className="font-bold mb-2">Fare Rules</h2>
            <p>Insert fare rules information here.</p>
          </div>
        );
      case "Baggage Information":
        return (
          <div className="bg-[#f0e1c0]  grid grid-cols-3 w-full text-sm gap-4">
            <div className="font-bold">SECTOR</div>
            <div className="font-bold">CHECKIN</div>
            <div className="font-bold">CABIN</div>
            {priceList.map((item, index) => (
              <React.Fragment key={index}>
                <div className="text-xs">
                  {data[0]?.da?.code} - {data[data.length - 1]?.aa?.code}
                </div>
                <div className="text-xs">Adult {item?.fd?.ADULT?.bI?.iB}</div>
                <div className="text-xs">Adult {item?.fd?.ADULT?.bI?.cB}</div>
              </React.Fragment>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const startSegment = data[0];

  const endSegment = data[data.length - 1];
  const displayedPrices = showAllPrices ? priceList : priceList;

  const isConnectionFlight = data.length > 1;
  const totalDurations = data.reduce(
    (sum, segment) => sum + segment.duration,
    0
  );

  const groupedSegments = [];
  let currentGroup = [];

  data.forEach((segment) => {
    if (segment.sN === 0) {
      if (currentGroup.length > 0) {
        groupedSegments.push(currentGroup);
      }
      currentGroup = [segment];
    } else if (segment.sN === 1 && currentGroup.length > 0) {
      currentGroup.push(segment);
      groupedSegments.push(currentGroup);
      currentGroup = [];
    }
  });

  // Handle any remaining segments if there's an incomplete group
  if (currentGroup.length > 0) {
    groupedSegments.push(currentGroup);
  }

  return (
    <>
      <div className="border p-4 rounded-lg m-2 justify-between items-center overflow-x-auto bg-white shadow-md">
        <div className="flex   flex-col md:flex-row  justify-between items-stretch  mb-2">
          <div className="flex flex-col w-full ">
            <div className="flex flex-col gap-4 ">
              {groupedSegments.map((group, index) => {
                const startSegment = group[0];
                const endSegment = group[group.length - 1];
                const totalDuration = group.reduce(
                  (acc, segment) => acc + segment.duration,
                  0
                );

                // Check if it's a connecting flight
                const isConnectionFlight = group.length > 1;

                return (
                  <div
                    key={index}
                    className="flex justify-around bg-white p-4 rounded-md"
                  >
                    {/* Departure Information */}
                    <div className="flex flex-col items-center ">
                      <img
                        src={`${
                          import.meta.env.VITE_SERVER_URL
                        }uploads/AirlinesLogo/${
                          startSegment?.fD?.aI?.code
                        }.png`}
                        onError={(e) => (e.currentTarget.src = defaultAirline)}
                        alt={startSegment?.fD?.aI?.code}
                        className="size-12"
                      />

                      <div className="relative group text-base ">
                        <div className="text-base font-bold line-clamp-2">
                          {startSegment.da.code}
                        </div>

                        {/* Tooltip */}
                        <div className=" w-max absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 z-50">
                          {startSegment.da.name}
                        </div>
                      </div>

                      <h1 className="text-xs">
                        {formatDateTime(startSegment.dt)}
                      </h1>
                    </div>

                    {/* Flight Duration and Connection Information */}
                    <div className="flex items-center text-center">
                      <div className="border-t border-dashed border-gray-400 hidden sm:flex w-20"></div>
                      <div className="flex flex-col items-center text-xs font-semibold text-gray-500 mx-4 ">
                        <span>{convertToHoursMinutes(totalDuration)}</span>
                        <FaPlane className="text-[#D7B56D] text-3xl" />
                        {isConnectionFlight ? (
                          <span>
                            {group.length - 1} stop{group.length > 2 ? "s" : ""}
                            {group.length === 2 && ` via ${group[0].aa.city}`}
                          </span>
                        ) : (
                          <span>Non-stop flight</span>
                        )}
                      </div>
                      <div className="border-t border-dashed border-gray-400 hidden sm:flex w-20"></div>
                    </div>

                    {/* Arrival Information */}
                    <div className="flex flex-col items-center">
                      <img
                        src={`${
                          import.meta.env.VITE_SERVER_URL
                        }uploads/AirlinesLogo/${endSegment?.fD?.aI?.code}.png`}
                        onError={(e) => (e.currentTarget.src = defaultAirline)}
                        alt={endSegment?.fD?.aI?.code}
                        className="size-12"
                      />
                      <div className="relative group text-base ">
                        <div className="text-base font-bold line-clamp-2">
                          {endSegment.aa.code}
                        </div>

                        {/* Tooltip */}
                        <div className="w-max absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 z-50">
                          {endSegment.aa.name}
                        </div>
                      </div>

                      <h1 className="text-xs">
                        {formatDateTime(endSegment.at)}
                      </h1>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col w-full  overflow-x-auto">
              <div className="flex  mt-3 gap-2 overflow-x-auto items-start">
                {displayedPrices.map((price, index) => (
                  <div
                    key={index}
                    onClick={() => handlePriceSelection(index)}
                    className={`
                   text-xs text-start space-y-2 flex shrink-0 items-center min-w-24 md:w-fit
                p-1 mb-2 cursor-pointer 
                  ${
                    localSelectedPriceIndex === index
                      ? "border border-[#D7B56D] rounded-md"
                      : "border border-gray-200 hover:border-blue-300 rounded-md"
                  }
                `}
                  >
                    <div className="flex flex-col w-full text-xs">
                      <p className="font-semibold">
                        ₹ {calculateTotalPrice(index).toFixed(2)}
                      </p>
                      <p className="text-[10px] my-1">
                        <span className="bg-gray-400 p-1 bg-opacity-50 rounded-md text-black">
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
                {/* {priceList.length > 1 && (
              <button
                onClick={() => setShowAllPrices(!showAllPrices)}
                className="text-blue-500 text-sm mt-2 flex items-center"
              >
                {showAllPrices ? (
                  <>
                    <FaChevronUp className="mr-1" /> Show less
                  </>
                ) : (
                  <>
                    <FaChevronDown className="mr-1" /> Show more
                  </>
                )}
              </button>
            )} */}
              </div>
              <div className="flex justify-between h-14">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className=" text-sm my-2 bg-[#D7B56D] rounded-md text-[#1B1D29] px-2 py-2"
                >
                  {showDetails ? (
                    <span className="text-black">
                      <span className="text-[#1B1D29]">Hide Details</span>
                    </span>
                  ) : (
                    <span className="text-black">
                      <span className="text-[#1B1D29]">View Details</span>
                    </span>
                  )}
                </button>
                <button
                  className={`${
                    isSelected
                      ? "bg-[#D7B56D] text-[#1B1D29]"
                      : "bg-[#1B1D29] text-[#D7B56D]"
                  }  font-semibold  text-sm my-2  px-16 py-2 rounded-md `}
                  onClick={() => onSelect(localSelectedPriceIndex)}
                >
                  {isSelected ? "Selected" : "Select"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {showDetails && (
          <div className=" border-t  border-gray-200 pt-4 ">
            <div className="text-xs mb-2 md:text-sm px-0 md:px-4 shrink-0 flex overflow-x-auto  bg-white">
              {[
                "Flight Details",
                "Fare Details",
                "Fare Rules",
                "Baggage Information",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2  px-2 md:px-3 shrink-0 text-sm  ${
                    activeTab === tab
                      ? "text-[#1B1D29]  font-bold border-b-2 border-[#1B1D29]"
                      : "text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* function for the cards */}
            {renderTabs()}
          </div>
        )}
      </div>
    </>
  );
};

export default ComboFlightCard;
