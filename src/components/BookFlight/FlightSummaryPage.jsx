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
import Spinner from "../Profile/Spinner";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import FlightLanding from "../../assets/booking/viewDetailedBookings/flightLanding.svg"

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
  const navigate = useNavigate();
  const bookingArray = useMemo(() => {
    return bookings ? bookings.map((item) => item.priceId) : [];
  }, [bookings]);

  useEffect(() => {
    if (!bookings || bookings.length === 0 || bookingArray.length === 0) {
      navigate("/search");
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
        ReactToast("Some error occurred please try again");
        navigate("/");
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

  const [taxesExpanded, setTaxesExpanded] = useState(false);
  const [amountExpanded, setAmountExpanded] = useState(false);

  // const toggleTaxes = (index) => {
  //   setTaxesExpanded((prev) =>
  //     prev.map((value, i) => (i === index ? !value : value))
  //   );
  // };
  const toggleTaxes = () => {
    setTaxesExpanded((prev) => !prev);
  };

  // const toggleAmount = (index) => {
  //   setAmountExpanded((prev) =>
  //     prev.map((value, i) => (i === index ? !value : value))
  //   );
  // };

  const toggleAmount = () => {
    setAmountExpanded((prev) => !prev);
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



  if (Loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex-col flex gap-3">
          <Spinner /> <h1 className="italic">Loading Please wait...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen my-auto " >
      <Header />
      <div className="  sm:text-sm md:text-lg w-[80vw]  mx-auto pt-4 ">

        <div className="flex flex-col w-full   md:flex-row gap-4   
           ">
          {/* Left section */}
          <div className="w-full md:w-[75%] rounded-lg     space-y-4">

            <div className=" w-full ">
              <ProgressBar
                currentStep={currentStep}
                onStepClick={handleStepClick}
              />
            </div>
            {currentStep === 0 ? (
              <>
                <div className="  pb-4  ">
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
                            <div className="flex flex-col md:flex-row md:items-center   justify-between  mb-4 ">


                              <div className="md:w-[20%]  ">

                                <div className="font-semibold  text-xs  rounded-md inline-flex md:flex md:h-full md:justify-center md:items-center md:flex-col items-center  s p-1 space-x-2">
                                  <div className="w-8 h-8 md:h-14 md:w-14">

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
                              <div className="flex md:w-[60%] ">

                                <div className="flex-col w-1/3">
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
                                <div className="flex-col items-center justify-center flex  w-1/3">
                                  <div className="text-center flex ">
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
                                  {/* <div className="flex justify-center items-center">
                                
                                    <div className="flex-grow border-t-2 border-gray-500 hidden md:block"></div>

                               
                                    <img className=" mx-2" src={`${FlightLanding}`} alt="Airplane" />

                                   
                                    <div className="flex-grow border-t-2 border-gray-500 hidden md:block"></div>
                                  </div> */}
                                  <div className="flex items-center w-full">
                                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                    <div className="flex-grow h-px bg-gray-300"></div>
                                    <div className="flex items-center mx-2">
                                      <div className="w-16 h-px bg-gray-500"></div>
                                      <img className="w-8 h-8 mx-2" src={FlightLanding} alt="Airplane" />
                                      <div className="w-16 h-px bg-gray-500"></div>
                                    </div>
                                    <div className="flex-grow h-px bg-gray-300"></div>
                                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                  </div>


                                  <div className="text-center text-sm">
                                    {item.sI.length === 1
                                      ? "Non Stop"
                                      : "connection"}
                                  </div>
                                </div>
                                <div className="flex-col w-1/3  text-right">
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
                              <div className="md:w-[15%] ">
                                <div className="flex flex-col justify-center h-full items-center p-4">
                                  {/* Bag Icon */}
                                  <svg
                                    className="w-12 h-12 mb-2"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M12 2C10.35 2 9 3.35 9 5H7.5C6.12 5 5 6.12 5 7.5V18.5C5 19.88 6.12 21 7.5 21H16.5C17.88 21 19 19.88 19 18.5V7.5C19 6.12 17.88 5 16.5 5H15C15 3.35 13.65 2 12 2ZM12 4C12.55 4 13 4.45 13 5H11C11 4.45 11.45 4 12 4ZM7.5 7H16.5C16.78 7 17 7.22 17 7.5V8H7V7.5C7 7.22 7.22 7 7.5 7ZM7 10H17V18.5C17 18.78 16.78 19 16.5 19H7.5C7.22 19 7 18.78 7 18.5V10ZM9 12V14H15V12H9ZM9 16V18H15V16H9Z" />
                                  </svg>

                                  {/* Text Information */}
                                  <div className="text-center text-sm">
                                    <p className="text-gray-500 ">Included</p>
                                    <p className="text-gray-500">Carry on bag</p>
                                    <p className="font-bold">7kgs</p>

                                    <a href="#" className="text-blue-500">Fare details</a>
                                  </div>
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
                    className="w-full sm:w-3/4 md:w-1/2 h-10 sm:h-12 px-4 sm:px-6 font-poppins bg-[#007EC4] text-white rounded-md text-sm sm:text-base flex items-center justify-center"
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
            ) : null}
          </div>
          {/* Right Section */}
          <div className="md:w-[25%] h-full rounded-lg space-y-4 p-5 shadow-md bg-white">
            <div className="w-full max-w-full rounded-lg ">
              <div className="flex items-center justify-between border-b border-gray-300 pb-4">
                <div>
                  <span className="font-bold text-lg md:text-xl lg:text-2xl">
                    FARE SUMMARY
                  </span>
                </div>
              </div>
              <div className="text-gray-700 mt-4 md:mt-6 space-y-4 md:space-y-6">
                <div className="pt-3">
                  <div className="flex justify-between text-xs md:text-sm lg:text-base font-medium">
                    <span>Base fare</span>
                    <span>
                      ₹ {data?.totalPriceInfo?.totalFareDetail?.fC?.BF}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div
                      className="flex justify-between text-xs md:text-sm lg:text-base font-medium cursor-pointer"
                      onClick={toggleTaxes}
                    >
                      <span className="flex items-center justify-center"> Taxes and fees   {taxesExpanded ? (
                        <FaChevronUp className="ml-2 text-xs md:text-sm lg:text-base" />
                      ) : (
                        <FaChevronDown className="ml-2 text-xs md:text-sm lg:text-base" />
                      )}</span>
                      <div className="flex items-center">
                        <span>
                          ₹ {data?.totalPriceInfo?.totalFareDetail?.fC?.TAF}
                        </span>

                      </div>
                    </div>
                    <div
                      className={`transition-max-height duration-300 ease-in-out ${taxesExpanded ? "max-h-[500px]" : "max-h-0"
                        } overflow-y-auto`}
                    >
                      {taxesExpanded && (
                        <div className="text-xs md:text-sm lg:text-base text-gray-500 mt-2 space-y-1">
                          <div className="flex justify-between">
                            <span>Airline GST</span>
                            <span>
                              ₹ {
                                data?.totalPriceInfo?.totalFareDetail?.afC
                                  ?.TAF?.AGST
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Other Taxes</span>
                            <span>
                              ₹ {
                                data?.totalPriceInfo?.totalFareDetail?.afC
                                  ?.TAF?.OT
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>YR</span>
                            <span>
                              ₹ {
                                data?.totalPriceInfo?.totalFareDetail?.afC
                                  ?.TAF?.YR
                              }
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    <div
                      className="flex justify-between text-xs md:text-sm lg:text-base font-bold cursor-pointer"
                      onClick={toggleAmount}
                    >
                      <span className="flex justify-center items-center">Amount to Pay {amountExpanded ? (
                        <FaChevronUp className="ml-2 text-xs md:text-sm lg:text-base" />
                      ) : (
                        <FaChevronDown className="ml-2 text-xs md:text-sm lg:text-base" />
                      )}</span>
                      <div className="flex items-center">
                        <span>
                          ₹ {data?.totalPriceInfo?.totalFareDetail?.fC?.TF}
                        </span>

                      </div>
                    </div>
                    <div
                      className={`transition-max-height duration-300 ease-in-out ${amountExpanded ? "max-h-[500px]" : "max-h-0"
                        } overflow-y-auto`}
                    >
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
                              ₹ {data?.totalPriceInfo?.totalFareDetail?.fC?.NF}
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


        {data?.conditions?.st && (
          <SessionTimer sessionTimeout={data?.conditions?.st} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FlightSummary;