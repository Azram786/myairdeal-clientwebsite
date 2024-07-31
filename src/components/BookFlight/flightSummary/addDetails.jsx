import React, { useState, useEffect } from "react";
import TravellersDetails from "./travellers";
import AddonsCard from "./addOns";
import GstDetails from "./gstDetails";
import { useNavigate } from "react-router-dom";

const AddDetails = ({ bookingId, flightData }) => {
  const [passengers, setPassengers] = useState([]);

  const [gstDetails, setGstDetails] = useState({
    gstNumber: "",
    companyName: "",
    companyAddress: "",
    email: "",
    phone: "",
  });
  const [expandedCard, setExpandedCard] = useState({
    travellers: false,
    addons: false,
    gst: false,
  });

  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(1);
  const [numInfants, setNumInfants] = useState(1);

  useEffect(() => {
    const newPassengers = generatePassengers(
      numAdults,
      numChildren,
      numInfants
    );
    setPassengers(newPassengers);
  }, [numAdults, numChildren, numInfants]);

  const generatePassengers = (numAdults, numChildren, numInfants) => {
    let passengers = [];
    let adultCount = 1;
    let childCount = 1;
    let infantCount = 1;

    for (let i = 0; i < numAdults; i++) {
      passengers.push(createPassenger("ADULT", adultCount++));
    }
    for (let i = 0; i < numChildren; i++) {
      passengers.push(createPassenger("CHILD", childCount++));
    }
    for (let i = 0; i < numInfants; i++) {
      passengers.push(createPassenger("INFANT", infantCount++));
    }

    return passengers;
  };

  const createPassenger = (type, count) => ({
    title: type === "ADULT" ? "MR" : "",
    firstName: "",
    lastName: "",
    passengerType: type,
    email: "",
    phone: "",
    dob: "",
    SelectedSeat: [],
    selectedBaggage: [],
    selectedMeal: [],
    passportNumber: "",
    nationality: "",
    issueDate: "",
    expiryDate: "",
    typeCount: count,
  });

  const toggleCard = (card) => {
    setExpandedCard((prevState) => ({
      ...prevState,
      [card]: !prevState[card],
    }));
  };

  const handleProceedToReview = () => {
    // Logic for handling proceed to review
    // Navigate to review page
    useNavigate(`/review/${bookingId}`);
  };

  return (
    <div className="mx-auto p-4 sm:p-6 lg:p-8 border border-gray-300 rounded-lg font-poppins max-w-full overflow-x-hidden">
      <div className="flex flex-col gap-4">
        <TravellersDetails
          passengers={passengers}
          setPassengers={setPassengers}
          expanded={expandedCard.travellers}
          toggleCard={() => toggleCard("travellers")}
        />
        <AddonsCard
          bookingId={bookingId}
          passengers={passengers}
          setPassengers={setPassengers}
          data={flightData}
          expanded={expandedCard.addons}
          toggleCard={() => toggleCard("addons")}
        />
        <GstDetails
          gstDetails={gstDetails}
          setGstDetails={setGstDetails}
          expanded={expandedCard.gst}
          toggleCard={() => toggleCard("gst")}
        />
      </div>
      <div className="mt-6 max-w-full mx-auto flex justify-center items-center px-4">
        <button
          onClick={handleProceedToReview}
          className="bg-[#007ec4] w-full sm:w-auto text-white px-4 py-2 rounded text-base sm:text-lg"
        >
          Proceed To Review
        </button>
      </div>
    </div>
  );
};

export default AddDetails;
