import React, { useState } from "react";
import FlightLogo from "../../../assets/booking/viewBookings/flightLogo.png";
import { MdOutlineDateRange } from "react-icons/md";
import { BsDoorClosedFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { MdAirlineStops } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const FlightTicket = ({ booking, index, bookingID }) => {
  // Utility function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const navigate = useNavigate();
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  const getSingleTripDetailHandler = async () => {
    try {
      navigate(`/view-detailed-booking?bookingId=${bookingID}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-between items-end p-4 border rounded-lg shadow-md flex-row  w-full">
      <div className="w-[75%] justify-between flex flex-col gap-2 b ">
        {booking?.data?.itemInfos?.AIR?.tripInfos?.map((trip, index) => (
          <div className="flex justify-between items-center border p-3  w-full border-slate-400  gap-2">
            <div className="flex w-[70%] ">
              <img
                src={FlightLogo}
                className="h-16 w-16 rounded-lg p-1 object-contain mr-4 border border-blue-700"
              />

              <div className=" flex  w-full gap-3 items-center ">
                <div className="flex justify-center items-center gap-1 w-[60%]  ">
                  <div>
                    <div className="text-lg font-semibold flex ">
                      {trip.sI[0].da.code}-{" "}
                      <span className="text-[1rem]">{trip.sI[0].da.name}</span>
                    </div>

                    <div className="text-lg font-semibold">
                      {trip.sI.length === 1
                        ? trip.sI[0].aa.code
                        : trip.sI[trip.sI.length - 1].aa.code}{" "}
                      -
                      <span className="text-[1rem]">
                        {trip.sI.length === 1
                          ? trip.sI[0].aa.name
                          : trip.sI[trip.sI.length - 1].aa.name}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border w-6 border-black"></div>
                <div className="flex  w-[30%] items-center space-x-4">
                  <div className="flex flex-col items-end">
                    <div className="text-xl font-bold">
                      {formatTime(trip.sI[0].dt)}
                    </div>

                    <div className="text-xl font-bold">
                      {trip.sI.length === 1
                        ? formatTime(trip.sI[0].at)
                        : formatTime(trip.sI[trip.sI.length - 1].at)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center w-[30%]   space-x-6 ">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <div className="text-[1.5rem] text-sky-600 bg-slate-300 p-1 rounded-md">
                    <MdOutlineDateRange />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Date</div>
                    <div className="font-medium">
                      {formatDate(trip.sI[0].dt)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="text-[1.5rem] text-sky-600 bg-slate-300 p-1 rounded-md">
                    <IoIosTime />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Flight time</div>
                    <div className="font-medium">
                      {" "}
                      {formatTime(trip.sI[0].dt)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 ">
                  <div className="text-[1.5rem] text-sky-600 bg-slate-300 p-1 rounded-md">
                    <BsDoorClosedFill />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Gate</div>
                    <div className="font-bold text-[1rem]">
                      {trip.sI[0].aa?.terminal || "N/A"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="text-[1.5rem] text-sky-600 bg-slate-300 p-1 rounded-md">
                    <MdAirlineStops />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Stops</div>
                    <div className="font-medium">{trip.sI.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-[25%] justify-end items-center space-x-4">
        <button className="bg-[#007EC4] text-white px-4 py-2 rounded-sm">
          Download Ticket
        </button>
        <button
          className="bg-transparent border border-[#007EC4] t px-4 py-2 rounded-sm"
          onClick={getSingleTripDetailHandler}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default FlightTicket;
