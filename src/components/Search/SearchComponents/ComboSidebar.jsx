import React, { useState, useEffect } from 'react';
import { IoIosMoon, IoIosSunny } from 'react-icons/io';
import { PiMountains } from 'react-icons/pi';
import { TbSunset2 } from 'react-icons/tb';

const ComboSideBar = ({ flights, filters, setFilters,maxPrice }) => {
  const [stops, setStops] = useState(["0", "1", "2", "3+"]);

  // Calculate airline counts
  const flightCountMap = flights.reduce((acc, flight) => {
    const key = flight.sI[0].fD.aI.name;
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key]++;
    return acc;
  }, {});

  const handlePriceChange = (e) => {
    setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }));
  };

  const handleStopsChange = (stop) => {
    setFilters(prev => ({
      ...prev,
      stops: prev.stops.includes(stop)
        ? prev.stops.filter(s => s !== stop)
        : [...prev.stops, stop]
    }));
  };

  const handleTimeChange = (type, time) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(time)
        ? prev[type].filter(t => t !== time)
        : [...prev[type], time]
    }));
  };

  const handleAirlineChange = (airline) => {
    setFilters(prev => ({
      ...prev,
      airlines: prev.airlines.includes(airline)
        ? prev.airlines.filter(a => a !== airline)
        : [...prev.airlines, airline]
    }));
  };

  return (
    <div className="flex-none md:w-1/4 border p-4 m-2 shadow-md rounded-md min-h-screen">
    <div className="p-4">
      <div className="mb-6 border-b border-gray-300 pb-4">
        <h3 className="text-lg font-semibold mb-2">Price</h3>
        <div className="flex justify-between gap-2">
          <span>₹100</span>
          <input
            type="range"
            min="100"
            max={maxPrice}
            value={filters?.maxPrice}
            onChange={handlePriceChange}
            className="flex-1 mr-4 range-slider"
          />
          <span>₹{filters?.maxPrice}</span>
        </div>
      </div>

        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-lg font-semibold mb-2">Stops</h3>
          <div className="grid w-full grid-cols-4 ">
            {stops.map((stop, index) => (
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
            {stop}
          </label>
            ))}
          </div>
        </div>

        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-lg font-semibold mb-2">Departure Time</h3>
          <div className='grid grid-cols-4 place-items-center gap-2 '>
            {[
              { icon: <PiMountains />, time: "00-06" },
              { icon: <IoIosSunny />, time: "06-12" },
              { icon: <TbSunset2 />, time: "12-18" },
              { icon: <IoIosMoon />, time: "18-00" }
            ].map(({ icon, time }) => (
              <span
                key={time}
                className={`border-gray-500 border flex flex-col justify-center items-center rounded-md py-1 w-full cursor-pointer ${
                  filters.departureTime.includes(time) ? 'bg-blue-200' : ''
                }`}
                onClick={() => handleTimeChange('departureTime', time)}
              >
                {icon}
                <span className='text-xs'>{time}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-lg font-semibold mb-2">Arrival Time</h3>
          <div className='grid grid-cols-4 place-items-center gap-2 '>
            {[
              { icon: <PiMountains />, time: "00-06" },
              { icon: <IoIosSunny />, time: "06-12" },
              { icon: <TbSunset2 />, time: "12-18" },
              { icon: <IoIosMoon />, time: "18-00" }
            ].map(({ icon, time }) => (
              <span
                key={time}
                className={`border-gray-500 border flex flex-col justify-center items-center rounded-md py-1 w-full cursor-pointer ${
                  filters.arrivalTime.includes(time) ? 'bg-blue-200' : ''
                }`}
                onClick={() => handleTimeChange('arrivalTime', time)}
              >
                {icon}
                <span className='text-xs'>{time}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-lg font-semibold mb-2">Airlines</h3>
          <div className="flex flex-col">
            {Object.entries(flightCountMap).map(([airline, count]) => (
              <span key={airline} className='flex justify-between items-center w-full'>
                <label htmlFor={`airline-${airline}`} className="mb-1">
                  {airline} <span className='text-gray-400'>({count})</span>
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

export default ComboSideBar;