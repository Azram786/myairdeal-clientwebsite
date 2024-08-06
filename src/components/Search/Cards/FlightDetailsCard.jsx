// import React from "react";
// import { FaPlane } from "react-icons/fa";

// const FlightDetailsCard = ({ logo, flightDetails }) => {
//   let data;
//   let priceList;

//   if (!flightDetails) {
//     return <div>Loading flights...</div>;
//   }

//   if (!Array.isArray(flightDetails)) {
//     data = flightDetails.sI;
//     priceList = flightDetails.totalPriceList;
//   } else {
//     data = flightDetails;
//   }

//   if (!data || data.length === 0) {
//     return <div>No flight details available</div>;
//   }

//   console.log(data.length,"stp[")

//   const startSegment = data[0];
//   const endSegment = data[data.length - 1];

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

//   console.log(flightDetails,priceList)

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

//   const departureTime = formatDateTime(startSegment.dt);
//   const arrivalTime = formatDateTime(endSegment.at);

//   const totalDuration = data.reduce((sum, segment) => sum + segment.duration, 0);

//   return (
//     <div className="border flex flex-col p-4 rounded-lg m-4  bg-white shadow-md">
//       <div className="flex flex-col md:flex-row justify-between items-center mb-2">
//         <div className="flex items-center mb-4 md:mb-0">
//           {logo && <img src={logo} alt="Airline logo" className="w-16 h-16 mr-6" />}
//           <div>
//             <h1 className="text-lg font-bold">{startSegment.da.code}</h1>
//             <h1 className="text-sm text-gray-500">{startSegment.da.city}</h1>
//             <h1 className="text-sm">{departureTime}</h1>
//           </div>
//         </div>
//         <div className="flex items-center justify-between mb-4 md:mb-0">
//           <div className="border-t border-dashed border-gray-400 w-10 md:w-28"></div>
//           <div className="flex flex-col gap-4 text-center items-center text-xs font-semibold text-gray-500">
//             <span>{convertToHoursMinutes(totalDuration)}</span>
//             <FaPlane className="mx-2 text-blue-800 text-3xl" />
//             <div className="flex items-center">
//               {data.length > 1 ? (
//                 <span>
//                   {data.length - 1} stops
//                   {startSegment.so && startSegment.so[0] && ` via ${startSegment.so[0].city}`}
//                 </span>
//               ) : (
//                 <span>Non-stop flight</span>
//               )}
//             </div>
//           </div>
//           <div className="border-t border-dashed border-gray-400 w-10 md:w-28"></div>
//         </div>
//         <div className="flex items-center mb-4 md:mb-0">
//           <div>
//             <h1 className="text-lg font-bold">{endSegment?.aa?.code}</h1>
//             <h1 className="text-sm text-gray-500">{endSegment?.aa?.city}</h1>
//             <h1 className="text-sm">{arrivalTime}</h1>
//           </div>
//         </div>
//       </div>
//       <div className="flex mt-2 justify-between items-center text-center">
//         <div className="flex gap-2">
//           <h1>Fare details : </h1>
//           <button className="text-blue-700 font-semibold cursor-pointer">
//             View details
//           </button>
//         </div>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
//           Book now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FlightDetailsCard;

// import React, { useState } from "react";
// import { FaPlane, FaChevronDown, FaChevronUp } from "react-icons/fa";

// const FlightDetailsCard = ({ logo, flightDetails }) => {
//   const [showAllPrices, setShowAllPrices] = useState(false);
//   const [selectedPrice, setSelectedPrice] = useState(null);

//   let data;
//   let priceList = [];

//   if (!flightDetails) {
//     return <div>Loading flights...</div>;
//   }

//   if (!Array.isArray(flightDetails)) {
//     data = flightDetails.sI;
//     priceList = flightDetails.totalPriceList || [];
//   } else {
//     data = flightDetails;
//   }

//   console.log(priceList,"ddo")

//   if (!data || data.length === 0) {
//     return <div>No flight details available</div>;
//   }

//   const startSegment = data[0];
//   const endSegment = data[data.length - 1];

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

//   const departureTime = formatDateTime(startSegment.dt);
//   const arrivalTime = formatDateTime(endSegment.at);

//   const totalDuration = data.reduce((sum, segment) => sum + segment.duration, 0);

//   const displayedPrices = showAllPrices ? priceList : priceList.slice(0, 3);

//   return (
//     <div className="border flex flex-col p-4 rounded-lg m-4 bg-white shadow-md">
//       <div className="flex flex-col md:flex-row justify-between items-center mb-2">
//         <div className="flex items-center mb-4 md:mb-0">
//           {logo && <img src={logo} alt="Airline logo" className="w-16 h-16 mr-6" />}
//           <div>
//             <h1 className="text-lg font-bold">{startSegment.da.code}</h1>
//             <h1 className="text-sm text-gray-500">{startSegment.da.city}</h1>
//             <h1 className="text-sm">{departureTime}</h1>
//           </div>
//         </div>
//         <div className="flex items-center  mb-4 md:mb-0">
//           <div className="border-t border-dashed border-gray-400 w-10 md:w-28"></div>
//           <div className="flex flex-col gap-4 text-center items-center text-xs font-semibold text-gray-500">
//             <span>{convertToHoursMinutes(totalDuration)}</span>
//             <FaPlane className="mx-2 text-blue-800 text-3xl" />
//             <div className="flex items-center">
//               {data.length > 1 ? (
//                 <span>
//                   {data.length - 1} stops
//                   {startSegment.so && startSegment.so[0] && ` via ${startSegment.so[0].city}`}
//                 </span>
//               ) : (
//                 <span>Non-stop flight</span>
//               )}
//             </div>
//           </div>
//           <div className="border-t border-dashed border-gray-400 w-10 md:w-28"></div>
//         </div>
//         <div className="flex items-center mb-4 md:mb-0">
//           <div>
//             <h1 className="text-lg font-bold">{endSegment?.aa?.code}</h1>
//             <h1 className="text-sm text-gray-500">{endSegment?.aa?.city}</h1>
//             <h1 className="text-sm">{arrivalTime}</h1>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col md:flex-row mt-2 justify-between items-center text-center">
//         <div className="flex flex-col justify-center items-start">
//           {displayedPrices.map((price, index) => (
//             <div className="text-xs text-start space-y-2 flex items-center" key={index}>
//               <input
//                 type="radio"
//                 id={`price-${index}`}
//                 name="price"
//                 value={index}
//                 checked={selectedPrice === index}
//                 onChange={() => setSelectedPrice(index)}
//                 className="mr-2"
//               />
//               <label htmlFor={`price-${index}`} className="flex flex-col">
//                 <p className="font-semibold">₹ {price?.fd?.ADULT.fC.TF}</p>
//                 <p className="text-[10px]">
//                   <span className="bg-yellow-800 p-0.5 bg-opacity-50 rounded-md text-gray-700">
//                     {price?.fareIdentifier}
//                   </span>{" "}
//                   {price?.fd?.ADULT.cc}
//                 </p>
//                 {selectedPrice === index && (
//                   <p className="text-red-600">
//                     Seats left: {price.fd.ADULT.sR}
//                   </p>
//                 )}
//               </label>
//             </div>
//           ))}
//           {priceList.length > 3 && (
//             <button
//               onClick={() => setShowAllPrices(!showAllPrices)}
//               className="text-blue-500 text-sm mt-2 flex items-center"
//             >
//               {showAllPrices ? (
//                 <>
//                   <FaChevronUp className="mr-1" /> Show less
//                 </>
//               ) : (
//                 <>
//                   <FaChevronDown className="mr-1" /> Show more
//                 </>
//               )}
//             </button>
//           )}
//         </div>
//         <div>
//           <button>View Details</button>
//         </div>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 md:mt-0">
//           Book now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FlightDetailsCard;

/// checking the tab for view details

// import React, { useState } from "react";
// import { FaPlane, FaChevronDown, FaChevronUp, FaInfoCircle } from "react-icons/fa";

// const FlightDetailsCard = ({ logo, flightDetails, isSelected, selectedPriceIndex, onSelect }) => {
//   const [showAllPrices, setShowAllPrices] = useState(false);
//   const [showDetails, setShowDetails] = useState(false);
//   const [activeTab, setActiveTab] = useState("Flight Details");

//   let data;
//   let priceList = [];

//   if (!flightDetails) {
//     return <div>Loading flights...</div>;
//   }

//   if (!Array.isArray(flightDetails)) {
//     data = flightDetails.sI;
//     priceList = flightDetails.totalPriceList || [];
//   } else {
//     data = flightDetails;
//   }

//   if (!data || data.length === 0) {
//     return <div>No flight details available</div>;
//   }

//   const startSegment = data[0];
//   const endSegment = data[data.length - 1];

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

//   const departureTime = formatDateTime(startSegment.dt);
//   const arrivalTime = formatDateTime(endSegment.at);

//   const totalDuration = data.reduce((sum, segment) => sum + segment.duration, 0);

//   const displayedPrices = showAllPrices ? priceList : priceList.slice(0, 3);

//   const handlePriceSelection = (index) => {
//     onSelect(index);
//   };

//   const renderTabs = () => {
//     switch (activeTab) {
//       case "Flight Details":
//         return (
//           <div className="w-full">
//             {data.map((segment, index) => (
//               <div key={index} className="flex items-center justify-between py-4 border-b">
//                 <div className="flex items-center">
//                   <img src={logo} alt="Airline logo" className="w-10 h-10 mr-4" />
//                   <div>
//                     <div className="font-bold">{segment.fD.aI.name} {segment.fD.fN}</div>
//                     <div className="text-sm text-gray-500">
//                       {segment.da.city} → {segment.aa.city} {formatDateTime(segment.dt).split(',')[0]}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="text-right mr-8">
//                     <div className="font-bold">{formatDateTime(segment.dt).split(',')[1].trim()}</div>
//                     <div className="text-sm text-gray-500">{segment.da.city}, {segment.da.country}</div>
//                     <div className="text-sm text-gray-500">{segment.da.name}</div>
//                     <div className="text-sm text-gray-500">{segment.da.terminal || 'N/A'}</div>
//                   </div>
//                   <div className="flex flex-col items-center mx-4">
//                     <div className="text-sm text-gray-500">{segment.stops === 0 ? 'Non-Stop' : `${segment.stops} Stop(s)`}</div>
//                     <FaPlane className="my-2 text-gray-400" />
//                     <div className="text-sm text-gray-500">{convertToHoursMinutes(segment.duration)}</div>
//                   </div>
//                   <div className="text-left ml-8">
//                     <div className="font-bold">{formatDateTime(segment.at).split(',')[1].trim()}</div>
//                     <div className="text-sm text-gray-500">{segment.aa.city}, {segment.aa.country}</div>
//                     <div className="text-sm text-gray-500">{segment.aa.name}</div>
//                     <div className="text-sm text-gray-500">{segment.aa.terminal || 'N/A'}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             {/* <div className="mt-4 text-sm text-gray-600">
//               <span className="font-bold">Cabin:</span> {data[0].fD.cc}
//               <span className="ml-4 font-bold">Class:</span> {selectedPrice !== null ? priceList[selectedPrice].fd.ADULT.cc : 'N/A'}
//               <span className="ml-4 text-red-600 font-bold">{selectedPrice !== null ? `${priceList[selectedPrice].fd.ADULT.sR} seat(s) left` : ''}</span>
//             </div> */}
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
//             {priceList.map((item, index) => (
//               <div key={index} className="mb-4">
//                 <div className="grid grid-cols-3 w-full text-gray-600 mb-2">
//                   <div>Fare Details for Adult (CB: {item.fd.ADULT.cc})</div>
//                   <div></div>
//                   <div></div>
//                 </div>
//                 <div className="grid grid-cols-3 w-full mb-1">
//                   <div>Base Price</div>
//                   <div>₹{item.fd.ADULT.fC.BF.toFixed(2)} x 1</div>
//                   <div>₹{item.fd.ADULT.fC.BF.toFixed(2)}</div>
//                 </div>
//                 <div className="grid grid-cols-3 w-full mb-1">
//                   <div className="flex items-center">
//                     Taxes and fees <FaInfoCircle className="ml-1 text-gray-500" />
//                   </div>
//                   <div>₹{item.fd.ADULT.fC.TAF.toFixed(2)} x 1</div>
//                   <div>₹{item.fd.ADULT.fC.TAF.toFixed(2)}</div>
//                 </div>
//                 <div className="grid grid-cols-3 w-full font-bold">
//                   <div>Total</div>
//                   <div></div>
//                   <div>₹{item.fd.ADULT.fC.TF.toFixed(2)}</div>
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
//                 <div> {startSegment.da.code} - {endSegment.aa.code}</div>
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

//   return (
//     <div className="border flex flex-col p-4 rounded-lg m-4 bg-white shadow-md">
//       <div className="flex flex-col md:flex-row justify-between items-center mb-2">
//         <div className="flex items-center mb-4 md:mb-0">
//           {logo && <img src={logo} alt="Airline logo" className="w-16 h-16 mr-6" />}
//           <div>
//             <h1 className="text-lg font-bold">{startSegment.da.code}</h1>
//             <h1 className="text-sm text-gray-500">{startSegment.da.city}</h1>
//             <h1 className="text-sm">{departureTime}</h1>
//           </div>
//         </div>
//         <div className="flex items-center mb-4 md:mb-0">
//           <div className="border-t border-dashed border-gray-400 w-10 md:w-28"></div>
//           <div className="flex flex-col gap-4 text-center items-center text-xs font-semibold text-gray-500">
//             <span>{convertToHoursMinutes(totalDuration)}</span>
//             <FaPlane className="mx-2 text-blue-800 text-3xl" />
//             <div className="flex items-center">
//                {startSegment.stops > 0 ? (
//               <span>
//                 {startSegment.stops} stop{startSegment.stops > 1 ? 's' : ''}
//                 {startSegment.so && startSegment.so[0] && ` via ${startSegment.so[0].city}`}
//               </span>
//             ) : (
//               <span>Non-stop flight</span>
//             )}
//             </div>
//           </div>
//           <div className="border-t border-dashed border-gray-400 w-10 md:w-28"></div>
//         </div>
//         <div className="flex items-center mb-4 md:mb-0">
//           <div>
//             <h1 className="text-lg font-bold">{endSegment.aa.code}</h1>
//             <h1 className="text-sm text-gray-500">{endSegment.aa.city}</h1>
//             <h1 className="text-sm">{arrivalTime}</h1>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col md:flex-row mt-2 justify-between items-center text-center">
//         <div className="flex flex-col justify-center items-start">
//         {displayedPrices.map((price, index) => (
//             <div className="text-xs text-start space-y-2 flex items-center" key={index}>
//               <input
//                 type="radio"
//                 id={`price-${index}`}
//                 name="price"
//                 value={index}
//                 checked={selectedPriceIndex === index}
//                 onChange={() => handlePriceSelection(index)}
//                 className="mr-2"
//               />
//               <label htmlFor={`price-${index}`} className="flex flex-col">
//                 <p className="font-semibold">₹ {price?.fd?.ADULT?.fC?.TF}</p>
//                 <p className="text-[10px]">
//                   <span className="bg-yellow-800 p-0.5 bg-opacity-50 rounded-md text-gray-700">
//                     {price?.fareIdentifier}
//                   </span>{" "}
//                   {price?.fd?.ADULT?.cc}
//                 </p>
//                 {selectedPriceIndex === index && (
//                   <p className="text-red-600">
//                     Seats left: {price?.fd?.ADULT?.sR}
//                   </p>
//                 )}
//               </label>
//             </div>
//           ))}
//           {priceList.length > 3 && (
//             <button
//               onClick={() => setShowAllPrices(!showAllPrices)}
//               className="text-blue-500 text-sm mt-2 flex items-center"
//             >
//               {showAllPrices ? (
//                 <>
//                   <FaChevronUp className="mr-1" /> Show less
//                 </>
//               ) : (
//                 <>
//                   <FaChevronDown className="mr-1" /> Show more
//                 </>
//               )}
//             </button>
//           )}
//         </div>
//         <div>
//           <button
//             onClick={() => setShowDetails(!showDetails)}
//             className="text-blue-500 text-sm mt-2"
//           >
//             {showDetails ? "Hide Details" : "View Details"}
//           </button>
//         </div>
//         <button
//           className={`${isSelected ? 'bg-green-500' : 'bg-blue-500'} text-white px-4 py-2 rounded-md mt-4 md:mt-0`}
//           onClick={() => onSelect(selectedPriceIndex)}
//         >
//           {isSelected ? 'Selected' : 'Select'}
//         </button>
//       </div>

//       {showDetails && (
//         <div className="mt-4 border-t border-gray-200 pt-4">
//           <div className="mb-2 flex">
//             {["Flight Details", "Fare Details", "Fare Rules", "Baggage Information"].map(
//               (tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`py-2 px-4 text-sm ${
//                     activeTab === tab
//                       ? "text-blue-500 font-bold border-b-2 border-blue-500"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               )
//             )}
//           </div>
//           {renderTabs()}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FlightDetailsCard;

// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { FaPlane, FaChevronDown, FaChevronUp, FaInfoCircle } from "react-icons/fa";
// import defaultAirline from '../../../assets/home/logo/defaultAirline.png'

// const FlightDetailsCard = ({ logo, flightDetails, isSelected, selectedPriceIndex, onSelect, passenger }) => {
//   const [showAllPrices, setShowAllPrices] = useState(false);
//   const [showDetails, setShowDetails] = useState(false);
//   const [activeTab, setActiveTab] = useState("Flight Details");
//   const [localSelectedPriceIndex, setLocalSelectedPriceIndex] = useState(selectedPriceIndex || 0);

//   useEffect(() => {
//     if (isSelected && selectedPriceIndex === null) {
//       onSelect(0);
//     }
//   }, [isSelected, selectedPriceIndex, onSelect]);

//   let data;
//   let priceList = [];

//   const calculateTotalPrice = (priceIndex) => {
//     const selectedPrice = priceList[priceIndex];
//     if (!selectedPrice) return 0;

//     return Object.entries(selectedPrice.fd).reduce((total, [passengerType, details]) => {
//       return total + (details.fC.TF * (passenger[passengerType] || 0));
//     }, 0);
//   };

//   const totalPrice = calculateTotalPrice(localSelectedPriceIndex);

//   if (!flightDetails) {
//     return <div>Loading flights...</div>;
//   }

//   if (!Array.isArray(flightDetails)) {
//     data = flightDetails.sI;
//     priceList = flightDetails.totalPriceList || [];
//   } else {
//     data = flightDetails;
//   }

//   if (!data || data.length === 0) {
//     return <div>No flight details available</div>;
//   }

//   const startSegment = data[0];
//   const endSegment = data[data.length - 1];

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

//   console.log({flightDetails},"")

//   const departureTime = formatDateTime(startSegment.dt);
//   const arrivalTime = formatDateTime(endSegment.at);

//   const totalDuration = data.reduce((sum, segment) => sum + segment.duration, 0);

//   const displayedPrices = showAllPrices ? priceList : priceList.slice(0, 1);

//   const handlePriceSelection = (index) => {
//     setLocalSelectedPriceIndex(index);
//     onSelect(index);
//   };

//   const renderTabs = () => {
//     switch (activeTab) {
//       case "Flight Details":
//         return (
//           <div className="w-full">
//             {data.map((segment, index) => (
//               <div key={index} className=" flex flex-col md:flex-row items-center justify-between py-4 border-b">
//                 <div className="flex items-center">
//                   <img src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${segment.fD.aI.code}.png`}  onError={(e) => e.currentTarget.src = defaultAirline} alt={segment?.fD?.aI?.code} className="w-10 h-10 mr-4" />
//                   <div>
//                     <div className="font-bold">{segment.fD.aI.name} {segment.fD.fN}</div>
//                     <div className="text-sm text-gray-500">
//                       {segment.da.city} → {segment.aa.city} {formatDateTime(segment.dt).split(',')[0]}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="text-right mr-8">
//                     <div className="font-bold">{formatDateTime(segment.dt).split(',')[1].trim()}</div>
//                     <div className="text-sm text-gray-500">{segment.da.city}, {segment.da.country}</div>
//                     <div className="text-sm text-gray-500">{segment.da.name}</div>
//                     <div className="text-sm text-gray-500">{segment.da.terminal || 'N/A'}</div>
//                   </div>
//                   <div className="flex flex-col items-center mx-4">
//                     <div className="text-sm text-gray-500">{segment.stops === 0 ? 'Non-Stop' : `${segment.stops} Stop(s)`}</div>
//                     <FaPlane className="my-2 text-gray-400" />
//                     <div className="text-sm text-gray-500">{convertToHoursMinutes(segment.duration)}</div>
//                   </div>
//                   <div className="text-left ml-8">
//                     <div className="font-bold">{formatDateTime(segment.at).split(',')[1].trim()}</div>
//                     <div className="text-sm text-gray-500">{segment.aa.city}, {segment.aa.country}</div>
//                     <div className="text-sm text-gray-500">{segment.aa.name}</div>
//                     <div className="text-sm text-gray-500">{segment.aa.terminal || 'N/A'}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         );
//         case "Fare Details":
//           return (
//             <div className="w-full">
//               <div className="grid grid-cols-3 w-full border-b pb-2 mb-2">
//                 <div className="font-bold">TYPE</div>
//                 <div className="font-bold">Fare</div>
//                 <div className="font-bold">Total</div>
//               </div>
//               {Object.entries(passenger).map(([passengerType, count]) => {
//                 if (count > 0) {
//                   const details = priceList[localSelectedPriceIndex]?.fd[passengerType];
//                   if (details) {
//                     return (
//                       <div key={passengerType} className="mb-4">
//                         <div className="grid grid-cols-3 w-full text-gray-600 mb-2">
//                           <div>Fare Details for {passengerType} (CB: {details.cB})</div>
//                           <div></div>
//                           <div></div>
//                         </div>
//                         <div className="grid grid-cols-3 w-full mb-1">
//                           <div>Base Price</div>
//                           <div>₹{details.fC.BF.toFixed(2)} x {count}</div>
//                           <div>₹{(details.fC.BF * count).toFixed(2)}</div>
//                         </div>
//                         <div className="grid grid-cols-3 w-full mb-1">
//                           <div className="flex items-center">
//                             Taxes and fees <FaInfoCircle className="ml-1 text-gray-500" />
//                           </div>
//                           <div>₹{details.fC.TAF.toFixed(2)} x {count}</div>
//                           <div>₹{(details.fC.TAF * count).toFixed(2)}</div>
//                         </div>
//                       </div>
//                     );
//                   }
//                 }
//                 return null;
//               })}
//               <div className="grid grid-cols-3 w-full font-bold border-t pt-2">
//                 <div>Total</div>
//                 <div></div>
//                 <div>₹{calculateTotalPrice(localSelectedPriceIndex).toFixed(2)}</div>
//               </div>
//             </div>
//           );
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
//                 <div> {startSegment.da.code} - {endSegment.aa.code}</div>
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

//   return (
//     <div className="border flex flex-col p-4 rounded-lg m-4 bg-white shadow-md">
//       <div className="flex flex-col md:flex-row justify-between items-center mb-2">
//         <div className="flex items-center mb-4 md:mb-0">
//           <img
//             src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${startSegment?.fD?.aI?.code}.png`}
//             onError={(e) => e.currentTarget.src = defaultAirline}
//             alt={startSegment?.fD?.aI?.code}
//             className="w-16 h-16 mr-6"
//           />
//           <div>
//             <h1 className="text-lg font-bold">{startSegment?.da?.code}</h1>
//             <h1 className="text-sm text-gray-500">{startSegment?.da?.city}</h1>
//             <h1 className="text-sm">{departureTime}</h1>
//           </div>
//         </div>
//         <div className="flex items-center mb-4 md:mb-0">
//           <div className="border-t hidden md:flex border-dashed border-gray-400 w-10 md:w-28"></div>
//           <div className="flex flex-col gap-4 text-center items-center text-xs font-semibold text-gray-500">
//             <span>{convertToHoursMinutes(totalDuration)}</span>
//             <FaPlane className="mx-2 text-blue-800 text-3xl" />
//             {console.log(startSegment,"stop")}
//             <div className="flex items-center">
//                {startSegment.stops > 0 ? (
//                 <span>
//                   {startSegment?.stops} stop{startSegment?.stops > 1 ? 's' : ''}
//                   {startSegment?.so && startSegment?.so[0] && ` via ${startSegment?.so[0].city}`}
//                 </span>
//               ) : (
//                 <span>Non-stop flight</span>
//               )}
//             </div>
//           </div>
//           <div className="border-t hidden md:flex border-dashed border-gray-400 w-10 md:w-28"></div>
//         </div>
//         <div className="flex items-center mb-4 md:mb-0">
//           <div>
//             <h1 className="text-lg font-bold">{endSegment?.aa?.code}</h1>
//             <h1 className="text-sm text-gray-500">{endSegment?.aa?.city}</h1>
//             <h1 className="text-sm">{arrivalTime}</h1>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col md:flex-row mt-2 justify-between items-center text-center">
//         <div className="flex flex-col justify-center items-start">
//           {displayedPrices?.map((price, index) => (
//             <div
//               key={index}
//               onClick={() => handlePriceSelection(index)}
//               className={`
//                 text-xs text-start space-y-2 flex items-center w-full md:w-auto
//                 p-1 mb-2 cursor-pointer transition-all duration-200 ease-in-out
//                 ${localSelectedPriceIndex === index
//                   ? 'border border-blue-500 rounded-md'
//                   : 'border border-gray-200 hover:border-blue-300 rounded-md'}
//               `}
//             >
//               <div className="flex flex-col w-full">
//                 <p className="font-semibold">₹ {calculateTotalPrice(index).toFixed(2)}</p>
//                 <p className="text-[10px]">
//                   <span className="bg-yellow-800 p-0.5 bg-opacity-50 rounded-md text-gray-700">
//                     {price?.fareIdentifier}
//                   </span>{" "}
//                   {price?.fd?.ADULT?.cc}
//                 </p>
//                 <p className="text-red-600 text-[10px]">
//                   Seats left: {price?.fd?.ADULT?.sR}
//                 </p>
//               </div>
//             </div>
//           ))}

//           {priceList?.length > 1 && (
//             <button
//               onClick={() => setShowAllPrices(!showAllPrices)}
//               className="text-blue-500 text-sm mt-2 flex items-center"
//             >
//               {showAllPrices ? (
//                 <>
//                   <FaChevronUp className="mr-1" /> Show less
//                 </>
//               ) : (
//                 <>
//                   <FaChevronDown className="mr-1" /> Show more
//                 </>
//               )}
//             </button>
//           )}
//         </div>
//         <div>
//           <button
//             onClick={() => setShowDetails(!showDetails)}
//             className="text-blue-500 text-sm mt-2"
//           >
//             {showDetails ? "Hide Details" : "View Details"}
//           </button>
//         </div>
//         <button
//           className={`${isSelected ? 'bg-green-500' : 'bg-blue-500'} text-white px-4 py-2 rounded-md mt-4 md:mt-0`}
//           onClick={() => onSelect(localSelectedPriceIndex)}
//         >
//           {isSelected ? 'Selected' : 'Select'}
//         </button>
//       </div>

//       {showDetails && (
//         <div className="mt-4 border-t overflow-x-auto border-gray-200 pt-4">
//           <div className="mb-2 flex">
//             {["Flight Details", "Fare Details", "Fare Rules", "Baggage Information"].map(
//               (tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`py-2 px-4 text-sm ${
//                     activeTab === tab
//                       ? "text-blue-500 font-bold border-b-2 border-blue-500"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               )
//             )}
//           </div>
//           {renderTabs()}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FlightDetailsCard;

import React, { useState, useEffect } from "react";
import {
  FaPlane,
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import FareToolTip from "./FareTooltip";

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



  const departureTime = formatDateTime(startSegment.dt);
  const arrivalTime = formatDateTime(endSegment.at);

  const totalDuration = data.reduce(
    (sum, segment) => sum + segment.duration,
    0
  );

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

  const renderTabs = () => {
    switch (activeTab) {
      case "Flight Details":
        return (
          <div className="w-full  p-2">
            {data.map((segment, index) => (
              <>
                <div
                  key={index}
                  className="flex relative flex-col md:flex-row items-center justify-between px-4 py-4 "
                >
                  <div className="flex items-center md:w-1/3">
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

                  <div className="flex flex-wr items-center md:w-2/3 justify-start">
                    <div className=" mr-8 w-1/3">
                      <div className="font-bold">
                        {formatDateTime(segment.dt).split(",")[0].trim()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {segment.da.city}, {segment?.da?.country}
                      </div>
                      <div className="text-xs text-gray-500">
                        {segment.da.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {segment.da.terminal || "N/A"}
                      </div>
                    </div>
                    <div className="flex w-1/3 flex-col items-center mx-4">
                      <div className="text-xs text-end text-gray-500">
                        {segment.stops === 0
                          ? "Non-Stop"
                          : `${segment.stops} Stop(s)`}
                      </div>
                      <FaPlane className="my-2 text-gray-400" />
                      <div className="text-xs text-gray-500">
                        {convertToHoursMinutes(segment.duration)}
                      </div>
                    </div>
                    <div className="text-left w-1/3 ml-8">
                      <div className="font-bold">
                        {formatDateTime(segment.at).split(",")[0].trim()}
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
                <div className="w-full flex justify-center">
                  {index < data.length - 1 && (
                    <div className="px-4  flex justify-around text-xs  py-2 md:w-1/2 border border-gray-200 bg-gray-100 rounded-full md:text-sm">
                      <span className=" font-bold">Require to change Plane</span>
                      <span><span className="font-bold ml-4">Layover Time:</span> {calculateLayoverTime(segment, data[index + 1])}</span>
                    </div>
                  )}
                </div>
              </>
            ))}
          </div>
        );
      case "Fare Details":
        return (
          <div className="w-full p-2">
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
                      <div className="grid grid-cols-3 w-full text-xs text-gray-600 mb-2">
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
                        {/* <div className="flex items-center">
                          Taxes and fees{" "}
                          <FaInfoCircle className="ml-1 text-gray-500" />
                        </div> */}


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
          <div className="p-2">
            <h2 className="font-bold mb-2">Fare Rules</h2>
            <p>Insert fare rules information here.</p>
          </div>
        );
      case "Baggage Information":
        return (
          <div className="grid p-2 grid-cols-3 text-sm w-full gap-4">
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
    <div className="border flex flex-col  rounded-lg m-4 bg-white shadow-md overflow-x-auto ">
      <div className="flex flex-col md:flex-row justify-between items-stretch p-3  mb-2">
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
                alt={startSegment?.fD?.aI?.code}
                className="md:size-12 rounded-md  mr-6 md:flex hidden"
              />
              <div>
                <h1 className="text-base font-bold">{startSegment?.da.code}</h1>
                {/* <h1 className="text-sm text-gray-500">
                  {startSegment.da.city}
                </h1> */}
                <h1 className="text-xs">{departureTime}</h1>
              </div>
            </div>
            <div className="flex items-center mb-4 md:mb-0">
              <div className="border-t  hidden md:flex border-dashed border-gray-400 w-6 md:w-20"></div>
              <div className="flex flex-col gap-4 text-center items-center text-xs font-semibold text-gray-500">
                <span>{convertToHoursMinutes(totalDuration)}</span>
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
            <div className="flex md:text-start text-end  items-center mb-4 md:mb-0">
              <div>
                <h1 className="text-base font-bold">{endSegment?.aa.code}</h1>
                {/* <h1 className="text-sm text-gray-500">{endSegment?.aa.city}</h1> */}
                <h1 className="text-xs">{arrivalTime}</h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full   ">
            <div className="flex  mt-3 gap-2 overflow-x-auto no-scroll items-start">
              {displayedPrices?.map((price, index) => (
                <div
                  key={index}
                  onClick={() => handlePriceSelection(index)}
                  className={`
                text-xs text-start space-y-2 flex shrink-0 items-center min-w-24 md:w-fit
                p-1 mb-2 cursor-pointer 
                ${localSelectedPriceIndex === index
                      ? "border border-[#007EC4] rounded-md"
                      : "border border-gray-200 hover:border-blue-300 rounded-md"
                    }
              `}
                >
                  <div className="flex flex-col text-xs ">
                    <p className="font-semibold text-xs">
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
            <div>
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
          </div>
        </div>

        <div className="flex   justify-center items-end md:border-l-2 pl-3 ">
          <button
            className={`${isSelected ? "bg-green-500" : "bg-[#007EC4]"
              } text-white md:w-36 px-7 py-2 rounded-md mt-4 md:mt-0`}
            onClick={() => onSelect(localSelectedPriceIndex)}
          >
            {isSelected ? "Selected" : "Select"}
          </button>
        </div>
      </div>

      {showDetails && (
        <div className=" border-t  border-gray-200 pt-4">
          <div className="mb-2 overflow-x-auto shrink-0 flex">
            {[
              "Flight Details",
              "Fare Details",
              "Fare Rules",
              "Baggage Information",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 shrink-0 text-sm ${activeTab === tab
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

export default FlightDetailsCard;
