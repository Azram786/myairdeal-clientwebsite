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
import defaultAirline from "../../../assets/home/logo/defaultAirline.png";

const ViewDetailedBookingCard = ({
  singleBookingData,
  searchQuery,
  amendment,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const [openConnectionIndex, setOpenConnectionIndex] = useState(null);
  let previousArrivalTime = null;

  const toggleDropdown = (index) => {
    setOpenConnectionIndex(openConnectionIndex === index ? null : index);
  };

  return (
    <div className=" border-l-0 w-full lg:w-[72%]">
      <div className="rounded-lg my-2">
        <div className="flex justify-between items-center bg-[white] border-2 flex-wrap p-4 rounded-t-xl text-[black]">
          <div className="flex w-full  flex-col md:flex-row justify-end ">
            <div className="">
              {" "}
              <div className="h-16 w-16 flex items-center justify-center bg-[#1B1D29] border-2 border-white text-[#D7B56D] font-bold text-xl rounded-full ">
                {singleBookingData?.gstInfo?.registeredName
                  ?.charAt(0)
                  .toUpperCase() || user?.firstName.charAt(0)}
              </div>
            </div>

            <div className="w-full pl-4  ">
              <div className="text-base md:text-lg font-semibold uppercase ">
                {/* {user?.firstName} {user?.lastName} */}
                {singleBookingData?.gstInfo?.registeredName || user?.firstName}
              </div>
              <div className="text-base  lg:text-lg  flex-col md:flex-row font-semibold flex w-full justify-between">
                <div className=" flex ">
                  <p className="text-black">ID:</p>
                  <span className="text-slate-600 px-2">
                    {singleBookingData?.order.bookingId}
                  </span>
                </div>
                <div className="text-semibold flex ">
                  <div className="text-lg lg:text-xl pr-2 ">Price: </div>
                  <div className="text-lg lg:text-xl flex flex-wrap">
                    ₹{" "}
                    <span className="">
                      {
                        singleBookingData?.itemInfos?.AIR.totalPriceInfo
                          .totalFareDetail.fC.TF
                      }
                      /-
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {singleBookingData?.itemInfos?.AIR.tripInfos.map((value, index) => {
          console.log({ singleBookingData })
          return (
            <div key={index}>
              <div className="flex flex-wrap gap-2 w-full py-2  lg:flex-row lg-custom:flex-nowrap">
                <div className="border-2 bg-[#dce3e9] flex gap-3 p-2 rounded-lg flex-col w-full lg-custom:w-1/2 ">
                  <div className="  w-full">
                    <div className="  text-left flex pl-2 items-center">
                      <div>
                        {/* <img className="h-[60px]" src={paymentFlight} alt="" /> */}
                        <img
                          src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${value?.sI[0].fD?.aI.code}.png`}
                          onError={(e) =>
                            (e.currentTarget.src = defaultAirline)
                          }
                          alt={value?.sI[0].fD?.aI?.code}
                          className="w-12 h-12 rounded mr-4"
                        />
                      </div>
                      <div className="py-2 flex flex-col justify-between">
                        <div className="flex flex-col gap-1">
                          <div className="text-slate-600 text-base ">
                            {searchQuery?.cabinClass}
                          </div>
                          <div className="font-semibold text-base md:text-lg">
                            {value?.sI[0].fD?.aI.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full  h-full  justify-between items-center ">
                    <div className="w-1/3 flex text-center flex-col gap-1 h-full">

                      <div className="text-sm">
                        <span>{value.sI[0].da.city}, {value.sI[0].da.country}</span>
                      </div>
                      <div className="font-bold text-md">
                        <span>{value.sI[0].da.code}</span>
                      </div>
                      <div className="text-sm  w-full">
                        <span className="w-full">{value.sI[0].da.name}</span>
                      </div>

                    </div>
                    <div className="h-full flex flex-col w-1/3 justify-center">
                      <div className="text-center text-sm font-semibold">
                        {searchQuery.cabinClass}
                      </div>
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
                        <div className="text-center text-sm font-bold text-[#1B1D29]">
                          Stops :  <span>{value.sI.length - 1}</span>
                        </div>
                      )}
                    </div>
                    <div className="w-1/3 flex flex-col gap-1 h-full text-center">

                      <div className="text-sm ">
                        <span>

                          {value.sI.length === 1
                            ? value.sI[0].aa.city
                            : value.sI[value.sI.length - 1].aa.city}
                          ,
                          {value.sI.length === 1
                            ? value.sI[0].aa.country
                            : value.sI[value.sI.length - 1].aa.country}
                        </span>
                      </div>
                      <div className="font-bold text-md">
                        <span>
                          {value.sI.length === 1
                            ? value.sI[0].aa.code
                            : value.sI[value.sI.length - 1].aa.code}
                        </span>
                      </div>
                      <div className=" text-sm">
                        <span>
                          {value.sI.length === 1
                            ? value.sI[0].aa.name
                            : value.sI[value.sI.length - 1].aa.name}
                        </span>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="w-full  flex flex-col lg:items-center justify-center lg:justify-start">
                  <div className="justify-center p-2  rounded-lg flex items-center gap-3">
                    <h1 className="text-base md:text-xl  font-semibold text-gray-800 ">
                      Total Duration :
                    </h1>
                    <h1 className="text-base md:text-xl  font-semibold text-gray-500 uppercase">
                      {value.sI.length === 1
                        ? calculateDuration(value.sI[0].dt, value.sI[0].at)
                        : calculateDuration(
                          value.sI[0].dt,
                          value.sI[value.sI.length - 1].at
                        )}
                    </h1>
                  </div>

                  <div className="grid  grid-cols-2 md:grid-cols-3 items-center justify-center w-[80%] lg:w-full mx-auto  ">
                    <div className="flex  gap-1 items-center sm:w-1/2  my-3 md:w-1/3">
                      <div className="text-[1.2rem] md:text-[1.5rem] text-[#D7B56D] bg-[#1B1D29] p-2 rounded ">
                        <MdDateRange />
                      </div>
                      <div>
                        <div className="text-[#495049] w-max text-xs  md:text-sm lg:text-base font-semibold">
                          Departure Date
                        </div>
                        <div className="font-semibold text-sm ">
                          {dateDateFormatChanger(value.sI[0].dt)}
                        </div>
                      </div>
                    </div>
                    <div className="flex  gap-1 items-center sm:w-1/2 my-3  md:w-1/3">
                      <div className="text-[1.2rem] md:text-[1.5rem] text-[#D7B56D] bg-[#1B1D29] p-2 rounded ">
                        <IoIosTime />
                      </div>
                      <div>
                        <div className="text-[#495049] w-max text-xs md:text-sm lg:text-base font-semibold">
                          Departure Time
                        </div>
                        <div className="font-semibold text-sm ">
                          {timeFormatChanger(value.sI[0].dt)}
                        </div>
                      </div>
                    </div>
                    <div className="flex  gap-1 items-center sm:w-1/2 md:w-1/3 my-3">
                      <div className="text-[1.2rem] md:text-[1.5rem] text-[#D7B56D] bg-[#1B1D29] p-2 rounded ">
                        <BsDoorClosedFill />
                      </div>
                      <div>
                        <div className="text-[#495049] w-max text-xs  md:text-sm lg:text-base font-semibold">
                          Departure Terminal
                        </div>
                        <div className="font-semibold text-sm w-max ">
                          {value.sI[0].da.terminal
                            ? value.sI[0].da.terminal
                            : "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="flex  gap-1 items-center sm:w-1/2  my-3 md:w-1/3">
                      <div className="text-[1.2rem] md:text-[1.5rem] text-[#D7B56D] bg-[#1B1D29] p-2 rounded ">
                        <MdDateRange />
                      </div>
                      <div>
                        <div className="text-[#495049] w-max text-xs  md:text-sm lg:text-base font-semibold">
                          Arrival Date
                        </div>
                        {console.log({ value })}
                        <div className="font-semibold text-sm ">
                          {value.sI.length === 1
                            ? dateDateFormatChanger(value.sI[0].at)
                            : dateDateFormatChanger(
                              value.sI[value.sI.length - 1].at
                            )}

                        </div>
                      </div>
                    </div>
                    <div className="flex  gap-1 items-center sm:w-1/2 my-3  md:w-1/3 ">
                      <div className="text-[1.2rem] md:text-[1.5rem] text-[#D7B56D] bg-[#1B1D29] p-2 rounded  ">
                        <IoIosTime />
                      </div>
                      <div>
                        <div className="text-[#495049] w-max text-xs md:text-sm lg:text-base font-semibold">
                          Arrival time
                        </div>
                        <div className="font-semibold text-sm">
                          {value.sI.length === 1
                            ? timeFormatChanger(value.sI[0].at)
                            : timeFormatChanger(
                              value.sI[value.sI.length - 1].at
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="flex  gap-1 items-center sm:w-1/2 md:w-1/3 my-3">
                      <div className="text-[1.2rem] md:text-[1.5rem] text-[#D7B56D] bg-[#1B1D29] p-2 rounded ">
                        <BsDoorClosedFill />
                      </div>
                      <div>
                        <div className="text-[#495049] w-max text-xs  md:text-sm lg:text-base font-semibold">
                          Arrival Terminal
                        </div>
                        <div className="font-semibold text-sm w-max ">
                          {value.sI[value.sI.length - 1].aa.terminal
                            ? value.sI[value.sI.length - 1].aa.terminal
                            : "N/A"}
                        </div>
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
                      className="bg-[#1B1D29] text-[#D7B56D] w-full py-2 rounded-lg"
                    >
                      {openConnectionIndex === index
                        ? "Hide Connections"
                        : "View Connections"}
                    </button>
                    {openConnectionIndex === index && (
                      <div className="bg-[#f7eed8] text-[#1B1D29] p-2">
                        {value.sI.map((singleValue, index) => {
                          const layoverDuration = previousArrivalTime
                            ? calculateDuration(
                              previousArrivalTime,
                              singleValue.dt
                            )
                            : null;
                          previousArrivalTime = singleValue.at;

                          return (
                            <React.Fragment key={index}>
                              {index !== 0 && (
                                <div className="text-sm text-gray-500 mt-4">
                                  <div className="flex justify-between bg-[#1B1D29] text-[#D7B56D] p-3 rounded-md mt-4 mb-4">
                                    <div className="text-sm">
                                      Require to change plane
                                    </div>
                                    <div className="text-base font-medium">
                                      <span className="text-sm">
                                        <div className="text-center">
                                          <span className="text-sm">
                                            Total Layover Time:{" "}
                                            {layoverDuration}
                                          </span>
                                        </div>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="font-semibold text-xs border  rounded-md inline-flex items-center shadow-md p-1 space-x-2">
                                <div className="w-5 h-5">
                                  {/* <img
                                            src="https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/AA.png"
                                            alt="Airline Logo"
                                            className="w-full h-full object-contain"
                                          /> */}
                                  <img
                                    src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${value?.sI[0].fD?.aI.code}.png`}
                                    onError={(e) =>
                                      (e.currentTarget.src = defaultAirline)
                                    }
                                    alt={value?.sI[0].fD?.aI?.code}
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
                              <div className="flex items-center justify-center w-full">
                                <div className="flex items-center justify-between mb-4 w-full">
                                  <div className="flex-col  w-1/3">
                                    <div className="w-full">
                                      <div className="mb-2"></div>
                                    </div>
                                    <div className="text-lg font-bold">
                                      {singleValue.da.code}
                                    </div>
                                    <div className="text-sm">
                                      {singleValue.da.city},{" "}
                                      {singleValue.da.country}
                                    </div>
                                    <div className="text-sm font-bold">
                                      {singleValue.da.name}
                                    </div>
                                    <div className="text-sm">
                                      {singleValue.da?.terminal || "N/A"}
                                    </div>
                                    <div className="text-sm font-semibold">
                                      {timeFormatChanger(singleValue.dt)}
                                    </div>
                                  </div>
                                  <div className="flex-col items-center w-1/3">
                                    <div className="text-center">
                                      <span className="text-sm">
                                        {calculateDuration(
                                          singleValue.dt,
                                          singleValue.at
                                        )}
                                      </span>
                                    </div>
                                    <div className="flex justify-center items-center">
                                      <hr className="w-1/3 border-t border-gray-300" />
                                      <MdFlight className="w-7 h-5 mx-2 rotate-90" />
                                      <hr className="w-1/3 border-t border-gray-300" />
                                    </div>
                                    <div className="text-center text-sm">
                                      Non Stop
                                    </div>
                                  </div>

                                  <div className="flex-col  w-1/3">
                                    <div className="w-full">
                                      <div className="mb-2"></div>
                                    </div>
                                    <div className="text-lg font-bold">
                                      {singleValue.aa.code}
                                    </div>
                                    <div className="text-sm">
                                      {singleValue.aa.city},{" "}
                                      {singleValue.aa.country}
                                    </div>
                                    <div className="text-sm font-bold">
                                      {singleValue.aa.name}
                                    </div>
                                    <div className="text-sm">
                                      {singleValue.aa?.terminal || "N/A"}
                                    </div>
                                    <div className="text-sm font-semibold">
                                      {timeFormatChanger(singleValue.at)}
                                    </div>
                                  </div>
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
