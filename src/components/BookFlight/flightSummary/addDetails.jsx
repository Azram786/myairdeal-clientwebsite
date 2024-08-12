// import React, { useState, useEffect, useCallback } from "react";
// import TravellersDetails from "./travellers";
// import AddonsCard from "./addOns";
// import GstDetails from "./gstDetails";
// import { useNavigate } from "react-router-dom";
// import ReactToast from "../../util/ReactToast";

// const AddDetails = ({
//   bookingId,
//   flightData,
//   onData,
//   setCurrentStep,
//   passengers,
//   setPassengers,
// }) => {
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

//   const [isPassengersCompleted, setIsPassengersCompleted] = useState(false);

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
//       title: "",
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

//   useEffect(() => {
//     const newPassengers = generatePassengers(
//       numAdults,
//       numChildren,
//       numInfants
//     );
//     setPassengers(newPassengers);
//   }, [numAdults, numChildren, numInfants, generatePassengers]);

//   useEffect(() => {
//     const isCompleted = passengers.every(
//       (passenger) =>
//         passenger.firstName &&
//         passenger.lastName &&
//         // passenger.dob &&
//         passenger.email &&
//         passenger.phone
//     );
//     setIsPassengersCompleted(isCompleted);
//   }, [passengers]);

//   const toggleCard = useCallback(
//     (card) => {
//       if ((card === "addons" || card === "gst") && !isPassengersCompleted) {
//         ReactToast(
//           "Please complete all passenger details before proceeding to Add-ons."
//         );
//         return;
//       }
//       setExpandedCard((prevState) => ({
//         ...prevState,
//         [card]: !prevState[card],
//       }));
//     },
//     [isPassengersCompleted]
//   );

//   const validateFormData = (passengers, gstDetails) => {
//     const isPassengersValid = passengers.every(
//       (passenger) =>
//         passenger.firstName &&
//         passenger.lastName &&
//         // passenger.dob &&
//         passenger.email &&
//         passenger.phone
//     );

//     const isGstValid =
//       !expandedCard.gst ||
//       (gstDetails.gstNumber && gstDetails.companyName && gstDetails.address);

//     return isPassengersValid && isGstValid;
//   };

//   const handleProceedToReview = useCallback(() => {
//     const isValid = validateFormData(passengers, gstDetails);

//     if (isValid) {
//       onData({ passengers, gstDetails });
//       setCurrentStep((p) => p + 1);
//     } else {
//       ReactToast(
//         "Please fill out all required fields correctly before proceeding to review."
//       );
//     }
//   }, [passengers, gstDetails, onData, setCurrentStep]);

//   return (
//     <div className="mx-auto  h-screen  rounded-lg font-poppins max-w-full overflow-x-hidden">
//       <div className="flex flex-col">
//         <TravellersDetails
//           passengers={passengers}
//           setPassengers={setPassengers}
//           expanded={expandedCard.travellers}
//           toggleCard={() => toggleCard("travellers")}
//           flightData={flightData}
//         />
//         <AddonsCard
//           bookingId={bookingId}
//           passengers={passengers}
//           setPassengers={setPassengers}
//           data={flightData}
//           expanded={expandedCard.addons}
//           toggleCard={() => toggleCard("addons")}
//           isDisabled={!isPassengersCompleted}
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
//           className="bg-[#007ec4] w-full sm:w-auto  text-white px-4 py-2 rounded text-base sm:text-lg"
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
import ReactToast from "../../util/ReactToast";

const AddDetails = ({
  bookingId,
  flightData,
  onData,
  setCurrentStep,
  passengers,
  setPassengers,
}) => {
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
      title: "",
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
  }, [numAdults, numChildren, numInfants, generatePassengers, setPassengers]);

  const handleProceedToReview = useCallback(async () => {
    const isValid = await document
      .getElementById("travellers-form")
      ?.validateContactDetails();
    if (isValid) {
      onData({ passengers, gstDetails });
      setCurrentStep((p) => p + 1);
    } else {
      ReactToast(
        "Please fill out all required fields correctly before proceeding to review."
      );
    }
  }, [passengers, gstDetails, onData, setCurrentStep]);

  return (
    <div className="shadow-lg">
      <TravellersDetails
        expanded={expandedCard.travellers}
        toggleCard={() =>
          setExpandedCard((prev) => ({
            ...prev,
            travellers: !prev.travellers,
          }))
        }
        passengers={passengers}
        setPassengers={setPassengers}
        flightData={flightData}
      />
      <AddonsCard
        expanded={expandedCard.addons}
        toggleCard={() =>
          setExpandedCard((prev) => ({ ...prev, addons: !prev.addons }))
        }
      />
      <GstDetails
        expanded={expandedCard.gst}
        toggleCard={() =>
          setExpandedCard((prev) => ({ ...prev, gst: !prev.gst }))
        }
        gstDetails={gstDetails}
        setGstDetails={setGstDetails}
      />
      <div className="flex justify-between mt-5">
        <button
          onClick={() => setCurrentStep((p) => p - 1)}
          className="bg-gray-400 text-white py-2 px-4 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleProceedToReview}
          className="bg-blue-400 text-white py-2 px-4 rounded"
        >
          Proceed to Review
        </button>
      </div>
    </div>
  );
};

export default AddDetails;

