// import React from "react";
// import { FaPlane } from "react-icons/fa";

// const ComboFlightCard = ({ logo, flightDetails }) => {
//   if (!flightDetails) {
//     return <div>Loading flight details...</div>;
//   }

//   let data;
//   let priceList;

//   if (!Array.isArray(flightDetails)) {
//     data = flightDetails.sI;
//     priceList = flightDetails.totalPriceList;
//   } else {
//     data = flightDetails;
//   }

//   if (!data || data.length === 0) {
//     return <div>No flight details available</div>;
//   }
//   console.log(flightDetails,"ddjo")

//   const convertToHoursMinutes = (durationInMinutes) => {
//     const hours = Math.floor(durationInMinutes / 60);
//     const minutes = durationInMinutes % 60;

//     if (hours === 0) {
//       return `${minutes}m`;
//     } else if (minutes === 0) {
//       return `${hours}h`;
//     } else {
//       return `${hours}h ${minutes}m`;
//     }
//   };

//   const formatDateTime = (dateTimeString) => {
//     const date = new Date(dateTimeString);
//     if (isNaN(date.getTime())) {
//       return "Invalid Date";
//     }
//     const options = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return date.toLocaleString(undefined, options);
//   };

//   const departureTime = formatDateTime(data?.dt);
//   const arrivalTime = formatDateTime(data?.at);

//   return (
//     <div className="border p-4 rounded-lg m-2 flex flex-col md:flex-row justify-between items-center bg-white shadow-md">
//       <div className="flex items-center mb-4 md:mb-0">
//         <img src={logo} alt="Airline Logo" className="w-16 h-16 mr-6" />
//         <div>
//           <h1 className="text-lg font-bold">{data?.da?.code}</h1>
//           <h1 className="text-sm text-gray-500">{data?.da?.city}</h1>
//           <h1 className="text-sm">{departureTime}</h1>
//         </div>
//       </div>
//       <div className="flex items-center justify-between mb-4 md:mb-0">
//           <div className="border-t border-dashed border-gray-400 w-10 md:w-28"></div>
//           <div className="flex flex-col gap-4 text-center items-center text-xs font-semibold text-gray-500">
//             <span>{convertToHoursMinutes(data.duration)}</span>
//             <FaPlane className="mx-2 text-gray-800" />
//             <div className="flex items-center">
//               {data.stops > 0 ? (
//                 <span>
//                   {data.stops} stops via {data?.so[0]?.city}
//                 </span>
//               ) : (
//                 <span>Non-stop flight</span>
//               )}
//             </div>
//           </div>
//           <div className="border-t border-dashed border-gray-400 w-10 md:w-28"></div>
//         </div>
//       <div className="flex items-center mb-4 md:mb-0">
//         <div>
//           <h1 className="text-lg font-bold">{data?.aa?.code}</h1>
//           <h1 className="text-sm text-gray-500">{data?.aa?.city}</h1>
//           <h1 className="text-sm">{arrivalTime}</h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ComboFlightCard;

import React, { useState } from "react";
import { FaPlane, FaChevronDown, FaChevronUp } from "react-icons/fa";

const ComboFlightCard = ({ logo, flightDetails }) => {
  const [showAllPrices, setShowAllPrices] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);

  if (!flightDetails || !flightDetails.sI || flightDetails.sI.length === 0) {
    return <div>No flight details available</div>;
  }

  const data = flightDetails.sI;
  const priceList = flightDetails?.totalPriceList;

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
    };
    return date.toLocaleString(undefined, options);
  };

  const displayedPrices = showAllPrices ? priceList : priceList.slice(0, 3);

  return (
    <div className="border p-4 rounded-lg m-2 justify-between items-center bg-white shadow-md">
      <div className="flex h-full items-center">
        <div>
          {data.map((flight, index) => (
            <React.Fragment key={flight.id}>
              <div className="flex justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <img
                    src={logo}
                    alt="Airline Logo"
                    className="w-16 h-16 mr-6"
                  />
                  <div>
                    <h1 className="text-lg font-bold">{flight.da.code}</h1>
                    <h1 className="text-sm text-gray-500">{flight.da.city}</h1>
                    <h1 className="text-sm">{formatDateTime(flight.dt)}</h1>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4 md:mb-0">
                  <div className="border-t border-dashed border-gray-400 w-10 md:w-28"></div>
                  <div className="flex flex-col gap-4 text-center items-center text-xs font-semibold text-gray-500">
                    <span>{convertToHoursMinutes(flight.duration)}</span>
                    <FaPlane className="mx-2 text-gray-800" />
                    <div className="flex items-center">
                      {flight.stops > 0 ? (
                        <span>{flight.stops} stops</span>
                      ) : (
                        <span>Non-stop flight</span>
                      )}
                    </div>
                  </div>
                  <div className="border-t border-dashed border-gray-400 w-10 md:w-28"></div>
                </div>
                <div className="flex items-center mb-4 md:mb-0">
                  <div>
                    <h1 className="text-lg font-bold">{flight.aa.code}</h1>
                    <h1 className="text-sm text-gray-500">{flight.aa.city}</h1>
                    <h1 className="text-sm">{formatDateTime(flight.at)}</h1>
                  </div>
                </div>
              </div>
              {index < data.length - 1 && (
                <div className="w-full border-t border-gray-200 my-4"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="h-full border-l m-1 p-2 flex flex-col justify-center ">
          {displayedPrices.map((price, index) => (
            <div className="text-xs space-y-2 flex items-center" key={index}>
              <input
                type="radio"
                id={`price-${index}`}
                name="price"
                value={index}
                checked={selectedPrice === index}
                onChange={() => setSelectedPrice(index)}
                className="mr-2"
              />
              <label htmlFor={`price-${index}`} className="flex flex-col">
                <p className="font-semibold">₹ {price?.fd?.ADULT.fC.TF}</p>
                <p className="text-[10px]">
                  <span className="bg-yellow-800 p-0.5 bg-opacity-50 rounded-md text-gray-700">
                    {price?.fareIdentifier}
                  </span>{" "}
                  {price?.fd?.ADULT.cc}
                </p>
                {selectedPrice === index && (
                  <p className="text-red-600">
                    Seats left: {price.fd.ADULT.sR}
                  </p>
                )}
              </label>
            </div>
          ))}
          {priceList.length > 3 && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ComboFlightCard;
