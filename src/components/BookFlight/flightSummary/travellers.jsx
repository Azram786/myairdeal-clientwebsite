

import React, { useState, useRef } from "react";
import PassengerForm from "./passengers";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
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
  setContactDetails
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    getValues,
    control,
  } = useForm({
    defaultValues: {
      email: passengers[0]?.email || "",
      phone: passengers[0]?.phone
        ? `+${passengers[0].dialCode}${passengers[0].phone}`
        : "",
      dialCode: passengers[0]?.dialCode || "",
    },
    mode: "onChange",
  });

  const [condition, setCondition] = useState(
    flightData?.conditions?.pcs || null
  );
  const [loading, setLoading] = useState(false);
  const passengerRefs = useRef([]);

  const updatePassenger = (index, field, value) => {
    const updatedPassengers = passengers.map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setPassengers(updatedPassengers);
  };

  const updateContactDetails = (field, value) => {
    const updatedPassengers = passengers.map((passenger) => ({
      ...passenger,
      [field]: value,
    }));
    setPassengers(updatedPassengers);
    setValue(field, value);
  };

  const validateContactDetails = async () => {
    setLoading(true);
    let isValid = true;

    // Validate contact details
    const contactDetailsValid = await trigger();

    // Validate passenger forms
    const passengerFormsValid = await Promise.all(
      passengers.map(async (passenger, index) => {
        const passengerFormValid =
          await passengerRefs.current[index].validateForm();
        return passengerFormValid;
      })
    );

    isValid = contactDetailsValid && passengerFormsValid.every(Boolean);

    if (isValid) {
      console.log("All forms are valid. Submitting data.");

      setLoading(false);
      return true;
    } else {
      console.log("Please fill out all required fields for all passengers.");
      setLoading(false);
      return false;
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
                  />
                ))}
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-sm md:text-base mb-2 mx-4">
                Contact Details
              </h3>
              <form
                className="flex md:flex-row flex-col gap-2 flex-wrap mb-4 justify-center"
                onSubmit={handleSubmit(validateContactDetails)}
              >
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  value={contactDetails.email}
                  // onChange={(e) => updateContactDetails("email", e.target.value)}
                  // error={!!errors.email}
                  // helperText={errors.email?.message}
                  onChange={(e) => setContactDetails(prev => ({ ...prev, email: e.target.value }))}
                />
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                    validate: (value) => {
                      return (
                        value.length >= 10 ||
                        "Phone number must be at least 10 digits"
                      );
                    },
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      country={"in"}
                      enableSearch
                      searchPlaceholder="Search for a country"
                      // value={getValues("phone")}
                      // onChange={(value, country, e, formattedValue) => {
                      //   const dialCode = `+${country.dialCode}`;
                      //   const phoneNumber = value.slice(country.dialCode.length);

                      //   // Update form state
                      //   setValue("phone", formattedValue);
                      //   setValue("dialCode", dialCode);

                      //   // Update passengers state
                      //   const updatedPassengers = passengers.map((passenger) => ({
                      //     ...passenger,
                      //     phone: phoneNumber,
                      //     dialCode: dialCode,
                      //   }));
                      //   console.log({ updatedPassengers })
                      //   setPassengers(updatedPassengers);

                      //   // Trigger validation
                      //   trigger("phone");
                      // }}
                      value={contactDetails.phoneNumber}
                      onChange={(value, country) => {
                        const phoneNumber = value.slice(country.dialCode.length);
                        console.log({phoneNumber})
                        setContactDetails(prev => ({ ...prev, phoneNumber: phoneNumber }))
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
                  )}
                />
                {errors.phone && (
                  <span className="text-red-500 text-xs">
                    {errors.phone.message}
                  </span>
                )}
                <br />
                <button
                  type="submit"
                  className={`text-white text-sm h-12 px-5 rounded
                    bg-blue-400`}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default TravellersCard;
