import React, { useEffect, useMemo, useState } from "react";

import { MdFlight } from "react-icons/md";
import {
  FaChevronDown,
  FaChevronUp,
  FaRegClock,
  FaArrowRight,
} from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import ProgressBar from "./ProgressBar";
import Review from "./Review";
import AddDetails from "./flightSummary/addDetails";
import { ApiData } from "./dummy-meal";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultAirline from "../../assets/home/logo/defaultAirline.png";
import { set } from "react-hook-form";
import PaymentPage from "./PaymentPage";
import SessionTimer from "./SessionTimer";
import ReactToast from "./Util/ReactToast";

const FlightSummary = ({ flightData, passenger }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState(null);
  const [passengersData, setPassengerData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [isSeatMapLoading, setIsSeatMapLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  // const [Passenger, setPassenger] = useState(null);

  const location = useLocation();
  const [seatMapData, setSeatMapData] = useState(null); // For seat map API
  const { bookings } = location.state || {};
  const navigate = useNavigate()
  const bookingArray = useMemo(() => {
    return bookings ? bookings.map(item => item.priceId) : [];
  }, [bookings]);

  useEffect(() => {
    if (!bookings || bookings.length === 0 || bookingArray.length === 0) {
      navigate('/search');
    }
  }, [bookings, bookingArray, navigate]);

  const handleStepClick = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const handleDataFromChild = (data) => {
    console.log("first", data);
    setPassengerData(data);
  };

  const getData = async () => {
    setLoading(true);
    await axios
      .post(
        `https://myairdeal-backend.onrender.com/booking/review-price`,
        {
          priceIds: bookingArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        console.log(res.data, "response datattata");
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        ReactToast('Some error occurred please try again')
        navigate('/')
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  //  Seat Map API Call  //

  const handleSaveAndContinue = async () => {
    setCurrentStep((prevStep) => (prevStep < 2 ? prevStep + 1 : prevStep));
    // if (data) {
    //   setPassenger(data);
    // }
  };

  //Price

  const [taxesExpanded, setTaxesExpanded] = useState(
    ApiData.tripInfos.map(() => false)
  );
  const [amountExpanded, setAmountExpanded] = useState(
    ApiData.tripInfos.map(() => false)
  );

  const toggleTaxes = (index) => {
    setTaxesExpanded((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };

  const toggleAmount = (index) => {
    setAmountExpanded((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };
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

  return (
    <div className="bg-gray-100 min-h-screen sm:text-sm md:text-lg p-2">
      {Loading ? (
        <div>Loading...</div>
      ) : (
        <div className="container mx-auto md:p-2 max-w-5xl font-poppins">
          <ProgressBar
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />

          <div className="flex flex-col md:flex-row gap-4 p-2 ">
            {/* Left section */}

            <div className="w-full md:w-[70%] rounded-lg bg-white md:p-2 space-y-4">
              {currentStep === 0 ? (
                <>
                  <div className="border-b border-gray-300 pb-4 ">
                    {data?.tripInfos?.map((item, index) => (
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
                              {new Date(item.sI[0].dt).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
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
                                        <div className="w-8 h-8">
                                          {/* <img
                                            src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${segment.fD.aI.code}.png`}
                                            alt="Airline Logo"
                                            className="w-full h-full object-contain"
                                          /> */}
                                          <img
                                            src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${segment.fD.aI.code}.png`}
                                            onError={(e) =>
                                            (e.currentTarget.src =
                                              defaultAirline)
                                            }
                                            alt={segment?.fD?.aI?.code}
                                            className="w-full h-full object-contain "
                                          />
                                        </div>
                                        <div>
                                          <div>{segment.fD.aI.name}</div>
                                          <div className="flex items-center space-x-1">
                                            <span>
                                              {segment.fD.aI.code}-
                                              {segment.fD.fN}
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

                                  <div className="text-sm">
                                    {segment.da.name}
                                  </div>
                                  <div className="text-sm">
                                    {segment.da.terminal}
                                  </div>
                                  <div className="text-sm font-semibold">
                                    {new Date(segment.dt).toLocaleTimeString(
                                      [],
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                      }
                                    )}
                                  </div>
                                </div>
                                <div className="flex-col items-center w-1/3">
                                  <div className="text-center">
                                    <span className="text-sm">
                                      {(() => {
                                        const totalMinutes = segment.duration;
                                        const hours = Math.floor(
                                          totalMinutes / 60
                                        );
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
                                  <div className="text-sm">
                                    {segment.aa.name}
                                  </div>
                                  <div className="text-sm">
                                    {segment.aa.terminal}
                                  </div>
                                  <div className="text-sm font-semibold">
                                    {new Date(segment.at).toLocaleTimeString(
                                      [],
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="text-sm text-gray-500 mt-4">
                                <span>
                                  There is a Special No Meal fare Provided by
                                  the Airline
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

                  <div className="flex justify-center py-3 px-4">
                    <button
                      className="w-full sm:w-3/4 md:w-1/2 h-10 sm:h-12 px-4 sm:px-6 font-poppins bg-blue-500 text-white rounded-md text-sm sm:text-base flex items-center justify-center"
                      onClick={handleSaveAndContinue}
                    >
                      {isSeatMapLoading ? (
                        <FaSpinner className="animate-spin mr-2 text-xs sm:text-base" />
                      ) : (
                        "Save and Continue"
                      )}
                    </button>
                  </div>
                </>
              ) : currentStep === 1 ? (
                <AddDetails
                  bookingId={data?.bookingId}
                  Step={handleSaveAndContinue}
                  flightData={data}
                  onData={handleDataFromChild}
                  setCurrentStep={setCurrentStep}
                />
              ) : currentStep === 2 ? (
                <>
                  {console.log("hehe")}
                  <Review
                    setCurrentStep={setCurrentStep}
                    data={data}
                    passengersData={passengersData}
                  // updatePssenger={updatePssenger}
                  />
                </>
              ) : currentStep === 3 ? (
                <>
                  {console.log("hehe")}
                  <PaymentPage
                    data={data}
                    passengersData={passengersData}
                  // updatePssenger={updatePssenger}
                  />
                </>
              ) : null
              }
            </div>

            {/* Right Section */}
            <div className=" md:w-[30%] rounded-lg bg-white p-2 space-y-4">
              <div className="w-full max-w-full rounded-lg bg-white">
                <div className="flex items-center justify-between border-b border-gray-300 pb-4">
                  <div>
                    <span className="font-bold text-lg md:text-xl lg:text-2xl">
                      FARE SUMMARY
                    </span>
                  </div>
                </div>

                <div className="text-gray-700 mt-4 md:mt-6  space-y-4 md:space-y-6">
                  <div className=" pt-3">
                    <div className="flex justify-between text-xs md:text-sm lg:text-base font-medium">
                      <span>Base fare</span>
                      <span>
                        {data?.totalPriceInfo?.totalFareDetail?.fC?.BF}
                      </span>
                    </div>

                    <div className="mt-2">
                      <div
                        className="flex justify-between text-xs md:text-sm lg:text-base font-medium cursor-pointer"
                        onClick={() => toggleTaxes()}
                      >
                        <span>Taxes and fees</span>
                        <div className="flex items-center">
                          <span>
                            {data?.totalPriceInfo?.totalFareDetail?.fC?.TAF}
                          </span>
                          {taxesExpanded ? (
                            <FaChevronUp className="ml-2 text-xs md:text-sm lg:text-base" />
                          ) : (
                            <FaChevronDown className="ml-2 text-xs md:text-sm lg:text-base" />
                          )}
                        </div>
                      </div>
                      {taxesExpanded && (
                        <div className="text-xs md:text-sm lg:text-base text-gray-500 mt-2 space-y-1">
                          <div className="flex justify-between">
                            <span>Airline GST</span>
                            <span>
                              {
                                data?.totalPriceInfo?.totalFareDetail?.afC?.TAF
                                  ?.AGST
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Other Taxes</span>
                            <span>
                              {
                                data?.totalPriceInfo?.totalFareDetail?.afC?.TAF
                                  ?.OT
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>YR</span>
                            <span>
                              {
                                data?.totalPriceInfo?.totalFareDetail?.afC?.TAF
                                  ?.YR
                              }
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-2">
                      <div
                        className="flex justify-between text-xs md:text-sm lg:text-base font-bold cursor-pointer"
                        onClick={() => toggleAmount()}
                      >
                        <span>Amount to Pay</span>
                        <div className="flex items-center">
                          <span>
                            {data?.totalPriceInfo?.totalFareDetail?.fC?.TF}
                          </span>
                          {amountExpanded ? (
                            <FaChevronUp className="ml-2 text-xs md:text-sm lg:text-base" />
                          ) : (
                            <FaChevronDown className="ml-2 text-xs md:text-sm lg:text-base" />
                          )}
                        </div>
                      </div>
                      {amountExpanded && (
                        <div className="text-xs md:text-sm lg:text-base text-gray-500 mt-2 space-y-1">
                          <div className="flex justify-between">
                            <span>Commission</span>
                            <span>N/A</span>
                          </div>
                          <div className="flex justify-between">
                            <span>TDS</span>
                            <span>N/A</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Net Price</span>
                            <span>
                              {data?.totalPriceInfo?.totalFareDetail?.fC?.NF}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {data?.conditions?.st &&
        <SessionTimer sessionTimeout={data?.conditions?.st} />}

    </div>
  );
};

export default FlightSummary;
