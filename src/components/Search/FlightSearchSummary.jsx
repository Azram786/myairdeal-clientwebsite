import React, { useState } from "react";
import {
  MdExpandMore,
  MdAirlineSeatReclineExtra,
  MdFlight,
  MdOutlineDateRange,
} from "react-icons/md";
import { RiFlightLandLine, RiFlightTakeoffFill } from "react-icons/ri";
import { GoArrowSwitch } from "react-icons/go";
import FilterSection from "../Home/FilterSection";


import { Link, Navigate, useNavigate } from "react-router-dom";
import { TbArrowsRightLeft } from "react-icons/tb";
import HomePage from "../Home/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { setIsaModifySearch } from "../../store/slices/aut.slice";
const FlightSearchSummary = ({ data, tripType }) => {
  if (!data || !data.searchQuery) {
    return null; // or return a loading state
  }

  const { searchQuery } = data;
  const { cabinClass, paxInfo, routeInfos } = searchQuery;
  const { isModifySearch } = useSelector((state) => state.auth);

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
  const dispatch = useDispatch();

  const renderOneWay = () => (
    <div>
      {/* Grid layout for medium and larger screens */}
      {isModifySearch ? (
        <>
          <HomePage />
        </>
      ) : (
        <div className="hidden md:grid md:grid-cols-5 gap-3 bg-[#1B1D29] text-white p-2">
          <div className="flex items-center space-x-4 md:border-r justify-center">
            <div className="flex flex-col">
              <span className="text-xs text-white">From</span>
              <span className="text-xs font-semibold">
                {routeInfos[0].fromCityOrAirport.code}
              </span>
            </div>
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
          <div className="flex items-center justify-center md:border-r">
            <div className="flex flex-col items-center">
              <span className="text-xs text-white">Passengers & Class</span>
              <div className="relative group">
                {/* <span className="text-xs font-semibold line-clamp-1">
                  {`${paxInfo.ADULT} Adults ${paxInfo.CHILD > 0
                    ? `, ${paxInfo.CHILD} Child${paxInfo.CHILD > 1 ? "ren" : ""
                    } `
                    : ""
                    }${paxInfo.INFANT > 0
                      ? `,${paxInfo.INFANT} Infant${paxInfo.INFANT > 1 ? "s" : ""
                      } `
                      : ""
                    } | ${cabinClass}`}
                </span> */}
                <div className="flex justify-between items-center">
                  {/* Passenger Information */}
                  <span className="text-xs font-semibold line-clamp-1 w-1/2 text-right pr-2">
                    {`${paxInfo.ADULT} Adults${
                      paxInfo.CHILD > 0
                        ? `, ${paxInfo.CHILD} Child${
                            paxInfo.CHILD > 1 ? "ren" : ""
                          }`
                        : ""
                    }${
                      paxInfo.INFANT > 0
                        ? `, ${paxInfo.INFANT} Infant${
                            paxInfo.INFANT > 1 ? "s" : ""
                          }`
                        : ""
                    }`}
                  </span>
                  |{/* Cabin Class */}
                  <span className="text-xs font-semibold  w-1/2 text-left">
                    {cabinClass}
                  </span>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-0 mb-0.5 w-max px-3 py-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                    {`${paxInfo.ADULT} Adult(s), ${
                      paxInfo.CHILD > 0
                        ? `${paxInfo.CHILD} Child${
                            paxInfo.CHILD > 1 ? "ren ," : ","
                          }`
                        : ""
                    } ${
                      paxInfo.INFANT > 0
                        ? `${paxInfo.INFANT} Infant${
                            paxInfo.INFANT > 1 ? "s " : ""
                          }`
                        : ""
                    }| ${cabinClass}`}
                  </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center md:border-r">
            <div className="flex flex-col">
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
            {/* <Link to=""> */}
            <button
              onClick={() => {
                dispatch(setIsaModifySearch(true));
                console.log("clicked");
              }}
              className="border-[#01324D] bg-[#D7B56D] border text-xs lg-custom:text-sm text-black px-4 py-2 rounded-md"
            >
              MODIFY SEARCH
            </button>
            {/* </Link> */}
          </div>
        </div>
      )}

      {/* Dropdown for small screens */}
      <div className="md:hidden mx-2 bg-[#1B1D29] text-white p-2 rounded-md">
        <details className="w-full">
          <summary className="flex justify-between items-center cursor-pointer">
            <span>Flight Details</span>
            <MdExpandMore className="text-2xl" />
          </summary>
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-xs">From</span>
              <span className="text-xs font-semibold">
                {routeInfos[0].fromCityOrAirport.code}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-xs">To</span>
              <span className="text-xs font-semibold">
                {routeInfos[0].toCityOrAirport.code}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-xs">Passengers & Class</span>
              <span className="text-xs font-semibold">
                {`${paxInfo.ADULT} Adults ${
                  paxInfo.CHILD > 0
                    ? `, ${paxInfo.CHILD} Child${
                        paxInfo.CHILD > 1 ? "ren" : ""
                      } `
                    : ""
                }${
                  paxInfo.INFANT > 0
                    ? `,${paxInfo.INFANT} Infant${
                        paxInfo.INFANT > 1 ? "s" : ""
                      } `
                    : ""
                } | ${cabinClass}`}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-xs">Departure Date</span>
              <span className="text-xs font-semibold">
                {formatTravelDate(routeInfos[0].travelDate)}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-xs">Preferred Airline</span>
              <span className="text-xs font-semibold">None</span>
            </div>
            <div className="flex justify-center mt-2">
              <button
                onClick={() => {
                  dispatch(setIsaModifySearch(true));
                  console.log("clicked");
                }}
                className="border-[#01324D] bg-[#D7B56D] border text-sm text-black px-4 py-2 rounded-md"
              >
                MODIFY SEARCH
              </button>
            </div>
          </div>
        </details>
      </div>
    </div>
  );

  const renderRoundTrip = () => (
    <>
      {" "}
      {isModifySearch ? (
        <>
          <HomePage />
        </>
      ) : (
        <div>
          {/* Grid layout for medium and larger screens */}
          <div className="hidden md:grid md:grid-cols-6 gap-3 bg-[#1B1D29] text-white p-2">
            <div className="flex items-center space-x-4 md:border-r justify-center">
              <div className="flex flex-col">
                <span className="text-xs text-white">From</span>
                <span className="text-xs font-semibold">
                  {routeInfos[0].fromCityOrAirport.code}
                </span>
              </div>
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
            <div className="flex items-center justify-center md:border-r">
              <div className="flex flex-col items-center">
                <span className="text-xs text-white">Departure Date</span>
                <span className="text-xs font-semibold">
                  {formatTravelDate(routeInfos[0].travelDate)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center md:border-r">
              <div className="flex flex-col">
                <span className="text-xs text-white">Return Date</span>
                <span className="text-xs font-semibold">
                  {formatTravelDate(routeInfos[1]?.travelDate) || "N/A"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center md:border-r">
              <div className="flex flex-col items-center">
                <span className="text-xs text-white">Passengers & Class</span>
                <div className="relative group">
                  {/* <span className="text-xs font-semibold line-clamp-1">
                  {`${paxInfo.ADULT} Adults ${paxInfo.CHILD > 0
                    ? `, ${paxInfo.CHILD} Child${paxInfo.CHILD > 1 ? "ren" : ""
                    } `
                    : ""
                    }${paxInfo.INFANT > 0
                      ? `,${paxInfo.INFANT} Infant${paxInfo.INFANT > 1 ? "s" : ""
                      } `
                      : ""
                    } | ${cabinClass}`}
                       </span> */}
                  <div className="flex justify-between items-center">
                    {/* Passenger Information */}
                    <span className="text-xs font-semibold line-clamp-1 w-1/2 text-right pr-2">
                      {`${paxInfo.ADULT} Adults${
                        paxInfo.CHILD > 0
                          ? `, ${paxInfo.CHILD} Child${
                              paxInfo.CHILD > 1 ? "ren" : ""
                            }`
                          : ""
                      }${
                        paxInfo.INFANT > 0
                          ? `, ${paxInfo.INFANT} Infant${
                              paxInfo.INFANT > 1 ? "s" : ""
                            }`
                          : ""
                      }`}
                    </span>
                    |{/* Cabin Class */}
                    <span className="text-xs font-semibold  w-1/2 text-left line-clamp-1">
                      {cabinClass}
                    </span>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-0 mb-0.5 w-max px-3 py-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                    {`${paxInfo.ADULT} Adult(s), ${
                      paxInfo.CHILD > 0
                        ? `${paxInfo.CHILD} Child${
                            paxInfo.CHILD > 1 ? "ren ," : ","
                          }`
                        : ""
                    } ${
                      paxInfo.INFANT > 0
                        ? `${paxInfo.INFANT} Infant${
                            paxInfo.INFANT > 1 ? "s " : ""
                          }`
                        : ""
                    }| ${cabinClass}`}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center md:border-r">
              <div className="flex flex-col">
                <span className="text-xs text-white">Preferred Airline</span>
                <span className="text-xs font-semibold">None</span>
              </div>
            </div>
            <div className="flex justify-center">
              {/* <Link to="/"> */}
              <button
                onClick={() => {
                  dispatch(setIsaModifySearch(true));
                  console.log("clicked");
                }}
                className="border-[#01324D] bg-[#D7B56D] border text-sm text-black px-4 py-2 rounded-md"
              >
                MODIFY SEARCH
              </button>
              {/* </Link> */}
            </div>
          </div>

          {/* Dropdown for small screens */}
          <div className="md:hidden mx-2 bg-[#1B1D29] text-white p-2 rounded-md">
            <details className="w-full">
              <summary className="flex justify-between items-center cursor-pointer">
                <span>Round Trip Details</span>
                <MdExpandMore className="text-2xl" />
              </summary>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs">From</span>
                  <span className="text-xs font-semibold">
                    {routeInfos[0].fromCityOrAirport.code}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs">To</span>
                  <span className="text-xs font-semibold">
                    {routeInfos[0].toCityOrAirport.code}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs">Departure Date</span>
                  <span className="text-xs font-semibold">
                    {formatTravelDate(routeInfos[0].travelDate)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs">Return Date</span>
                  <span className="text-xs font-semibold">
                    {formatTravelDate(routeInfos[1]?.travelDate) || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs">Passengers & Class</span>
                  <span className="text-xs font-semibold">
                    {`${paxInfo.ADULT} Adults${
                      paxInfo.CHILD > 0
                        ? `, ${paxInfo.CHILD} Child${
                            paxInfo.CHILD > 1 ? "ren" : ""
                          }`
                        : ""
                    }${
                      paxInfo.INFANT > 0
                        ? `, ${paxInfo.INFANT} Infant${
                            paxInfo.INFANT > 1 ? "s" : ""
                          }`
                        : ""
                    } | ${cabinClass}`}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs">Preferred Airline</span>
                  <span className="text-xs font-semibold">None</span>
                </div>
                <div className="flex justify-center mt-2">
                  <button
                    onClick={() => dispatch(setIsaModifySearch(true))}
                    className="border-[#01324D] bg-[#D7B56D] border text-sm text-black px-4 py-2 rounded-md"
                  >
                    MODIFY SEARCH
                  </button>
                </div>
              </div>
            </details>
          </div>
        </div>
      )}
    </>
  );


  const renderMultiCity = () => (
    <>
      {" "}
      {isModifySearch ? (
        <>
          <HomePage />
        </>
      ) : (
        <div>
          {/* Grid layout for medium and larger screens */}
          <div className="hidden md:flex flex-col md:flex-row items-center gap-3 bg-[#1B1D29] p-2 text-white">
            <div className="md:w-1/2 w-[95%] justify-center overflow-x-auto md:border-r no-scroll flex">
              {routeInfos.map((route, index) => (
                <div
                  key={index}
                  className="flex items-center shrink-0 justify-around md:border-r px-2"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-white">From</span>
                      <span className="text-xs font-semibold">
                        {route?.fromCityOrAirport?.code}
                      </span>
                    </div>
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
                </div>
              ))}
            </div>
            <div className="md:w-2/3 gap-3 grid md:grid-cols-3 grid-cols-1">
              <div className="flex justify-center md:border-r">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-white">Passengers & Class</span>
                  <div className="relative group">
                  {/* <span className="text-xs font-semibold line-clamp-1">
                  {`${paxInfo.ADULT} Adults ${paxInfo.CHILD > 0
                    ? `, ${paxInfo.CHILD} Child${paxInfo.CHILD > 1 ? "ren" : ""
                    } `
                    : ""
                    }${paxInfo.INFANT > 0
                      ? `,${paxInfo.INFANT} Infant${paxInfo.INFANT > 1 ? "s" : ""
                      } `
                      : ""
                    } | ${cabinClass}`}
                       </span> */}
                  <div className="flex justify-between items-center">
                    {/* Passenger Information */}
                    <span className="text-xs font-semibold line-clamp-1 w-1/2 text-right pr-2">
                      {`${paxInfo.ADULT} Adults${
                        paxInfo.CHILD > 0
                          ? `, ${paxInfo.CHILD} Child${
                              paxInfo.CHILD > 1 ? "ren" : ""
                            }`
                          : ""
                      }${
                        paxInfo.INFANT > 0
                          ? `, ${paxInfo.INFANT} Infant${
                              paxInfo.INFANT > 1 ? "s" : ""
                            }`
                          : ""
                      }`}
                    </span>
                    |{/* Cabin Class */}
                    <span className="text-xs font-semibold  w-1/2 text-left line-clamp-1">
                      {cabinClass}
                    </span>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-0 mb-0.5 w-max px-3 py-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                    {`${paxInfo.ADULT} Adult(s), ${
                      paxInfo.CHILD > 0
                        ? `${paxInfo.CHILD} Child${
                            paxInfo.CHILD > 1 ? "ren ," : ","
                          }`
                        : ""
                    } ${
                      paxInfo.INFANT > 0
                        ? `${paxInfo.INFANT} Infant${
                            paxInfo.INFANT > 1 ? "s " : ""
                          }`
                        : ""
                    }| ${cabinClass}`}
                  </div>
                </div>
                </div>
              </div>
              <div className="flex justify-center md:border-r">
                <div className="flex flex-col">
                  <span className="text-xs text-center text-white">
                    Preferred Airline
                  </span>
                  <span className="text-xs text-center font-semibold">
                    None
                  </span>
                </div>
              </div>
              <div className="flex justify-center items-center">
                {/* <Link to="/"> */}
                <button
                  onClick={() => {
                    dispatch(setIsaModifySearch(true));
                    console.log("clicked");
                  }}
                  className="border-[#01324D] bg-[#D7B56D] border text-xs lg-custom:text-sm text-black px-4 py-2 rounded-md"
                >
                  MODIFY SEARCH
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>

          {/* Dropdown for small screens */}
          <div className="md:hidden mx-2 bg-[#1B1D29] text-white p-2 rounded-md">
            <details className="w-full">
              <summary className="flex justify-between items-center cursor-pointer">
                <span>Multi-City Details</span>
                <MdExpandMore className="text-2xl" />
              </summary>
              <div className="mt-2 space-y-2">
                {routeInfos.map((route, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-beteen border-b pb-2"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs">From</span>
                      <span className="text-xs font-semibold">
                        {route?.fromCityOrAirport?.code}
                      </span>
                    </div>
                    <span className="rotate-90">
                      <MdFlight />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs">To</span>
                      <span className="text-xs font-semibold">
                        {route.toCityOrAirport.code}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs">Passengers & Class</span>
                  <span className="text-xs font-semibold">
                    {`${paxInfo.ADULT} Adults ${
                      paxInfo.CHILD > 0
                        ? `, ${paxInfo.CHILD} Child${
                            paxInfo.CHILD > 1 ? "ren" : ""
                          } `
                        : ""
                    }${
                      paxInfo.INFANT > 0
                        ? `,${paxInfo.INFANT} Infant${
                            paxInfo.INFANT > 1 ? "s" : ""
                          } `
                        : ""
                    } | ${cabinClass}`}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs">Preferred Airline</span>
                  <span className="text-xs font-semibold">None</span>
                </div>
                <div className="flex justify-center mt-2 ">
                  {/* <Link to="/"> */}
                  <button
                    onClick={() => dispatch(setIsaModifySearch(true))}
                    className="border-[#01324D] bg-[#D7B56D] border text-sm text-black px-4 py-2 rounded-md"
                  >
                    MODIFY SEARCH
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </details>
          </div>
        </div>
      )}
    </>
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
