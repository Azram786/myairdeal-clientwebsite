import React, { useState, useEffect } from "react";
import { FaPlane, FaInfoCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import FareToolTip from "./FareTooltip";
import calculateDuration from "../../util/calculateDuration";

const RoundTripCard = ({
  logo,
  flightDetails,
  isSelected,
  selectedPriceIndex,
  onSelect,
  passenger,
  specialReturnMode
}) => {
  const [showAllPrices, setShowAllPrices] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("Flight Details");
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
      hour12: false
    };
    return date.toLocaleString('en-US', options);
  };

  const departureTime = startSegment.dt;
  const arrivalTime = endSegment.at;

  const totalDuration = calculateDuration(departureTime,arrivalTime)

  const displayedPrices = specialReturnMode
    ? priceList.filter(price => price.fareIdentifier === "SPECIAL_RETURN")
    : priceList.filter(price => price.fareIdentifier !== "SPECIAL_RETURN");

  const handlePriceSelection = (index) => {
    setLocalSelectedPriceIndex(index);
    onSelect(index);
  };

  
  const renderTabs = () => {
    switch (activeTab) {
      case "Flight Details":
        return (
          <div className=" p-2">
            {data.map((segment, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center justify-between px-4 py-4 border-b"
              >
                <div className="flex items-center">
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
                      {formatDateTime(segment.dt).split(",")[0]}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-right mr-8">
                    <div className="font-bold text-xs">
                      {formatDateTime(segment.dt)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {segment.da.city}, {segment.da.country}
                    </div>
                    <div className="text-xs text-gray-500">
                      {segment.da.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {segment.da.terminal || "N/A"}
                    </div>
                  </div>
                  <div className="flex flex-col items-center mx-4">
                    <div className="text-xs text-gray-500">
                      {segment.stops === 0
                        ? "Non-Stop"
                        : `${segment.stops} Stops`}
                    </div>
                    <FaPlane className="my-2  text-gray-400" />
                    <div className="text-xs text-gray-500">
                      {/* {convertToHoursMinutes(segment.duration)} */}
                      {calculateDuration(segment.dt,segment.at)}
                    </div>
                  </div>
                  <div className="text-left ml-8">
                    <div className="text-xs font-bold">
                      {formatDateTime(segment.at)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {segment.aa.city}, {segment.aa.country}
                    </div>
                    <div className="text-xs text-gray-500">
                      {segment.aa.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {segment.aa.terminal || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case "Fare Details":
        return (
          <div className="flex flex-col  p-2">
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
                    <div key={passengerType} className="mb-4  text-xs">
                      <div className="grid grid-cols-3  w-full text-gray-600 mb-2">
                        <div>
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
            <div className="grid grid-cols-3  text-sm font-bold border-t pt-2">
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
          <div className="p-2 text-xs">
            <h2 className="font-bold mb-2">Fare Rules</h2>
            <p>Insert fare rules information here.</p>
          </div>
        );
      case "Baggage Information":
        return (
          <div className="grid p-2 grid-cols-3 text-xs  gap-4">
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
    <div className="border flex flex-col   rounded-lg m-4 bg-white shadow-md overflow-x-auto no-scroll ">
      <div className="flex flex-col md:flex-row justify-between items-stretch p-3  mb-2">
        <div className="flex flex-col px-2 ">
          <div className="flex justify-around">
          <div className="md:hidden">
          <img
              src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${startSegment?.fD?.aI?.code}.png`}
              onError={(e) => e.currentTarget.src = defaultAirline}
              alt={startSegment?.fD?.aI?.code}
              className="size-12 hidden mr-4"
            />
          </div>
            <div className="md:flex-row  flex-col flex justify-center items-center mb-4 md:mb-0">
              <img
                src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${startSegment?.fD?.aI?.code}.png`}
                alt={startSegment?.fD?.aI?.code}
                className="md:size-10 rounded-md  mr-4 md:flex hidden"
              />
              <div>
                <h1 className="text-base font-bold">{startSegment?.da.code}</h1>
                {/* <h1 className="text-sm text-gray-500">
                  {startSegment.da.city}
                </h1> */}
                <h1 className="text-xs">{formatDateTime(startSegment?.dt)}</h1>
              </div>
            </div>
            <div className="flex items-center mb-4 md:mb-0">
              <div className="border-t  hidden md:flex border-dashed border-gray-400 w-6 md:w-20"></div>
              <div className="flex flex-col gap-4 text-center items-center text-xs  text-gray-500">
                {/* <span className="">{convertToHoursMinutes(totalDuration)}</span> */}
                <span className="">{totalDuration}</span>
                <FaPlane className="mx-2 text-blue-800 text-3xl" />
                <div className="flex items-center">
                  {isConnectionFlight ? (
                    <span>
                      {data.length - 1} stop{data.length > 2 ? "s" : ""}
                      {data.length === 2 && ` via ${data[0].aa.city}`}
                    </span>
                  ) : (
                    <span>Non-stop flight</span>
                  )}
                </div>
              </div>
              <div className="border-t hidden md:flex border-dashed border-gray-400 w-6 md:w-20"></div>
            </div>
            <div className="flex  md:text-start text-end  items-center mb-4 md:mb-0">
              <div>
                <h1 className="text-base font-bold">{endSegment?.aa.code}</h1>
                {/* <h1 className="text-sm text-gray-500">{endSegment?.aa.city}</h1> */}
                <h1 className="text-xs">{formatDateTime(endSegment?.at)}</h1>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col w-full  ">
              <div className="flex   mt-3 gap-2 overflow-x-auto no-scroll items-center ">
              {displayedPrices.map((price, index) => (
              <div
                key={index}
                onClick={() => handlePriceSelection(index)}
                className={`
                  text-xs text-start space-y-2 flex shrink-0 items-center min-w-24 md:w-fit
                  p-1 mb-2 cursor-pointer
                  ${
                    localSelectedPriceIndex === index
                      ? "border border-[#007EC4] rounded-md"
                      : "border border-gray-200 hover:border-blue-300 rounded-md"
                  }
                `}
              >
                    <div className="flex flex-col  text-xs">
                      <p className="font-semibold">
                        ₹ {calculateTotalPrice(index).toFixed(2)}
                      </p>
                      <p className="text-[10px]">
                        <span className="bg-yellow-800 p-0.5 bg-opacity-50 rounded-md text-gray-700">
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
                {/* {priceList?.length > 1 && (
                  <button
                    onClick={() => setShowAllPrices(!showAllPrices)}
                    className="text-blue-500 text-sm mt-2 flex items-center"
                  >
                    {showAllPrices ? (
                      <>
                        Show less
                      </>
                    ) : (
                      <>
                         Show more
                      </>
                    )}
                  </button>
                )} */}
              </div>
              <div className="flex md:flex-row flex-col items-center justify-between">
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
        <div className=" border-t  border-gray-200 pt-4">
          <div className="mb-2 overflow-x-auto no-scroll shrink-0 flex">
            {[
              "Flight Details",
              "Fare Details",
              "Fare Rules",
              "Baggage Information",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 shrink-0 text-sm ${
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
