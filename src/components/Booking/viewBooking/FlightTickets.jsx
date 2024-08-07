
import React from "react";
import FlightLogo from "../../../assets/booking/viewBookings/flightLogo.png";
import { MdOutlineDateRange } from "react-icons/md";
import { BsDoorClosedFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { MdAirlineStops } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import defaultAirline from '../../../assets/home/logo/defaultAirline.png'


const FlightTicket = ({ booking, index, bookingID, bookingFilter }) => {
  // Utility function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getSingleTripDetailHandler = async () => {
    try {
      navigate(
        `/view-detailed-booking?bookingId=${bookingID}&bookingFilter=${bookingFilter}`
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const DownloadInvoice = async () => {
    try {
      await axios
        .post(
          `${import.meta.env.VITE_SERVER_URL}invoice/generate`,
          {
            bookingId: bookingID,
          },
          {
            headers: {
              authorization: ` Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const linkSource = `data: application/pdf;base64,${res.data.base64String}`;
          const downloadLink = document.createElement("a");
          const fileName = `${bookingID}.pdf`;

          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        });

      // If the request is successful and returns a PDF file, you can handle the file here
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-5 lg:flex-row justify-between items-end xl:p-6 p-2 border rounded-lg">
      <div className="w-full  xl:w-[75%] justify-between  flex  flex-col gap-2">
        {booking?.data?.itemInfos?.AIR?.tripInfos?.map((trip, index) => (
          <div key={index} className="flex  lg:flex-row   items-center justify-between flex-col sm:flex-row border   p-5 gap-2 ">
            <div key={index} className="flex  w-full items-center justify-center md:justify-between  flex-col gap-4  xs:flex-row xs:item-start  md:flex-row lg:flex-row xl:flex-row sm:w-[60%]  ">
              <div className="flex border border-blue-400  rounded-xl  p-2">

                {/* <img
                  src={FlightLogo}
                  className="h-16 w-16 rounded-lg p-1 object-contain mr-4 border border-blue-700"
                /> */}
                <img src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${trip.sI[0].fD.aI.code}.png`} onError={(e) => e.currentTarget.src = defaultAirline} alt={trip?.sI[0].fD?.aI?.code} className="w-10 h-10 " />


              </div>

              <div className="flex rounded-lg w-full flex-col  md:w-[90%]    sm:flex-col md:flex-row  gap-3    items-center ">

                <div className="flex w-full justify-between gap-4 md:gap-1  md:w-[70%] lg:w-[60%] md:flex-col flex-row ">

                  <div className="text-base md:text-base font-semibold flex">
                    <span className="md:hidden tracking-widest"> {trip.sI[0].da.code}{" "}</span>
                    <span className=" hidden md:block  ">{trip.sI[0].da.name}</span>
                  </div>

                  <div className="text-base md:text-base font-semibold flex">
                    <span className="md:hidden tracking-widest">
                      {trip.sI.length === 1
                        ? trip.sI[0].aa.code
                        : trip.sI[trip.sI.length - 1].aa.code}{" "}
                    </span>

                    <span className="hidden  md:block ">
                      {trip.sI.length === 1
                        ? trip.sI[0].aa.name
                        : trip.sI[trip.sI.length - 1].aa.name}
                    </span>
                  </div>
                </div>

                <div className="w-full flex md:w-[30%] lg:w-[40%]     space-x-4 ">
                  <div className=" w-full  flex justify-between flex-row md:flex-col items-center gap-4 ">
                    <div className="  text-sm md:text-base font-bold">
                      {formatTime(trip.sI[0].dt)}
                    </div>

                    <div className="text-sm md:text-base font-bold">
                      {trip.sI.length === 1
                        ? formatTime(trip.sI[0].at)
                        : formatTime(trip.sI[trip.sI.length - 1].at)}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="flex w-full  sm:w-[40%]  justify-around md:w-1/2    gap-5   ">
              <div className="flex flex-col justify-evenly   sm:flex-col gap-3  sm:w-1/2">
                <div className="flex items-center gap-1">
                  <div className="text-[1.5rem] text-sky-600 bg-slate-300 p-1 rounded-md">
                    <MdOutlineDateRange />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Date</div>
                    <div className="font-medium text-sm md:text-[15px]  ">
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
                    <div className="font-medium text-sm md:text-[15px]">
                      {formatTime(trip.sI[0].dt)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col  sm:flex-col justify-evenly   sm:w-1/2 gap-3">
                <div className="flex items-center gap-1">
                  <div className="text-[1.5rem] text-sky-600 bg-slate-300 p-1 rounded-md">
                    <BsDoorClosedFill />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Gate</div>
                    <div className="font-bold  text-sm md:text-[15px]">
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
                    <div className="font-medium text-sm md:text-[15px]">{trip.sI.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex  gap-1 flex-row   lg:w-[20%] xl:w-[25%] md:space-x-4 ">
        <button 
          onClick={() => DownloadInvoice()}
          className="bg-[#007EC4] text-sm  text-white px-2 xl:px-4 py-1 xl:py- rounded-sm mb-4 md:mb-0"
        >
          Download Ticket
        </button>
        <button
          className="text-[#007EC4] text-sm border border-[#007EC4] bg-white px-2 xl:px-4 py-1 xl:py-2 rounded-sm mb-4 md:mb-0 "
          onClick={getSingleTripDetailHandler}
        >
          Details
        </button>
      </div>
  

      
    </div>

  );
};

export default FlightTicket;





