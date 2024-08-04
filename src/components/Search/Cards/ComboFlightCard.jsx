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

// import React, { useState } from "react";
// import {
//   FaPlane,
//   FaChevronDown,
//   FaChevronUp,
//   FaInfoCircle,
// } from "react-icons/fa";

// import defaultAirline from '../../../assets/home/logo/defaultAirline.png'

// const ComboFlightCard = ({ logo, flightDetails, onBooking }) => {
//   const [showAllPrices, setShowAllPrices] = useState(false);
//   const [selectedPrice, setSelectedPrice] = useState(0);
//   const [showDetails, setShowDetails] = useState(false);
//   const [activeTab, setActiveTab] = useState("Flight Details");

//   if (!flightDetails || !flightDetails.sI || flightDetails.sI.length === 0) {
//     return <div>No flight details available</div>;
//   }

//   const data = flightDetails.sI;
//   const priceList = flightDetails?.totalPriceList;

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

//   const renderTabs = () => {
//     switch (activeTab) {
//       case "Flight Details":
//         return (
//           <div className="w-full">
//             {data.map((segment, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col md:flex-row items-center justify-between py-4 border-b"
//               >
//                 <div className="flex items-center">
//                 <img src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${segment.fD.aI.code}.png` }  onError={(e) => e.currentTarget.src = defaultAirline} alt={segment?.fD?.aI?.code} className="w-10 h-10 mr-4" />

//                   <div>
//                     <div className="font-bold">
//                       {segment.fD.aI.name} {segment.fD.fN}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {segment.da.city} → {segment.aa.city}{" "}
//                       {formatDateTime(segment.dt).split(",")[0]}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="text-right mr-8">
//                     <div className="font-bold">
//                       {formatDateTime(segment.dt).split(",")[1].trim()}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {segment.da.city}, {segment.da.country}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {segment.da.name}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {segment.da.terminal || "N/A"}
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-center mx-4">
//                     <div className="text-sm text-gray-500">
//                       {segment.stops === 0
//                         ? "Non-Stop"
//                         : `${segment.stops} Stop(s)`}
//                     </div>
//                     <FaPlane className="my-2 text-gray-400" />
//                     <div className="text-sm text-gray-500">
//                       {convertToHoursMinutes(segment.duration)}
//                     </div>
//                   </div>
//                   <div className="text-left ml-8">
//                     <div className="font-bold">
//                       {formatDateTime(segment.at).split(",")[1].trim()}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {segment.aa.city}, {segment.aa.country}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {segment.aa.name}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {segment.aa.terminal || "N/A"}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         );
//       case "Fare Details":
//         console.log(priceList, "priceList");
//         return (
//           <div className="w-full">
//             <div className="grid grid-cols-3 w-full border-b pb-2 mb-2">
//               <div className="font-bold">TYPE</div>
//               <div className="font-bold">Fare</div>
//               <div className="font-bold">Total</div>
//             </div>
//             {priceList.map((item, index) => (
//               <div key={index} className="mb-4">
//                 <div className="grid grid-cols-3 w-full text-gray-600 mb-2">
//                   <div>Fare Details for Adult (CB: {item?.fd?.ADULT?.cc})</div>
//                   <div></div>
//                   <div></div>
//                 </div>
//                 <div className="grid grid-cols-3 w-full mb-1">
//                   <div>Base Price</div>
//                   <div>₹{item?.fd?.ADULT?.fC?.BF.toFixed(2)} x 1</div>
//                   <div>₹{item?.fd?.ADULT?.fC?.BF.toFixed(2)}</div>
//                 </div>
//                 <div className="grid grid-cols-3 w-full mb-1">
//                   <div className="flex items-center">
//                     Taxes and fees{" "}
//                     <FaInfoCircle className="ml-1 text-gray-500" />
//                   </div>
//                   <div>₹{item?.fd?.ADULT?.fC?.TAF.toFixed(2)} x 1</div>
//                   <div>₹{item?.fd?.ADULT?.fC?.TAF.toFixed(2)}</div>
//                 </div>
//                 <div className="grid grid-cols-3 w-full font-bold">
//                   <div>Total</div>
//                   <div></div>
//                   <div>₹{item?.fd?.ADULT?.fC?.TF.toFixed(2)}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         );
//       case "Fare Rules":
//         return (
//           <div>
//             <h2 className="font-bold mb-2">Fare Rules</h2>
//             <p>Insert fare rules information here.</p>
//           </div>
//         );
//       case "Baggage Information":
//         return (
//           <div className="grid grid-cols-3 w-full gap-4">
//             <div className="font-bold">SECTOR</div>
//             <div className="font-bold">CHECKIN</div>
//             <div className="font-bold">CABIN</div>
//             {priceList.map((item, index) => (
//               <React.Fragment key={index}>
//                 <div>
//                   {" "}
//                   {startSegment?.da?.code} - {endSegment?.aa?.code}
//                 </div>
//                 <div>Adult {item?.fd?.ADULT?.bI?.iB}</div>
//                 <div>Adult {item?.fd?.ADULT?.bI?.cB}</div>
//               </React.Fragment>
//             ))}
//           </div>
//         );
//       default:
//         return null;
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

//   const startSegment = data[0];
//   const endSegment = data[data.length - 1];
//   const displayedPrices = showAllPrices ? priceList : priceList.slice(0, 1);

//   return (
//     <>
//       <div className="border p-4 rounded-lg m-2 justify-between items-center bg-white shadow-md">
//         <div className="flex flex-col md:flex-row h-full items-center">
//           <div>
//             {data?.map((flight, index) => (
//               <React.Fragment key={flight.id}>
//                 <div className="flex justify-between">
//                   <div className="flex items-center mb-4 md:mb-0">
//                   <img src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${flight.fD.aI.code}.png` }  onError={(e) => e.currentTarget.src = defaultAirline} alt={flight?.fD?.aI?.code} className="w-10 h-10 mr-4" />
//                     <div>
//                       <h1 className="text-lg font-bold">{flight.da.code}</h1>
//                       <h1 className="text-sm text-gray-500">
//                         {flight.da.city}
//                       </h1>
//                       <h1 className="text-sm">{formatDateTime(flight.dt)}</h1>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between mb-4 md:mb-0">
//                     <div className="border-t border-dashed border-gray-400 w-10 md:w-28"></div>
//                     <div className="flex flex-col gap-4 text-center items-center text-xs font-semibold text-gray-500">
//                       <span>{convertToHoursMinutes(flight.duration)}</span>
//                       <FaPlane className="mx-2 text-gray-800" />
//                       <div className="flex items-center">
//                         {flight.stops > 0 ? (
//                           <span>{flight.stops} stops</span>
//                         ) : (
//                           <span>Non-stop flight</span>
//                         )}
//                       </div>
//                     </div>
//                     <div className="border-t border-dashed border-gray-400 w-10 md:w-28"></div>
//                   </div>
//                   <div className="flex items-center mb-4 md:mb-0">
//                     <div>
//                       <h1 className="text-lg font-bold">{flight?.aa?.code}</h1>
//                       <h1 className="text-sm text-gray-500">
//                         {flight?.aa?.city}
//                       </h1>
//                       <h1 className="text-sm">{formatDateTime(flight?.at)}</h1>
//                     </div>
//                   </div>
//                 </div>
//                 {index < data.length - 1 && (
//                   <div className="w-full border-t border-gray-200 my-4"></div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>

//           <div className="h-full border-l m-1 p-2 flex flex-col justify-center ">
//             {displayedPrices.map((price, index) => (
//               <div
//                 key={index}
//                 onClick={() => setSelectedPrice(index)}
//                 className={`
//       text-xs text-start space-y-2 flex items-center w-full md:w-auto
//       p-1 mb-2 cursor-pointer transition-all duration-200 ease-in-out
//       ${
//         selectedPrice === index
//           ? "border border-blue-500 rounded-md"
//           : "border border-gray-200 hover:border-blue-300 rounded-md"
//       }
//     `}
//               >
//                 <div className="flex flex-col w-full">
//                   <p className="font-semibold">₹ {price?.fd?.ADULT?.fC?.TF}</p>
//                   <p className="text-[10px]">
//                     <span className="bg-yellow-800 p-0.5 bg-opacity-50 rounded-md text-gray-700">
//                       {price?.fareIdentifier}
//                     </span>{" "}
//                     {price?.fd?.ADULT?.cc}
//                   </p>
//                   {selectedPrice === index && (
//                     <p className="text-red-600 text-[10px]">
//                       Seats left: {price?.fd?.ADULT?.sR}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
//             {priceList.length > 1 && (
//               <button
//                 onClick={() => setShowAllPrices(!showAllPrices)}
//                 className="text-blue-500 text-sm mt-2 flex items-center"
//               >
//                 {showAllPrices ? (
//                   <>
//                     <FaChevronUp className="mr-1" /> Show less
//                   </>
//                 ) : (
//                   <>
//                     <FaChevronDown className="mr-1" /> Show more
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//           <div>
//             <button
//               onClick={() => setShowDetails(!showDetails)}
//               className="text-blue-500 text-sm mt-2"
//             >
//               {showDetails ? "Hide Details" : "View Details"}
//             </button>
//           </div>
//         </div>
//         <div>
//           {showDetails && (
//             <div className="mt-4 border-t overflow-x-auto border-gray-200 pt-4">
//               <div className="mb-2 flex">
//                 {[
//                   "Flight Details",
//                   "Fare Details",
//                   "Fare Rules",
//                   "Baggage Information",
//                 ].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`py-2 px-4 text-sm ${
//                       activeTab === tab
//                         ? "text-blue-500 font-bold border-b-2 border-blue-500"
//                         : "text-gray-500"
//                     }`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>
//               {renderTabs()}
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="w-full flex justify-center items-center">
//         <button
//           onClick={() => onBooking(selectedPrice)}
//           className="bg-green-500 rounded-md text-white p-2 px-6"
//         >
//           Book
//         </button>
//       </div>
//     </>
//   );
// };

// export default ComboFlightCard;



// import React, { useState, useEffect } from "react";
// import {
//   FaPlane,
//   FaChevronDown,
//   FaChevronUp,
//   FaInfoCircle,
// } from "react-icons/fa";

// import defaultAirline from '../../../assets/home/logo/defaultAirline.png'

// const ComboFlightCard = ({flightDetails, onBooking, passenger }) => {
//   const [showAllPrices, setShowAllPrices] = useState(false);
//   const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);
//   const [selectedPrice, setSelectedPrice] = useState(0);
//   const [showDetails, setShowDetails] = useState(false);
//   const [activeTab, setActiveTab] = useState("Flight Details");

//   if (!flightDetails || !flightDetails.sI || flightDetails.sI.length === 0) {
//     return <div>No flight details available</div>;
//   }

//   const data = flightDetails.sI;
//   const priceList = flightDetails?.totalPriceList;

//   const calculateTotalPrice = (priceIndex) => {
//     const selectedPrice = priceList[priceIndex];
//     if (!selectedPrice) return 0;
  
//     return Object.entries(selectedPrice.fd).reduce((total, [passengerType, details]) => {
//       return total + (details.fC.TF * (passenger[passengerType] || 0));
//     }, 0);
//   };
  
//   const totalPrice = calculateTotalPrice(selectedPriceIndex);

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

//   const renderTabs = () => {
//     switch (activeTab) {
//       case "Flight Details":
//         return (
//           <div className="w-full">
//             {data.map((segment, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col md:flex-row items-center justify-between py-4 border-b"
//               >
//                 <div className="flex items-center">
//                 <img src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${segment.fD.aI.code}.png`}  onError={(e) => e.currentTarget.src = defaultAirline} alt={segment?.fD?.aI?.code} className="w-10 h-10 mr-4" />

//                   <div>
//                     <div className="font-bold">
//                       {segment.fD.aI.name} {segment.fD.fN}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {segment.da.city} → {segment.aa.city}{" "}
//                       {formatDateTime(segment.dt).split(",")[0]}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="text-right mr-8">
//                     <div className="font-bold">
//                       {formatDateTime(segment.dt).split(",")[1].trim()}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {segment.da.city}, {segment.da.country}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {segment.da.name}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {segment.da.terminal || "N/A"}
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-center mx-4">
//                     <div className="text-sm text-gray-500">
//                       {segment.stops === 0
//                         ? "Non-Stop"
//                         : `${segment.stops} Stop(s)`}
//                     </div>
//                     <FaPlane className="my-2 text-gray-400" />
//                     <div className="text-sm text-gray-500">
//                       {convertToHoursMinutes(segment.duration)}
//                     </div>
//                   </div>
//                   <div className="text-left ml-8">
//                     <div className="font-bold">
//                       {formatDateTime(segment.at).split(",")[1].trim()}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {segment.aa.city}, {segment.aa.country}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {segment.aa.name}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {segment.aa.terminal || "N/A"}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         );
//       case "Fare Details":
//         return (
//           <div className="w-full">
//             <div className="grid grid-cols-3 w-full border-b pb-2 mb-2">
//               <div className="font-bold">TYPE</div>
//               <div className="font-bold">Fare</div>
//               <div className="font-bold">Total</div>
//             </div>
//             {Object.entries(passenger).map(([passengerType, count]) => {
//               if (count > 0) {
//                 const details = priceList[selectedPriceIndex]?.fd[passengerType];
//                 if (details) {
//                   return (
//                     <div key={passengerType} className="mb-4">
//                       <div className="grid grid-cols-3 w-full text-gray-600 mb-2">
//                         <div>Fare Details for {passengerType} (CB: {details.cc})</div>
//                         <div></div>
//                         <div></div>
//                       </div>
//                       <div className="grid grid-cols-3 w-full mb-1">
//                         <div>Base Price</div>
//                         <div>₹{details.fC.BF.toFixed(2)} x {count}</div>
//                         <div>₹{(details.fC.BF * count).toFixed(2)}</div>
//                       </div>
//                       <div className="grid grid-cols-3 w-full mb-1">
//                         <div className="flex items-center">
//                           Taxes and fees <FaInfoCircle className="ml-1 text-gray-500" />
//                         </div>
//                         <div>₹{details.fC.TAF.toFixed(2)} x {count}</div>
//                         <div>₹{(details.fC.TAF * count).toFixed(2)}</div>
//                       </div>
//                     </div>
//                   );
//                 }
//               }
//               return null;
//             })}
//             <div className="grid grid-cols-3 w-full font-bold border-t pt-2">
//               <div>Total</div>
//               <div></div>
//               <div>₹{totalPrice.toFixed(2)}</div>
//             </div>
//           </div>
//         );
//       case "Fare Rules":
//         return (
//           <div>
//             <h2 className="font-bold mb-2">Fare Rules</h2>
//             <p>Insert fare rules information here.</p>
//           </div>
//         );
//       case "Baggage Information":
//         return (
//           <div className="grid grid-cols-3 w-full gap-4">
//             <div className="font-bold">SECTOR</div>
//             <div className="font-bold">CHECKIN</div>
//             <div className="font-bold">CABIN</div>
//             {priceList.map((item, index) => (
//               <React.Fragment key={index}>
//                 <div>
//                   {" "}
//                   {data[0]?.da?.code} - {data[data.length - 1]?.aa?.code}
//                 </div>
//                 <div>Adult {item?.fd?.ADULT?.bI?.iB}</div>
//                 <div>Adult {item?.fd?.ADULT?.bI?.cB}</div>
//               </React.Fragment>
//             ))}
//           </div>
//         );
//       default:
//         return null;
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

//   const startSegment = data[0];
//   const endSegment = data[data.length - 1];
//   const displayedPrices = showAllPrices ? priceList : priceList.slice(0, 1);

//   return (
//     <>
//       <div className="border p-4 rounded-lg m-2 justify-between items-center bg-white shadow-md">
//         <div className="flex flex-col md:flex-row h-full items-center">
//           <div>
//             {data?.map((flight, index) => (
//               <React.Fragment key={flight.id}>
//                 <div className="flex justify-between">
//                   <div className="flex items-center mb-4 md:mb-0">
//                   <img src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${flight.fD.aI.code}.png`}  onError={(e) => e.currentTarget.src = defaultAirline} alt={flight?.fD?.aI?.code} className="w-10 h-10 mr-4" />
//                     <div>
//                       <h1 className="text-lg font-bold">{flight.da.code}</h1>
//                       <h1 className="text-sm text-gray-500">
//                         {flight.da.city}
//                       </h1>
//                       <h1 className="text-sm">{formatDateTime(flight.dt)}</h1>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between mb-4 md:mb-0">
//                     <div className="border-t border-dashed border-gray-400 w-10 md:w-28"></div>
//                     <div className="flex flex-col gap-4 text-center items-center text-xs font-semibold text-gray-500">
//                       <span>{convertToHoursMinutes(flight.duration)}</span>
//                       <FaPlane className="mx-2 text-gray-800" />
//                       <div className="flex items-center">
//                         {flight.stops > 0 ? (
//                           <span>{flight.stops} stops</span>
//                         ) : (
//                           <span>Non-stop flight</span>
//                         )}
//                       </div>
//                     </div>
//                     <div className="border-t border-dashed border-gray-400 w-10 md:w-28"></div>
//                   </div>
//                   <div className="flex items-center mb-4 md:mb-0">
//                     <div>
//                       <h1 className="text-lg font-bold">{flight?.aa?.code}</h1>
//                       <h1 className="text-sm text-gray-500">
//                         {flight?.aa?.city}
//                       </h1>
//                       <h1 className="text-sm">{formatDateTime(flight?.at)}</h1>
//                     </div>
//                   </div>
//                 </div>
//                 {index < data.length - 1 && (
//                   <div className="w-full border-t border-gray-200 my-4"></div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>

//           <div className="h-full border-l m-1 p-2 flex flex-col justify-center ">
//             {displayedPrices.map((price, index) => (
//               <div
//                 key={index}
//                 onClick={() => setSelectedPrice(index)}
//                 className={`
//                   text-xs text-start space-y-2 flex items-center w-full md:w-auto
//                   p-1 mb-2 cursor-pointer transition-all duration-200 ease-in-out
//                   ${
//                     selectedPrice === index
//                       ? "border border-blue-500 rounded-md"
//                       : "border border-gray-200 hover:border-blue-300 rounded-md"
//                   }
//                 `}
//               >
//                 <div className="flex flex-col w-full">
//                   <p className="font-semibold">₹ {calculateTotalPrice(index).toFixed(2)}</p>
//                   <p className="text-[10px]">
//                     <span className="bg-yellow-800 p-0.5 bg-opacity-50 rounded-md text-gray-700">
//                       {price?.fareIdentifier}
//                     </span>{" "}
//                     {price?.fd?.ADULT?.cc}
//                   </p>
//                   {selectedPrice === index && (
//                     <p className="text-red-600 text-[10px]">
//                       Seats left: {price?.fd?.ADULT?.sR}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
//             {priceList.length > 1 && (
//               <button
//                 onClick={() => setShowAllPrices(!showAllPrices)}
//                 className="text-blue-500 text-sm mt-2 flex items-center"
//               >
//                 {showAllPrices ? (
//                   <>
//                     <FaChevronUp className="mr-1" /> Show less
//                   </>
//                 ) : (
//                   <>
//                     <FaChevronDown className="mr-1" /> Show more
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//           <div>
//             <button
//               onClick={() => setShowDetails(!showDetails)}
//               className="text-blue-500 text-sm mt-2"
//             >
//               {showDetails ? "Hide Details" : "View Details"}
//             </button>
//           </div>
//         </div>
//         <div>
//           {showDetails && (
//             <div className="mt-4 border-t overflow-x-auto border-gray-200 pt-4">
//               <div className="mb-2 flex">
//                 {[
//                   "Flight Details",
//                   "Fare Details",
//                   "Fare Rules",
//                   "Baggage Information",
//                 ].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`py-2 px-4 text-sm ${
//                       activeTab === tab
//                         ? "text-blue-500 font-bold border-b-2 border-blue-500"
//                         : "text-gray-500"
//                     }`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>
//               {renderTabs()}
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="w-full flex justify-center items-center">
//         <button
//           onClick={() => onBooking(selectedPrice)}
//           className="bg-green-500 rounded-md text-white p-2 px-6"
//         >
//           Book
//         </button>
//       </div>
//     </>
//   );
// };

// export default ComboFlightCard;


import React, { useState } from "react";
import {
  FaPlane,
  FaChevronDown,
  FaChevronUp,
  FaInfoCircle,
} from "react-icons/fa";

import defaultAirline from '../../../assets/home/logo/defaultAirline.png'

const ComboFlightCard = ({flightDetails, onBooking, passenger }) => {
  const [showAllPrices, setShowAllPrices] = useState(false);
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("Flight Details");

  if (!flightDetails || !flightDetails.sI || flightDetails.sI.length === 0) {
    return <div>No flight details available</div>;
  }

  const data = flightDetails.sI;
  const priceList = flightDetails?.totalPriceList;

  const calculateTotalPrice = (priceIndex) => {
    const selectedPrice = priceList[priceIndex];
    if (!selectedPrice) return 0;
  
    return Object.entries(selectedPrice.fd).reduce((total, [passengerType, details]) => {
      return total + (details.fC.TF * (passenger[passengerType] || 0));
    }, 0);
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
    };
    return date.toLocaleString(undefined, options);
  };

  const renderTabs = () => {
    switch (activeTab) {
      case "Flight Details":
        return (
          <div className="w-full">
            {data.map((segment, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center justify-between md:justify-around py-4 border-b"
              >
                <div className="flex items-center">
                  <img src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${segment.fD.aI.code}.png`}  onError={(e) => e.currentTarget.src = defaultAirline} alt={segment?.fD?.aI?.code} className="w-10 h-10 mr-4" />
                  <div>
                    <div className="font-bold">
                      {segment.fD.aI.name} {segment.fD.fN}
                    </div>
                    <div className="text-sm text-gray-500">
                      {segment.da.city} → {segment.aa.city}{" "}
                      {formatDateTime(segment.dt).split(",")[0]}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-right mr-8">
                    <div className="font-bold">
                      {formatDateTime(segment.dt).split(",")[1].trim()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {segment.da.city}, {segment.da.country}
                    </div>
                    <div className="text-sm text-gray-500">
                      {segment.da.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {segment.da.terminal || "N/A"}
                    </div>
                  </div>
                  <div className="flex flex-col items-center mx-4">
                    <div className="text-sm text-gray-500">
                      {segment.stops === 0
                        ? "Non-Stop"
                        : `${segment.stops} Stop(s)`}
                    </div>
                    <FaPlane className="my-2 text-gray-400" />
                    <div className="text-sm text-gray-500">
                      {convertToHoursMinutes(segment.duration)}
                    </div>
                  </div>
                  <div className="text-left ml-8">
                    <div className="font-bold">
                      {formatDateTime(segment.at).split(",")[1].trim()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {segment.aa.city}, {segment.aa.country}
                    </div>
                    <div className="text-sm text-gray-500">
                      {segment.aa.name}
                    </div>
                    <div className="text-sm text-gray-500">
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
          <div className="w-full">
            <div className="grid grid-cols-3 w-full border-b pb-2 mb-2">
              <div className="font-bold">TYPE</div>
              <div className="font-bold">Fare</div>
              <div className="font-bold">Total</div>
            </div>
            {Object.entries(passenger).map(([passengerType, count]) => {
              if (count > 0) {
                const details = priceList[selectedPriceIndex]?.fd[passengerType];
                if (details) {
                  return (
                    <div key={passengerType} className="mb-4">
                      <div className="grid grid-cols-3 w-full text-gray-600 mb-2">
                        <div>Fare Details for {passengerType} (CB: {details.cc})</div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="grid grid-cols-3 w-full mb-1">
                        <div>Base Price</div>
                        <div>₹{details.fC.BF.toFixed(2)} x {count}</div>
                        <div>₹{(details.fC.BF * count).toFixed(2)}</div>
                      </div>
                      <div className="grid grid-cols-3 w-full mb-1">
                        <div className="flex items-center">
                          Taxes and fees <FaInfoCircle className="ml-1 text-gray-500" />
                        </div>
                        <div>₹{details.fC.TAF.toFixed(2)} x {count}</div>
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
              <div>₹{totalPrice.toFixed(2)}</div>
            </div>
          </div>
        );
      case "Fare Rules":
        return (
          <div>
            <h2 className="font-bold mb-2">Fare Rules</h2>
            <p>Insert fare rules information here.</p>
          </div>
        );
      case "Baggage Information":
        return (
          <div className="grid grid-cols-3 w-full gap-4">
            <div className="font-bold">SECTOR</div>
            <div className="font-bold">CHECKIN</div>
            <div className="font-bold">CABIN</div>
            {priceList.map((item, index) => (
              <React.Fragment key={index}>
                <div>
                  {data[0]?.da?.code} - {data[data.length - 1]?.aa?.code}
                </div>
                <div>Adult {item?.fd?.ADULT?.bI?.iB}</div>
                <div>Adult {item?.fd?.ADULT?.bI?.cB}</div>
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
  const totalDuration = data.reduce((sum, segment) => sum + segment.duration, 0);

  return (
    <>
      <div className="border p-4 rounded-lg m-2 justify-between items-center overflow-x-auto bg-white shadow-md">
      <div className="flex   flex-col md:flex-row  justify-between items-stretch  mb-2">
      <div className="flex flex-col w-full ">
        <div className="flex justify-around">
          <div className="md:hidden">
          <img
              src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${startSegment?.fD?.aI?.code}.png`}
              onError={(e) => e.currentTarget.src = defaultAirline}
              alt={startSegment?.fD?.aI?.code}
              className="size-12 hidden mr-6"
            />
          </div>
          <div className="md:flex-row flex-col flex justify-center items-center mb-4 md:mb-0">
            <img
              src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${startSegment?.fD?.aI?.code}.png`}
              onError={(e) => e.currentTarget.src = defaultAirline}
              alt={startSegment?.fD?.aI?.code}
              className="size-12 md:flex hidden  mr-6"
            />
            <div>
              <h1 className="text-lg font-bold">{startSegment.da.code}</h1>
              <h1 className="text-sm text-gray-500">{startSegment.da.city}</h1>
              <h1 className="text-sm">{formatDateTime(startSegment.dt)}</h1>
            </div>
          </div>
          <div className="flex items-center mb-4 md:mb-0">
            <div className="border-t hidden md:flex border-dashed border-gray-400 w-6 md:w-20"></div>
            <div className="flex flex-col gap-4 text-center items-center text-xs font-semibold text-gray-500">
              <span>{convertToHoursMinutes(totalDuration)}</span>
              <FaPlane className="mx-2 text-blue-800 text-3xl" />
              <div className="flex items-center">
                {isConnectionFlight ? (
                  <span>
                    {data.length - 1} stop{data.length > 2 ? 's' : ''}
                    {data.length === 2 && ` via ${data[0].aa.city}`}
                  </span>
                ) : (
                  <span>Non-stop flight</span>
                )}
              </div>
            </div>
            <div className="border-t hidden md:flex border-dashed border-gray-400 w-6 md:w-20"></div>
          </div>
          <div className="flex md:text-start text-end  items-center mb-4 md:mb-0">
            <div>
              <h1 className="text-lg font-bold">{endSegment.aa.code}</h1>
              <h1 className="text-sm text-gray-500">{endSegment.aa.city}</h1>
              <h1 className="text-sm">{formatDateTime(endSegment.at)}</h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full  overflow-x-auto">
          <div className="flex  mt-3 gap-2 overflow-x-auto items-start">
            {displayedPrices.map((price, index) => (
              <div
                key={index}
                onClick={() => setSelectedPrice(index)}
                className={`
                   text-xs text-start space-y-2 flex shrink-0 items-center min-w-24 md:w-fit
                p-1 mb-2 cursor-pointer 
                  ${
                    selectedPrice === index
                      ? "border border-blue-500 rounded-md"
                      : "border border-gray-200 hover:border-blue-300 rounded-md"
                  }
                `}
              >
                <div className="flex flex-col w-full">
                  <p className="font-semibold">₹ {calculateTotalPrice(index).toFixed(2)}</p>
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
          <div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-500 text-sm mt-2"
            >
              {showDetails ? (
                  <span className="text-black">
                    Fare Details :{" "}
                    <span className="text-blue-500">Hide Details</span>
                  </span>
                ) : (
                  <span className="text-black">
                    Fare Details :{" "}
                    <span className="text-blue-500">View Details</span>
                  </span>
                )}
            </button>
          </div>
        </div>
      </div>

          <div className="flex justify-center items-end md:border-l-2 pl-3 ">
            <button
              onClick={() => onBooking(selectedPrice)}
              className="bg-green-500 text-white px-4 py-2 rounded-md  md:w-36 mt-4 md:mt-0"
            >
              Book
            </button>
          </div>
        </div>

        

        {showDetails && (
          <div className="mt-4 border-t overflow-x-auto border-gray-200 pt-4">
            <div className="mb-2 flex">
              {[
                "Flight Details",
                "Fare Details",
                "Fare Rules",
                "Baggage Information",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 text-sm ${
                    activeTab === tab
                      ? "text-blue-500 font-bold border-b-2 border-blue-500"
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
    </>
  );
};

export default ComboFlightCard;