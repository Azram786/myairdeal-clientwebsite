import React, { useState, useEffect } from "react";
import { MdFlight } from "react-icons/md";
import { FaRegClock, FaArrowRight } from "react-icons/fa";
import ShowBaggageInfo from "./Util/ShowBaggageInfo";
import axios from "axios";
import { useSelector } from "react-redux";

const Review = ({ setCurrentStep, data, passengersData, saveCommission }) => {
  const token = useSelector((state) => state.auth.token);
  const renderValue = (value) => value || "N/A";
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const renderObjectEntries = (obj, renderFunction) => {
    if (!obj || Object.keys(obj).length === 0) return "N/A";
    return Object.entries(obj).map(([flightId, data]) => (
      <div key={flightId}>{renderFunction(flightId, data)}</div>
    ));
  };

  const calculateLayoverTime = (segments) => {
    if (segments.length <= 1) return null;
    let totalLayoverTime = 0;
    for (let i = 0; i < segments.length - 1; i++) {
      const arrivalTime = new Date(segments[i].at);
      const departureTime = new Date(segments[i + 1].dt);
      totalLayoverTime += (departureTime - arrivalTime) / (1000 * 60);
    }
    const hours = Math.floor(totalLayoverTime / 60);
    const minutes = Math.round(totalLayoverTime % 60);
    return `${hours}h ${minutes}m`;
  };

  const calculateTotalDuration = (segments) => {
    if (!segments || segments.length === 0) return "N/A";
    let totalDuration = 0;
    for (let i = 0; i < segments.length; i++) {
      totalDuration += segments[i].duration;
      if (i < segments.length - 1) {
        const arrivalTime = new Date(segments[i].at);
        const departureTime = new Date(segments[i + 1].dt);
        const layoverTime = (departureTime - arrivalTime) / (1000 * 60);
        totalDuration += layoverTime;
      }
    }
    const hours = Math.floor(totalDuration / 60);
    const minutes = Math.round(totalDuration % 60);
    return `${hours}h ${minutes}m`;
  };

  const getMarkUp = async () => {
    await axios
      .get(`${import.meta.env.VITE_SERVER_URL}markup/get-user-mark-up`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.flatPrice) {
          saveCommission(res.data.value);
        } else if (res.data.percentage) {
          if (res.data.totalFare) {
            const markUpAmount = parseFloat((totalFare / 100) * res.data.value);
            saveCommission(markUpAmount);
          } else if (res.data.baseFare) {
            const bF = data?.totalPriceInfo?.totalFareDetail.fC?.BF;
            const markUpAmount = parseFloat((bF / 100) * res.data.value);
            saveCommission(markUpAmount);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getMarkUp();
  }, []);

  return (
    // <div className="bg-gray-100 sm:text-sm md:text-lg p-2">
    <div className="mx-auto max-w-5xl  font-poppins mb-2">
      {/* <div className="w-full max-w-full rounded-lg bg-white p-2 space-y-4"> */}

      {/* Flight Summary Section */}
      <div className="border-b  border-gray-300 pb-4">
        {data?.tripInfos?.map((item, index) => (
          <div
            key={index}
            className="border  shadow-sm border-gray-300 rounded-lg p-2 mb-4"
          >
            <div className=" flex flex-wrap items-center justify-between bg-[#1B1D29] text-[#D7B56D]  p-2 rounded-t-lg">
              <div className="md:text-base text-sm flex-wrap font-semibold flex items-center justify-between space-x-1">
                <div className="w-max">
                  <span>{item.sI[0].da.city}</span>
                  <FaArrowRight className="mx-2 inline" />
                  <span>{item.sI[item.sI.length - 1].aa.city}</span>
                </div>
                <div className="text-white text-xs md:text-sm ">
                  On{" "}
                  {new Date(item.sI[0].dt).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className="flex justify-center items-center gap-2">
                <div className="text-sm md:text-base   font-semibold text-white flex items-center">
                  <span className="flex sm:hidden mr-2"> Duration:</span>

                  <FaRegClock className="mr-2 " />

                  {calculateTotalDuration(item.sI)}
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col sm:flex-row items-center justify-between bg-blue-200 p-2 rounded-t-lg mb-2">
              <div className="text-base sm:text-lg font-bold flex items-center">
                <span>{item.sI[0].da.city}</span>
                <FaArrowRight className="mx-2 hidden sm:inline" />
                <span>{item.sI[item.sI.length - 1].aa.city}</span>
                <div className="text-gray-600 text-sm mt-1 sm:mt-0 sm:ml-2">
                  On{" "}
                  {new Date(item.sI[0].dt).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className="text-base sm:text-lg font-semibold text-gray-600 flex items-center">
                <FaRegClock className="mr-2" />
                {calculateTotalDuration(item.sI)}
              </div>
            </div> */}
            <div className="mt-4">
              {item.sI.map((segment, segmentIndex) => (
                <React.Fragment key={segmentIndex}>
                  <div className=" flex-wrap sm:flex-nowrap w-full h-full flex items-center justify-between  mb-4 ">
                    <div className="font-semibold text-xs flex flex-col items-start justify-start min-w-36  p-1 space-x-2">
                      <div className="w-16 h-16">
                        <img
                          src={`${
                            import.meta.env.VITE_SERVER_URL
                          }uploads/AirlinesLogo/${segment.fD.aI.code}.png`}
                          onError={(e) =>
                            (e.currentTarget.src = defaultAirline)
                          }
                          alt={segment?.fD?.aI?.code}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="w-max">{segment.fD.aI.name}</div>
                        <div className="flex items-center  space-x-1">
                          <span>
                            {segment.fD.aI.code}-{segment.fD.fN}
                          </span>
                          <MdFlight className="w-3 h-3 rotate-45" />
                          <span>{segment.fD.eT}</span>
                        </div>
                        {segment.id}
                      </div>
                    </div>
                    <div className=" flex w-full sm:min-w-[80%]">
                      <div className=" flex-col text-left items-center w-full  sm:min-w-[20%]">
                        <div className=" text-lg font-bold">
                          {segment.da.code}
                        </div>

                        <div className="text-xs md:text-sm font-semibold">
                          <div className="mr-1">
                            {" "}
                            {new Date(segment.dt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                            ,
                            {new Date(segment.dt).toLocaleDateString("en-US", {
                              weekday: "short",
                            })}{" "}
                            {new Date(segment.dt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                          </div>
                        </div>
                        <div className="text-xs md:text-sm line-clamp-1">
                          {segment.da.city}, {segment.da.country}
                        </div>
                        <div className="relative text-xs md:text-sm group">
                          <span>{segment.da.name}</span>
                          <div className="absolute left-0 bottom-full first-letter:uppercase hover:flex hover:flex-wrap p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            {segment.da.name}
                          </div>
                        </div>

                        <div className="text-xs md:text-sm">
                          {segment.da.terminal || "N/A"}
                        </div>
                      </div>
                      <div className="flex-col items-center text-center  p-4 xs:pr-16 sm:pr-10 md:pr-0 min-w-[20%]">
                        <div className="text-center">
                          <span className="text-xs">
                            {(() => {
                              const totalMinutes = segment.duration;
                              const hours = Math.floor(totalMinutes / 60);
                              const minutes = totalMinutes % 60;
                              return `${hours}h ${minutes}m`;
                            })()}
                          </span>
                        </div>
                        <div className="flex justify-center items-center">
                          <hr className="w-1/3 border-t border-gray-300" />
                          <MdFlight className="w-7 h-5 mx-2 rotate-90" />
                          <hr className="w-1/3 border-t border-gray-300" />
                        </div>
                        <div className="text-center text-sm">
                          {/* {item.sI.length === 1 ? "Non Stop" : "Connection"} */}
                          <div className="font-bold text-xs md:text-sm">
                            {data?.searchQuery?.cabinClass || "No-Class"}
                          </div>
                          <p className="text-xs">Non Stop</p>
                        </div>
                      </div>
                      <div className="flex-col  w-full md:min-w-[20%]  md:ml-24 items-center text-left  ">
                        <div className="text-base md:text-lg font-bold">
                          {segment.aa.code}
                        </div>
                        <div className="text-xs md:text-sm font-semibold">
                          <div className="mr-1">
                            {" "}
                            {new Date(segment.dt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                            ,
                            {new Date(segment.dt).toLocaleDateString("en-US", {
                              weekday: "short",
                            })}{" "}
                            {new Date(segment.at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                          </div>
                        </div>
                        <div className="text-xs md:text-sm  line-clamp-1">
                          {segment.aa.city}, {segment.aa.country}
                        </div>

                        <div className="relative text-xs md:text-sm group">
                          <span>{segment.da.name}</span>
                          <div className="absolute left-0 bottom-full first-letter:uppercase hover:flex hidden:flex-wrap p-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            {segment.da.name}
                          </div>
                        </div>

                        <div className="text-xs md:text-sm">
                          {segment?.aa?.terminal || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full  justify-center items-center  ">
                    {/* Bag Icon */}

                    <ShowBaggageInfo item={item} />
                  </div>
                  <div className="text-sm text-gray-500 mt-4 justify-center items-center flex ">
                    {/* <span>
                      There is a Special No Meal fare Provided by the Airline
                    </span> */}
                    {segmentIndex !== item.sI.length - 1 && (
                      <div className="flex justify-between bg-[#FFDE99] text-black p-3 rounded-xl mt-2 mb-4 w-full md:w-[70%]">
                        <div className="text-xs md:text-sm">
                          Require to change plane
                        </div>
                        <div className="text-base font-medium">
                          <span className="text-sm">
                            {item.sI.length > 1 && (
                              <div className="text-center flex justify-center items-center">
                                <span className="text-xs md:text-sm">
                                  Total Layover Time:{" "}
                                  <span className="font-bold">
                                    {calculateLayoverTime(item.sI)}
                                  </span>
                                </span>
                              </div>
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
      {console.log({ passengersData }, "passengersData")}
      {/* Passenger & Contact Details Section */}
      <div className="mb-6 overflow-x-scroll">
        <h2 className="text-xl font-semibold mb-4 mt-2">Passenger Details</h2>
        <div className="overflow-auto">
          <table className="min-w-full bg-white  rounded-lg">
            <thead className="sticky top-0 bg-gray-100">
              <tr className="text-left">
                <th className="py-2 px-4  text-sm w-max md:min-w-[11rem]">
                  Sl No
                </th>
                <th className="py-2 px-4  text-sm w-max md:min-w-[11rem]">
                  Name
                </th>
                <th className="py-2 px-4 text-sm w-max md:min-w-[11rem]">
                  Seat Booking
                </th>
                <th className="py-2 px-4 text-sm w-max md:min-w-[11rem]">
                  Meal and Baggage
                </th>
              </tr>
            </thead>
            <tbody>
              {passengersData?.passengers?.map((passenger, index) => {
                return (
                  <tr key={index} className="h-12 border-t">
                    <td className="py-2 px-4 border-b text-xs min-w-[11rem]">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border-b text-xs min-w-[11rem]">
                      {`${passenger.title || ""} ${passenger.firstName || ""} ${
                        passenger.lastName || ""
                      }`}
                      {passenger.passportNumber && (
                        <div className="mt-1 text-xs text-gray-600">
                          {`Passport Number: ${passenger.passportNumber}`}
                        </div>
                      )}
                    </td>

                    <td className="py-2 px-4 border-b text-xs min-w-[11rem]">
                      {passenger.selectedSeat &&
                      passenger.selectedSeat.length > 0
                        ? passenger.selectedSeat.map((seat, seatIndex) => (
                            <div key={seatIndex}>
                              Seat: FlightId-{seat?.key}
                              <br /> {seat.code} (₹{seat.amount})
                            </div>
                          ))
                        : "No seat selected"}
                    </td>
                    <td className="py-2 px-4 border-b text-xs min-w-[11rem]">
                      <div>
                        {passenger.selectedMeal &&
                          passenger.selectedMeal.length > 0 && (
                            <div>
                              {passenger.selectedMeal.map((meal, mealIndex) => (
                                <div key={mealIndex}>
                                  Meal: FLightID-{meal.key}
                                  <br />
                                  {meal.code} - {meal.desc} (₹
                                  {meal.amount})
                                </div>
                              ))}
                            </div>
                          )}
                        {passenger.selectedBaggage &&
                          passenger.selectedBaggage.length > 0 && (
                            <div>
                              {passenger.selectedBaggage.map(
                                (baggage, baggageIndex) => (
                                  <div key={baggageIndex}>
                                    Baggage: Flight Id-{baggage.key}
                                    <br />
                                    {baggage.code} - {baggage.desc} (₹
                                    {baggage.amount})
                                  </div>
                                )
                              )}
                            </div>
                          )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div>Terms and Conditions</div>

      <label className="flex items-center mt-2">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 white border-gray-300 rounded focus:ring-[#1B1D29] focus:outline-none"
          checked={isTermsChecked}
          onChange={(e) => setIsTermsChecked(e.target.checked)}
        />
        <span className="ml-3 text-sm font-semibold">
          I agree to the Terms and Conditions
        </span>
      </label>

      <div className="flex justify-between items-center bg-gray-200 p-2 rounded-lg shadow-md mt-4">
        <button
          onClick={() => setCurrentStep(1)}
          className="bg-[#1B1D29] hover:bg-[#D7B56D] hover:text-black text-white text-sm md:text-base py-2 px-4 rounded-md focus:outline-none"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          className={`${
            isTermsChecked
              ? "bg-[#1B1D29] hover:bg-[#D7B56D] hover:text-black"
              : "bg-gray-400 cursor-not-allowed"
          } text-white text-sm md:text-base py-2 px-4 rounded-md focus:outline-none`}
          disabled={!isTermsChecked}
        >
          Continue to Payment
        </button>
      </div>
      {/* </div> */}
      {/* </div> */}
    </div>
    // <div className="mx-auto max-w-5xl bg-red-400 font-poppins mb-2 ">
    //   <div className="w-full bg-green-400 ">
    //     <div className="flex ">
    //       <div className="flex justify-center items-center max-h-36">
    //         <div className="w-32 h-32 m-2 bg-red-800"></div>
    //         <div className="p-2"><p>Classtype</p>
    //         <p>Airline</p>
    //         <p>Checkin Details</p></div>

    //       </div>
    //     </div>
    //   </div>
    //   <div></div>
    //   <div></div>
    // </div>
  );
};

export default Review;
