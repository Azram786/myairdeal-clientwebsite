import React, { useState, useEffect } from "react";
import TravellersDetails from "./travellers";
import AddonsCard from "./addOns";
import GstDetails from "./gstDetails";
// import { flightData } from "../Seats/dummy"

import { useNavigate } from "react-router-dom";

const AddDetails = ({bookingId,flightData}) => {
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

  return (
    <div className="mx-auto p-2 border border-gray-300 rounded-lg font-poppins">
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
      <div className="mt-9 max-w-lg mx-auto flex justify-center items-center">
        <button
          onClick={""}
          className="bg-[#007ec4] w-full text-white px-4 py-2 rounded"
        >
          Proceed To Review
        </button>
      </div>
    </div>
  );
};

export default AddDetails;
