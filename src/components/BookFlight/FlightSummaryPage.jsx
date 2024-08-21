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
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import defaultAirline from "../../assets/home/logo/defaultAirline.png";
import { set } from "react-hook-form";
import PaymentPage from "./PaymentPage";
import SessionTimer from "./SessionTimer";
import ReactToast from "./Util/ReactToast";
import Spinner from "../Profile/Spinner";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import FlightLanding from "../../assets/booking/viewDetailedBookings/flightLanding.svg";
import ShowBaggageInfo from "./Util/ShowBaggageInfo";
import { setIsaModifySearch } from "../../store/slices/aut.slice";

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
  const bookingArray = useMemo(() => {
    return bookings ? bookings.map((item) => item.priceId) : [];
  }, [bookings]);
  const [passengers, setPassengers] = useState([]);


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

        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        ReactToast("Some error occurred please try again");
        navigate("/");
        // console.log(error);
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
  const [mealExpanded, setIsMealExpanded] = useState(false);
  const dispatch = useDispatch()
  
  useEffect(() => {

    dispatch(setIsaModifySearch(false))
  }, [])

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


  return (
    <div className=" min-h-screen my-auto">
      <Header />
      <div className="  sm:text-sm md:text-lg w-[90vw] flex-wrap mx-auto pt-4 ">
        <div
          className="flex flex-col w-full  flex-wrap lg-custom:flex-row gap-4   
           "
        >
          {/* Left section */}
          <div className="w-full lg-custom:w-[70%] rounded-lg     space-y-4">
            <div className=" w-full ">
              <ProgressBar
                currentStep={currentStep}
                onStepClick={handleStepClick}
              />
            </div>
            {currentStep === 0 ? (
              <>
                <div
                  className={`pb-4 border h-max border-gray-400  max-h-[50vh] ${data?.tripInfos.length > 1 && "overflow-scroll"
                    } overflow-x-hidden`}
                >
                  {data?.tripInfos?.map((item, index) => {
                    return (
                      <div key={index} className=" rounded-lg p-2   ">
                        <div className=" flex flex-wrap items-center justify-between bg-[#1B1D29] text-white  p-2 rounded-t-lg">
                          <div className="text-base sm:text-lg font-semibold flex items-center">
                            <span>{item.sI[0].da.city}</span>
                            <FaArrowRight className="mx-2 inline" />
                            <span>{item.sI[item.sI.length - 1].aa.city}</span>
                          </div>
                          <div className="flex justify-center items-center gap-2">
                            <div className="text-white text-sm mt-1 sm:mt-0 sm:ml-2">
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
                            <div className="text-sm md:text-base  font-semibold text-white flex items-center">
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
                                  <div className="flex flex-col md:flex-row w-full  ">
                                    <div className="flex-col text-center md:text-left w-full md:w-[40%]">
                                      <div className="text-lg font-bold ">
                                        {segment.da.code}
                                      </div>
                                      <div className="text-sm line-clamp-1">
                                        {segment.da.city}, {segment.da.country}
                                      </div>
                                      <div className="text-sm line-clamp-1">
                                        {segment.da.name}
                                      </div>
                                      <div className="text-sm">
                                        {segment.da.terminal || "N/A"}
                                      </div>
                                      <div className="text-sm font-semibold">
                                        {new Date(
                                          segment.dt
                                        ).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: true,
                                        })}
                                      </div>
                                      <div className="text-sm font-semibold">
                                        {new Date(
                                          item.sI[0].dt
                                        ).toLocaleDateString("en-US", {
                                          weekday: "long",
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                        })}
                                      </div>
                                    </div>
                                    <div className="flex-col text-center my-2 md:my-0 w-full mr-32 md:w-[40%]">
                                      <div className="w-full text-center text-semibold flex ">
                                        <span className="text-center mx-auto text-sm">
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

                                      <div className="flex items-center w-full">
                                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                        <div className="flex-grow h-px bg-gray-300"></div>
                                        <div className="flex items-center mx-2">
                                          <div className="w-16 h-px bg-gray-500"></div>
                                          <img
                                            className="w-8 h-8 mx-2 rotate-90 md:rotate-0"
                                            src={FlightLanding}
                                            alt="Airplane"
                                          />
                                          <div className="w-16 h-px bg-gray-500"></div>
                                        </div>
                                        <div className="flex-grow h-px bg-gray-300"></div>
                                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                      </div>

                                      <div className="text-center text-semibold text-sm">
                                        {item.sI.length === 1
                                          ? "Non Stop"
                                          : item.sI.length + "Stops"}
                                      </div>
                                    </div>
                                    <div className="flex-col text-center md:text-left w-full md:w-[40%] ">
                                      <div className="text-lg font-bold">
                                        {segment.aa.code}
                                      </div>
                                      <div className="text-sm line-clamp-1">
                                        {segment.aa.city}, {segment.aa.country}
                                      </div>
                                      <div className="text-sm line-clamp-1">
                                        {segment.aa.name}
                                      </div>
                                      <div className="text-sm">
                                        {segment.aa.terminal || "N/A"}
                                      </div>
                                      <div className="text-sm font-semibold">
                                        {new Date(
                                          segment.at
                                        ).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: true,
                                        })}
                                      </div>
                                      <div className="text-sm font-semibold">
                                        {new Date(
                                          item.sI[0].dt
                                        ).toLocaleDateString("en-US", {
                                          weekday: "long",
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
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
                              <div className="text-sm text-gray-500 mt-4">
                                {/* <span>
                                  There is a Special No Meal fare Provided by
                                  the Airline
                                </span> */}
                                {index !== item.sI.length - 1 && (
                                  <div className="flex justify-between bg-[#1B1D29] text-white p-3 rounded-md mt-4 mb-4">
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
                    );
                  })}
                </div>
                <div className="flex justify-center py-3 px-4">
                  <button
                    className="w-full sm:w-3/4 md:w-1/2 h-10 sm:h-12 px-4 sm:px-6 font-poppins bg-[#1B1D29] text-[#D7B56D]  rounded-md text-sm sm:text-base flex items-center justify-center"
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
                passengers={passengers}
                setPassengers={setPassengers}
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
                // updatePssenger={updatePssenger}
                />
              </>
            ) : null}
          </div>
          {/* Right Section */}
          <div className="w-full lg-custom:w-[25%] h-full mb-8  rounded-lg space-y-2 p-5 shadow-md bg-white">
            <div className="w-full max-w-full rounded-lg  ">
              <div className="text-[#1B1D29] flex items-center justify-between border-b border-gray-300 pb-4">
                <div>
                  <span className="font-bold text-lg md:text-xl lg:text-2xl">
                    FARE SUMMARY
                  </span>
                </div>
              </div>
              <div className="text-[#1B1D29] mt-4 md:mt-6 space-y-4 md:space-y-6">
                <div className="pt-3">
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
                      className={`transition-max-height duration-300 ease-in-out ${taxesExpanded ? "max-h-[500px]" : "max-h-0"
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
                              {
                                data?.totalPriceInfo?.totalFareDetail?.afC?.TAF
                                  ?.YR
                              }
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
                        <span>₹ {amountToPay + commision} </span>
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
                            <span>₹ {commision}</span>
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
