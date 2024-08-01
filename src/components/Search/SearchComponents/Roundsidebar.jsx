// import React, { useEffect, useState } from 'react';
// import { IoIosMoon, IoIosSunny } from 'react-icons/io';
// import { PiMountains } from 'react-icons/pi';
// import { TbSunset2 } from 'react-icons/tb';

// const RoundSideBar = ({ filters, setFilters, onwardData, returnData, activeDirection, setActiveDirection,passenger }) => {
//   const [stops] = useState(["0", "1", "2", "3+"]);
//   const [maxPrices, setMaxPrices] = useState({ onward: 0, return: 0 });

//   useEffect(() => {
//     const calculateMaxPrices = () => {
//       const onwardMax = Math.max(...onwardData.flatMap(flight => 
//         flight.totalPriceList.map(price => price.fd.ADULT.fC.TF)
//       ));
//       const returnMax = Math.max(...returnData.flatMap(flight => 
//         flight.totalPriceList.map(price => price.fd.ADULT.fC.TF)
//       ));
//       setMaxPrices({ onward: onwardMax, return: returnMax });
  
//       setFilters(prev => ({
//         ...prev,
//         onward: { ...prev.onward, maxPrice: onwardMax },
//         return: { ...prev.return, maxPrice: returnMax },
//       }));
//     };
  
//     calculateMaxPrices();
//   }, [onwardData, returnData, setFilters]);

//   const flightCountMap = (data) => data.reduce((acc, flight) => {
//     const airline = flight.sI[0]?.fD?.aI?.name;
//     if (airline) {
//       acc[airline] = (acc[airline] || 0) + 1;
//     }
//     return acc;
//   }, {});

//   const handlePriceChange = (e) => {
//     setFilters(prev => ({
//       ...prev,
//       [activeDirection]: {
//         ...prev[activeDirection],
//         maxPrice: parseInt(e.target.value)
//       }
//     }));
//   };

//   const handleStopsChange = (stop) => {
//     setFilters(prev => ({
//       ...prev,
//       [activeDirection]: {
//         ...prev[activeDirection],
//         stops: prev[activeDirection].stops.includes(stop)
//           ? prev[activeDirection].stops.filter(s => s !== stop)
//           : [...prev[activeDirection].stops, stop]
//       }
//     }));
//   };

//   const handleTimeChange = (type, time) => {
//     setFilters(prev => ({
//       ...prev,
//       [activeDirection]: {
//         ...prev[activeDirection],
//         [type]: prev[activeDirection][type].includes(time)
//           ? prev[activeDirection][type].filter(t => t !== time)
//           : [...prev[activeDirection][type], time]
//       }
//     }));
//   };

//   const handleAirlineChange = (airline) => {
//     setFilters(prev => ({
//       ...prev,
//       [activeDirection]: {
//         ...prev[activeDirection],
//         airlines: prev[activeDirection].airlines.includes(airline)
//           ? prev[activeDirection].airlines.filter(a => a !== airline)
//           : [...prev[activeDirection].airlines, airline]
//       }
//     }));
//   };

//   const handleSpecialReturnChange = () => {
//     setFilters(prev => ({
//       ...prev,
//       specialReturn: !prev.specialReturn
//     }));
//   };

//   const renderStopsSection = () => (
//     <div className="mb-6 border-b border-gray-300 pb-4">
//       <h3 className="text-lg font-semibold mb-2">Stops</h3>
//       <div className="grid w-full grid-cols-2 md:grid-cols-4">
//         {stops.map((stop, index) => (
//           <label
//             key={stop}
//             htmlFor={`stop-${stop}`}
//             className={`mb-1 border flex justify-center py-2 ${index === 0 ? 'rounded-l-md' : ''} ${index === stops.length - 1 ? 'rounded-r-md' : ''} ${
//               filters[activeDirection].stops.includes(stop) ? 'bg-blue-200' : ''
//             }`}
//           >
//             <input
//               type="checkbox"
//               id={`stop-${stop}`}
//               checked={filters[activeDirection].stops.includes(stop)}
//               onChange={() => handleStopsChange(stop)}
//               className="mr-2 hidden"
//             />
//             {stop}
//           </label>
//         ))}
//       </div>
//     </div>
//   );

//   const renderTimeSection = (type, title) => (
//     <div className="mb-6 border-b border-gray-300 pb-4">
//       <h3 className="text-lg font-semibold mb-2">{title}</h3>
//       <div className="grid grid-cols-2 md:grid-cols-4 place-items-center gap-2">
//         {[
//           { icon: <PiMountains />, time: "00-06" },
//           { icon: <IoIosSunny />, time: "06-12" },
//           { icon: <TbSunset2 />, time: "12-18" },
//           { icon: <IoIosMoon />, time: "18-00" }
//         ].map(({ icon, time }) => (
//           <span
//             key={time}
//             className={`border-gray-500 border flex flex-col justify-center items-center rounded-md py-1 w-full cursor-pointer ${
//               filters[activeDirection][type].includes(time) ? 'bg-blue-200' : ''
//             }`}
//             onClick={() => handleTimeChange(type, time)}
//           >
//             {icon}
//             <span className="text-xs">{time}</span>
//           </span>
//         ))}
//       </div>
//     </div>
//   );

//   const renderAirlinesSection = () => {
//     const airlineCounts = flightCountMap(activeDirection === 'onward' ? onwardData : returnData);
//     return (
//       <div className="mb-6 border-b border-gray-300 pb-4">
//         <h3 className="text-lg font-semibold mb-2">Airlines</h3>
//         <div className="flex flex-col">
//           {Object.entries(airlineCounts).map(([airline, count]) => (
//             <span key={airline} className="flex justify-between items-center w-full">
//               <label htmlFor={`airline-${airline}`} className="mb-1">
//                 {airline} <span className="text-gray-400">({count})</span>
//               </label>
//               <input
//                 type="checkbox"
//                 id={`airline-${airline}`}
//                 checked={filters[activeDirection].airlines.includes(airline)}
//                 onChange={() => handleAirlineChange(airline)}
//                 className="mr-2"
//               />
//             </span>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderPriceSection = () => (
//     <div className="mb-6 border-b border-gray-300 pb-4">
//       <h3 className="text-lg font-semibold mb-2">Price</h3>
//       <div className="flex justify-between gap-2">
//         <span>₹100</span>
//         <input
//           type="range"
//           min="100"
//           max={maxPrices[activeDirection]}
//           value={filters[activeDirection].maxPrice}
//           onChange={handlePriceChange}
//           className="flex-1 mr-4 range-slider"
//         />
//         <span>₹{filters[activeDirection].maxPrice}</span>
//       </div>
//     </div>
//   );

//   const renderSpecialReturnSection = () => (
//     <div className="mb-6 border-b border-gray-300 pb-4">
//       <h3 className="text-lg font-semibold mb-2">Special Return</h3>
//       <label className="flex items-center">
//         <input
//           type="checkbox"
//           checked={filters.specialReturn}
//           onChange={handleSpecialReturnChange}
//           className="mr-2"
//         />
//         Special Return Flights
//       </label>
//     </div>
//   );

//   return (
//     <div className="flex flex-row  md:w-1/4 border p-4 m-2 shadow-md rounded-md min-h-screen">
//       <div className="p-4 grid  gap-2 grid-cols-1 w-full md:grid-cols-1 ">
//         <div className='flex flex-col'>
//           <div className="mb-6 border-b border-gray-300 pb-4">
//             <div className="flex flex-col md:flex-row justify-center items-center mb-4">
//               <button
//                 className={`px-4 py-2 ${activeDirection === "onward" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//                 onClick={() => setActiveDirection("onward")}
//               >
//                 {onwardData[0]?.sI[0]?.da?.code} - {onwardData[0]?.sI[0]?.aa?.code}
//               </button>
//               <button
//                 className={`px-4 py-2 ${activeDirection === "return" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//                 onClick={() => setActiveDirection("return")}
//               >
//                 {returnData[0]?.sI[0]?.da?.code} - {returnData[0]?.sI[0]?.aa?.code}
//               </button>
//             </div>
//           </div>
//           {renderPriceSection()}
//         </div>


//         {renderStopsSection()}
//         {renderTimeSection('departureTime', 'Departure Time')}
//         {renderTimeSection('arrivalTime', 'Arrival Time')}
//         {renderAirlinesSection()}
//         {renderSpecialReturnSection()}
//       </div>
//     </div>
//   );
// };

// export default RoundSideBar;


import React, { useEffect, useState } from 'react';
import { IoIosMoon, IoIosSunny } from 'react-icons/io';
import { PiMountains } from 'react-icons/pi';
import { TbSunset2 } from 'react-icons/tb';

const RoundSideBar = ({ filters, setFilters, onwardData, returnData, activeDirection, setActiveDirection, passenger }) => {
  const [stops] = useState(["0", "1", "2", "3+"]);
  const [maxPrices, setMaxPrices] = useState({ onward: 0, return: 0 });

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

  useEffect(() => {
    const calculateMaxPrices = () => {
      const onwardMax = Math.max(...onwardData.map(calculateTotalPrice));
      const returnMax = Math.max(...returnData.map(calculateTotalPrice));
      setMaxPrices({ onward: onwardMax, return: returnMax });
  
      setFilters(prev => ({
        ...prev,
        onward: { ...prev.onward, maxPrice: onwardMax },
        return: { ...prev.return, maxPrice: returnMax },
      }));
    };
  
    calculateMaxPrices();
  }, [onwardData, returnData, setFilters, passenger]);

  const flightCountMap = (data) => data.reduce((acc, flight) => {
    const airline = flight.sI[0]?.fD?.aI?.name;
    if (airline) {
      acc[airline] = (acc[airline] || 0) + 1;
    }
    return acc;
  }, {});

  const handlePriceChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [activeDirection]: {
        ...prev[activeDirection],
        maxPrice: parseInt(e.target.value)
      }
    }));
  };

  const handleStopsChange = (stop) => {
    setFilters(prev => ({
      ...prev,
      [activeDirection]: {
        ...prev[activeDirection],
        stops: prev[activeDirection].stops.includes(stop)
          ? prev[activeDirection].stops.filter(s => s !== stop)
          : [...prev[activeDirection].stops, stop]
      }
    }));
  };

  const handleTimeChange = (type, time) => {
    setFilters(prev => ({
      ...prev,
      [activeDirection]: {
        ...prev[activeDirection],
        [type]: prev[activeDirection][type].includes(time)
          ? prev[activeDirection][type].filter(t => t !== time)
          : [...prev[activeDirection][type], time]
      }
    }));
  };

  const handleAirlineChange = (airline) => {
    setFilters(prev => ({
      ...prev,
      [activeDirection]: {
        ...prev[activeDirection],
        airlines: prev[activeDirection].airlines.includes(airline)
          ? prev[activeDirection].airlines.filter(a => a !== airline)
          : [...prev[activeDirection].airlines, airline]
      }
    }));
  };

  const handleSpecialReturnChange = () => {
    setFilters(prev => ({
      ...prev,
      specialReturn: !prev.specialReturn
    }));
  };

  const renderStopsSection = () => (
    <div className="mb-6 border-b border-gray-300 pb-4">
      <h3 className="text-lg font-semibold mb-2">Stops</h3>
      <div className="grid w-full grid-cols-2 md:grid-cols-4">
        {stops.map((stop, index) => (
          <label
            key={stop}
            htmlFor={`stop-${stop}`}
            className={`mb-1 border flex justify-center py-2 ${index === 0 ? 'rounded-l-md' : ''} ${index === stops.length - 1 ? 'rounded-r-md' : ''} ${
              filters[activeDirection].stops.includes(stop) ? 'bg-blue-200' : ''
            }`}
          >
            <input
              type="checkbox"
              id={`stop-${stop}`}
              checked={filters[activeDirection].stops.includes(stop)}
              onChange={() => handleStopsChange(stop)}
              className="mr-2 hidden"
            />
            {stop}
          </label>
        ))}
      </div>
    </div>
  );

  const renderTimeSection = (type, title) => (
    <div className="mb-6 border-b border-gray-300 pb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 place-items-center gap-2">
        {[
          { icon: <PiMountains />, time: "00-06" },
          { icon: <IoIosSunny />, time: "06-12" },
          { icon: <TbSunset2 />, time: "12-18" },
          { icon: <IoIosMoon />, time: "18-00" }
        ].map(({ icon, time }) => (
          <span
            key={time}
            className={`border-gray-500 border flex flex-col justify-center items-center rounded-md py-1 w-full cursor-pointer ${
              filters[activeDirection][type].includes(time) ? 'bg-blue-200' : ''
            }`}
            onClick={() => handleTimeChange(type, time)}
          >
            {icon}
            <span className="text-xs">{time}</span>
          </span>
        ))}
      </div>
    </div>
  );

  const renderAirlinesSection = () => {
    const airlineCounts = flightCountMap(activeDirection === 'onward' ? onwardData : returnData);
    return (
      <div className="mb-6 border-b border-gray-300 pb-4">
        <h3 className="text-lg font-semibold mb-2">Airlines</h3>
        <div className="flex flex-col">
          {Object.entries(airlineCounts).map(([airline, count]) => (
            <span key={airline} className="flex justify-between items-center w-full">
              <label htmlFor={`airline-${airline}`} className="mb-1">
                {airline} <span className="text-gray-400">({count})</span>
              </label>
              <input
                type="checkbox"
                id={`airline-${airline}`}
                checked={filters[activeDirection].airlines.includes(airline)}
                onChange={() => handleAirlineChange(airline)}
                className="mr-2"
              />
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderPriceSection = () => (
    <div className="mb-6 border-b border-gray-300 pb-4">
      <h3 className="text-lg font-semibold mb-2">Price</h3>
      <div className="flex justify-between gap-2">
        <span>₹100</span>
        <input
          type="range"
          min="100"
          max={maxPrices[activeDirection]}
          value={filters[activeDirection].maxPrice}
          onChange={handlePriceChange}
          className="flex-1 mr-4 range-slider"
        />
        <span>₹{filters[activeDirection].maxPrice}</span>
      </div>
    </div>
  );

  const renderSpecialReturnSection = () => (
    <div className="mb-6 border-b border-gray-300 pb-4">
      <h3 className="text-lg font-semibold mb-2">Special Return</h3>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={filters.specialReturn}
          onChange={handleSpecialReturnChange}
          className="mr-2"
        />
        Special Return Flights
      </label>
    </div>
  );

  return (
    <div className="flex flex-row md:w-1/4 border  m-2 shadow-md rounded-md min-h-screen">
      <div className="p-4 grid gap-2 grid-cols-1 w-full md:grid-cols-1">
        <div className='flex flex-col'>
          <div className="mb-6 border-b border-gray-300 pb-4">
            <div className="flex flex-col md:flex-row justify-center items-center mb-4">
              <button
                className={`px-4 py-2 ${activeDirection === "onward" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setActiveDirection("onward")}
              >
                {onwardData[0]?.sI[0]?.da?.code} - {onwardData[0]?.sI[0]?.aa?.code}
              </button>
              <button
                className={`px-4 py-2 ${activeDirection === "return" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setActiveDirection("return")}
              >
                {returnData[0]?.sI[0]?.da?.code} - {returnData[0]?.sI[0]?.aa?.code}
              </button>
            </div>
          </div>
          {renderPriceSection()}
        </div>

        {renderStopsSection()}
        {renderTimeSection('departureTime', 'Departure Time')}
        {renderTimeSection('arrivalTime', 'Arrival Time')}
        {renderAirlinesSection()}
        {renderSpecialReturnSection()}
      </div>
    </div>
  );
};

export default RoundSideBar;