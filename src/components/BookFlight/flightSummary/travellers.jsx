
import React, { useState, useRef } from "react";
import PassengerForm from "./passengers";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { TextField } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "./CustomPhoneInput.css";

const TravellersCard = ({
  passengers,
  setPassengers,
  expanded,
  toggleCard,
  flightData,
  contactDetails,
  setContactDetails,
}) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [condition, setCondition] = useState(
    flightData?.conditions?.pcs || null
  );
  const passengerRefs = useRef([]);

  // const updatePassenger = (index, field, value) => {
  // console.log({ field, value })
  // const updatedPassengers = passengers.map((passenger, i) =>
  //   i === index ? { ...passenger, [field]: value } : passenger
  // );
  // console.log({ updatedPassengers })
  // setPassengers(updatedPassengers);
  const updatePassenger = (index, field, value) => {
    console.log({ field, value });

    // Copy the passengers array to avoid direct mutation
    const updatedPassengers = [...passengers];

    // Update the specific passenger with the new value
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };

    console.log({ updatedPassengers });

    // Set the state with the updated array
    setPassengers(() => updatedPassengers);
  };
  // };
  console.log({ passengers })
  const getFullPhoneNumber = () => {
    return `${contactDetails.dialCode}${contactDetails.phoneNumber}`;
  };

  // Custom validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{7,14}$/; // Adjust this regex as needed
    return phoneRegex.test(phoneNumber);
  };

  const handleSave = () => {
    let validationErrors = {};

    // Validate email
    if (!contactDetails.email) {
      validationErrors.email = "Email is required.";
    } else if (!validateEmail(contactDetails.email)) {
      validationErrors.email = "Invalid email format.";
    }

    // Validate phone number
    if (!contactDetails.phoneNumber) {
      validationErrors.phone = "Phone number is required.";
    } else if (!validatePhoneNumber(contactDetails.phoneNumber)) {
      validationErrors.phone = "Invalid phone number format.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Proceed with save operation
      setLoading(true);
      // Perform your save operation here
      console.log("Saving data...");
      setLoading(false);
    }
  };

  return (
    <div className="shadow-lg">
      <div
        className="justify-between cursor-pointer shadow-sm p-3 flex items-center"
        onClick={toggleCard}
      >
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">Enter Travellers Details</h2>
          <p className="text-sm text-gray-500">
            The Fare Rules for your flight selection have changed. Please review
            them before proceeding.
          </p>
        </div>
        {expanded ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <div>
        {expanded && (
          <>
            <div className="flex flex-col gap-4">
              {Array.isArray(passengers) &&
                passengers.length > 0 &&
                passengers.map((passenger, index) => (
                  <PassengerForm
                    key={index}
                    ref={(el) => (passengerRefs.current[index] = el)}
                    passenger={passenger}
                    index={index}
                    flightData={flightData}
                    updatePassenger={updatePassenger}
                    condition={condition}
                    setPassengers={setPassengers}
                   
                  />
                ))}
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-sm md:text-base mb-2 mx-4">
                Contact Details
              </h3>
              <div className="flex md:flex-row flex-col gap-2 flex-wrap mb-4 justify-center">
                <div>
                  <TextField
                    type="email"
                    name="email"
                    label="Email"
                    value={contactDetails.email}
                    onChange={(e) =>
                      setContactDetails((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    onBlur={() => {
                      if (!validateEmail(contactDetails.email)) {
                        setErrors((prev) => ({
                          ...prev,
                          email: "Invalid email format.",
                        }));
                      } else {
                        setErrors((prev) => {
                          const { email, ...rest } = prev;
                          return rest;
                        });
                      }
                    }}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </div>

                <div>
                  <PhoneInput
                    country={"in"}
                    enableSearch
                    searchPlaceholder="Search for a country"
                    value={getFullPhoneNumber()}
                    onChange={(value, country) => {
                      const dialCode = `+${country.dialCode}`;
                      const phoneNumber = value.slice(country.dialCode.length);

                      setContactDetails({
                        phoneNumber: phoneNumber,
                        dialCode: dialCode,
                      });

                      if (!validatePhoneNumber(phoneNumber)) {
                        setErrors((prev) => ({
                          ...prev,
                          phone: "Invalid phone number format.",
                        }));
                      } else {
                        setErrors((prev) => {
                          const { phone, ...rest } = prev;
                          return rest;
                        });
                      }
                    }}
                    containerClass="custom-container"
                    buttonClass="custom-button"
                    dropdownClass="custom-dropdown"
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: true,
                      className: "custom-input",
                    }}
                  />
                  {errors.phone && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.phone}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSave}
                  className={`text-white text-sm h-12 px-5 rounded bg-blue-400`}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TravellersCard;
