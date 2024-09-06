import React, { useState, useEffect } from "react";
import { FaPlane } from "react-icons/fa";
import { GiRollingSuitcase } from "react-icons/gi";
import ReactJoyride from "react-joyride";
import FareToolTip from "./FareTooltip";
import calculateDuration from "../../util/calculateDuration";
import defaultAirline from "../../../assets/booking/viewBookings/flightLogo.png";
const FlightDetailsCard = ({
  logo,
  flightDetails,
  isSelected,
  selectedPriceIndex,
  onSelect,
  passenger,
}) => {
  const [showAllPrices, setShowAllPrices] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("Flight Details");
  const [localSelectedPriceIndex, setLocalSelectedPriceIndex] = useState(
    selectedPriceIndex || 0
  );

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
    return <div className="">No flight details available</div>;
  }

  const isConnectionFlight = data.length > 1;
  const startSegment = data[0];
  const endSegment = data[data.length - 1];

  // const convertToHoursMinutes = (durationInMinutes) => {
  //   const hours = Math.floor(durationInMinutes / 60);
  //   const minutes = durationInMinutes % 60;

  //   if (hours === 0) {
  //     return `${minutes}m`;
  //   } else if (minutes === 0) {
  //     return `${hours}h`;
  //   } else {
  //     return `${hours}h ${minutes}m`;
  //   }
  // };

  // FOR 24 HOURS CONVERTION

  const convertToHoursMinutes = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours.toString().padStart(2)}h ${minutes
      .toString()
      .padStart(2, "0")}m`;
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

  // const departureTime = startSegment.dt;
  // const arrivalTime = endSegment.at;

  // const totalDuration = calculateDuration(departureTime, arrivalTime);

  const displayedPrices = showAllPrices ? priceList : priceList;

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

  //calculate total duration
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

  // const totalDuration = data[0].duration;
  const renderTabs = () => {
    switch (activeTab) {
      case "Flight Details":
        return (
          <div className="w-full bg-[#f0e1c0] ">
            <div className="text-lg font-bold bg-[#1B1D29] text-[#D7B56D] mb-4 pl-4 py-2 justify-between flex items-center">
              <div>
                {data[0]?.da?.city} → {data[data.length - 1]?.aa?.city}{" "}
                <span className="text-white text-sm">
                  On{" "}
                  {new Date(data[0].dt).toLocaleString("en-US", {
                    month: "short",

                    day: "numeric",
                    weekday: "short",
                  })}
                </span>
              </div>
              <div className="pr-4 text-white text-sm font-medium hidden md:flex">
                Total Duration : {calculateTotalDuration(data)}
              </div>
            </div>
            {data.map((segment, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="flex  relative flex-col md:flex-row items-center justify-start px-2 lg:px-4 py-4 "
                  >
                    <div className="flex items-center w-full text-left pl-0 md:pl-6 lg-custom:pl-0 md:w-[26%]">
                      <img
                        src={`${
                          import.meta.env.VITE_SERVER_URL
                        }uploads/AirlinesLogo/${segment?.fD?.aI.code}.png`}
                        onError={(e) => (e.currentTarget.src = defaultAirline)}
                        alt={segment?.fD?.aI?.code}
                        className="md:size-10 size-8 rounded-md mr-4"
                      />
                      <div>
                        <div className="font-bold text-sm">
                          <div className="text-xs text-gray-500 line-clamp-1">
                            {segment.da.city} → {segment.aa.city}{" "}
                            {/* {formatDateTime(segment.dt).split(",")[0]}
                          {getDayOfWeek(segment.dt)} */}
                          </div>
                          <span className="text-[10px] text-gray-600">
                            {flightDetails.totalPriceList[0].fd.ADULT.cc}
                          </span>{" "}
                          <br />
                          {segment.fD.aI.name} {segment.fD.fN}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-2 items-center w-full  md:w-[70%] justify-around  md:gap-8">
                      <div className=" p-2 min-w-[30%] md:w-[55%]  ">
                        <div className="font-bold text-xs  md:text-sm">
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
                        </div>

                        <div className="relative group text-[10px]   text-xs text-gray-500">
                          <span className="text-xs line-clamp-1">
                            {segment?.da?.city}, {segment?.da?.country}
                          </span>

                          {/* Tooltip */}
                          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full  hover:flex hover:flex-wrap text-xs p-2 bg-gray-800 text-white  rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                            {segment?.da?.city}, {segment?.da?.country}
                          </div>
                        </div>
                        <div className="relative group text-[10px]   text-xs text-gray-500">
                          <span className="text-xs line-clamp-1">
                            {segment?.da?.name}
                          </span>

                          {/* Tooltip */}
                          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full  hover:flex hover:flex-wrap text-xs p-2 bg-gray-800 text-white  rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                            {segment?.da?.name}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {segment?.da?.terminal || "N/A"}
                        </div>
                      </div>
                      <div className="flex justify-center w-32  md:min-w-[25%]  mr-0 md:mr-6 flex-col items-center ">
                        <div className="text-xs text-gray-500">
                          {/* {convertToHoursMinutes(segment.duration)} */}
                          {convertToHoursMinutes(segment?.duration)}
                        </div>
                        <FaPlane className="my-2 text-gray-400" />
                        <div className="text-[10px] md:text-xs text-end text-gray-500">
                          {segment.stops === 0
                            ? "Non-Stop"
                            : `${segment?.stops} Stop(s)`}
                        </div>
                      </div>
                      <div className="text-left p-2   min-w-[30%] md:w-[55%] ml-0 lg-custom:ml-8 ">
                        <div className="font-bold text-xs md:text-sm">
                          {new Date(segment?.at).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                          ,
                          {new Date(segment?.at).toLocaleString("en-US", {
                            weekday: "short",
                          })}
                          ,
                          {new Date(segment?.at).toLocaleString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </div>

                        <div className="relative group text-[10px]text-xs text-gray-500">
                          <span className="text-xs  line-clamp-1  ">
                            {" "}
                            {segment?.aa?.city}, {segment?.aa?.country}
                          </span>

                          {/* Tooltip */}
                          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full  hover:flex hover:flex-wrap text-xs p-2 bg-gray-800 text-white  rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                            {segment?.aa?.city}, {segment?.aa?.country}
                          </div>
                        </div>
                        <div className="relative group text-[10px] text-xs text-gray-500">
                          <span className="text-xs line-clamp-1  ">
                            {segment?.aa?.name}
                          </span>

                          {/* Tooltip */}
                          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full  hover:flex hover:flex-wrap text-xs p-2 bg-gray-800 text-white  rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                            {segment?.aa?.name}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {segment?.aa?.terminal || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-center">
                    {index < data.length - 1 && (
                      <div className="px-4  flex flex-wrap justify-around  py-2 w-[80%] lg-custom:w-1/2 border border-gray-200 bg-gray-100 rounded-full text-xs  md:text-sm">
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
                </>
              );
            })}
          </div>
        );
      case "Fare Details":
        return (
          <div className="w-full bg-[#f0e1c0] px-4 py-2">
            <div className="grid grid-cols-3 text-sm w-full border-b pb-2 mb-2">
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
                    <div key={passengerType} className="mb-4">
                      <div className="grid grid-cols-3 md:text-sm  text-xs w-max text-gray-600 font-semibold mb-2">
                        <div>
                          Fare Details for {passengerType} (CB: {details.cB})
                        </div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="grid grid-cols-3 w-full mb-1 text-sm">
                        <div>Base Price</div>
                        <div className="text-xs md:text-sm">
                          ₹{details?.fC?.BF?.toFixed(2)} x {count}
                        </div>
                        <div className="text-xs md:text-sm">
                          ₹{(details?.fC?.BF * count).toFixed(2)}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 w-full mb-1 gap-2">
                        <div className="flex items-center text-sm">
                          Taxes and fees
                          <FareToolTip taxDetails={details?.afC?.TAF} />
                        </div>

                        <div className="text-xs md:text-sm">
                          ₹{details?.fC?.TAF.toFixed(2)} x {count}
                        </div>
                        <div className="text-xs md:text-sm">
                          ₹{(details?.fC?.TAF * count).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                }
              }
              return null;
            })}
            <div className="grid grid-cols-3 w-full font-bold border-t pt-2">
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
          <div className="px-4 bg-[#f0e1c0] py-2">
            <h2 className="font-bold mb-2">Fare Rules</h2>
            <p>Insert fare rules information here.</p>
          </div>
        );
      case "Baggage Information":
        return (
          <div className="bg-[#f0e1c0] px-4 grid p-2 grid-cols-3 text-sm w-full gap-4">
            <div className="font-bold">SECTOR</div>
            <div className="font-bold">CHECKIN</div>
            <div className="font-bold">CABIN</div>
            {priceList.map((item, index) => (
              <React.Fragment key={index}>
                <div className="text-xs">
                  {startSegment.da.code} - {endSegment.aa.code}
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

  return (
    <div className="border p-4 rounded-lg m-2 justify-between items-center  bg-white shadow-md  ">
      
      <div className="flex   flex-col md:flex-row  justify-between  mb-2">
        <div className="flex flex-col w-full ">
          <div className="flex justify-around  gap-0 md:gap-3 w-full">
            <div className="md:flex-row  flex-col flex justify-center   items-center mb-4 md:mb-0">
              <img
                src={`${import.meta.env.VITE_SERVER_URL}uploads/AirlinesLogo/${
                  startSegment?.fD?.aI?.code
                }.png`}
                alt={startSegment?.fD?.aI?.code}
                className="md:size-12  rounded-md  mr-6 md:flex hidden"
              />
              <div className="flex flex-col">
                <div className="relative group text-base ">
                  <div className="text-base font-bold line-clamp-1">
                    {startSegment?.da?.code}
                  </div>

                  {/* Tooltip */}
                  <div className="  absolute bottom-full left-1/2 transform -translate-x-1/2  hover:flex hover:flex-wrap hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 z-50">
                    {startSegment?.da?.name}
                  </div>
                </div>

                <h1 className="text-xs w-[80px] sm:w-max">
                  {formatDateTime(startSegment?.dt)}
                </h1>
              </div>
            </div>

            <div className="flex w-[40%]  items-center mb-4 mx-2 md:mb-0">
              <div className="border-t   flex border-dashed ml-0 md:ml-4 border-gray-400 w-[40%]"></div>
              <div className=" flex flex-col gap-4 text-center items-center text-xs font-semibold text-gray-500">
                {/* <span>{convertToHoursMinutes(totalDuration)}</span> */}
                {calculateTotalDuration(data)}
                <FaPlane className="mx-2  text-[#D7B56D] text-3xl" />
                <div className="flex items-center">
                  {isConnectionFlight ? (
                    <span>
                      {data.length - 1} stop{data.length > 2 ? "s" : ""}
                      {data.length === 2 && ` via ${data[0].aa.city}`}
                    </span>
                  ) : (
                    <span className="text-xs">Non-stop flight</span>
                  )}
                </div>
              </div>
              <div className="border-t flex border-dashed mr-8 border-gray-400 w-[40%]"></div>
            </div>
            {/* Arrival Information */}
            <div className="md:flex-row  flex-col  flex justify-center items-center mb-4 md:mb-0">
              <div className="flex flex-col">
                <div className="relative group text-base ">
                  <div className="text-base font-bold line-clamp-1">
                    {endSegment?.aa?.code}
                  </div>

                  {/* Tooltip */}
                  <div className="  absolute bottom-full left-1/2 transform -translate-x-1/2  hover:flex hover:flex-wrap hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 z-50">
                    {endSegment?.aa?.name}
                  </div>
                </div>
                <h1 className="text-xs w-[80px] sm:w-max">
                  {formatDateTime(endSegment?.at)}
                </h1>
              </div>
            </div>
            <div className="flex flex-col pr-4  justify-between items-center   ">
              <div className="ml-8 border-l-2 pl-4 hidden lg-custom:flex flex-col text-center gap-2 mt-4 justify-center items-center">
                {" "}
                <p className="text-[50px]">
                  <GiRollingSuitcase />
                </p>
                <p className="font-bold text-xs">
                  Included:
                  <br />
                </p>
                <div className="text-xs font-bold">
                  Carry on bag :
                  {flightDetails?.totalPriceList[0]?.fd?.ADULT?.bI?.cB}
                </div>
                <div className="text-xs font-bold">
                  Check-In bag : <br />
                  {flightDetails?.totalPriceList[0]?.fd?.ADULT?.bI?.iB}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full ">
            <div className="w-full lg-custom:w-[80%]">
              <div className="flex mt-3 gap-2 flex-wrap w-full overflow-x-auto  items-start">
                {displayedPrices?.map((price, index) => (
                  <div
                    key={index}
                    onClick={() => handlePriceSelection(index)}
                    className={`
                text-xs text-start space-y-2 flex shrink-0 items-center min-w-24 
                p-1 mb-2 cursor-pointer 
                ${
                  localSelectedPriceIndex === index
                    ? "border-2 border-[#1B1D29] rounded-md"
                    : "border border-gray-200 hover:border-blue-300 rounded-md"
                }
              `}
                  >
                    <div className="flex  flex-col text-xs ">
                      <p className="font-semibold">
                        ₹ {calculateTotalPrice(index).toFixed(2)}
                      </p>
                      <p className="my-2 text-[10px]">
                        <span className="bg-gray-400 p-0.5 bg-opacity-50 rounded-md text-black px-2 py-1">
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
              </div>
            </div>
            {/* View Details Button */}
            <div className="flex justify-between items-center w-full ">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className=" font-semibold text-sm my-2 bg-[#D7B56D] rounded-md text-[#1B1D29] px-2 py-2 view-details"
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
                }  font-semibold w-max text-center px-8 sm:px-16 py-2 rounded-md   `}
                onClick={() => onSelect(localSelectedPriceIndex)}
              >
                {isSelected ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* show details section */}
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
  );
};

export default FlightDetailsCard;
