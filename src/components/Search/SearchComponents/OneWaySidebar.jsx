// import React, { useState, useEffect, useMemo } from 'react';
// import { IoIosMoon, IoIosSunny } from 'react-icons/io';
// import { PiMountains } from 'react-icons/pi';
// import { TbSunset2 } from 'react-icons/tb';

// const OneWaySideBar = ({ flights, filters, setFilters, passenger, calculateTotalPrice }) => {
//   const [stops] = useState(["0", "1", "2", "3+"]);
//   const [maxPrice, setMaxPrice] = useState(100000);

//   const flightCountMap = useMemo(() => {
//     return flights.reduce((acc, flight) => {
//       const key = flight.sI[0].fD.aI.name;
//       if (!acc[key]) {
//         acc[key] = 0;
//       }
//       acc[key]++;
//       return acc;
//     }, {});
//   }, [flights]);

//   useEffect(() => {
//     const highestPrice = Math.max(...flights.map(calculateTotalPrice));
//     setMaxPrice(highestPrice);
//     setFilters(prev => ({ ...prev, maxPrice: highestPrice }));
//   }, [flights, calculateTotalPrice, setFilters]);

//   const handlePriceChange = (e) => {
//     const newMaxPrice = parseInt(e.target.value);
//     console.log("Price changed to:", newMaxPrice);
//     setFilters(prev => ({ ...prev, maxPrice: newMaxPrice }));
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
//     <div className="md:w-1/4 border p-4 m-2 shadow-md rounded-md md:min-h-screen">
//       <div className="p-4">
//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Price</h3>
//           <div className="flex justify-between gap-2">
//             <span>₹100</span>
//             <input
//               type="range"
//               min="100"
//               max={maxPrice}
//               value={filters.maxPrice}
//               onChange={handlePriceChange}
//               className="flex-1 mr-4 range-slider"
//             />
//             <span>₹{filters.maxPrice}</span>
//           </div>
//         </div>

//         <div className="mb-6 border-b border-gray-300 pb-4">
//           <h3 className="text-lg font-semibold mb-2">Stops</h3>
//           <div className="grid w-full grid-cols-4 ">
//             {stops.map((stop, index) => (
//               <label
//                 key={stop}
//                 htmlFor={`stop-${stop}`}
//                 className={`mb-1 border flex justify-center py-2 ${index === 0 ? 'rounded-l-md' : ''} ${index === stops.length - 1 ? 'rounded-r-md' : ''} ${
//                   filters.stops.includes(stop) ? 'bg-blue-200' : ''
//                 }`}
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

// export default OneWaySideBar;

import React, { useState, useEffect, useMemo } from "react";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { PiMountains } from "react-icons/pi";
import { TbSunset2 } from "react-icons/tb";

const OneWaySideBar = ({
  flights,
  filters,
  setFilters,
  passenger,
  calculateTotalPrice,
}) => {
  const [stops] = useState(["0", "1", "2", "3+"]);
  const [maxPrice, setMaxPrice] = useState(100000);

  const flightCountMap = useMemo(() => {
    return flights.reduce((acc, flight) => {
      const key = flight.sI[0].fD.aI.name;
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key]++;
      return acc;
    }, {});
  }, [flights]);

  const stopsCountMap = useMemo(() => {
    return flights.reduce((acc, flight) => {
      const stopCount = flight.sI.length - 1;
      const key = stopCount >= 3 ? "3+" : stopCount.toString();
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key]++;
      return acc;
    }, {});
  }, [flights]);

  useEffect(() => {
    const highestPrice = Math.max(...flights.map(calculateTotalPrice));
    setMaxPrice(highestPrice);
    setFilters((prev) => ({ ...prev, maxPrice: highestPrice }));
  }, [flights, calculateTotalPrice, setFilters]);

  const handlePriceChange = (e) => {
    const newMaxPrice = parseInt(e.target.value);
    // console.log("Price changed to:", newMaxPrice);
    setFilters((prev) => ({ ...prev, maxPrice: newMaxPrice }));
  };

  const handleStopsChange = (stop) => {
    setFilters((prev) => ({
      ...prev,
      stops: prev.stops.includes(stop)
        ? prev.stops.filter((s) => s !== stop)
        : [...prev.stops, stop],
    }));
  };

  const handleTimeChange = (type, time) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(time)
        ? prev[type].filter((t) => t !== time)
        : [...prev[type], time],
    }));
  };

  const handleAirlineChange = (airline) => {
    setFilters((prev) => ({
      ...prev,
      airlines: prev.airlines.includes(airline)
        ? prev.airlines.filter((a) => a !== airline)
        : [...prev.airlines, airline],
    }));
  };

  const Tooltip = ({ value }) => (
    <div className="absolute transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs rounded-md px-2 py-1">
      ₹{value}
    </div>
  );

  return (
    <div className="w-[80%] text-xs md:text-base border p-4 m-2 shadow-md rounded-md md:min-h-screen">
      <div className="p-4">
        {/* Price filter */}
        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-sm font-semibold mb-2">Price</h3>
          <div className="flex justify-between gap-2">
            <span className="text-xs">₹100</span>
            <input
              type="range"
              min="100"
              max={maxPrice}
              value={filters.maxPrice}
              onChange={handlePriceChange}
              id="priceRange"
              className="flex-1 price-range-slider range-slider"
              title={`₹${filters.maxPrice}`}
            />
            <span className="text-xs">₹{filters.maxPrice}</span>
          </div>
        </div>

        {/* Stops filter */}
        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-sm font-semibold mb-2">Stops</h3>
          <div className="grid w-full grid-cols-2 md:grid-cols-2 lg:grid-cols-4 ">
            {/* {stops.map((stop, index) => (
              <label
                key={stop}
                htmlFor={`stop-${stop}`}
                className={`mb-1 border flex justify-center py-2 ${index === 0 ? 'rounded-l-md' : ''} ${index === stops.length - 1 ? 'rounded-r-md' : ''} ${
                  filters.stops.includes(stop) ? 'bg-blue-200' : ''
                }`}
              >
                <input
                  type="checkbox"
                  id={`stop-${stop}`}
                  checked={filters.stops.includes(stop)}
                  onChange={() => handleStopsChange(stop)}
                  className="mr-2 hidden"
                />
                {stop} ({stopsCountMap[stop] || 0})
              </label>
            ))} */}

            {["0", "1", "2", "3+"].map((stop, index) => (
              <label
                key={stop}
                htmlFor={`stop-${stop}`}
                className={`mb-1 border hover:bg-blue-100 flex text-xs flex-col items-center justify-center py-2 ${
                  index === 0 ? "rounded-l-md" : ""
                } ${index === 3 ? "rounded-r-md" : ""} ${
                  filters.stops.includes(stop) ? "bg-blue-200" : ""
                } ${
                  stopsCountMap[stop] === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <input
                  type="checkbox"
                  id={`stop-${stop}`}
                  checked={filters.stops.includes(stop)}
                  onChange={() =>
                    stopsCountMap[stop] > 0 && handleStopsChange(stop)
                  }
                  className="mr-2 hidden"
                  disabled={stopsCountMap[stop] === 0}
                />
                <span className="text-xs">{stop}</span>
                <span className="md:text-[10px] text-[8px] text-gray-500">
                  {stopsCountMap[stop] > 0 ? `(${stopsCountMap[stop]})` : "(0)"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Departure Time filter */}
        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-sm font-semibold mb-2">Departure Time</h3>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-2 ">
            {[
              { icon: <PiMountains />, time: "00-06" },
              { icon: <IoIosSunny />, time: "06-12" },
              { icon: <TbSunset2 />, time: "12-18" },
              { icon: <IoIosMoon />, time: "18-00" },
            ].map(({ icon, time }) => (
              <span
                key={time}
                className={`border-gray-500 hover:bg-blue-100 border text-xs flex flex-col justify-center items-center rounded-md py-1 w-full cursor-pointer ${
                  filters.departureTime.includes(time) ? "bg-blue-200" : ""
                }`}
                onClick={() => handleTimeChange("departureTime", time)}
              >
                {icon}
                <span className="text-xs">{time}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Arrival Time filter */}
        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-sm font-semibold mb-2">Arrival Time</h3>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-2 ">
            {[
              { icon: <PiMountains />, time: "00-06" },
              { icon: <IoIosSunny />, time: "06-12" },
              { icon: <TbSunset2 />, time: "12-18" },
              { icon: <IoIosMoon />, time: "18-00" },
            ].map(({ icon, time }) => (
              <span
                key={time}
                className={`border-gray-500 hover:bg-blue-100 text-xs border flex flex-col justify-center items-center rounded-md py-1 w-full cursor-pointer ${
                  filters.arrivalTime.includes(time) ? "bg-blue-200" : ""
                }`}
                onClick={() => handleTimeChange("arrivalTime", time)}
              >
                {icon}
                <span className="text-xs">{time}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Airlines filter */}
        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-sm font-semibold mb-2">Airlines</h3>
          <div className="flex flex-col">
            {Object.entries(flightCountMap).map(([airline, count]) => (
              <span
                key={airline}
                className="flex justify-between items-center w-full"
              >
                <label htmlFor={`airline-${airline}`} className="mb-1 text-xs">
                  {airline} <span className="text-gray-400">({count})</span>
                </label>
                <input
                  type="checkbox"
                  id={`airline-${airline}`}
                  checked={filters.airlines.includes(airline)}
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

export default OneWaySideBar;
