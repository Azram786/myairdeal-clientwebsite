import React, { useState, useEffect } from "react";
import {
  FaPlane,
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { GiRollingSuitcase } from "react-icons/gi";
import FareToolTip from "./FareTooltip";
import calculateDuration from "../../util/calculateDuration";
import defaultAirline from '../../../assets/booking/viewBookings/flightLogo.png'
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
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
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

  const displayedPrices = showAllPrices ? priceList : priceList;

  const handlePriceSelection = (index) => {
    setLocalSelectedPriceIndex(index);
    onSelect(index);
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

  const calculateLayoverTime = (currentSegment, nextSegment) => {
    const currentArrival = new Date(currentSegment.at);
    const nextDeparture = new Date(nextSegment.dt);
    const layoverMinutes = (nextDeparture - currentArrival) / (1000 * 60);
    const hours = Math.floor(layoverMinutes / 60);
    const minutes = Math.floor(layoverMinutes % 60);
    return `${hours}h ${minutes}m`;
  };

  const renderTabs = () => {
    switch (activeTab) {
      case "Flight Details":
        return (
          <div className="w-full overflow-hidden p-2">
            {data.map((segment, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="flex  relative flex-col md:flex-row items-center justify-start px-4 py-4 "
                  >
                    <div className="flex items-center w-full text-left md:w-[26%]">
                      <img
                        src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${segment?.fD?.aI.code}.png`}
                        alt={segment?.fD?.aI?.code}
                        className="md:size-10 size-8 rounded-md mr-4"
                      />
                      <div>
                        <div className="font-bold text-sm">
                          {segment.fD.aI.name} {segment.fD.fN}
                        </div>
                        <div className="text-xs text-gray-500">
                          {segment.da.city} → {segment.aa.city}{" "}
                          {/* {formatDateTime(segment.dt).split(",")[0]}
                          {getDayOfWeek(segment.dt)} */}
                        </div>
                      </div>
                    </div>

                    <div className="flex mt-2 items-center w-full  md:w-[70%] justify-around gap-0 md:gap-8">
                      <div className=" w-24 md:min-w-[30%]">
                        <div className="font-bold text-xs w-max md:text-sm">
                          {formatDateTime(segment.dt)}
                        </div>
                        <div className="text-xs  text-gray-500">
                          {segment.da.city}, {segment?.da?.country}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-1">
                          {segment.da.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {segment.da.terminal || "N/A"}
                        </div>
                      </div>
                      <div className="flex justify-center w-12  md:min-w-[35%] mr-0 md:mr-6 flex-col items-center ">
                        <div className="text-[10px] md:text-xs text-end text-gray-500">
                          {segment.stops === 0
                            ? "Non-Stop"
                            : `${segment.stops} Stop(s)`}
                        </div>
                        <FaPlane className="my-2 text-gray-400" />
                        <div className="text-xs text-gray-500">
                          {/* {convertToHoursMinutes(segment.duration)} */}
                          {calculateDuration(segment.dt, segment.at)}
                        </div>
                      </div>
                      <div className="text-left w-24 md:min-w-[30%]  ml-0 md:ml-8 ">
                        <div className="font-bold text-xs md:text-sm w-max">
                          {formatDateTime(segment.at)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {segment.aa.city}, {segment.aa.country}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-1">
                          {segment.aa.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {segment.aa.terminal || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-center">
                    {index < data.length - 1 && (
                      <div className="px-4  flex justify-around text-xs  py-2 md:w-1/2 border border-gray-200 bg-gray-100 rounded-full md:text-sm">
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
          <div className="w-full px-4 py-2">
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
                      <div className="grid grid-cols-3  text-xs w-max text-gray-600 font-semibold mb-2">
                        <div>
                          Fare Details for {passengerType} (CB: {details.cB})
                        </div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="grid grid-cols-3 w-full mb-1 text-sm">
                        <div>Base Price</div>
                        <div>
                          ₹{details?.fC?.BF?.toFixed(2)} x {count}
                        </div>
                        <div>₹{(details?.fC?.BF * count).toFixed(2)}</div>
                      </div>
                      <div className="grid grid-cols-3 w-full mb-1">
                        <div className="flex items-center text-sm">
                          Taxes and fees
                          <FareToolTip taxDetails={details?.afC?.TAF} />
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
          <div className="px-4 py-2">
            <h2 className="font-bold mb-2">Fare Rules</h2>
            <p>Insert fare rules information here.</p>
          </div>
        );
      case "Baggage Information":
        return (
          <div className=" px-4 grid p-2 grid-cols-3 text-sm w-full gap-4">
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
    <div className="border flex flex-col  rounded-lg m-4 shadow-md ">
      <div className="flex flex-col md:flex-row flex-wrap justify-between items-stretch p-3  mb-2">
        <div className="flex flex-col justify-around  border-none lg:border-r-2 pr-2 w-full lg:w-[80%]  ">
          <div className="flex justify-around items-center  mx-auto w-full">
            <div className="md:hidden">
              <img
                src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${startSegment?.fD?.aI?.code}.png`}
                onError={(e) => (e.currentTarget.src = defaultAirline)}
                alt={startSegment?.fD?.aI?.code}
                className="size-12 hidden mr-6"
              />
            </div>

            <div className="md:flex-row  flex-col flex justify-center items-center mb-4 md:mb-0">
              <img
                src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${startSegment?.fD?.aI?.code}.png`}
                alt={startSegment?.fD?.aI?.code}
                className="md:size-12 rounded-md  mr-6 md:flex hidden"
              />
              <div className="flex flex-col">
                <h1 className="text-base font-bold">{startSegment?.da.code}</h1>

                <h1 className="text-xs w-max">{formatDateTime(startSegment?.dt)}</h1>
              </div>
            </div>

            <div className="flex  items-center mb-4 md:mb-0">
              <div className="border-t  hidden md:flex border-dashed ml-4 border-gray-400 w-6 md:w-16 lg:w-[200px]"></div>
              <div className="flex flex-col gap-4 text-center items-center text-xs font-semibold w-20 md:min-w-44 text-gray-500">
                {/* <span>{convertToHoursMinutes(totalDuration)}</span> */}
                <span>{totalDuration}</span>
                <FaPlane className="mx-2 text-blue-800 text-3xl" />
                <div className="flex items-center">
                  {isConnectionFlight ? (
                    <span>
                      {data.length - 1} stop{data.length > 2 ? "s" : ""}
                      {data.length === 2 && ` via ${data[0].aa.city}`}
                    </span>
                  ) : (
                    <span className="min-w-44">Non-stop flight</span>
                  )}
                </div>
              </div>
              <div className="border-t hidden md:flex border-dashed mr-8 border-gray-400 w-4 md:w-16 lg:w-[200px]"></div>
            </div>
            <div className="md:flex-row flex-col flex justify-center items-center mb-4 md:mb-0">
              <div className="flex flex-col">
                <h1 className="text-base font-bold">{endSegment?.aa.code}</h1>
                <h1 className="text-xs w-max">{formatDateTime(endSegment.at)}</h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full   ">
            <div className="flex flex-wrap mt-3 gap-2 overflow-x-auto no-scroll items-start">
              {displayedPrices?.map((price, index) => (
                <div
                  key={index}
                  onClick={() => handlePriceSelection(index)}
                  className={`
                text-xs text-start space-y-2 flex shrink-0 items-center min-w-24 md:w-fit
                p-1 mb-2 cursor-pointer 
                ${
                  localSelectedPriceIndex === index
                    ? "border-2 border-[#007EC4] rounded-md"
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
            {/* View Details Button */}
            <div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className=" text-sm my-2"
              >
                {showDetails ? (
                  <span className="text-black">
                    <span className="text-[#007EC4]">Hide Details</span>
                  </span>
                ) : (
                  <span className="text-black">
                    <span className="text-[#007EC4]">View Details</span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[200px] flex flex-col  justify-between items-center border-none md:border-l-2 px-0 md:px-4 ">
          <div className="lg:flex flex-col hidden text-center gap-2 mt-4 justify-center items-center">
            {" "}
            <p className="text-[60px]">
              <GiRollingSuitcase />
            </p>
            <p className="font-bold text-xs">Included:Carry on bag</p>
           
             
                <div className="text-xs font-bold">{flightDetails?.totalPriceList[0]?.fd?.ADULT?.bI?.cB}</div>
             
          </div>

          <button
            className={`${
              isSelected ? "bg-green-500" : "bg-[#007EC4]"
            } text-white md:w-48 text-center px-16 py-2 rounded-md mt-4 md:mt-0`}
            onClick={() => onSelect(localSelectedPriceIndex)}
          >
            {isSelected ? "Selected" : "Select"}
          </button>
        </div>
      </div>

      {/* show details section */}
      {showDetails && (
        <div className=" border-t  border-gray-200 pt-4 ">
          <div className="text-xs mb-2 md:text-sm px-0 md:px-4 shrink-0 flex overflow-x-auto">
            {[
              "Flight Details",
              "Fare Details",
              "Fare Rules",
              "Baggage Information",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-2 md:px-3 shrink-0 text-sm ${
                  activeTab === tab
                    ? "text-[#007EC4]  font-bold border-b-2 border-[#007EC4]"
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
