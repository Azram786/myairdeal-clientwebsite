// import React, { useMemo } from 'react'

// const SideBar = ({ flights }) => {
//   // Calculate airline counts and unique departure/arrival times

//   const flightCountMap = flights.reduce((acc, flight) => {
//     const key = flight.flightName;
//     if (!acc[key]) {
//         acc[key] = 0;
//     }
//     acc[key]++;
//     return acc;
// }, {});

// console.log(flightCountMap,"count")
  
//   return (
//     <div className="flex-none w-1/4 border p-4 m-2 shadow-md rounded-md h-auto">
//       <div className="p-4">
//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Price</h3>
//           <div className="flex justify-between gap-2 ">
//             <span>$50</span>
//             <input type="range" min="50" max="1200" className="flex-1 mr-4" />
//             <span>$1200</span>
//           </div>
//         </div>

//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Departure Time</h3>
//           <div className="flex flex-col">
//             {/* {departureTimes.map(time => (
//               <label key={time} className="mb-1">
//                 <input type="checkbox" className="mr-2" />
//                 {time}
//               </label>
//             ))} */}
//           </div>
//         </div>

//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Arrival Time</h3>
//           <div className="flex flex-col">
//             {/* {arrivalTimes.map(time => (
//               <label key={time} className="mb-1">
//                 <input type="checkbox" className="mr-2" />
//                 {time}
//               </label>
//             ))} */}
//           </div>
//         </div>

//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Airlines</h3>
//           <div className="flex flex-col">

          
//             {/* {Object.entries(airlineCounts).map(([airline, count]) => (
//               <label key={airline} className="mb-1">
//                 <input type="checkbox" className="mr-2" />
//                 {airline} ({count})
//               </label>
//             ))} */}
//           </div>
//         </div>

//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Stops</h3>
//           <div className="flex gap-5">
//             {["0", "1", "2","3+"].map((stop) => (
//               <label key={stop} className="mb-1">
//                 <input type="checkbox" className="mr-2" />
//                 {stop}
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SideBar
 

// ------------------------------------------------WORKING FOR ONEWAY

// import React, { useState, useEffect } from 'react';
// import { IoIosMoon, IoIosSunny } from 'react-icons/io';
// import { PiMountains } from 'react-icons/pi';
// import { TbSunset2 } from 'react-icons/tb';

// const SideBar = ({ flights, filters, setFilters }) => {
//   const [stops, setStops] = useState(["0", "1", "2", "3+"]);

//   // Calculate airline counts
//   const flightCountMap = flights.reduce((acc, flight) => {
//     const key = flight.sI[0].fD.aI.name;
//     if (!acc[key]) {
//       acc[key] = 0;
//     }
//     acc[key]++;
//     return acc;
//   }, {});

//   const handlePriceChange = (e) => {
//     console.log("Price changed to:", e.target.value);
//     setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }));
//   };

//   const handleStopsChange = (stop) => {
//     setFilters(prev => ({
//       ...prev,
//       stops: prev.stops.includes(stop)
//         ? prev.stops.filter(s => s !== stop)
//         : [...prev.stops, stop]
//     }));
//   };

//   const handleTimeChange = (type, time) => {
//     setFilters(prev => ({
//       ...prev,
//       [type]: prev[type].includes(time)
//         ? prev[type].filter(t => t !== time)
//         : [...prev[type], time]
//     }));
//   };

//   const handleAirlineChange = (airline) => {
//     setFilters(prev => ({
//       ...prev,
//       airlines: prev.airlines.includes(airline)
//         ? prev.airlines.filter(a => a !== airline)
//         : [...prev.airlines, airline]
//     }));
//   };

//   return (
//     <div className="flex-none w-1/4 border p-4 m-2 shadow-md rounded-md min-h-screen">
//       <div className="p-4">
//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Price</h3>
//           <div className="flex justify-between gap-2">
//             <span>$50</span>
//             <input
//               type="range"
//               min="50"
//               max="1200"
//               value={filters.maxPrice}
//               onChange={handlePriceChange}
//               className="flex-1 mr-4"
//             />
//             <span>${filters.maxPrice}</span>
//           </div>
//         </div>

//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Stops</h3>
//           <div className="grid w-full grid-cols-4 ">
//             {stops.map((stop, index) => (
//               <label
//                 key={stop}
//                 htmlFor={`stop-${stop}`}
//                 className={`mb-1 border flex justify-center py-2 ${index === 0 ? 'rounded-l-md' : ''} ${index === stops.length - 1 ? 'rounded-r-md' : ''}`}
//               >
//                 <input
//                   type="checkbox"
//                   id={`stop-${stop}`}
//                   checked={filters.stops.includes(stop)}
//                   onChange={() => handleStopsChange(stop)}
//                   className="mr-2 hidden"
//                 />
//                 {stop}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Departure Time</h3>
//           <div className='grid grid-cols-4 place-items-center gap-2 '>
//             {[
//               { icon: <PiMountains />, time: "00-06" },
//               { icon: <IoIosSunny />, time: "06-12" },
//               { icon: <TbSunset2 />, time: "12-18" },
//               { icon: <IoIosMoon />, time: "18-00" }
//             ].map(({ icon, time }) => (
//               <span
//                 key={time}
//                 className={`border-gray-500 border flex flex-col justify-center items-center rounded-md py-1 w-full cursor-pointer ${
//                   filters.departureTime.includes(time) ? 'bg-blue-200' : ''
//                 }`}
//                 onClick={() => handleTimeChange('departureTime', time)}
//               >
//                 {icon}
//                 <span className='text-xs'>{time}</span>
//               </span>
//             ))}
//           </div>
//         </div>

//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Arrival Time</h3>
//           <div className='grid grid-cols-4 place-items-center gap-2 '>
//             {[
//               { icon: <PiMountains />, time: "00-06" },
//               { icon: <IoIosSunny />, time: "06-12" },
//               { icon: <TbSunset2 />, time: "12-18" },
//               { icon: <IoIosMoon />, time: "18-00" }
//             ].map(({ icon, time }) => (
//               <span
//                 key={time}
//                 className={`border-gray-500 border flex flex-col justify-center items-center rounded-md py-1 w-full cursor-pointer ${
//                   filters.arrivalTime.includes(time) ? 'bg-blue-200' : ''
//                 }`}
//                 onClick={() => handleTimeChange('arrivalTime', time)}
//               >
//                 {icon}
//                 <span className='text-xs'>{time}</span>
//               </span>
//             ))}
//           </div>
//         </div>

//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Airlines</h3>
//           <div className="flex flex-col">
//             {Object.entries(flightCountMap).map(([airline, count]) => (
//               <span key={airline} className='flex justify-between items-center w-full'>
//                 <label htmlFor={`airline-${airline}`} className="mb-1">
//                   {airline} <span className='text-gray-400'>({count})</span>
//                 </label>
//                 <input
//                   type="checkbox"
//                   id={`airline-${airline}`}
//                   checked={filters.airlines.includes(airline)}
//                   onChange={() => handleAirlineChange(airline)}
//                   className="mr-2"
//                 />
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBar;


// import React, { useState, useEffect } from 'react';
// import { IoIosMoon, IoIosSunny } from 'react-icons/io';
// import { PiMountains } from 'react-icons/pi';
// import { TbSunset2 } from 'react-icons/tb';

// const SideBar = ({ flights, filters, setFilters, activeTabIndex,passenger }) => {
//   const [stops, setStops] = useState(["0", "1", "2", "3+"]);

//   // Calculate airline counts for the active tab
//   const flightCountMap = flights[activeTabIndex].reduce((acc, flight) => {
//     const key = flight.sI[0].fD.aI.name;
//     if (!acc[key]) {
//       acc[key] = 0;
//     }
//     acc[key]++;
//     return acc;
//   }, {});

//   // Calculate total price based on passenger count
//   const calculateTotalPrice = (flight) => {
//     let total = 0;
//     const priceList = flight.totalPriceList[0].fd;
//     for (const passengerType in passenger) {
//       if (priceList[passengerType]) {
//         total += priceList[passengerType].fC.TF * passenger[passengerType];
//       }
//     }
//     return total;
//   };

//   useEffect(() => {
//     const maxPrice = Math.max(...flights[activeTabIndex].map(calculateTotalPrice));
//     setFilters(prev => {
//       const newFilters = [...prev];
//       newFilters[activeTabIndex] = {
//         ...newFilters[activeTabIndex],
//         maxPrice: maxPrice
//       };
//       return newFilters;
//     });
//   }, [flights, activeTabIndex, passenger, setFilters]);

//   const handlePriceChange = (e) => {
//     const newFilters = [...filters];
//     newFilters[activeTabIndex] = {
//       ...newFilters[activeTabIndex],
//       maxPrice: parseInt(e.target.value)
//     };
//     setFilters(newFilters);
//   };

//   // const handlePriceChange = (e) => {
//   //   const newFilters = [...filters];
//   //   newFilters[activeTabIndex] = {
//   //     ...newFilters[activeTabIndex],
//   //     maxPrice: parseInt(e.target.value)
//   //   };
//   //   setFilters(newFilters);
//   // };

//   const handleStopsChange = (stop) => {
//     const newFilters = [...filters];
//     newFilters[activeTabIndex] = {
//       ...newFilters[activeTabIndex],
//       stops: newFilters[activeTabIndex].stops.includes(stop)
//         ? newFilters[activeTabIndex].stops.filter(s => s !== stop)
//         : [...newFilters[activeTabIndex].stops, stop]
//     };
//     setFilters(newFilters);
//   };

//   const handleTimeChange = (type, time) => {
//     const newFilters = [...filters];
//     newFilters[activeTabIndex] = {
//       ...newFilters[activeTabIndex],
//       [type]: newFilters[activeTabIndex][type].includes(time)
//         ? newFilters[activeTabIndex][type].filter(t => t !== time)
//         : [...newFilters[activeTabIndex][type], time]
//     };
//     setFilters(newFilters);
//   };

//   const handleAirlineChange = (airline) => {
//     const newFilters = [...filters];
//     newFilters[activeTabIndex] = {
//       ...newFilters[activeTabIndex],
//       airlines: newFilters[activeTabIndex].airlines.includes(airline)
//         ? newFilters[activeTabIndex].airlines.filter(a => a !== airline)
//         : [...newFilters[activeTabIndex].airlines, airline]
//     };
//     setFilters(newFilters);
//   };

//   // Get departure and arrival cities for the active tab
//   const departureCity = flights[activeTabIndex][0].sI[0].da.city;
//   const arrivalCity = flights[activeTabIndex][0].sI[0].aa.city;

//   // Find the maximum price for the current tab
//   const maxPrice = Math.max(...flights[activeTabIndex].map(flight => 
//     flight.totalPriceList[0].fd.ADULT.fC.TF
//   ));

//   return (
//     <div className="flex flex-row  md:w-1/4 border p-4 m-2 shadow-md rounded-md min-h-screen">
//       <div className=" grid  gap-2  w-full grid-cols-1">
//         {/* Price slider */}
//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Price</h3>
//           <div className="flex justify-between gap-2">
//             <span>₹100</span>
//             <input
//               type="range"
//               min="100"
//               max={filters[activeTabIndex].maxPrice}
//               value={filters[activeTabIndex].maxPrice}
//               onChange={handlePriceChange}
//               className="flex-1 mr-4 range-slider"
//             />
//             <span>₹{filters[activeTabIndex].maxPrice}</span>
//           </div>
//         </div>

//         {/* Stops */}
//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Stops</h3>
//           <div className="grid w-full grid-cols-4 ">
//             {stops.map((stop, index) => (
//               <label
//                 key={stop}
//                 htmlFor={`stop-${stop}`}
//                 className={`mb-1 border flex justify-center py-2 ${index === 0 ? 'rounded-l-md' : ''} ${index === stops.length - 1 ? 'rounded-r-md' : ''} ${
//                   filters[activeTabIndex].stops.includes(stop) ? 'bg-blue-200' : ''
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   id={`stop-${stop}`}
//                   checked={filters[activeTabIndex].stops.includes(stop)}
//                   onChange={() => handleStopsChange(stop)}
//                   className="mr-2 hidden"
//                 />
//                 {stop}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Departure Time */}
//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Departure Time from {departureCity}</h3>
//           <div className='grid grid-cols-4 place-items-center gap-2 '>
//             {[
//               { icon: <PiMountains />, time: "00-06" },
//               { icon: <IoIosSunny />, time: "06-12" },
//               { icon: <TbSunset2 />, time: "12-18" },
//               { icon: <IoIosMoon />, time: "18-00" }
//             ].map(({ icon, time }) => (
//               <span
//                 key={time}
//                 className={`border-gray-500 border flex flex-col justify-center items-center rounded-md py-1 w-full cursor-pointer ${
//                   filters[activeTabIndex].departureTime.includes(time) ? 'bg-blue-200' : ''
//                 }`}
//                 onClick={() => handleTimeChange('departureTime', time)}
//               >
//                 {icon}
//                 <span className='text-xs'>{time}</span>
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Arrival Time */}
//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Arrival Time at {arrivalCity}</h3>
//           <div className='grid grid-cols-4 place-items-center gap-2 '>
//             {[
//               { icon: <PiMountains />, time: "00-06" },
//               { icon: <IoIosSunny />, time: "06-12" },
//               { icon: <TbSunset2 />, time: "12-18" },
//               { icon: <IoIosMoon />, time: "18-00" }
//             ].map(({ icon, time }) => (
//               <span
//                 key={time}
//                 className={`border-gray-500 border flex flex-col justify-center items-center rounded-md py-1 w-full cursor-pointer ${
//                   filters[activeTabIndex].arrivalTime.includes(time) ? 'bg-blue-200' : ''
//                 }`}
//                 onClick={() => handleTimeChange('arrivalTime', time)}
//               >
//                 {icon}
//                 <span className='text-xs'>{time}</span>
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Airlines */}
//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Airlines</h3>
//           <div className="flex flex-col">
//             {Object.entries(flightCountMap).map(([airline, count]) => (
//               <span key={airline} className='flex justify-between items-center w-full'>
//                 <label htmlFor={`airline-${airline}`} className="mb-1">
//                   {airline} <span className='text-gray-400'>({count})</span>
//                 </label>
//                 <input
//                   type="checkbox"
//                   id={`airline-${airline}`}
//                   checked={filters[activeTabIndex].airlines.includes(airline)}
//                   onChange={() => handleAirlineChange(airline)}
//                   className="mr-2"
//                 />
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBar;


// import React, { useState, useEffect, useMemo } from 'react';
// import { IoIosMoon, IoIosSunny } from 'react-icons/io';
// import { PiMountains } from 'react-icons/pi';
// import { TbSunset2 } from 'react-icons/tb';

// const SideBar = ({ flights, filters, setFilters, activeTabIndex, passenger }) => {
//   const [stops] = useState(["0", "1", "2", "3+"]);

//   const getStopsCount = (flight) => {
//     return flight.sI.length - 1;
//   };

//   const calculateTotalPrice = (flight) => {
//     let total = 0;
//     const priceList = flight.totalPriceList[0].fd;
//     for (const passengerType in passenger) {
//       if (priceList[passengerType]) {
//         total += priceList[passengerType].fC.TF * passenger[passengerType];
//       }
//     }
//     return total;
//   };

//   // Calculate airline counts for the active tab
//   const flightCountMap = useMemo(() => {
//     return flights[activeTabIndex].reduce((acc, flight) => {
//       const key = flight.sI[0].fD.aI.name;
//       if (!acc[key]) {
//         acc[key] = 0;
//       }
//       acc[key]++;
//       return acc;
//     }, {});
//   }, [flights, activeTabIndex]);

//   useEffect(() => {
//     const maxPrice = Math.max(...flights[activeTabIndex].map(calculateTotalPrice));
//     setFilters(prev => {
//       const newFilters = [...prev];
//       newFilters[activeTabIndex] = {
//         ...newFilters[activeTabIndex],
//         maxPrice: maxPrice
//       };
//       return newFilters;
//     });
//   }, [flights, activeTabIndex, passenger, setFilters]);

//   const handlePriceChange = (e) => {
//     const newFilters = [...filters];
//     newFilters[activeTabIndex] = {
//       ...newFilters[activeTabIndex],
//       maxPrice: parseInt(e.target.value)
//     };
//     setFilters(newFilters);
//   };

//   const handleStopsChange = (stop) => {
//     const newFilters = [...filters];
//     newFilters[activeTabIndex] = {
//       ...newFilters[activeTabIndex],
//       stops: newFilters[activeTabIndex].stops.includes(stop)
//         ? newFilters[activeTabIndex].stops.filter(s => s !== stop)
//         : [...newFilters[activeTabIndex].stops, stop]
//     };
//     setFilters(newFilters);
//   };

//   const handleTimeChange = (type, time) => {
//     const newFilters = [...filters];
//     newFilters[activeTabIndex] = {
//       ...newFilters[activeTabIndex],
//       [type]: newFilters[activeTabIndex][type].includes(time)
//         ? newFilters[activeTabIndex][type].filter(t => t !== time)
//         : [...newFilters[activeTabIndex][type], time]
//     };
//     setFilters(newFilters);
//   };

//   const handleAirlineChange = (airline) => {
//     const newFilters = [...filters];
//     newFilters[activeTabIndex] = {
//       ...newFilters[activeTabIndex],
//       airlines: newFilters[activeTabIndex].airlines.includes(airline)
//         ? newFilters[activeTabIndex].airlines.filter(a => a !== airline)
//         : [...newFilters[activeTabIndex].airlines, airline]
//     };
//     setFilters(newFilters);
//   };

//   // Get departure and arrival cities for the active tab
//   const departureCity = flights[activeTabIndex][0].sI[0].da.city;
//   const arrivalCity = flights[activeTabIndex][0].sI[flights[activeTabIndex][0].sI.length - 1].aa.city;

//   return (
//     <div className="flex flex-row md:w-1/4 border p-4 m-2 shadow-md rounded-md min-h-screen">
//       <div className="grid gap-2 w-full grid-cols-1">
//         {/* Price slider */}
//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Price</h3>
//           <div className="flex justify-between gap-2">
//             <span>₹100</span>
//             <input
//               type="range"
//               min="100"
//               max={filters[activeTabIndex].maxPrice}
//               value={filters[activeTabIndex].maxPrice}
//               onChange={handlePriceChange}
//               className="flex-1 mr-4 range-slider"
//             />
//             <span>₹{filters[activeTabIndex].maxPrice}</span>
//           </div>
//         </div>
        
//         {/* Stops */}
//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Stops</h3>
//           <div className="grid w-full grid-cols-4 ">
//             {stops.map((stop, index) => (
//               <label
//                 key={stop}
//                 htmlFor={`stop-${stop}`}
//                 className={`mb-1 border flex justify-center py-2 ${index === 0 ? 'rounded-l-md' : ''} ${index === stops.length - 1 ? 'rounded-r-md' : ''} ${
//                   filters[activeTabIndex].stops.includes(stop) ? 'bg-blue-200' : ''
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   id={`stop-${stop}`}
//                   checked={filters[activeTabIndex].stops.includes(stop)}
//                   onChange={() => handleStopsChange(stop)}
//                   className="mr-2 hidden"
//                 />
//                 {stop}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Departure Time */}
//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Departure Time from {departureCity}</h3>
//           <div className='grid grid-cols-4 place-items-center gap-2 '>
//             {[
//               { icon: <PiMountains />, time: "00-06" },
//               { icon: <IoIosSunny />, time: "06-12" },
//               { icon: <TbSunset2 />, time: "12-18" },
//               { icon: <IoIosMoon />, time: "18-00" }
//             ].map(({ icon, time }) => (
//               <span
//                 key={time}
//                 className={`border-gray-500 border flex flex-col justify-center items-center rounded-md py-1 w-full cursor-pointer ${
//                   filters[activeTabIndex].departureTime.includes(time) ? 'bg-blue-200' : ''
//                 }`}
//                 onClick={() => handleTimeChange('departureTime', time)}
//               >
//                 {icon}
//                 <span className='text-xs'>{time}</span>
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Arrival Time */}
//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Arrival Time at {arrivalCity}</h3>
//           <div className='grid grid-cols-4 place-items-center gap-2 '>
//             {[
//               { icon: <PiMountains />, time: "00-06" },
//               { icon: <IoIosSunny />, time: "06-12" },
//               { icon: <TbSunset2 />, time: "12-18" },
//               { icon: <IoIosMoon />, time: "18-00" }
//             ].map(({ icon, time }) => (
//               <span
//                 key={time}
//                 className={`border-gray-500 border flex flex-col justify-center items-center rounded-md py-1 w-full cursor-pointer ${
//                   filters[activeTabIndex].arrivalTime.includes(time) ? 'bg-blue-200' : ''
//                 }`}
//                 onClick={() => handleTimeChange('arrivalTime', time)}
//               >
//                 {icon}
//                 <span className='text-xs'>{time}</span>
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Airlines */}
//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Airlines</h3>
//           <div className="flex flex-col">
//             {Object.entries(flightCountMap).map(([airline, count]) => (
//               <span key={airline} className='flex justify-between items-center w-full'>
//                 <label htmlFor={`airline-${airline}`} className="mb-1">
//                   {airline} <span className='text-gray-400'>({count})</span>
//                 </label>
//                 <input
//                   type="checkbox"
//                   id={`airline-${airline}`}
//                   checked={filters[activeTabIndex].airlines.includes(airline)}
//                   onChange={() => handleAirlineChange(airline)}
//                   className="mr-2"
//                 />
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBar;

// import React, { useState, useEffect, useMemo } from 'react';
// import { IoIosMoon, IoIosSunny } from 'react-icons/io';
// import { PiMountains } from 'react-icons/pi';
// import { TbSunset2 } from 'react-icons/tb';

// const SideBar = ({ flights, filters, setFilters, activeTabIndex, passenger }) => {
//   const [stops] = useState(["0", "1", "2", "3+"]);

//   const getStopsCount = (flight) => {
//     return flight.sI.length - 1;
//   };

//   const calculateTotalPrice = (flight) => {
//     let total = 0;
//     const priceList = flight.totalPriceList[0].fd;
//     for (const passengerType in passenger) {
//       if (priceList[passengerType]) {
//         total += priceList[passengerType].fC.TF * passenger[passengerType];
//       }
//     }
//     return total;
//   };

//   // Calculate airline counts and stops for the active tab
//   const flightCountMap = useMemo(() => {
//     if (!flights[activeTabIndex]) return {};
//     return flights[activeTabIndex].reduce((acc, flight) => {
//       const key = flight.sI[0].fD.aI.name;
//       if (!acc[key]) {
//         acc[key] = { count: 0, stops: {} };
//       }
//       acc[key].count++;
      
//       const stopCount = getStopsCount(flight);
//       const stopKey = stopCount >= 3 ? "3+" : stopCount.toString();
//       acc[key].stops[stopKey] = (acc[key].stops[stopKey] || 0) + 1;
      
//       return acc;
//     }, {});
//   }, [flights, activeTabIndex]);

//   useEffect(() => {
//     if (flights[activeTabIndex] && flights[activeTabIndex].length > 0) {
//       const maxPrice = Math.max(...flights[activeTabIndex].map(calculateTotalPrice));
//       setFilters(prev => {
//         const newFilters = [...prev];
//         newFilters[activeTabIndex] = {
//           ...newFilters[activeTabIndex],
//           maxPrice: maxPrice
//         };
//         return newFilters;
//       });
//     }
//   }, [flights, activeTabIndex, passenger, setFilters]);

//   console.log()

//   const handlePriceChange = (e) => {
//     setFilters(prev => {
//       const newFilters = [...prev];
//       newFilters[activeTabIndex] = {
//         ...newFilters[activeTabIndex],
//         maxPrice: parseInt(e.target.value)
//       };
//       return newFilters;
//     });
//   };


//   // const handlePriceChange = (e) => {
//   //   const newFilters = [...filters];
//   //   newFilters[activeTabIndex] = {
//   //     ...newFilters[activeTabIndex],
//   //     maxPrice: parseInt(e.target.value)
//   //   };
//   //   setFilters(newFilters);
//   // };

//   const handleStopsChange = (stop) => {
//     const newFilters = [...filters];
//     newFilters[activeTabIndex] = {
//       ...newFilters[activeTabIndex],
//       stops: newFilters[activeTabIndex].stops.includes(stop)
//         ? newFilters[activeTabIndex].stops.filter(s => s !== stop)
//         : [...newFilters[activeTabIndex].stops, stop]
//     };
//     setFilters(newFilters);
//   };

//   const handleTimeChange = (type, time) => {
//     const newFilters = [...filters];
//     newFilters[activeTabIndex] = {
//       ...newFilters[activeTabIndex],
//       [type]: newFilters[activeTabIndex][type].includes(time)
//         ? newFilters[activeTabIndex][type].filter(t => t !== time)
//         : [...newFilters[activeTabIndex][type], time]
//     };
//     setFilters(newFilters);
//   };

//   const handleAirlineChange = (airline) => {
//     const newFilters = [...filters];
//     newFilters[activeTabIndex] = {
//       ...newFilters[activeTabIndex],
//       airlines: newFilters[activeTabIndex].airlines.includes(airline)
//         ? newFilters[activeTabIndex].airlines.filter(a => a !== airline)
//         : [...newFilters[activeTabIndex].airlines, airline]
//     };
//     setFilters(newFilters);
//   };

//   const departureCity = flights[activeTabIndex] && flights[activeTabIndex][0]?.sI[0]?.da?.city;
//   const arrivalCity = flights[activeTabIndex] && flights[activeTabIndex][0]?.sI[flights[activeTabIndex][0]?.sI.length - 1]?.aa?.city;

//   if (!filters[activeTabIndex]) {
//     return <div>Loading...</div>;
//   }

//   console.log(filters[activeTabIndex].maxPrice,"hoeooo")

//   return (
//     <div className="flex flex-row md:w-1/4 border p-4 m-2 shadow-md rounded-md min-h-screen">
//       <div className="grid gap-2 w-full grid-cols-1">
//         {/* Price slider */}
//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Price</h3>
//           <div className="flex justify-between gap-2">
//             <span>₹100</span>
//             <input
//               type="range"
//               min={100}
//               max={filters[activeTabIndex].maxPrice }
//               value={filters[activeTabIndex].maxPrice }
//               onChange={handlePriceChange}
//               className="flex-1 mr-4 range-slider"
//             />
//             <span>₹{filters[activeTabIndex].maxPrice }</span>
//           </div>
//         </div>
//         <div>
//           <input type="range" name="" id="" />
//           <input type="range" max={filters[activeTabIndex].maxPrice } min={100} value={filters[activeTabIndex].maxPrice} name="" id="" />
//         </div>
        
//         {/* Stops */}
//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Stops</h3>
//           <div className="grid w-full grid-cols-4 ">
//             {stops.map((stop, index) => {
//               const stopCount = Object.values(flightCountMap).reduce((acc, airline) => acc + (airline.stops[stop] || 0), 0);
//               return (
//                 <label
//                   key={stop}
//                   htmlFor={`stop-${stop}`}
//                   className={`mb-1 border flex flex-col justify-center items-center py-2 ${index === 0 ? 'rounded-l-md' : ''} ${index === stops.length - 1 ? 'rounded-r-md' : ''} ${
//                     filters[activeTabIndex].stops.includes(stop) ? 'bg-blue-200' : ''
//                   }`}
//                 >
//                   <input
//                     type="checkbox"
//                     id={`stop-${stop}`}
//                     checked={filters[activeTabIndex].stops.includes(stop)}
//                     onChange={() => handleStopsChange(stop)}
//                     className="mr-2 hidden"
//                   />
//                   {stop}
//                   <span className="text-xs text-gray-500">({stopCount})</span>
//                 </label>
//               );
//             })}
//           </div>
//         </div>

//         {/* Departure Time */}
//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Departure Time from {departureCity}</h3>
//           <div className='grid grid-cols-4 place-items-center gap-2 '>
//             {[
//               { icon: <PiMountains />, time: "00-06" },
//               { icon: <IoIosSunny />, time: "06-12" },
//               { icon: <TbSunset2 />, time: "12-18" },
//               { icon: <IoIosMoon />, time: "18-00" }
//             ].map(({ icon, time }) => (
//               <span
//                 key={time}
//                 className={`border-gray-500 border flex flex-col justify-center items-center rounded-md py-1 w-full cursor-pointer ${
//                   filters[activeTabIndex].departureTime.includes(time) ? 'bg-blue-200' : ''
//                 }`}
//                 onClick={() => handleTimeChange('departureTime', time)}
//               >
//                 {icon}
//                 <span className='text-xs'>{time}</span>
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Arrival Time */}
//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Arrival Time at {arrivalCity}</h3>
//           <div className='grid grid-cols-4 place-items-center gap-2 '>
//             {[
//               { icon: <PiMountains />, time: "00-06" },
//               { icon: <IoIosSunny />, time: "06-12" },
//               { icon: <TbSunset2 />, time: "12-18" },
//               { icon: <IoIosMoon />, time: "18-00" }
//             ].map(({ icon, time }) => (
//               <span
//                 key={time}
//                 className={`border-gray-500 border flex flex-col justify-center items-center rounded-md py-1 w-full cursor-pointer ${
//                   filters[activeTabIndex].arrivalTime.includes(time) ? 'bg-blue-200' : ''
//                 }`}
//                 onClick={() => handleTimeChange('arrivalTime', time)}
//               >
//                 {icon}
//                 <span className='text-xs'>{time}</span>
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Airlines */}
//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Airlines</h3>
//           <div className="flex flex-col">
//             {Object.entries(flightCountMap).map(([airline, { count }]) => (
//               <span key={airline} className='flex justify-between items-center w-full'>
//                 <label htmlFor={`airline-${airline}`} className="mb-1">
//                   {airline} <span className='text-gray-400'>({count})</span>
//                 </label>
//                 <input
//                   type="checkbox"
//                   id={`airline-${airline}`}
//                   checked={filters[activeTabIndex].airlines.includes(airline)}
//                   onChange={() => handleAirlineChange(airline)}
//                   className="mr-2"
//                 />
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBar;

import React, { useState, useEffect, useMemo } from 'react';
import { IoIosMoon, IoIosSunny } from 'react-icons/io';
import { PiMountains } from 'react-icons/pi';
import { TbSunset2 } from 'react-icons/tb';

const SideBar = ({ flights, filters, setFilters, activeTabIndex, passenger }) => {
  const [stops] = useState(["0", "1", "2", "3+"]);
  const [absoluteMaxPrice, setAbsoluteMaxPrice] = useState(100000); // Initialize with a high value

  const getStopsCount = (flight) => {
    return flight.sI.length - 1;
  };

  const calculateTotalPrice = (flight) => {
    let total = 0;
    const priceList = flight.totalPriceList[0].fd;
    for (const passengerType in passenger) {
      if (priceList[passengerType]) {
        total += priceList[passengerType].fC.TF * passenger[passengerType];
      }
    }
    return total;
  };

  // Calculate airline counts and stops for the active tab
  const flightCountMap = useMemo(() => {
    if (!flights[activeTabIndex]) return {};
    return flights[activeTabIndex].reduce((acc, flight) => {
      const key = flight.sI[0].fD.aI.name;
      if (!acc[key]) {
        acc[key] = { count: 0, stops: {} };
      }
      acc[key].count++;
      
      const stopCount = getStopsCount(flight);
      const stopKey = stopCount >= 3 ? "3+" : stopCount.toString();
      acc[key].stops[stopKey] = (acc[key].stops[stopKey] || 0) + 1;
      
      return acc;
    }, {});
  }, [flights, activeTabIndex]);

  useEffect(() => {
    if (flights[activeTabIndex] && flights[activeTabIndex].length > 0) {
      const maxPrice = Math.max(...flights[activeTabIndex].map(calculateTotalPrice));
      setAbsoluteMaxPrice(maxPrice);
      setFilters(prev => {
        const newFilters = [...prev];
        newFilters[activeTabIndex] = {
          ...newFilters[activeTabIndex],
          maxPrice: maxPrice
        };
        return newFilters;
      });
    }
  }, [flights, activeTabIndex, passenger, setFilters]);

  const handlePriceChange = (e) => {
    setFilters(prev => {
      const newFilters = [...prev];
      newFilters[activeTabIndex] = {
        ...newFilters[activeTabIndex],
        maxPrice: parseInt(e.target.value)
      };
      return newFilters;
    });
  };

  const handleStopsChange = (stop) => {
    const newFilters = [...filters];
    newFilters[activeTabIndex] = {
      ...newFilters[activeTabIndex],
      stops: newFilters[activeTabIndex].stops.includes(stop)
        ? newFilters[activeTabIndex].stops.filter(s => s !== stop)
        : [...newFilters[activeTabIndex].stops, stop]
    };
    setFilters(newFilters);
  };

  const handleTimeChange = (type, time) => {
    const newFilters = [...filters];
    newFilters[activeTabIndex] = {
      ...newFilters[activeTabIndex],
      [type]: newFilters[activeTabIndex][type].includes(time)
        ? newFilters[activeTabIndex][type].filter(t => t !== time)
        : [...newFilters[activeTabIndex][type], time]
    };
    setFilters(newFilters);
  };

  const handleAirlineChange = (airline) => {
    const newFilters = [...filters];
    newFilters[activeTabIndex] = {
      ...newFilters[activeTabIndex],
      airlines: newFilters[activeTabIndex].airlines.includes(airline)
        ? newFilters[activeTabIndex].airlines.filter(a => a !== airline)
        : [...newFilters[activeTabIndex].airlines, airline]
    };
    setFilters(newFilters);
  };

  const departureCity = flights[activeTabIndex] && flights[activeTabIndex][0]?.sI[0]?.da?.city;
  const arrivalCity = flights[activeTabIndex] && flights[activeTabIndex][0]?.sI[flights[activeTabIndex][0]?.sI.length - 1]?.aa?.city;

  if (!filters[activeTabIndex]) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row text-xs md:text-base w-[80%] border p-4 m-2 shadow-md rounded-md min-h-screen">
      <div className="grid gap-2 w-full grid-cols-1">
        {/* Price slider */}
        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-sm font-semibold mb-2">Price</h3>
          <div className="flex justify-between gap-2">
            <span className='text-xs'>₹100</span>
            <input
              type="range"
              min={100}
              max={absoluteMaxPrice}
              value={filters[activeTabIndex].maxPrice}
              onChange={handlePriceChange}
               id='priceRange'
              className="flex-1 price-range-slider range-slider"
            />
            <span className='text-xs'>₹{filters[activeTabIndex].maxPrice}</span>
          </div>
        </div>
        
        {/* Stops */}
        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-sm font-semibold mb-2">Stops</h3>
          <div className="grid grid-flow-row w-full  grid-cols-4 md:grid-cols-2 lg:grid-cols-4 ">
            {stops.map((stop, index) => {
              const stopCount = Object.values(flightCountMap).reduce((acc, airline) => acc + (airline.stops[stop] || 0), 0);
              return (
                <label
                  key={stop}
                  htmlFor={`stop-${stop}`}
                  className={`mb-1 border flex hover:bg-blue-100 flex-col text-xs justify-center items-center py-2 ${index === 0 ? 'rounded-l-md' : ''} ${index === stops.length - 1 ? 'rounded-r-md' : ''} ${
                    filters[activeTabIndex].stops.includes(stop) ? 'bg-blue-200' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`stop-${stop}`}
                    checked={filters[activeTabIndex].stops.includes(stop)}
                    onChange={() => handleStopsChange(stop)}
                    className="mr-2 hidden"
                  />
                  {stop}
                  <span className="text-xs text-gray-500">({stopCount})</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Departure Time */}
        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-sm font-semibold mb-2">Departure Time from {departureCity}</h3>
          <div className='grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-2 '>
            {[
              { icon: <PiMountains />, time: "00-06" },
              { icon: <IoIosSunny />, time: "06-12" },
              { icon: <TbSunset2 />, time: "12-18" },
              { icon: <IoIosMoon />, time: "18-00" }
            ].map(({ icon, time }) => (
              <span
                key={time}
                className={`border-gray-500 border hover:bg-blue-100 flex text-xs flex-col justify-center items-center rounded-md py-1 w-full cursor-pointer ${
                  filters[activeTabIndex].departureTime.includes(time) ? 'bg-blue-200' : ''
                }`}
                onClick={() => handleTimeChange('departureTime', time)}
              >
                {icon}
                <span className='text-xs'>{time}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Arrival Time */}
        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-sm font-semibold mb-2">Arrival Time at {arrivalCity}</h3>
          <div className='grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-2 '>
            {[
              { icon: <PiMountains />, time: "00-06" },
              { icon: <IoIosSunny />, time: "06-12" },
              { icon: <TbSunset2 />, time: "12-18" },
              { icon: <IoIosMoon />, time: "18-00" }
            ].map(({ icon, time }) => (
              <span
                key={time}
                className={`border-gray-500 border hover:bg-blue-100 text-xs flex flex-col justify-center items-center rounded-md py-1 w-full cursor-pointer ${
                  filters[activeTabIndex].arrivalTime.includes(time) ? 'bg-blue-200' : ''
                }`}
                onClick={() => handleTimeChange('arrivalTime', time)}
              >
                {icon}
                <span className='text-xs'>{time}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Airlines */}
        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-sm font-semibold mb-2">Airlines</h3>
          <div className="flex flex-col">
            {Object.entries(flightCountMap).map(([airline, { count }]) => (
              <span key={airline} className='flex justify-between items-center w-full'>
                <label htmlFor={`airline-${airline}`} className="mb-1 text-xs">
                  {airline} <span className='text-gray-400'>({count})</span>
                </label>
                <input
                  type="checkbox"
                  id={`airline-${airline}`}
                  checked={filters[activeTabIndex].airlines.includes(airline)}
                  onChange={() => handleAirlineChange(airline)}
                  className="mr-2"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;