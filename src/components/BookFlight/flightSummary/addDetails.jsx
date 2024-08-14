
// import React, { useState, useEffect, useCallback } from "react";
// import TravellersDetails from "./travellers";
// import AddonsCard from "./addOns";
// import GstDetails from "./gstDetails";
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
//     travellers: true,
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

//   const isInternational = flightData?.conditions?.isa;

//   const createPassenger = useCallback(
//     (type, count) => {
//       const basePassenger = {
//         title: "",
//         firstName: "",
//         lastName: "",
//         passengerType: type,
//         dob: "",
//         SelectedSeat: [],
//         selectedBaggage: [],
//         selectedMeal: [],
//         typeCount: count,
//       };

//       if (isInternational) {
//         return {
//           ...basePassenger,
//           passportNumber: "",
//           nationality: "",
//           issueDate: "",
//           expiryDate: "",
//         };
//       }

//       return basePassenger;
//     },
//     [isInternational]
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
//   }, [numAdults, numChildren, numInfants, generatePassengers, setPassengers]);

//   const handleProceedToReview = useCallback(async () => {
//     const isValid = await document
//       .getElementById("travellers-form")
//       ?.validateContactDetails();
//     if (isValid) {
//       onData({ passengers, gstDetails });
//       setCurrentStep((p) => p + 1);
//     } else {
//       ReactToast(
//         "Please fill out all required fields correctly before proceeding to review."
//       );
//     }
//   }, [passengers, gstDetails, onData, setCurrentStep]);

//   const [contactDetails, setContactDetails] = useState({
//     email: null,
//     phoneNumber: null,
//     dialCode: null,
//   })
//   console.log(contactDetails)
//   const toggleCard = (cardName) => {
//     if (cardName === 'travellers' || isPassengersCompleted) {
//       setExpandedCard((prev) => ({
//         ...prev,
//         [cardName]: !prev[cardName],
//       }));
//     } else {
//       ReactToast("Please complete passenger details first.");
//     }
//   };

//   return (
//     <div className="shadow-lg ">
//       <TravellersDetails
//         expanded={expandedCard.travellers}
//         toggleCard={() => toggleCard('travellers')}
//         passengers={passengers}
//         setPassengers={setPassengers}
//         flightData={flightData}
//         setIsPassengersCompleted={setIsPassengersCompleted}
//         isInternational={isInternational}
//         contactDetails={contactDetails}
//         setContactDetails={setContactDetails}
//       />
//       <AddonsCard
//         expanded={expandedCard.addons}
//         toggleCard={() => toggleCard('addons')}
//         flightData={flightData}
//         passengers={passengers}
//         setPassengers={setPassengers}
//       />
//       <GstDetails
//         expanded={expandedCard.gst}
//         toggleCard={() => toggleCard('gst')}
//         gstDetails={gstDetails}
//         setGstDetails={setGstDetails}
//       />
//       <div className="flex justify-between mt-5">
//         <button
//           onClick={() => setCurrentStep((p) => p - 1)}
//           className="bg-gray-400 text-white py-2 px-4 rounded"
//         >
//           Previous
//         </button>
//         <button
//           onClick={handleProceedToReview}
//           className="bg-blue-400 text-white py-2 px-4 rounded"
//         >
//           Proceed to Review
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddDetails;
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
    travellers: true,
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

  // const isInternational = flightData?.conditions?.isa;
  const [isInternational, setIsInternational] = useState(
    flightData?.conditions?.pcs || false
  );
  console.log({ isInternational })
  const [contactDetails, setContactDetails] = useState({
    email: null,
    phoneNumber: null,
    dialCode: null,
  });

  const createPassenger = useCallback(
    (type, count) => {
      const basePassenger = {
        title: "",
        firstName: "",
        lastName: "",
        passengerType: type,
        dob: "",
        selectedSeat: [],
        selectedBaggage: [],
        selectedMeal: [],
        typeCount: count,
      };

      if (isInternational) {
        return {
          ...basePassenger,
          passportNumber: "",
          nationality: "",
          issueDate: "",
          expiryDate: "",
        };
      }

      return basePassenger;
    },
    [isInternational]
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

  const validatePassengerDetails = (passenger) => {
    console.log({ passenger, nithin: "nihtinakn" });

    const isBasicDetailsFilled = !!(
      passenger.title &&
      passenger.firstName &&
      passenger.lastName
    );

    console.log({
      title: !!passenger.title,
      firstName: !!passenger.firstName,
      lastName: !!passenger.lastName,
      isBasicDetailsFilled
    });

    const isInternationalDetailsFilled = isInternational
      ? !!(
        passenger.passportNumber &&
        passenger.nationality &&
        passenger.issueDate &&
        passenger.expiryDate
      )
      : true;

    console.log({
      isInternational,
      isInternationalDetailsFilled,
      passportNumber: !!passenger.passportNumber,
      nationality: !!passenger.nationality,
      issueDate: !!passenger.issueDate,
      expiryDate: !!passenger.expiryDate
    });

    const isDobRequired = passenger.passengerType === "INFANT" || passenger.passengerType === "CHILD";
    const isDobFilled = isDobRequired ? !!passenger.dob : true;

    console.log({
      passengerType: passenger.passengerType,
      isDobRequired,
      isDobFilled,
      dob: !!passenger.dob
    });

    const isValid = isBasicDetailsFilled &&
      (isInternational ? isInternationalDetailsFilled : true) &&
      isDobFilled;

    console.log({ isValid, isBasicDetailsFilled, isInternationalDetailsFilled, isDobFilled });

    return isValid;
  };

  const checkAllPassengersCompleted = useCallback(() => {
    const areAllPassengersValid = passengers.every(validatePassengerDetails);
    console.log({ areAllPassengersValid })
    setIsPassengersCompleted(areAllPassengersValid);
    return areAllPassengersValid;
  }, [passengers, isInternational]);


  const handleProceedToReview = useCallback(() => {
    const areAllPassengersValid = checkAllPassengersCompleted();
    console.log({ areAllPassengersValid })
    if (areAllPassengersValid) {
      onData({ passengers, gstDetails });
      setCurrentStep((p) => p + 1);
    } else {
      ReactToast(
        "Please fill out all required fields correctly before proceeding to review."
      );
    }
  }, [passengers, gstDetails, onData, setCurrentStep, checkAllPassengersCompleted]);
  const toggleCard = (cardName) => {
    console.log({ isPassengersCompleted })
    if (cardName === "travellers" || isPassengersCompleted) {
      setExpandedCard((prev) => ({
        ...prev,
        [cardName]: !prev[cardName],
      }));
    } else {
      ReactToast("Please complete passenger details first.");
    }
  };
  useEffect(() => {
    checkAllPassengersCompleted();
  }, [passengers, checkAllPassengersCompleted]);
  return (
    <div className="shadow-lg ">
      <TravellersDetails
        expanded={expandedCard.travellers}
        toggleCard={() => toggleCard("travellers")}
        passengers={passengers}
        setPassengers={setPassengers}
        flightData={flightData}
        setIsPassengersCompleted={setIsPassengersCompleted}
        isInternational={isInternational}
        contactDetails={contactDetails}
        setContactDetails={setContactDetails}
      />
      <AddonsCard
        expanded={expandedCard.addons}
        toggleCard={() => toggleCard("addons")}
        flightData={flightData}
        passengers={passengers}
        setPassengers={setPassengers}
      />
      <GstDetails
        expanded={expandedCard.gst}
        toggleCard={() => toggleCard("gst")}
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
