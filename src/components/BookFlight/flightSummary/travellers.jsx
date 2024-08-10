import React from "react";
import PassengerForm from "./passengers";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useForm } from "react-hook-form";

const TravellersCard = ({
  passengers,
  setPassengers,
  expanded,
  toggleCard,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: passengers[0]?.email || "",
      phone: passengers[0]?.phone || "",
    },
  });

  const updatePassenger = (index, field, value) => {
    console.log(field, value, "update");
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
    console.log("Validation Result:", {
      email: getValues("email"),
      phone: getValues("phone"),
    });
  };

  return (
    <div className="border-purple-300 shadow-lg  ">
      <div
        className="justify-between cursor-pointerm shadow-sm p-3 flex items-center"
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
      <div>{expanded && (
        <>
          <div className="mt-4">
            {Array.isArray(passengers) &&
              passengers.length > 0 &&
              passengers.map((passenger, index) => (
                <PassengerForm
                  key={index}
                  passenger={passenger}
                  index={index}
                  updatePassenger={updatePassenger}
                />
              ))}
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-sm mb-2">Contact Details</h3>
            <form className="flex md:flex-row flex-col gap-2 justify-center" onSubmit={handleSubmit(validateContactDetails)}>
              <input
                type="email"
                name="email"
                placeholder="Email"
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
                className="md:w-1/2 h-10 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none mb-2"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
                onChange={(e) => updateContactDetails("phone", e.target.value)}
                className="md:w-1/2 h-10 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none"
              />
              {errors.phone && (
                <span className="text-red-500 text-xs">
                  {errors.phone.message}
                </span>
              )}
              <br />
              <button
                type="submit"
                className=" bg-[#007EC4] text-white  text-sm h-12 px-5 rounded"
              >
                Save
              </button>
            </form>
          </div>
        </>
      )}</div>

    </div>
  );
};

export default TravellersCard;
