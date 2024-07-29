import React, { useState } from "react";

import { MdFlight } from "react-icons/md";
import {
  FaChevronDown,
  FaChevronUp,
  FaRegClock,
  FaArrowRight,
  FaSuitcaseRolling,
} from "react-icons/fa";
import ProgressBar from "./ProgressBar";
import Review from "./Review";
import AddDetails from "./flightSummary/addDetails";
import { ApiData } from "./dummy-meal";
import { useLocation } from "react-router-dom";

const FlightSummary = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const location = useLocation();
  const { bookings } = location.state || {};

  console.log(bookings,"booking")

  const handleSaveAndContinue = () => {
    setCurrentStep((prevStep) => (prevStep < 2 ? prevStep + 1 : prevStep));
  };

  const handleStepClick = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  //Price

  const [taxesExpanded, setTaxesExpanded] = useState(false);
  const [amountExpanded, setAmountExpanded] = useState(false);

  const toggleTaxes = () => setTaxesExpanded(!taxesExpanded);
  const toggleAmount = () => setAmountExpanded(!amountExpanded);
  // ------------------------------------------------------------

  function calculateLayoverTime(segments) {
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
  }

  function calculateTotalDuration(segments) {
    if (!segments || segments.length === 0) return "N/A";

    let totalDuration = 0;

    for (let i = 0; i < segments.length; i++) {
      // Add flight duration
      totalDuration += segments[i].duration;

      // Add layover time if there's a next segment
      if (i < segments.length - 1) {
        const arrivalTime = new Date(segments[i].at);
        const departureTime = new Date(segments[i + 1].dt);
        const layoverTime = (departureTime - arrivalTime) / (1000 * 60); // in minutes
        totalDuration += layoverTime;
      }
    }

    const hours = Math.floor(totalDuration / 60);
    const minutes = Math.round(totalDuration % 60);
    return `${hours}h ${minutes}m`;
  }

  const flightData = {
    fromRoute: "Bangalore",
    durationRoute: "01:45",
    toRoute: "Hyderabad",
    date: "June 25, 2024",
    airline: {
      code: {
        from: "BNG",
        to: "HYD",
      },
      fromCity: "Bengaluru, India",
      toCity: "Hyderabad, India",
      fromAirport: "Bengaluru Intel Airport",
      toAirport: "Shamshabad Rajiv",
      departureTime: "7:00 AM",
      arrivalTime: "8:45 AM",
      flightType: "Non Stop",
      fareDetails: "There is a Special No Meal fare Provided by the Airline",
      bagDetails: {
        weight: "7kgs",
      },
    },
    note: "The Fare Rules for your flight selection have changed. Please review them before proceeding.",
    aircraft: {
      class: "Economy",
      name: "Emirates A380 Airbus",
      rating: "4.2",
      reviews: "(54 reviews)",
      prices: {
        baseFare: "5600",
        discount: "600",
        taxes: "1400",
        serviceFee: "400",
        total: "6800",
      },
      protection: "Your booking is protected by MY AIR DEAL",
    },
  };

  return (
    <div className="container mx-auto p-2 max-w-5xl font-poppins ">
      <ProgressBar currentStep={currentStep} onStepClick={handleStepClick} />

      <div className="flex flex-col md:flex-row gap-4 p-2 ">
        {/* Left section */}

        <div className="w-full rounded-lg  bg-white p-2 space-y-4">
          {currentStep === 0 ? (
            <>
              <div className="border-b border-gray-300 pb-4 ">
                {ApiData.tripInfos.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-lg p-2 mb-4"
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-blue-200 p-2 rounded-t-lg">
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
                      <div className=" text-base sm:text-lg font-semibold text-gray-600 flex items-center">
                        <FaRegClock className="mr-2" />
                        {calculateTotalDuration(item.sI)}
                      </div>
                    </div>
                    <div className="mt-4">
                      {item.sI.map((segment, index) => (
                        <React.Fragment key={index}>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex-col w-1/3 ">
                              <div className="w-full">
                                <div className="mb-2">
                                  <div className="font-semibold text-xs border rounded-md inline-flex items-center shadow-md p-1 space-x-2">
                                    <div className="w-5 h-5">
                                      <img
                                        src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${segment.fD.aI.code}.png`}
                                        alt="Airline Logo"
                                        className="w-full h-full object-contain"
                                      />
                                    </div>
                                    <div>
                                      <div>{segment.fD.aI.name}</div>
                                      <div className="flex items-center space-x-1">
                                        <span>
                                          {segment.fD.aI.code}-{segment.fD.fN}
                                        </span>
                                        <MdFlight className="w-3 h-3 rotate-45" />
                                        <span>{segment.fD.eT}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="text-lg font-bold ">
                                {segment.da.code}
                              </div>
                              <div className="text-sm">
                                {segment.da.city}, {segment.da.country}
                              </div>

                              <div className="text-sm">{segment.da.name}</div>
                              <div className="text-sm">
                                {segment.da.terminal}
                              </div>
                              <div className="text-sm font-semibold">
                                {new Date(segment.dt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </div>
                            </div>
                            <div className="flex-col items-center w-1/3">
                              <div className="text-center">
                                <span className="text-sm">
                                  {(() => {
                                    const totalMinutes = segment.duration;
                                    const hours = Math.floor(totalMinutes / 60);
                                    const minutes = totalMinutes % 60;
                                    return `${hours}h ${minutes}m`;
                                  })()}
                                </span>
                              </div>

                              <div className="flex justify-center items-center">
                                <hr className="w-1/3 border-t border-gray-300 " />
                                <MdFlight className="w-7 h-5 mx-2 rotate-90" />
                                <hr className="w-1/3 border-t border-gray-300" />
                              </div>
                              <div className="text-center text-sm">
                                {item.sI.length === 1
                                  ? "Non Stop"
                                  : "connection"}
                              </div>
                            </div>
                            <div className="flex-col w-1/3 text-right">
                              <div className="text-lg font-bold">
                                {segment.aa.code}
                              </div>
                              <div className="text-sm">
                                {segment.aa.city}, {segment.aa.country}
                              </div>
                              <div className="text-sm">{segment.aa.name}</div>
                              <div className="text-sm">
                                {segment.aa.terminal}
                              </div>
                              <div className="text-sm font-semibold">
                                {new Date(segment.at).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </div>
                            </div>
                          </div>

                          <div className="text-sm text-gray-500 mt-4">
                            <span>
                              There is a Special No Meal fare Provided by the
                              Airline
                            </span>
                            {index !== item.sI.length - 1 && (
                              <div className="flex justify-between bg-blue-900 text-white p-3 rounded-md mt-4 mb-4">
                                <div className="text-sm">
                                  Require to change plane
                                </div>
                                <div className="text-base font-medium">
                                  <span className="text-sm">
                                    {item.sI.length > 1 && (
                                      <div className="text-center">
                                        <span className="text-sm">
                                          Total Layover Time:{" "}
                                          {calculateLayoverTime(item.sI)}
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

              <div className="flex justify-center mt-6">
                <button
                  className="w-full sm:w-auto h-12 p-2 px-6 font-poppins bg-blue-500 text-white rounded-md text-lg"
                  onClick={handleSaveAndContinue}
                >
                  Save and Continue
                </button>
              </div>
            </>
          ) : currentStep === 1 ? (
            <AddDetails Step={handleSaveAndContinue} />
          ) : (
            <Review />
          )}
        </div>

        {/* Right Section */}
        <div className="md:w-2/5 lg:w-1/3 xl:w-3/10 mt-4 md:mt-0 font-poppins">
          <div className="w-full rounded-lg border border-gray-300 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between border-b border-gray-300 pb-4">
              <div>
                <span className="font-bold text-2xl">FARE SUMMARY</span>
              </div>
            </div>

            <div className="text-gray-700 mt-6 space-y-3">
              {ApiData.tripInfos.map((item, index) => (
                <div key={index} className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-base font-medium">
                    <span>Base fare</span>
                    <span>{item.totalPriceList[0].fd.ADULT.fC.BF}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <div
                      className="flex justify-between text-base font-medium cursor-pointer"
                      onClick={toggleTaxes}
                    >
                      <span>Taxes and fees</span>
                      <div className="flex items-center">
                        <span>{item.totalPriceList[0].fd.ADULT.fC.TAF}</span>
                        {taxesExpanded ? (
                          <FaChevronUp className="ml-2" />
                        ) : (
                          <FaChevronDown className="ml-2" />
                        )}
                      </div>
                    </div>
                    {taxesExpanded && (
                      <div className="text-sm text-gray-500 mt-2 space-y-1">
                        <div className="flex justify-between">
                          <span>Airline GST</span>
                          <span>
                            {item.totalPriceList[0].fd.ADULT.fC.TAF.AGST}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Other Taxes</span>
                          <span>
                            {item.totalPriceList[0].fd.ADULT.fC.TAF.OT}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>YR</span>
                          <span>
                            {item.totalPriceList[0].fd.ADULT.fC.TAF.YR}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="border-t border-gray-200 pt-3">
                <div
                  className="flex justify-between text-base font-bold cursor-pointer"
                  onClick={toggleAmount}
                >
                  <span>Amount to Pay</span>
                  <div className="flex items-center">
                    <span>13,199.00</span>
                    {amountExpanded ? (
                      <FaChevronUp className="ml-2" />
                    ) : (
                      <FaChevronDown className="ml-2" />
                    )}
                  </div>
                </div>
                {amountExpanded && (
                  <div className="text-sm text-gray-500 mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span>Commission</span>
                      <span>-0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TDS</span>
                      <span>+0.00</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Net Price</span>
                      <span>13,199.00</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSummary;
