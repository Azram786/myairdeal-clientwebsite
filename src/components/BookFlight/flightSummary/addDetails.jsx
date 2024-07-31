import React, { useState, useEffect, useCallback } from "react";
import TravellersDetails from "./travellers";
import AddonsCard from "./addOns";
import GstDetails from "./gstDetails";
import { useNavigate } from "react-router-dom";

const AddDetails = ({ bookingId, flightData }) => {
  const navigate = useNavigate();
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
  const [numChildren, setNumChildren] = useState(0);
  const [numInfants, setNumInfants] = useState(0);

  const createPassenger = useCallback(
    (type, count) => ({
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
      passport: {
        passportNumber: "",
        nationality: "",
        issueDate: "",
        expiryDate: "",
      },
      typeCount: count,
    }),
    []
  );

  const generatePassengers = useCallback(
    (numAdults, numChildren, numInfants) => {
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
    },
    [createPassenger]
  );

  useEffect(() => {
    const newPassengers = generatePassengers(
      numAdults,
      numChildren,
      numInfants
    );
    setPassengers(newPassengers);
  }, [numAdults, numChildren, numInfants, generatePassengers]);

  const toggleCard = useCallback((card) => {
    setExpandedCard((prevState) => ({
      ...prevState,
      [card]: !prevState[card],
    }));
  }, []);

  const validateFormData = (passengers, gstDetails) => {
    // Check if all required fields are filled for passengers
    const isPassengersValid = passengers.every(
      (passenger) => passenger.firstName && passenger.lastName && passenger.dob
      // Add more field validations as needed
    );

    // Check if GST details are valid (if required)
    const isGstValid =
      !expandedCard.gst ||
      (gstDetails.gstNumber &&
        gstDetails.companyName &&
        gstDetails.companyAddress);
    // Add more GST field validations as needed

    return isPassengersValid && isGstValid;
  };

  const handleProceedToReview = useCallback(() => {
    // Validate the form data
    // const isValid = validateFormData(passengers, gstDetails);

    // if (isValid) {
    // Navigate to the review page with the form data
    navigate("/review", {
      state: {
        passengers,
        gstDetails,
        bookingId,
        flightData,
      },
    });
    // } else {
    //   // Show an error message or highlight invalid fields
    //   alert(
    //     "Please fill out all required fields correctly before proceeding to review."
    //   );
    // }
  }, [
    navigate,
    passengers,
    gstDetails,
    bookingId,
    flightData,
    expandedCard.gst,
  ]);

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

export default React.memo(AddDetails);
