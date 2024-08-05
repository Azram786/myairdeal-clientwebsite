import React from "react";
import {
  MdAirlineSeatReclineExtra,
  MdFlight,
  MdOutlineDateRange,
} from "react-icons/md";
import { RiFlightLandLine, RiFlightTakeoffFill } from "react-icons/ri";
import { GoArrowSwitch } from "react-icons/go";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { TbArrowsRightLeft } from "react-icons/tb";

const FlightSearchSummary = ({ data, tripType }) => {
  if (!data || !data.searchQuery) {
    return null; // or return a loading state
  }

  const { searchQuery } = data;
  const { cabinClass, paxInfo, routeInfos } = searchQuery;

  console.log(tripType, "type");
  const passengers =
    parseInt(paxInfo.ADULT) +
    parseInt(paxInfo.CHILD) +
    parseInt(paxInfo.INFANT);

  const formatTravelDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return formatter.format(date).replace(/(\d+)/, "$1th");
  };

  const renderOneWay = () => (
    <div className="grid  md:grid-cols-5  gap-3 grid-cols-1  bg-[#007EC4] text-white p-2 ">
      <div className="flex items-center space-x-4 md:border-r justify-center ">
        <div className="flex flex-col">
          <span className="text-xs text-white">From</span>
          <span className="text-xs font-semibold">
            {routeInfos[0].fromCityOrAirport.code}
          </span>
        </div>
        {/* <RiFlightTakeoffFill className="text-2xl" /> */}
        <span className="rotate-90">
          <MdFlight />
        </span>
        <div className="flex flex-col">
          <span className="text-xs text-white">To</span>
          <span className="text-xs font-semibold">
            {routeInfos[0].toCityOrAirport.code}
          </span>
        </div>
      </div>
      <div className="flex items-center  justify-center md:border-r ">
        {/* <div className="flex flex-col items-end">
          <span className="text-xs text-white">Departure Date</span>
          <span className="text-lg font-semibold">{routeInfos[0].travelDate}</span>
        </div> */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-white">Passengers & Class</span>
          {/* <span className="text-lg font-semibold">{`${passengers} ${passengers > 1 ? 'Passengers' : 'Passenger'} | ${cabinClass}`}</span> */}
          <span className="text-xs font-semibold">
            {`${paxInfo.ADULT} Adults ${
              paxInfo.CHILD > 0
                ? `, ${paxInfo.CHILD} Child${paxInfo.CHILD > 1 ? "ren" : ""} `
                : ""
            }${
              paxInfo.INFANT > 0
                ? `,${paxInfo.INFANT} INFANT${paxInfo.INFANT > 1 ? "s" : ""} `
                : ""
            } | ${cabinClass}`}
    
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center  md:border-r">
        <div className="flex flex-col ">
          <span className="text-xs text-white">Departure Date</span>
          <span className="text-xs font-semibold">
            {formatTravelDate(routeInfos[0].travelDate)}
          </span>
        </div>
       
      </div>
      <div className="flex items-center justify-center md:border-r">
      <div className="flex flex-col">
          <span className="text-xs text-white">Preferred Airline</span>
          <span className="text-xs font-semibold">{`None`}</span>
        </div>
      </div>
      <div className="flex justify-center">
        <Link to="/">
          <button className="border-[#01324D] border text-sm text-white px-4 py-2 rounded-md">
            MODIFY SEARCH
          </button>
        </Link>
      </div>
    </div>
  );

  const renderRoundTrip = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:grid-cols-6  place-items-center justify-between  bg-[#007EC4] text-white p-2 px-6">
      <div className="flex w-full items-center space-x-4  justify-center md:border-r md:px-2">
        <div className="flex flex-col">
          <span className="text-xs text-white">From</span>
          <span className="text-xs font-semibold">
            {routeInfos[0].fromCityOrAirport.code}
          </span>
        </div>
        {/* <GoArrowSwitch className="text-2xl" /> */}
        <span className="">
          <TbArrowsRightLeft />
        </span>
        <div className="flex flex-col">
          <span className="text-xs text-white">To</span>
          <span className="text-xs font-semibold">
            {routeInfos[0].toCityOrAirport.code}
          </span>
        </div>
      </div>
      {/* <div className="flex flex-col md:flex-row items-center space-x-4"> */}
      <div className="flex w-full  flex-col items-center md:border-r md:px-2 ">
        <span className="text-xs  text-white">Departure</span>
        <span className="text-xs font-semibold">
          {formatTravelDate(routeInfos[0].travelDate)}
        </span>
      </div>
      <div className="flex flex-col items-center md:border-r  md:px-2 w-full">
        <span className="text-xs text-white">Return</span>
        <span className="text-xs font-semibold">
          {formatTravelDate(routeInfos[1]?.travelDate) || "N/A"}
        </span>
      </div>
      <div className="flex flex-col items-center md:border-r w-full   overflow-x-auto no-scroll">
        <span className="text-xs text-white">Passengers & Class</span>
        {/* <span className="text-lg font-semibold">{`${passengers} ${passengers > 1 ? 'Passengers' : 'Passenger'} | ${cabinClass}`}</span> */}
        <span className="text-xs font-semibold">
          {`${paxInfo.ADULT} Adults ${
            paxInfo.CHILD > 0
              ? `, ${paxInfo.CHILD} Child${paxInfo.CHILD > 1 ? "ren" : ""} `
              : ""
          }${
            paxInfo.INFANT > 0
              ? `,${paxInfo.INFANT} INFANT${paxInfo.INFANT > 1 ? "s" : ""} `
              : ""
          } | ${cabinClass}`}
        </span>
      </div>
      <div className="flex flex-col items-center md:border-r  md:px-2 w-full">
        <span className="text-xs text-white">Preferred Airline</span>
        <span className="text-xs font-semibold">{"None"}</span>
      </div>
      <Link to="/">
        <button className="border-[#01324D] border text-sm text-white px-4 py-2 rounded-md">
          MODIFY SEARCH
        </button>
      </Link>
      {/* </div> */}
    </div>
  );

  const renderMultiCity = () => (
    <div className="flex flex-col md:flex-row items-center gap-3 bg-[#007EC4]  p-2 text-white">
      <div className="md:w-1/2 w-[95%]  justify-center overflow-x-auto md:border-r no-scroll flex">
        {routeInfos.map((route, index) => (
          <div
            key={index}
            className="flex items-center shrink-0 justify-around md:border-r   px-2   "
          >
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <span className="text-xs text-white">From</span>
                <span className="text-xs font-semibold">
                  {route?.fromCityOrAirport?.code}
                </span>
              </div>
              {/* <RiFlightTakeoffFill className="text-2xl" /> */}
              <span className="rotate-90">
                <MdFlight />
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-white">To</span>
                <span className="text-xs font-semibold">
                  {route.toCityOrAirport.code}
                </span>
              </div>
            </div>
            {/* <div className="flex items-center mx-4 space-x-4">
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400">Departure Date</span>
                <span className="text-xs font-semibold">({route.travelDate})</span>
              </div>
            </div> */}
          </div>
        ))}
      </div>
      <div className="md:w-2/3 gap-3 grid md:grid-cols-3 grid-cols-1 ">
        <div className="flex justify-center  md:border-r  ">
          <div className="flex  flex-col">
            <span className="text-xs text-center text-white">
              Passengers & Class
            </span>
            {/* <span className="text-xs text-center font-semibold">{`${passengers} ${passengers > 1 ? 'Passengers' : 'Passenger'} | ${cabinClass}`}</span> */}
            <span className="text-xs font-semibold">
              {`${paxInfo.ADULT} Adults ${
                paxInfo.CHILD > 0
                  ? `, ${paxInfo.CHILD} Child${
                      paxInfo.CHILD > 1 ? "ren" : ""
                    } `
                  : ""
              }${
                paxInfo.INFANT > 0
                  ? `,${paxInfo.INFANT} INFANT${
                      paxInfo.INFANT > 1 ? "s" : ""
                    }`
                  : ""
              } | ${cabinClass}`}
            </span>
          </div>
        </div>
        <div className="flex justify-center md:border-r  ">
          <div className="flex  flex-col">
            <span className="text-xs text-center text-white">
              Preferred Airline
            </span>
            <span className="text-xs text-center font-semibold">None</span>
          </div>
        </div>
        <div className="flex  justify-center items-center">
          <Link to="/">
            <button className="border-[#01324D] border text-sm text-white px-4 py-2 rounded-md">
              MODIFY SEARCH
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full ">
      {tripType === "oneway" && renderOneWay()}
      {tripType === "roundtrip" && renderRoundTrip()}
      {(tripType === "multicity" || tripType === "combo") && renderMultiCity()}
    </div>
  );
};

export default FlightSearchSummary;
