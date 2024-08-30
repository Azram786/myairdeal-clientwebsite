import React, { useEffect, useMemo, useState } from "react";

import { MdFlight } from "react-icons/md";
import {
  FaChevronDown,
  FaChevronUp,
  FaRegClock,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import { FaSpinner } from "react-icons/fa";
import ProgressBar from "./ProgressBar";
import Review from "./Review";
import AddDetails from "./flightSummary/addDetails";
import axios from "axios";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import defaultAirline from "../../assets/home/logo/defaultAirline.png";
import PaymentPage from "./PaymentPage";
import SessionTimer from "./SessionTimer";
import ReactToast from "./Util/ReactToast";
import Spinner from "../Profile/Spinner";
import FlightLanding from "../../assets/booking/viewDetailedBookings/flightLanding.svg";
import ShowBaggageInfo from "./Util/ShowBaggageInfo";
import { setIsaModifySearch } from "../../store/slices/aut.slice";
import "./promo.css";
import AdvertisePromo from "../util/AdvertisePromo";

const FlightSummary = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState(null);
  const [passengersData, setPassengerData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [isSeatMapLoading, setIsSeatMapLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const [seatMapData, setSeatMapData] = useState(null);
  const { bookings } = location.state || {};
  const navigate = useNavigate();
  const [commision, setComission] = useState(0);
  const [promoApplied, setPromoApplied] = useState(null);
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoValue, setPromoValue] = useState(0);
  const bookingArray = useMemo(() => {
    return bookings ? bookings.map((item) => item.priceId) : [];
  }, [bookings]);
  const [passengers, setPassengers] = useState([]);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!bookings || bookings.length === 0 || bookingArray.length === 0) {
      navigate("/search");
    }
  }, [bookings, bookingArray, navigate]);

  const saveCommission = (commission) => {
    setComission(commission);
  };

  const handleStepClick = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const handleDataFromChild = (data) => {
    setPassengerData(data);
  };

  const getData = async () => {
    setLoading(true);
    await axios
      .post(
        `https://api.myairdeal.com/booking/review-price`,
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

        setData(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.errors[0].message);
        setLoading(false);
        if (error?.response?.data?.errors[0]?.message) {
          setError(error.response.data.errors[0].message);
        } else {
          setError("Server Error");
        }
        // navigate("/");
        // console.log(error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

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
  const [mealExpanded, setIsMealExpanded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsaModifySearch(false));
  }, []);

  // const toggleTaxes = (index) => {
  //   setTaxesExpanded((prev) =>
  //     prev.map((value, i) => (i === index ? !value : value))
  //   );
  // };
  const toggleTaxes = () => {
    setTaxesExpanded((prev) => !prev);
  };

  const toggleMeal = () => {
    setIsMealExpanded(!mealExpanded);
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

  //my code

  const calculateExtrasTotal = () => {
    return passengers.reduce((total, passenger) => {
      const mealsTotal =
        passenger.selectedMeal?.reduce((sum, meal) => sum + meal.amount, 0) ||
        0;
      const baggageTotal =
        passenger.selectedBaggage?.reduce(
          (sum, baggage) => sum + baggage.amount,
          0
        ) || 0;
      const seatsTotal =
        passenger.selectedSeat?.reduce((sum, seat) => sum + seat.amount, 0) ||
        0;

      return total + mealsTotal + baggageTotal + seatsTotal;
    }, 0);
  };

  const totalFare = data?.totalPriceInfo?.totalFareDetail?.fC?.TF || 0;
  const extrasTotal = calculateExtrasTotal();
  const amountToPay = totalFare + extrasTotal;

  if (Loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex-col flex gap-3">
          <Spinner /> <h1 className="italic">Loading Please wait...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex-col flex gap-3 ">
          <h1>{error}</h1>
          <button
            className="mt-2 text-sm px-2 py-5 text-[#D7B56D] bg-[#1B1D29] rounded"
            onClick={() => {
              navigate("/search");
            }}
          >
            Click Here to go back to Search Page
          </button>
        </div>
      </div>
    );
  }

  const verifyPromo = async () => {
    if (promoCode === "") {
      ReactToast("Please Enter Promo Code");
      return;
    }
    setPromoLoading(true);
    await axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}promo/check`,
        {
          enteredCode: promoCode,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setPromoApplied(true);
        setPromoLoading(false);
        ReactToast(res.data.message);
        setPromoValue(res.data.value);
      })
      .catch((error) => {
        setPromoLoading(false);
        ReactToast(error.response.data.error);
      });
  };

  return (
    <div className=" min-h-screen my-auto   ">
      {/* <Header /> */}
      <div className="  sm:text-sm md:text-lg w-[90vw] flex-wrap mx-auto pt-4 ">
        <div
          className="flex flex-col w-full  flex-wrap lg-custom:flex-row gap-4   
           "
        >
          {/* Left section */}
          <div className=" rounded-lg w-full lg-custom:w-[67%]    space-y-4">
            <div className=" w-full ">
              <ProgressBar
                currentStep={currentStep}
                onStepClick={handleStepClick}
              />
            </div>
            {currentStep === 0 ? (
              <>
                <div
                  className={`pb-4 border  border-gray-400   h-max ${
                    data?.tripInfos.length > 1
                  } overflow-x-hidden`}
                >
                  <div className="flex justify-end m-2">
                    <button
                      className="w-full sm:w-3/4 md:w-[20%] h-10 sm:h-12 px-4 sm:px-6 font-poppins bg-[#1B1D29] text-[#D7B56D] hover:text-[#1B1D29] hover:bg-[#D7B56D]  rounded-md text-sm sm:text-base flex items-center justify-center"
                      onClick={handleSaveAndContinue}
                    >
                      {isSeatMapLoading ? (
                        <FaSpinner className="animate-spin mr-2 text-xs sm:text-base" />
                      ) : (
                        "Add Details"
                      )}
                    </button>
                  </div>
                  {data?.tripInfos?.map((item, index) => {
                    return (
                      <div key={index} className=" rounded-lg p-2   ">
                        <div className="flex justify-center py-3 px-4"></div>
                        <div className=" flex flex-wrap items-center justify-between bg-[#1B1D29] text-[#D7B56D]  p-2 rounded-t-lg">
                          <div className="md:text-base text-sm flex-wrap font-semibold flex items-center justify-between space-x-1">
                            <div className="w-max">
                              <span>{item.sI[0].da.city}</span>
                              <FaArrowRight className="mx-2 inline" />
                              <span>{item.sI[item.sI.length - 1].aa.city}</span>
                            </div>
                            <div className="text-white text-xs md:text-sm ">
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
                          <div className="flex justify-center items-center gap-2">
                            <div className="text-sm md:text-base   font-semibold text-white flex items-center">
                              <span className="flex sm:hidden mr-2">
                                {" "}
                                Duration:
                              </span>

                              <FaRegClock className="mr-2 " />

                              {calculateTotalDuration(item.sI)}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 ">
                          {item.sI.map((segment, index) => (
                            <React.Fragment key={index}>
                              <div className="flex flex-col">
                                <div className="flex-col lg-custom:flex-row md:items-center   w-full justify-evenly  mb-4  flex">
                                  <div className="w-full lg-custom:w-[20%] flex ">
                                    <div className="font-semibold  text-xs  rounded-md inline-flex md:flex md:h-full lg-custom:justify-center lg-custom:items-center md:flex-col items-start justify-start  s p-1 space-x-2">
                                      <div className="w-8 h-8 md:h-14 md:w-14 ">
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
                                            {segment.fD.aI.code}-{segment.fD.fN}
                                          </span>
                                          <MdFlight className="w-3 h-3 rotate-45" />
                                          <span>{segment.fD.eT}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-row   w-full   ">
                                    <div className=" flex-col text-left w-full md:min-w-[30%]  ">
                                      <div className=" text-sm md:text-lg font-bold ">
                                        {segment.da.code}
                                      </div>
                                      <div className="text-xs md:text-sm line-clamp-1">
                                        {segment.da.city}, {segment.da.country}
                                      </div>
                                      <div className="relative group text-xs md:text-sm ">
                                        <span className=" line-clamp-1">
                                          {" "}
                                          {segment.da.name}
                                        </span>

                                        {/* Tooltip */}
                                        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max text-xs p-2 bg-gray-800 text-white  rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                          {segment.da.name}
                                        </div>
                                      </div>
                                      <div className="text-sm md:text-sm">
                                        {segment.da.terminal || "N/A"}
                                      </div>
                                      <div className="  text-xs md:text-sm font-semibold ">
                                        {new Date(
                                          item.sI[0].dt
                                        ).toLocaleDateString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                        })}
                                        ,
                                        {new Date(
                                          item.sI[0].dt
                                        ).toLocaleDateString("en-US", {
                                          weekday: "short",
                                        })}
                                        ,
                                        {new Date(
                                          segment.dt
                                        ).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: false,
                                        })}
                                      </div>
                                    </div>
                                    <div className="flex-col text-center my-2 md:my-0 mr-0 xs:mr-4 sm:mr-24 md:mr-24 w-max md:min-w-[25%] ">
                                      <div className="w-full text-center text-semibold flex ">
                                        <span className="text-center mx-auto text-xs md:text-sm">
                                          {(() => {
                                            const totalMinutes =
                                              segment.duration;
                                            const hours = Math.floor(
                                              totalMinutes / 60
                                            );
                                            const minutes = totalMinutes % 60;
                                            return `${hours}h ${minutes}m`;
                                          })()}
                                        </span>
                                      </div>

                                      <div className="flex items-center ">
                                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                        <div className="flex-grow h-px hidden md:flex bg-gray-300"></div>
                                        <div className="flex justify-center items-center ">
                                          <hr className=" w-1/3 border-t border-gray-300" />
                                          <MdFlight className="w-10 h-5 mx-2 rotate-90" />
                                          <hr className=" w-1/3 border-t border-gray-300" />
                                        </div>
                                        <div className="flex-grow h-px hidden md:flex bg-gray-300"></div>
                                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                      </div>
                                      <div className="font-bold text-xs md:text-sm">
                                        {data?.searchQuery?.cabinClass ||
                                          "No-Class"}
                                      </div>
                                      <div className="text-center text-semibold text-xs md:text-sm">
                                        {/* {item.sI.length === 1
                                          ? "Non Stop"
                                          : item.sI.length + "Stops"} */}
                                        Non-Stop
                                      </div>
                                    </div>
                                    <div className=" flex-col text-left w-full md:min-w-[30%]  ">
                                      <div className="text-sm md:text-lg font-bold">
                                        {segment.aa.code}
                                      </div>
                                      <div className="text-xs md:text-sm line-clamp-1">
                                        {segment.aa.city}, {segment.aa.country}
                                      </div>

                                      <div className="relative group text-xs md:text-sm ">
                                        <span className=" line-clamp-1">
                                          {" "}
                                          {segment.aa.name}
                                        </span>

                                        {/* Tooltip */}
                                        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max text-xs p-2 bg-gray-800 text-white  rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                          {segment.aa.name}
                                        </div>
                                      </div>
                                      <div className="text-xs md:text-sm">
                                        {segment.aa.terminal || "N/A"}
                                      </div>
                                      <div className="text-xs md:text-sm font-semibold ">
                                        {new Date(
                                          item.sI[0].dt
                                        ).toLocaleDateString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                        })}
                                        ,
                                        {new Date(
                                          item.sI[0].dt
                                        ).toLocaleDateString("en-US", {
                                          weekday: "short",
                                        })}
                                        ,
                                        {new Date(
                                          segment.at
                                        ).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: false,
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex w-full  justify-center items-center  ">
                                  {/* Bag Icon */}

                                  <ShowBaggageInfo item={item} />
                                </div>
                              </div>
                              <div className="text-sm text-gray-500 mt-4 justify-center items-center flex ">
                                {/* <span>
                                  There is a Special No Meal fare Provided by
                                  the Airline
                                </span> */}
                                {index !== item.sI.length - 1 && (
                                  <div className="flex justify-between bg-[#FFDE99] text-black p-3 rounded-xl mt-2 mb-4 w-[70%] md:w-[50%]">
                                    <div className="text-xs md:text-sm">
                                      Require to change plane
                                    </div>
                                    <div className="text-base font-medium">
                                      <span className="text-sm">
                                        {item.sI.length > 1 && (
                                          <div className="text-center">
                                            <span className=" text-xs md:text-sm">
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
                    );
                  })}
                </div>
                <div className="flex justify-center py-3 px-4">
                  <button
                    className="w-full sm:w-3/4 md:w-1/2 h-10 sm:h-12 px-4 sm:px-6 font-poppins bg-[#1B1D29] text-[#D7B56D] hover:text-[#1B1D29] hover:bg-[#D7B56D]  rounded-md text-sm sm:text-base flex items-center justify-center"
                    onClick={handleSaveAndContinue}
                  >
                    {isSeatMapLoading ? (
                      <FaSpinner className="animate-spin mr-2 text-xs sm:text-base" />
                    ) : (
                      "Add Details"
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
                passengers={passengers}
                setPassengers={setPassengers}
                existingPassengerData={passengersData}
              />
            ) : currentStep === 2 ? (
              <>
                <Review
                  setCurrentStep={setCurrentStep}
                  data={data}
                  passengersData={passengersData}
                  // updatePssenger={updatePssenger}
                />
              </>
            ) : currentStep === 3 ? (
              <>
                <PaymentPage
                  data={data}
                  passengersData={passengersData}
                  totalFare={amountToPay}
                  saveCommission={saveCommission}
                  promoApplied={promoApplied}
                  promoCode={promoCode}
                  promoValue={promoValue}
                  // updatePssenger={updatePssenger}
                />
              </>
            ) : null}
          </div>
          {/* Right Section */}
          <div className="w-full lg-custom:w-[25%] h-full mb-8  rounded-lg space-y-2 shadow-md bg-white">
            <div className="w-full  rounded-lg  ">
              <div className="text-[#1B1D29] flex items-center justify-between border-b border-gray-300 pb-4">
                <div>
                  <span className="p-2 font-bold text-base md:text-lg lg:text-2xl">
                    FARE SUMMARY
                  </span>
                </div>
              </div>
              <div className="text-[#1B1D29] mt-4 md:mt-6  md:space-y-6">
                <div className="pb-3 px-4">
                  <div className="flex justify-between text-xs md:text-sm lg:text-base font-medium">
                    <span className="text-sm md:text-base ">Base fare</span>
                    <span>
                      ₹ {data?.totalPriceInfo?.totalFareDetail?.fC?.BF}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div
                      className="flex justify-between text-xs md:text-sm lg:text-base font-medium cursor-pointer"
                      onClick={toggleTaxes}
                    >
                      <span className="flex items-center justify-center text-sm md:text-base">
                        {" "}
                        Taxes and fees{" "}
                        {taxesExpanded ? (
                          <FaChevronUp className="ml-2 text-xs md:text-sm lg:text-base" />
                        ) : (
                          <FaChevronDown className="ml-2 text-xs md:text-sm lg:text-base" />
                        )}
                      </span>
                      <div className="flex items-center">
                        <span>
                          ₹ {data?.totalPriceInfo?.totalFareDetail?.fC?.TAF}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`transition-max-height duration-300 ease-in-out ${
                        taxesExpanded ? "max-h-[500px]" : "max-h-0"
                      } overflow-y-auto`}
                    >
                      {taxesExpanded && (
                        <div className="text-xs md:text-sm lg:text-base text-gray-500 mt-2 space-y-1">
                          <div className="flex justify-between">
                            <span>Airline GST</span>
                            <span>
                              ₹{" "}
                              {
                                data?.totalPriceInfo?.totalFareDetail?.afC?.TAF
                                  ?.AGST
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Other Taxes</span>
                            <span>
                              ₹{" "}
                              {
                                data?.totalPriceInfo?.totalFareDetail?.afC?.TAF
                                  ?.OT
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>YR</span>
                            <span>
                              ₹{" "}
                              {data?.totalPriceInfo?.totalFareDetail?.afC?.TAF
                                ?.YR || "N/A"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    {passengers[0]?.selectedMeal?.length > 0 ||
                    passengers[0]?.selectedBaggage?.length > 0 ? (
                      <>
                        <div
                          className="mt-2 text-sm md:text-base flex  items-center font-medium cursor-pointer"
                          onClick={toggleMeal}
                        >
                          Meals, Baggage, and Seats
                          <span className="ml-2">
                            {mealExpanded ? (
                              <FaChevronUp className="ml-2 text-xs md:text-sm lg:text-base" />
                            ) : (
                              <FaChevronDown className="ml-2 text-xs md:text-sm lg:text-base" />
                            )}
                          </span>
                        </div>

                        {mealExpanded && (
                          <div className="mt-2 space-y-2">
                            {passengers.map((passenger, passengerIndex) => (
                              <div key={passengerIndex} className="space-y-2">
                                <div className="font-semibold text-sm md:text-base">
                                  {`${passenger.passengerType} ${passenger.typeCount}`}
                                </div>

                                {/* Selected Meals */}
                                {passenger.selectedMeal?.length > 0 && (
                                  <div className="text-xs md:text-sm">
                                    <div className="font-semibold mb-1">
                                      Selected Meals:
                                    </div>
                                    {passenger.selectedMeal.map(
                                      (meal, mealIndex) => (
                                        <div key={mealIndex} className="mb-2">
                                          <div className="font-semibold">
                                            Flight {mealIndex + 1}:
                                          </div>
                                          <div className="flex justify-between">
                                            <div>{meal.desc}</div>
                                            <div>₹{meal.amount}</div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}

                                {/* Selected Baggage */}
                                {passenger.selectedBaggage?.length > 0 && (
                                  <div className="text-xs md:text-sm">
                                    <div className="font-semibold mb-1">
                                      Selected Baggage:
                                    </div>
                                    {passenger.selectedBaggage.map(
                                      (baggage, baggageIndex) => (
                                        <div
                                          key={baggageIndex}
                                          className="mb-2"
                                        >
                                          <div className="font-semibold">
                                            Flight {baggageIndex + 1}:
                                          </div>
                                          <div className="flex justify-between">
                                            <div>{baggage.desc}</div>
                                            <div>₹{baggage.amount}</div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}

                                {/* Selected Seats */}
                                {passenger.selectedSeat?.length > 0 && (
                                  <div className="text-xs md:text-sm">
                                    <div className="font-semibold mb-1">
                                      Selected Seats:
                                    </div>
                                    {passenger.selectedSeat.map(
                                      (seat, seatIndex) => (
                                        <div key={seatIndex} className="mb-2">
                                          <div className="font-semibold">
                                            Flight {seatIndex + 1}:
                                          </div>
                                          <div className="flex justify-between">
                                            <div>{seat.code}</div>
                                            <div>₹{seat.amount}</div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mt-2">
                    <div
                      className="flex justify-between text-xs md:text-sm lg:text-base font-bold cursor-pointer"
                      onClick={toggleAmount}
                    >
                      <span className="flex justify-center text-base md:text-lg items-center">
                        Amount to Pay{" "}
                        {amountExpanded ? (
                          <FaChevronUp className="ml-2 text-xs md:text-sm lg:text-base" />
                        ) : (
                          <FaChevronDown className="ml-2 text-xs md:text-sm lg:text-base" />
                        )}
                      </span>
                      <div className="flex items-center">
                        {promoValue > 0 && (
                          <span
                            className={`${promoValue ? "strike-through" : ""}`}
                          >
                            ₹ {amountToPay + commision}
                          </span>
                        )}
                        &nbsp; &nbsp;
                        <span>₹ {amountToPay + commision - promoValue}</span>
                      </div>
                    </div>
                    <div
                      className={`transition-max-height duration-300 ease-in-out ${
                        amountExpanded ? "max-h-[500px]" : "max-h-0"
                      } overflow-y-auto`}
                    >
                      {amountExpanded && (
                        <div className="text-xs md:text-sm lg:text-base text-gray-500 mt-2 space-y-1">
                          <div className="flex justify-between">
                            <span>Convenience Fees</span>
                            <span>₹ {commision}</span>
                          </div>

                          <div className="flex justify-between">
                            <span>Net Price</span>
                            <span>
                              ₹ {data?.totalPriceInfo?.totalFareDetail?.fC?.NF}
                            </span>
                          </div>
                          {promoApplied && (
                            <div className="flex justify-between ">
                              <span>Promo Code</span>
                              <span>₹ {promoValue} (Deducted)</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="promo-code-container">
                    {!promoApplied && (
                      <p className="promo-desc">
                        Have a promo code ? Please enter below to avail your
                        discount .
                      </p>
                    )}
                    {promoApplied && (
                      <p className="text-sm mb-2">
                        Promo Code Applied! You saved{" "}
                        <strong>₹ {promoValue}</strong> off your total.
                      </p>
                    )}

                    <div className="promo-input-container">
                      {" "}
                      <input
                        placeholder="Enter Promo Code"
                        type="text"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value);
                        }}
                        disabled={promoApplied}
                      />
                      {!promoApplied && (
                        <button onClick={verifyPromo} disabled={promoLoading}>
                          {promoLoading ? "Verifying..." : "Apply"}
                        </button>
                      )}
                      {promoApplied && (
                        <button
                          onClick={() => {
                            setPromoApplied(null);
                            setPromoCode("");
                            setPromoValue(0);
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>

                    {/* {promoApplied && (
                      <button
                        className="bg-[#1B1D29] rounded-md mb-4 text-[#D7B56D] font-semibold  md:text-base px-2 py-2 mt-4 disabled:opacity-50 flex items-center justify-center text-xs"
                        onClick={() => {
                          setPromoApplied(null);
                          setPromoCode("");
                          setPromoValue(0);
                        }}
                      >
                        Cancel Applied Promo Code
                      </button>
                    )} */}
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
    </div>
  );
};

export default FlightSummary;
