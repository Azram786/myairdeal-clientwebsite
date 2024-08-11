
import React, { useState } from "react";
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
}) => {

  console.log({ passengers })
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
      phone: passengers[0]?.phone || "",
    },
  });

  const [condition, setCondition] = useState(flightData?.conditions?.pcs || null);

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
    await trigger();
  
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
                    passenger={passenger}
                    index={index}
                    updatePassenger={updatePassenger}
                    condition={condition}
                  />
                ))}
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-sm mb-2">Contact Details</h3>
              <form
                className="flex md:flex-row flex-col gap-2 justify-center"
                onSubmit={handleSubmit(validateContactDetails)}
              >
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  // placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                    minLength: {
                      value: 5,
                      message: "Email must be at least 5 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Email must not exceed 50 characters",
                    },
                  })}
                  onChange={(e) => updateContactDetails("email", e.target.value)}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+?\d{7,14}$/,
                      message: "Phone number must be between 7 and 14 digits",
                    },
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      country={"in"}
                      enableSearch
                      searchPlaceholder="Search for a country"
                      onChange={(value) => {
                        field.onChange(value);
                        updateContactDetails("phone", value);
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
                  disabled={Object.keys(errors).length > 0}
                  className="bg-[#007EC4] text-white text-sm h-12 px-5 rounded"
                >
                  Save
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

