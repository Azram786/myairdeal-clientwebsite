import React from 'react';
import { MdAirlineSeatReclineExtra, MdFlight, MdOutlineDateRange } from 'react-icons/md';
import { RiFlightLandLine, RiFlightTakeoffFill } from 'react-icons/ri';
import { GoArrowSwitch } from 'react-icons/go';

import { Link, Navigate, useNavigate } from 'react-router-dom';

const FlightSearchSummary = ({ data, tripType }) => {
  if (!data || !data.searchQuery) {
    return null;  // or return a loading state
  }

  const { searchQuery } = data;
  const { cabinClass, paxInfo, routeInfos } = searchQuery;

  console.log(tripType,"type")
  const passengers = parseInt(paxInfo.ADULT) + parseInt(paxInfo.CHILD) + parseInt(paxInfo.INFANT);



  const renderOneWay = () => (
    <div className="grid md:grid-cols-4 grid-cols-2  w-full bg-[#007EC4] text-white p-2 rounded">
      <div className="flex items-center space-x-4 border-r justify-center ">
        <div className="flex flex-col">
          <span className="text-xs text-white">From</span>
          <span className="text-lg font-semibold">{routeInfos[0].fromCityOrAirport.code}</span>
        </div>
        {/* <RiFlightTakeoffFill className="text-2xl" /> */}
        <span className='rotate-90'><MdFlight/></span>
        <div className="flex flex-col">
          <span className="text-xs text-white">To</span>
          <span className="text-lg font-semibold">{routeInfos[0].toCityOrAirport.code}</span>
        </div>
      </div>
      <div className="flex items-center  justify-center border-r ">
        {/* <div className="flex flex-col items-end">
          <span className="text-xs text-white">Departure Date</span>
          <span className="text-lg font-semibold">{routeInfos[0].travelDate}</span>
        </div> */}
        <div className="flex flex-col">
          <span className="text-xs text-white">Passengers & Class</span>
          <span className="text-lg font-semibold">{`${passengers} ${passengers > 1 ? 'Passengers' : 'Passenger'} | ${cabinClass}`}</span>
        </div>
      </div>
      <div className="flex items-center justify-center  border-r">
        <div className="flex flex-col ">
          <span className="text-xs text-white">Departure Date</span>
          <span className="text-lg font-semibold">{routeInfos[0].travelDate}</span>
        </div>
        {/* <div className="flex flex-col">
          <span className="text-xs text-white">Preferred</span>
          <span className="text-lg font-semibold">{`none`}</span>
        </div> */}
      </div>
        <div className='flex justify-center'>
          <Link to='/'>
            <button className="bg-[#01324D] text-white px-4 py-2 rounded-md">
              MODIFY SEARCH
            </button>
          </Link>
        </div>
    </div>
  );

  const renderRoundTrip = () => (
    <div className="flex items-center justify-between w-full bg-[#007EC4] text-white p-2 rounded">
      <div className="flex items-center space-x-4">
        <div className="flex flex-col">
          <span className="text-xs text-white">From</span>
          <span className="text-lg font-semibold">{routeInfos[0].fromCityOrAirport.code}</span>
        </div>
        {/* <GoArrowSwitch className="text-2xl" /> */}
        <span className='rotate-90'><MdFlight/></span>
        <div className="flex flex-col">
          <span className="text-xs text-white">To</span>
          <span className="text-lg font-semibold">{routeInfos[0].toCityOrAirport.code}</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-end">
          <span className="text-xs text-white">Departure</span>
          <span className="text-lg font-semibold">{routeInfos[0].travelDate}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-white">Return</span>
          <span className="text-lg font-semibold">{routeInfos[1]?.travelDate || 'N/A'}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-white">Passengers & Class</span>
          <span className="text-lg font-semibold">{`${passengers} ${passengers > 1 ? 'Passengers' : 'Passenger'} | ${cabinClass}`}</span>
        </div>
        <Link to='/'>
          <button className="bg-[#01324D] text-white px-4 py-2 rounded-md">
            MODIFY SEARCH
          </button>
        </Link>
      </div>
    </div>
  );

  const renderMultiCity = () => (
    <div className="flex w-full bg-[#007EC4] text-black p-2 rounded">
      <div className='w-1/2  overflow-x-auto no-scroll flex'>
        {routeInfos.map((route, index) => (
          <div key={index} className="flex items-center shrink-0 justify-around  md:border-r border-black px-2   ">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <span className="text-xs text-white">From</span>
                <span className="text-lg font-semibold">{route.fromCityOrAirport.code}</span>
              </div>
              {/* <RiFlightTakeoffFill className="text-2xl" /> */}
              <span className='rotate-90'><MdFlight/></span>
              <div className="flex flex-col">
                <span className="text-xs text-white">To</span>
                <span className="text-lg font-semibold">{route.toCityOrAirport.code}</span>
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
      <div className='w-2/3 grid md:grid-cols-3 grid-cols-1 '>
        <div className="flex justify-center  md:border-r border-black ">
          <div className="flex  flex-col">
            <span className="text-xs text-center text-white">Passengers & Class</span>
            <span className="text-lg text-center font-semibold">{`${passengers} ${passengers > 1 ? 'Passengers' : 'Passenger'} | ${cabinClass}`}</span>
          </div>
        </div>
        <div className="flex justify-center md:border-r border-black ">
          <div className="flex  flex-col">
            <span className="text-xs text-center text-white">Preferred Airlines</span>
            <span className="text-lg text-center font-semibold">none</span>
          </div>
        </div>
          <div className='flex  justify-center items-center'>
            <Link to='/'>
              <button className="bg-[#01324D] text-white px-4 py-2 rounded-md">
                MODIFY SEARCH
              </button>
            </Link>
          </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      {tripType === 'oneway' && renderOneWay()}
      {tripType === 'roundtrip' && renderRoundTrip()}
      {(tripType === 'multicity' || tripType === 'combo') && renderMultiCity()}
    </div>
  );
};

export default FlightSearchSummary;