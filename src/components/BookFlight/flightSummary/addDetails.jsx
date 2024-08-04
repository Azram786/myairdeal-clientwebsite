// import React, { useState, useEffect, useCallback } from "react";
// import TravellersDetails from "./travellers";
// import AddonsCard from "./addOns";
// import GstDetails from "./gstDetails";
// import { useNavigate } from "react-router-dom";

// const AddDetails = ({ bookingId, flightData, onData, setCurrentStep }) => {
//   const navigate = useNavigate();
//   const [passengers, setPassengers] = useState([]);
//   const [gstDetails, setGstDetails] = useState({
//     gstNumber: "",
//     companyName: "",
//     address: "",
//     email: "",
//     phone: "",
//   });
//   const [expandedCard, setExpandedCard] = useState({
//     travellers: false,
//     addons: false,
//     gst: false,
//   });

//   const [numAdults, setNumAdults] = useState(
//     flightData?.searchQuery?.paxInfo?.ADULT
//   );
//   const [numChildren, setNumChildren] = useState(
//     flightData?.searchQuery?.paxInfo?.CHILD
//   );
//   const [numInfants, setNumInfants] = useState(
//     flightData?.searchQuery?.paxInfo?.INFANT
//   );

//   const createPassenger = useCallback(
//     (type, count) => ({
//       title: type === "ADULT" ? "MR" : "",
//       firstName: "",
//       lastName: "",
//       passengerType: type,
//       email: "",
//       phone: "",
//       dob: "",
//       SelectedSeat: [],
//       selectedBaggage: [],
//       selectedMeal: [],
//       passportNumber: "",
//       nationality: "",
//       issueDate: "",
//       expiryDate: "",
//       typeCount: count,
//     }),
//     []
//   );

//   const generatePassengers = useCallback(
//     (numAdults, numChildren, numInfants) => {
//       let passengers = [];
//       let adultCount = 1;
//       let childCount = 1;
//       let infantCount = 1;

//       for (let i = 0; i < numAdults; i++) {
//         passengers.push(createPassenger("ADULT", adultCount++));
//       }
//       for (let i = 0; i < numChildren; i++) {
//         passengers.push(createPassenger("CHILD", childCount++));
//       }
//       for (let i = 0; i < numInfants; i++) {
//         passengers.push(createPassenger("INFANT", infantCount++));
//       }

//       return passengers;
//     },
//     [createPassenger]
//   );

//   console.log(passengers, "passengers");

//   useEffect(() => {
//     const newPassengers = generatePassengers(
//       numAdults,
//       numChildren,
//       numInfants
//     );
//     setPassengers(newPassengers);
//   }, [numAdults, numChildren, numInfants, generatePassengers]);

//   const toggleCard = useCallback((card) => {
//     setExpandedCard((prevState) => ({
//       ...prevState,
//       [card]: !prevState[card],
//     }));
//   }, []);

//   const validateFormData = (passengers, gstDetails) => {
//     // Check if all required fields are filled for passengers
//     const isPassengersValid = passengers.every(
//       (passenger) => passenger.firstName && passenger.lastName && passenger.dob
//       // Add more field validations as needed
//     );

//     // Check if GST details are valid (if required)
//     const isGstValid =
//       !expandedCard.gst ||
//       (gstDetails.gstNumber && gstDetails.companyName && gstDetails.address);
//     // Add more GST field validations as needed

//     return isPassengersValid && isGstValid;
//   };

//   const handleProceedToReview = useCallback(() => {
//     const isValid = validateFormData(passengers, gstDetails);

//     if (isValid) {
//       // Update progress bar state
//       // Adjust based on your progress bar setup

//       // Navigate to the review page with the form data

//       onData(passengers);

//       // navigate("/review", {
//       //   state: {
//       //     passengers,
//       //     gstDetails,
//       //     bookingId,
//       //     flightData,
//       //   },
//       // });
//     } else {
//       alert(
//         "Please fill out all required fields correctly before proceeding to review."
//       );
//     }

//     setCurrentStep((p) => p + 1);
//   }, [navigate, passengers, gstDetails, bookingId, flightData]);

//   return (
//     <div className="mx-auto p-4 sm:p-6 lg:p-8 border border-gray-300 rounded-lg font-poppins max-w-full overflow-x-hidden">
//       <div className="flex flex-col gap-4">
//         <TravellersDetails
//           passengers={passengers}
//           setPassengers={setPassengers}
//           expanded={expandedCard.travellers}
//           toggleCard={() => toggleCard("travellers")}
//         />
//         <AddonsCard
//           bookingId={bookingId}
//           passengers={passengers}
//           setPassengers={setPassengers}
//           data={flightData}
//           expanded={expandedCard.addons}
//           toggleCard={() => toggleCard("addons")}
//         />
//         <GstDetails
//           gstDetails={gstDetails}
//           setGstDetails={setGstDetails}
//           expanded={expandedCard.gst}
//           toggleCard={() => toggleCard("gst")}
//         />
//       </div>
//       <div className="mt-6 max-w-full mx-auto flex justify-center items-center px-4">
//         <button
//           onClick={handleProceedToReview}
//           className="bg-[#007ec4] w-full sm:w-auto text-white px-4 py-2 rounded text-base sm:text-lg"
//         >
//           Proceed To Review
//         </button>
//       </div>
//     </div>
//   );
// };

// export default React.memo(AddDetails);


import React, { useState, useEffect, useCallback } from "react";
import TravellersDetails from "./travellers";
import AddonsCard from "./addOns";
import GstDetails from "./gstDetails";
import { useNavigate } from "react-router-dom";
import ReactToast from "../../util/ReactToast";

const AddDetails = ({ bookingId, flightData, onData, setCurrentStep }) => {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState([]);
  const [gstDetails, setGstDetails] = useState({
    gstNumber: "",
    companyName: "",
    address: "",
    email: "",
    phone: "",
  });
  const [expandedCard, setExpandedCard] = useState({
    travellers: false,
    addons: false,
    gst: false,
  });
  const [isPassengersCompleted, setIsPassengersCompleted] = useState(false);

  const [numAdults, setNumAdults] = useState(
    flightData?.searchQuery?.paxInfo?.ADULT
  );
  const [numChildren, setNumChildren] = useState(
    flightData?.searchQuery?.paxInfo?.CHILD
  );
  const [numInfants, setNumInfants] = useState(
    flightData?.searchQuery?.paxInfo?.INFANT
  );

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
      passportNumber: "",
      nationality: "",
      issueDate: "",
      expiryDate: "",
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

  useEffect(() => {
    const isCompleted = passengers.every(
      (passenger) =>
        passenger.firstName &&
        passenger.lastName &&
        passenger.dob &&
        passenger.email &&
        passenger.phone
    );
    setIsPassengersCompleted(isCompleted);
  }, [passengers]);

  const toggleCard = useCallback((card) => {
    if ((card === "addons" || card === "gst") && !isPassengersCompleted) {
      ReactToast("Please complete all passenger details before proceeding to Add-ons.");
      return;
    }
    setExpandedCard((prevState) => ({
      ...prevState,
      [card]: !prevState[card],
    }));
  }, [isPassengersCompleted]);

  const validateFormData = (passengers, gstDetails) => {
    const isPassengersValid = passengers.every(
      (passenger) =>
        passenger.firstName &&
        passenger.lastName &&
        passenger.dob &&
        passenger.email &&
        passenger.phone
    );

    const isGstValid =
      !expandedCard.gst ||
      (gstDetails.gstNumber && gstDetails.companyName && gstDetails.address);

    return isPassengersValid && isGstValid;
  };

  const handleProceedToReview = useCallback(() => {
    const isValid = validateFormData(passengers, gstDetails);

    console.log("isValid", isValid,gstDetails,"gst");
    if (isValid) {
      onData({passengers,gstDetails});
      setCurrentStep((p) => p + 1);
    } else {
     
       ReactToast( "Please fill out all required fields correctly before proceeding to review.")
      
    }
  }, [passengers, gstDetails, onData, setCurrentStep]);

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
          isDisabled={!isPassengersCompleted}
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