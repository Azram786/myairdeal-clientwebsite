import React, { useState, useEffect, useMemo } from "react";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { PiMountains } from "react-icons/pi";
import { TbSunset2 } from "react-icons/tb";

const SideBar = ({
  flights,
  filters,
  setFilters,
  activeTabIndex,
  passenger,
}) => {
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
      const maxPrice = Math.max(
        ...flights[activeTabIndex].map(calculateTotalPrice)
      );
      setAbsoluteMaxPrice(maxPrice);
      setFilters((prev) => {
        const newFilters = [...prev];
        newFilters[activeTabIndex] = {
          ...newFilters[activeTabIndex],
          maxPrice: maxPrice,
        };
        return newFilters;
      });
    }
  }, [flights, activeTabIndex, passenger, setFilters]);

  const handlePriceChange = (e) => {
    setFilters((prev) => {
      const newFilters = [...prev];
      newFilters[activeTabIndex] = {
        ...newFilters[activeTabIndex],
        maxPrice: parseInt(e.target.value),
      };
      return newFilters;
    });
  };

  // const handleStopsChange = (stop) => {
  //   const newFilters = [...filters];
  //   newFilters[activeTabIndex] = {
  //     ...newFilters[activeTabIndex],
  //     stops: newFilters[activeTabIndex].stops.includes(stop)
  //       ? newFilters[activeTabIndex].stops.filter(s => s !== stop)
  //       : [...newFilters[activeTabIndex].stops, stop]
  //   };
  //   setFilters(newFilters);
  // };

  const handleStopsChange = (stop) => {
    const newFilters = [...filters];
    const currentStops = newFilters[activeTabIndex].stops;

    newFilters[activeTabIndex] = {
      ...newFilters[activeTabIndex],
      stops: currentStops.includes(stop)
        ? currentStops.filter((s) => s !== stop) // Remove stop if it is already selected
        : [stop], // Otherwise, set it as the only selected stop
    };

    setFilters(newFilters);
  };

  const handleTimeChange = (type, time) => {
    const newFilters = [...filters];
    const currentFilter = newFilters[activeTabIndex][type];

    newFilters[activeTabIndex] = {
      ...newFilters[activeTabIndex],
      [type]: currentFilter.includes(time)
        ? currentFilter.filter((t) => t !== time) // Remove time if it is already selected
        : [time], // Otherwise, set it as the only selected time
    };

    setFilters(newFilters);
  };

  const handleAirlineChange = (airline) => {
    const newFilters = [...filters];
    newFilters[activeTabIndex] = {
      ...newFilters[activeTabIndex],
      airlines: newFilters[activeTabIndex].airlines.includes(airline)
        ? newFilters[activeTabIndex].airlines.filter((a) => a !== airline)
        : [...newFilters[activeTabIndex].airlines, airline],
    };
    setFilters(newFilters);
  };

  const departureCity =
    flights[activeTabIndex] && flights[activeTabIndex][0]?.sI[0]?.da?.city;
  const arrivalCity =
    flights[activeTabIndex] &&
    flights[activeTabIndex][0]?.sI[flights[activeTabIndex][0]?.sI.length - 1]
      ?.aa?.city;

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
            <span className="text-xs">₹100</span>
            <input
              type="range"
              min={100}
              max={absoluteMaxPrice}
              value={filters[activeTabIndex].maxPrice}
              onChange={handlePriceChange}
              id="priceRange"
              className="flex-1 price-range-slider range-slider"
            />
            <span className="text-xs">₹{filters[activeTabIndex].maxPrice}</span>
          </div>
        </div>

        {/* Stops */}
        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-sm font-semibold mb-2">Stops</h3>
          <div className="grid grid-flow-row w-full  grid-cols-4 md:grid-cols-2 lg-custom:grid-cols-4 ">
            {stops.map((stop, index) => {
              const stopCount = Object.values(flightCountMap).reduce(
                (acc, airline) => acc + (airline.stops[stop] || 0),
                0
              );
              return (
                <label
                  key={stop}
                  htmlFor={`stop-${stop}`}
                  className={`cursor-pointer mb-1 border flex  flex-col text-xs justify-center items-center py-2 ${
                    index === 0 ? "rounded-l-md" : ""
                  } ${index === stops.length - 1 ? "rounded-r-md" : ""} ${
                    filters[activeTabIndex].stops.includes(stop)
                      ? "bg-[#D7B56D]"
                      : ""
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
          <h3 className="text-sm font-semibold mb-2">
            Departure Time from {departureCity}
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-2 ">
            {[
              { icon: <PiMountains />, time: "00-06" },
              { icon: <IoIosSunny />, time: "06-12" },
              { icon: <TbSunset2 />, time: "12-18" },
              { icon: <IoIosMoon />, time: "18-00" },
            ].map(({ icon, time }) => (
              <span
                key={time}
                className={`border-gray-500 border flex text-xs flex-col justify-center items-center rounded-md py-1 w-full cursor-pointer ${
                  filters[activeTabIndex].departureTime.includes(time)
                    ? "bg-[#D7B56D]"
                    : ""
                }`}
                onClick={() => handleTimeChange("departureTime", time)}
              >
                {icon}
                <span className="text-xs">{time}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Arrival Time */}
        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-sm font-semibold mb-2">
            Arrival Time at {arrivalCity}
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-2 lg-custom:grid-cols-4 place-items-center gap-2 ">
            {[
              { icon: <PiMountains />, time: "00-06" },
              { icon: <IoIosSunny />, time: "06-12" },
              { icon: <TbSunset2 />, time: "12-18" },
              { icon: <IoIosMoon />, time: "18-00" },
            ].map(({ icon, time }) => (
              <span
                key={time}
                className={`border-gray-500 border  text-xs flex flex-col justify-center items-center rounded-md py-1 w-full cursor-pointer ${
                  filters[activeTabIndex].arrivalTime.includes(time)
                    ? "bg-[#D7B56D]"
                    : ""
                }`}
                onClick={() => handleTimeChange("arrivalTime", time)}
              >
                {icon}
                <span className="text-xs">{time}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Airlines */}
        <div className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-sm font-semibold mb-2">Airlines</h3>
          <div className="flex flex-col">
            {Object.entries(flightCountMap).map(([airline, { count }]) => (
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
