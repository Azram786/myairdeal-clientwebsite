import React, { useState } from "react";
import { MdFlight, MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { BsDoorClosedFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import FlighFromToo from "../../../assets/booking/viewDetailedBookings/flight.svg";
import paymentFlight from "../../../assets/booking/viewDetailedBookings/paymentFlight.png";
import timeFormatChanger from "../../util/timeFormatChanger";
import dateDateFormatChanger from "../../util/dateDateFormatChanger";
import calculateDuration from "../../util/calculateDuration";
import { useSelector } from "react-redux";


const ViewDetailedBookingCard = ({ singleBookingData, searchQuery }) => {
  const { user } = useSelector((state) => state.auth)
  const { token } = useSelector((state) => state.auth)
  const [openConnectionIndex, setOpenConnectionIndex] = useState(null);
  let previousArrivalTime = null;

  const toggleDropdown = (index) => {
    setOpenConnectionIndex(openConnectionIndex === index ? null : index);
  };
  console.log({ searchQuery })
 
  return (
    <div className="mt-4 border-l-0">
      <div className="mx-auto rounded-lg p-7">
        <div className="flex justify-between items-center bg-[#007EC4] p-4 rounded-t-xl text-white">
          <div className="flex items-center">
            <div
              className="h-16 w-16 flex items-center justify-center bg-white text-blue-500 font-bold text-xl rounded-full mr-4"
            >
              {user.firstName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-xl font-bold uppercase ">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-sm font-bold flex">
                <div className="text-slate-400">ID:</div>
                {singleBookingData.order.bookingId}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">Price</div>
            <div className="text-2xl font-bold">
              ₹{" "}
              {
                singleBookingData?.itemInfos.AIR.totalPriceInfo.totalFareDetail
                  .fC.TF
              }
              /-
            </div>
          </div>
        </div>
        {singleBookingData?.itemInfos?.AIR.tripInfos.map((value, index) => {
          return (
            <div key={index} className="border px-2 py-4 mb-4 my-2">
              <div className="flex gap-2 w-full p-1">
                <div className="bg-[#D0E7F4] flex justify-center items-center gap-3 p-2 rounded-lg flex-col w-[40%]">
                  <div className="w-full">
                    <div className="gap-4 flex">
                      <div>
                        <img className="h-[60px]" src={paymentFlight} alt="" />
                      </div>
                      <div className="py-2 flex flex-col justify-between">
                        <div className="flex flex-col gap-1">
                          <div className="text-slate-400">{searchQuery.cabinClass}</div>
                          <div className="font-semibold text-[1.2rem]">
                            Emirates A380 Airbus
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full h-full justify-between items-center">
                    <div className="w-1/3 flex text-center flex-col gap-1 h-full">
                      <div className="font-bold text-md">
                        <span>{value.sI[0].da.code}</span>
                      </div>
                      <div className="text-sm font-medium">
                        <span>{value.sI[0].da.city}</span>
                      </div>
                      <div className="font-extrabold text-[.8rem] w-full">
                        <span className="w-full">{value.sI[0].da.name}</span>
                      </div>
                      <div className="text-sm font-medium">
                        <span>{value.sI[0].da.country}</span>
                      </div>
                    </div>
                    <div className="h-full flex flex-col w-1/3 justify-center">
                      <div className="flex justify-center w-full items-center">
                        <hr className="w-1/3 border-t border-black" />
                        <MdFlight className="w-7 h-5 mx-2 rotate-90" />
                        <hr className="w-1/3 border-t border-black" />
                      </div>
                      {value.sI.length === 1 ? (
                        <div className="text-center text-sm font-semibold">
                          Non Stop
                        </div>
                      ) : (
                        <div className="text-center text-sm font-bold text-blue-500">
                          Connection
                        </div>
                      )}
                    </div>
                    <div className="w-1/3 flex flex-col gap-1 h-full text-center">
                      <div className="font-bold text-md">
                        <span>
                          {value.sI.length === 1
                            ? value.sI[0].aa.code
                            : value.sI[value.sI.length - 1].aa.code}
                        </span>
                      </div>
                      <div className="text-sm font-medium">
                        <span>
                          {value.sI.length === 1
                            ? value.sI[0].aa.city
                            : value.sI[value.sI.length - 1].aa.city}
                        </span>
                      </div>
                      <div className="font-extrabold text-[.8rem]">
                        <span>
                          {value.sI.length === 1
                            ? value.sI[0].aa.name
                            : value.sI[value.sI.length - 1].aa.name}
                        </span>
                      </div>
                      <div className="text-sm font-medium">
                        <span>
                          {value.sI.length === 1
                            ? value.sI[0].aa.country
                            : value.sI[value.sI.length - 1].aa.country}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[60%] flex flex-col justify-between pl-4">
                  <div className="p-2 bg-white  rounded-lg flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-800">
                      Total Duration
                    </h1>
                    <h1 className="text-2xl font-bold text-gray-500">{value.sI.length === 1 ? calculateDuration(value.sI[0].dt, value.sI[0].at) : calculateDuration(value.sI[0].dt, value.sI[value.sI.length - 1].at)}</h1>
                  </div>
                  <div className="flex justify-between mb-2 w-full">
                    <div className="flex gap-1 items-center w-1/3">
                      <div className="text-[1.5rem] text-white bg-[#0A2945] p-1 rounded-lg">
                        <MdDateRange />
                      </div>
                      <div>
                        <div className="text-[#495049] font-semibold">
                          Departure Date
                        </div>
                        <div className="font-semibold">
                          {dateDateFormatChanger(value.sI[0].dt)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 items-center w-1/3">
                      <div className="text-[1.5rem] text-white bg-[#0A2945] p-1 rounded-lg">
                        <IoIosTime />
                      </div>
                      <div>
                        <div className="text-[#495049] font-semibold">
                          Departure Time
                        </div>
                        <div className="font-semibold">
                          {timeFormatChanger(value.sI[0].dt)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 items-center w-1/3">
                      <div className="text-[1.5rem] text-white bg-[#0A2945] p-1 rounded-lg">
                        <IoIosTime />
                      </div>
                      <div>
                        <div className="text-[#495049] font-semibold">
                          Arrival time
                        </div>
                        <div className="font-semibold">
                          {value.sI.length === 1
                            ? timeFormatChanger(value.sI[0].at)
                            : timeFormatChanger(value.sI[value.sI.length - 1].at)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex gap-1 items-center w-1/3">
                      <div className="text-[1.5rem] text-white bg-[#0A2945] p-1 rounded-lg">
                        <BsDoorClosedFill />
                      </div>
                      <div>
                        <div className="text-[#495049] font-semibold">
                          Terminal
                        </div>
                        <div className="font-semibold">
                          {value.sI[0].da.terminal
                            ? value.sI[0].da.terminal
                            : "NA"}
                        </div>
                      </div>
                    </div>
                    <div className="flex  gap-1 items-center w-1/3 ">
                      <div className="text-[1.5rem] text-white bg-[#0A2945] p-1 rounded-lg">
                        <BsDoorClosedFill />
                      </div>
                      <div className="">
                        <div className="text-[#495049] font-semibold">
                          {" "}
                          Stops
                        </div>
                        <div className="font-semibold">{value.sI.length - 1}</div>
                      </div>
                    </div>
                    <div className="flex gap-1 items-center w-1/3">
                      <div className="text-[1.5rem] text-white bg-[#0A2945] p-1 rounded-lg">
                        <MdOutlineAirlineSeatReclineExtra />
                      </div>
                      <div>
                        <div className="text-[#495049] font-semibold">
                          Seat Class
                        </div>
                        <div className="font-semibold">{searchQuery.cabinClass}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-1 flex flex-col gap-1">
                {value.sI.length > 1 && (
                  <>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="bg-[#007EC4] text-white w-full py-2 rounded-lg"
                    >
                      {openConnectionIndex === index
                        ? "Hide Connections"
                        : "View Connections"}
                    </button>
                    {openConnectionIndex === index && (
                      <div className="bg-[#F3F7F9] text-slate-600 p-2">
                        {value.sI.map((singleValue, index) => {
                          const layoverDuration = previousArrivalTime ? calculateDuration(previousArrivalTime, singleValue.dt) : null;
                          previousArrivalTime = singleValue.at;

                          return (
                            <React.Fragment key={index}>
                              {index !== 0 && (
                                <div className="text-sm text-gray-500 mt-4">
                                  <span>There is a Special No Meal fare Provided by the Airline</span>
                                  <div className="flex justify-between bg-blue-900 text-white p-3 rounded-md mt-4 mb-4">
                                    <div className="text-sm">Require to change plane</div>
                                    <div className="text-base font-medium">
                                      <span className="text-sm">
                                        <div className="text-center">
                                          <span className="text-sm">Total Layover Time: {layoverDuration}</span>
                                        </div>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div className="flex items-center justify-between mb-4">
                                <div className="flex-col w-1/3">
                                  <div className="w-full">
                                    <div className="mb-2">
                                      <div className="font-semibold text-xs border rounded-md inline-flex items-center shadow-md p-1 space-x-2">
                                        <div className="w-5 h-5">
                                          <img
                                            src="https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/AA.png"
                                            alt="Airline Logo"
                                            className="w-full h-full object-contain"
                                          />
                                        </div>
                                        <div>
                                          <div>{singleValue.fD.aI.name}</div>
                                          <div className="flex items-center space-x-1">
                                            <span>{singleValue.fD.aI.code}</span>
                                            <MdFlight className="w-3 h-3 rotate-45" />
                                            <span>{searchQuery.cabinClass}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-lg font-bold">{singleValue.da.code}</div>
                                  <div className="text-sm">{singleValue.da.city}, {singleValue.da.country}</div>
                                  <div className="text-sm font-bold">{singleValue.da.name}</div>
                                  <div className="text-sm">{singleValue.da?.terminal || "N/A"}</div>
                                  <div className="text-sm font-semibold">{timeFormatChanger(singleValue.dt)}</div>
                                </div>
                                <div className="flex-col items-center w-1/3">
                                  <div className="text-center">
                                    <span className="text-sm">{calculateDuration(singleValue.dt, singleValue.at)}</span>
                                  </div>
                                  <div className="flex justify-center items-center">
                                    <hr className="w-1/3 border-t border-gray-300" />
                                    <MdFlight className="w-7 h-5 mx-2 rotate-90" />
                                    <hr className="w-1/3 border-t border-gray-300" />
                                  </div>
                                  <div className="text-center text-sm">Non Stop</div>
                                </div>
                                <div className="flex-col w-1/3 text-right">
                                  <div className="text-lg font-bold">{singleValue.aa.code}</div>
                                  <div className="text-sm">{singleValue.aa.city}, {singleValue.aa.country}</div>
                                  <div className="text-sm">{singleValue.aa.name}</div>
                                  <div className="text-sm">{singleValue.aa?.terminal || "N/A"}</div>
                                  <div className="text-sm font-semibold">{timeFormatChanger(singleValue.at)}</div>
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewDetailedBookingCard;
