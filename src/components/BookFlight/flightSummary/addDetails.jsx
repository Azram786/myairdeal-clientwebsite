import React, { useState, useEffect, useCallback } from "react";
import TravellersDetails from "./travellers";
import AddonsCard from "./addOns";
import GstDetails from "./gstDetails";
import ReactToast from "../../util/ReactToast";
import { useLocation} from "react-router-dom";

const AddDetails = ({
  bookingId,
  flightData,
  onData,
  setCurrentStep,
  passengers,
  setPassengers,
  existingPassengerData,
}) => {
  console.log(existingPassengerData, "existing");
  const [gstDetails, setGstDetails] = useState({
    gstNumber: "",
    companyName: "",
    address: "",
    email: "",
    phone: "",
  });
  const [gstErrors, setGstErrors] = useState({});

  const [expandedCard, setExpandedCard] = useState({
    travellers: true,
    addons: false,
    gst: false,
  });

  const { pathname } = useLocation();

  useEffect(() => {
    console.log("ScrollToTop effect triggered");
    window.scrollTo(0, 0);
  }, [pathname]);

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

  const [isInternational, setIsInternational] = useState(
    flightData?.conditions?.pcs || false
  );

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

  console.log({ contactDetails, passengers });

  useEffect(() => {
    if (existingPassengerData?.passengers?.length > 0) {
      setPassengers(existingPassengerData.passengers);
      setGstDetails(existingPassengerData?.gstDetails);
      setContactDetails(existingPassengerData?.contactDetails);
    } else {
      const newPassengers = generatePassengers(
        numAdults,
        numChildren,
        numInfants
      );
      setPassengers(newPassengers);
    }
  }, [numAdults, numChildren, numInfants, generatePassengers, setPassengers]);

  const validatePassengerDetails = (passenger) => {
    const isBasicDetailsFilled = !!(
      passenger.title &&
      passenger.firstName &&
      passenger.lastName
    );

    const isInternationalDetailsFilled = isInternational
      ? !!(
          passenger.passportNumber &&
          passenger.nationality &&
          passenger.issueDate &&
          passenger.expiryDate &&
          passenger.dob
        )
      : true;

    const isDobRequired = passenger.passengerType === "INFANT";
    const isDobFilled = isDobRequired ? !!passenger.dob : true;

    return isBasicDetailsFilled && isInternationalDetailsFilled && isDobFilled;
  };

  const checkAllPassengersCompleted = useCallback(() => {
    return passengers.every(validatePassengerDetails);
  }, [passengers]);

  const isContactDetailsValid = () => {
    const phoneRegex = /^[0-9]{7,14}$/;
    if (!/\S+@\S+\.\S+/.test(contactDetails.email)) {
      return false;
    }
    if (!phoneRegex.test(contactDetails.phoneNumber)) {
      return false;
    }
    return contactDetails.email && contactDetails.phoneNumber;
  };
  console.log({ passengers });

  const validateGSTDetails = () => {
    const errors = {};

    if (
      gstDetails.gstNumber &&
      !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(
        gstDetails.gstNumber
      )
    ) {
      errors.gstNumber = "Please enter a valid 15-digit GST Number";
      ReactToast("Please enter a valid 15-digit GST Number");
      return errors;
    }
    if (
      gstDetails.companyName.length < 5 ||
      gstDetails.companyName.length > 35
    ) {
      errors.companyName = "Company Name should not exceed 35 characters";
      ReactToast(
        "GST Details : Company Name must have atleast 5 characters not exceed 35 characters"
      );
      return errors;
    }
    if (!/\S+@\S+\.\S+/.test(gstDetails.email)) {
      errors.email = "Please enter a valid email address";
      ReactToast("GST Details : Please Enter a valid email address");
      return errors;
    }
    if (!/^\d{10}$/.test(gstDetails.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number";
      ReactToast("GST Details : Please enter a valid 10-digit phone number");
      return errors;
    }
    if (gstDetails.address.length < 5 || gstDetails.address.length > 70) {
      errors.address =
        "Address should not exceed 70 characters and must be atleast 5 characters";
      ReactToast(
        "GST Details : Address should not exceed 70 characters and must be atleast 5 characters"
      );
      return errors;
    }

    return errors;
  };

  const handleProceedToReview = useCallback(() => {
    const areAllPassengersValid = checkAllPassengersCompleted();
    const gstErrors = gstDetails.gstNumber ? validateGSTDetails() : {};
    console.log(gstErrors);
    const isGstValid = gstDetails.gstNumber
      ? Object.keys(gstErrors).length === 0
      : true;
    const isContactValid = isContactDetailsValid();
    if (!isContactValid) {
      ReactToast(
        "Contact Details : Please Enter Proper Email and Phone Number"
      );
      return;
    }
    if (!isGstValid) {
      return;
    }
    setGstErrors(gstErrors);
    if (areAllPassengersValid && isContactValid && isGstValid) {
      onData({ passengers, gstDetails, contactDetails });
      setCurrentStep((p) => p + 1);
    } else {
      ReactToast(
        "Please fill out all required fields for passengers and contact details"
      );
    }
  }, [
    passengers,
    gstDetails,
    contactDetails,
    onData,
    setCurrentStep,
    checkAllPassengersCompleted,
  ]);

  const toggleCard = (cardName) => {
    if (cardName === "travellers") {
      setExpandedCard((prev) => ({
        ...prev,
        [cardName]: !prev[cardName],
      }));
    } else if (isPassengersCompleted && isContactDetailsValid()) {
      setExpandedCard((prev) => ({
        ...prev,
        [cardName]: !prev[cardName],
      }));
    } else {
      ReactToast(
        "Please complete passenger details and contact information first."
      );
    }
  };

  useEffect(() => {
    const allPassengersCompleted = checkAllPassengersCompleted();
    const contactDetailsValid = isContactDetailsValid();
    setIsPassengersCompleted(allPassengersCompleted && contactDetailsValid);
  }, [passengers, contactDetails, checkAllPassengersCompleted]);

  return (
    <div className="pb-6 shadow-lg">
      <button
        onClick={() => setCurrentStep((p) => p - 1)}
        className="text-[#D7B56D] hover:text-[#1B1D29] bg-[#1B1D29] hover:bg-[#D7B56D] m-2 textpsm md:text-base  py-2 px-4 rounded"
      >
        Previous
      </button>
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
        bookingId={bookingId}
      />
      <GstDetails
        expanded={expandedCard.gst}
        toggleCard={() => toggleCard("gst")}
        gstDetails={gstDetails}
        setGstDetails={setGstDetails}
        gstErrors={gstErrors}
      />
      <div className="flex flex-wrap justify-between mt-5 mx-4">
        <button
          onClick={() => setCurrentStep((p) => p - 1)}
          className="text-[#D7B56D] hover:text-[#1B1D29] bg-[#1B1D29] hover:bg-[#D7B56D] m-2 textpsm md:text-base  py-2 px-4 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleProceedToReview}
          className=" text-[#D7B56D] hover:text-[#1B1D29] bg-[#1B1D29] hover:bg-[#D7B56D] m-2 text-sm md:text-base  py-2 px-4 rounded"
        >
          Proceed to Review
        </button>
      </div>
    </div>
  );
};

export default AddDetails;
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

//   const [isInternational, setIsInternational] = useState(
//     flightData?.conditions?.pcs || false
//   );

//   const [contactDetails, setContactDetails] = useState({
//     email: "",
//     phoneNumber: "",
//     dialCode: "",
//   });

//   const createPassenger = useCallback(
//     (type, count) => {
//       const basePassenger = {
//         title: "",
//         firstName: "",
//         lastName: "",
//         passengerType: type,
//         dob: "",
//         selectedSeat: [],
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

//   console.log({ contactDetails, passengers });

//   useEffect(() => {
//     const newPassengers = generatePassengers(
//       numAdults,
//       numChildren,
//       numInfants
//     );
//     setPassengers(newPassengers);
//   }, [numAdults, numChildren, numInfants, generatePassengers, setPassengers]);

//   const validatePassengerDetails = (passenger) => {
//     const isBasicDetailsFilled = !!(
//       passenger.title &&
//       passenger.firstName &&
//       passenger.lastName
//     );

//     const isInternationalDetailsFilled = isInternational
//       ? !!(
//         passenger.passportNumber &&
//         passenger.nationality &&
//         passenger.issueDate &&
//         passenger.expiryDate
//       )
//       : true;

//     const isDobRequired = passenger.passengerType === "INFANT" || passenger.passengerType === "CHILD";
//     const isDobFilled = isDobRequired ? !!passenger.dob : true;

//     return isBasicDetailsFilled && isInternationalDetailsFilled && isDobFilled;
//   };

//   const checkAllPassengersCompleted = useCallback(() => {
//     return passengers.every(validatePassengerDetails);
//   }, [passengers]);

//   const isContactDetailsValid = () => {
//     return contactDetails.email && contactDetails.phoneNumber;
//   };

//   const handleProceedToReview = useCallback(() => {
//     const areAllPassengersValid = checkAllPassengersCompleted();
//     if (areAllPassengersValid && isContactDetailsValid()) {
//       onData({ passengers, gstDetails, contactDetails });
//       setCurrentStep((p) => p + 1);
//     } else {
//       ReactToast(
//         "Please fill out all required fields, including contact details, correctly before proceeding to review."
//       );
//     }
//   }, [passengers, gstDetails, contactDetails, onData, setCurrentStep, checkAllPassengersCompleted]);

//   const toggleCard = (cardName) => {
//     if (cardName === "travellers") {
//       setExpandedCard((prev) => ({
//         ...prev,
//         [cardName]: !prev[cardName],
//       }));
//     } else if (isPassengersCompleted && isContactDetailsValid()) {
//       setExpandedCard((prev) => ({
//         ...prev,
//         [cardName]: !prev[cardName],
//       }));
//     } else {
//       ReactToast("Please complete passenger details and contact information first.");
//     }
//   };

//   useEffect(() => {
//     const allPassengersCompleted = checkAllPassengersCompleted();
//     const contactDetailsValid = isContactDetailsValid();
//     setIsPassengersCompleted(allPassengersCompleted && contactDetailsValid);
//   }, [passengers, contactDetails, checkAllPassengersCompleted]);

//   return (
//     <div className="pb-6 shadow-lg">
//       <TravellersDetails
//         expanded={expandedCard.travellers}
//         toggleCard={() => toggleCard("travellers")}
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
//         toggleCard={() => toggleCard("addons")}
//         flightData={flightData}
//         passengers={passengers}
//         setPassengers={setPassengers}
//         bookingId={bookingId}
//       />
//       <GstDetails
//         expanded={expandedCard.gst}
//         toggleCard={() => toggleCard("gst")}
//         gstDetails={gstDetails}
//         setGstDetails={setGstDetails}
//       />
//       <div className="flex flex-wrap justify-between mt-5 mx-4">
//         <button
//           onClick={() => setCurrentStep((p) => p - 1)}
//           className="text-[#D7B56D] hover:text-[#1B1D29] bg-[#1B1D29] hover:bg-[#D7B56D] m-2 textpsm md:text-base  py-2 px-4 rounded"
//         >
//           Previous
//         </button>
//         <button
//           onClick={handleProceedToReview}
//           className=" text-[#D7B56D] hover:text-[#1B1D29] bg-[#1B1D29] hover:bg-[#D7B56D] m-2 text-sm md:text-base  py-2 px-4 rounded"
//         >
//           Proceed to Review
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddDetails;
