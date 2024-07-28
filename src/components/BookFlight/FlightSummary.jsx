import React, { useState } from "react";

import { MdFlight } from "react-icons/md";
import { FaRegClock, FaArrowRight, FaSuitcaseRolling } from "react-icons/fa";
import ProgressBar from "./ProgressBar";
import AddDetails from "./AddDetails";
import Review from "./Review";
import { data } from "./dummy-meal";

const FlightSummary = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleSaveAndContinue = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === 0) return 1; // Move to AddDetails
      if (prevStep === 1) return 2; // Move to Review
      return prevStep; // Stay on the same step if already at Review
    });
  };

  const handleStepClick = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  console.log(data);

  const flightData = {
    fromRoute: "Bangalore",
    durationRoute: "01:45",
    toRoute: "Hyderabad",
    date: "June 25, 2024",
    airline: {
      logo: AirLineLogo,
      code: {
        from: "BNG",
        to: "HYD",
      },
      fromCity: "Bengaluru, India",
      toCity: "Hyderabad, India",
      fromAirport: "Bengaluru Inter National Airport",
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
      image: EmiratesPlanes,
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
    <div className="container mx-auto">
      <ProgressBar currentStep={currentStep} onStepClick={handleStepClick} />

      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Left section: AddDetails or Review */}
        <div className="md:w-7/10 p-3 bg-white shadow-lg rounded-lg">
          {currentStep === 0 && (
            <>
              <div className="flex flex-col md:flex-row justify-between items-center bg-blue-100 p-2 rounded-t-lg">
                <div className="text-lg font-bold flex items-center">
                  {flightData.fromRoute}
                  <FaArrowRight className="mx-2" />
                  {flightData.toRoute}
                  <div className="pl-2 text-gray-600 text-sm">
                    On {flightData.date}
                  </div>
                </div>
                <div className="text-lg font-semibold text-gray-600 flex items-center px-5">
                  <FaRegClock className="mr-2" />
                  {flightData.durationRoute}
                </div>
              </div>
              <div className="flex flex-col md:flex-row p-4 items-center">
                <div className="w-[111px] h-[77px] flex-shrink-0">
                  <img
                    src={flightData.airline.logo}
                    alt="Airline Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col w-full ml-4 font-poppins">
                  <div className="text-lg font-bold flex items-center justify-between">
                    <span>{flightData.airline.code.from}</span>
                    <div className="flex items-center mx-2 transform rotate-90">
                      <MdFlight className="w-7 h-5" />
                    </div>
                    <span>{flightData.airline.code.to}</span>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between text-gray-600">
                    <div className="flex flex-col">
                      <span>{flightData.airline.fromCity}</span>
                      <span>{flightData.airline.fromAirport}</span>
                    </div>
                    <div className="flex flex-col md:items-end">
                      <span>{flightData.airline.toCity}</span>
                      <span>{flightData.airline.toAirport}</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between mt-2 items-center font-bold">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">
                        {flightData.airline.departureTime}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-2 flex items-center">
                      {flightData.airline.flightType}
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">
                        {flightData.airline.arrivalTime}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-6">
                    {flightData.airline.fareDetails}
                  </div>
                </div>
                <div className="flex w-[300px] flex-col items-center justify-center p-2 mx-4 rounded-lg font-poppins">
                  <FaSuitcaseRolling className="w-7 h-10 mb-2" />
                  <div className="text-gray-600 font-semibold  px-2 ">
                    Carry on bag
                  </div>
                  <div className="font-bold">
                    {flightData.airline.bagDetails.weight}
                  </div>
                  <div className="flex flex-col items-center mt-2">
                    <div className="text-gray-600">Fare Details</div>
                    <a className="text-blue-500 hover:underline" href="">
                      View Details
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 text-white bg-blue-900 font-poppins mx-auto rounded-md w-full mt-4">
                <span className="text-lg font-medium">
                  Require to change plane
                </span>
                <span className="text-lg font-medium">
                  Layover time: 01h 45m
                </span>
              </div>
              <div className="flex justify-center items-center mt-4">
                <button
                  className="w-full md:w-auto h-10 p-2 px-4 font-poppins bg-blue-500 text-white rounded-md"
                  onClick={handleSaveAndContinue}
                >
                  Save and Continue
                </button>
              </div>
            </>
          )}

          {currentStep === 1 && (
            <AddDetails onProceedToReview={() => setCurrentStep(2)} />
          )}
          {currentStep === 2 && <Review />}
        </div>

        {/* Right section: Aircraft details and pricing */}
        <div className="md:w-1/3 p-4">
          {/* Aircraft Information */}
          <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row items-center overflow-hidden">
            <img
              src={flightData.aircraft.image}
              alt="Aircraft"
              className="w-[120px] h-[120px] object-cover rounded-lg"
            />
            <div className="ml-4 flex flex-col justify-center">
              <div className="text-lg font-bold mb-1">
                {flightData.aircraft.class}
              </div>
              <div className="text-lg font-bold mb-2">
                {flightData.aircraft.name}
              </div>
              <div className="flex items-center mb-2">
                <div className="text-green-600 font-bold mr-2">
                  {flightData.aircraft.rating}
                </div>
                <div className="text-gray-500">Very Good</div>
                <div className="text-gray-500 ml-2">
                  {flightData.aircraft.reviews}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="bg-white shadow-lg rounded-lg p-4 mt-4 overflow-hidden">
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between py-1">
                <div>Base Fare</div>
                <div>{flightData.aircraft.prices.baseFare}</div>
              </div>
              <div className="flex justify-between py-1">
                <div>Discount</div>
                <div>{flightData.aircraft.prices.discount}</div>
              </div>
              <div className="flex justify-between py-1">
                <div>Taxes</div>
                <div>{flightData.aircraft.prices.taxes}</div>
              </div>
              <div className="flex justify-between py-1">
                <div>Service Fee</div>
                <div>{flightData.aircraft.prices.serviceFee}</div>
              </div>
              <div className="flex justify-between font-bold py-1">
                <div>Total</div>
                <div>{flightData.aircraft.prices.total}</div>
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              {flightData.aircraft.protection}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSummary;
