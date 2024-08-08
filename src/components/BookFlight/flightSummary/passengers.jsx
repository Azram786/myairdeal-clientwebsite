import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import PassportDetails from "./passportDetails";
import { useSelector } from "react-redux";
import ModalHistoryData from "./modalHistoryData";
import axios from "axios";

const PassengerForm = ({ passenger, index, updatePassenger }) => {
  //states
  const [historyData, setHistoryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const [formData, setFormData] = useState({
    title: passenger?.title || "",
    firstName: passenger?.firstName || "",
    lastName: passenger?.lastName || "",
    dob: passenger?.dob || "",
    passport: passenger?.passport || {
      passportNumber: "",
      nationality: "",
      issueDate: "",
      expiryDate: "",
    },
  });

  // Fetch history data with loading state
  const fetchHistoryData = () => {
    setLoading(true);
    axios
      .get("https://myairdeal-backend.onrender.com/user/all-passengers", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setHistoryData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching history data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const handleModalOpen = async () => {
    fetchHistoryData();
    setIsModalOpen(true);
  };

  const handleSelectFromHistory = (selectedPassenger) => {
    setFormData({
      title: selectedPassenger.ti,
      firstName: selectedPassenger.fN,
      lastName: selectedPassenger.lN,
      dob: selectedPassenger.dob,
      // Add other fields as necessary
    });
    // Update react-hook-form values
    setValue("title", selectedPassenger.ti);
    setValue("firstName", selectedPassenger.fN);
    setValue("lastName", selectedPassenger.lN);
    setValue("dob", selectedPassenger.dob);
    // Add other fields as necessary
    setIsModalOpen(false);
  };

  const onSubmit = (data) => {
    const payload = {
      ti: data.title,
      fN: data.firstName,
      lN: data.lastName,
      pt: passenger.passengerType,
      dob: data.dob,
    };
    setSubmittedData(payload);
    setIsSubmitted(true);
  };

  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isSubmitted && submittedData) {
      setLoading(true);
      axios
        .put(
          "https://myairdeal-backend.onrender.com/user/add-passenger",
          submittedData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setIsSubmitted(false);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError(error);
          setIsSubmitted(false);
          setLoading(false);
        });
    }
  }, [isSubmitted, submittedData]);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: formData,
  });

  // Reset form when passenger data changes
  useEffect(() => {
    reset(formData);
  }, [passenger, reset, formData]);

  const departureDate = "2024-08-22T17:10";

  const handleInputChange = async (name, value) => {
    console.log(name, value);
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setValue(name, value);
    await trigger(name);
    updatePassenger(index, name, value); // Notify parent of change
  };

  const calculateDate = (years) => {
    const date = new Date(departureDate);
    date.setFullYear(date.getFullYear() - years);
    return date.toISOString().split("T")[0];
  };

  const getMaxDate = (passengerType) => {
    if (passengerType === "ADULT") return calculateDate(12);
    if (passengerType === "CHILD") return calculateDate(2);
    if (passengerType === "INFANT") return calculateDate(0);
  };

  const getMinDate = (passengerType) => {
    if (passengerType === "ADULT") return calculateDate(60);
    if (passengerType === "CHILD") return calculateDate(12);
    if (passengerType === "INFANT") return calculateDate(2);
  };

  return (
    <div className="  mb-4 bg-yellow-700 ">
      <div className="text-lg font-semibold mb-4 bg-fuchsia-800">
        {passenger.passengerType} {passenger.typeCount}
      </div>

      <div className="bg-violet-600">
        <form onSubmit={handleSubmit(onSubmit)}>


          <div className="flex w-full bg-red-600">

            {/* Select Dropdown */}
            <div className="relative w-1/4">
              <select
                {...register("title", { required: "Title is required" })}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                value={formData.title}
                id="nationality"
                className="block appearance-none w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-white border border-gray-300  focus:outline-none focus:ring-0 focus:border-blue-500 peer"

              >
                <option value="" disabled>
                  Select Title
                </option>
                {passenger.passengerType === "ADULT" && (
                  <>
                    <option value="MR">Mr</option>
                    <option value="MRS">Mrs</option>
                    <option value="MS">Ms</option>
                  </>
                )}
                {(passenger.passengerType === "CHILD" ||
                  passenger.passengerType === "INFANT") && (
                    <>
                      <option value="MS">Ms</option>
                      <option value="MASTER">Master</option>
                    </>
                  )}
              </select>
              <label
                htmlFor="nationality"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Title
              </label>
              {/* Arrow Icon */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg
                  className="w-4 h-4 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {errors.title && (
                <span className="text-red-500 text-xs">
                  {errors.title.message}
                </span>
              )}
            </div>



            <div className="relative w-1/4  ">
              <input
                type="text"
                id="first-id"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white  border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 peer"



                {...register("firstName", {
                  required: "First Name is required",
                  minLength: { value: 2, message: "Minimum 2 characters" },
                  maxLength: { value: 50, message: "Maximum 50 characters" },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Only alphabets are allowed",
                  },
                })}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                value={formData.firstName}
              />
              <label
                htmlFor="first-id"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                First Name
              </label>
              {errors.firstName && (
                <span className="text-red-500 text-xs">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="relative w-1/4">

              <input
                type="text"

                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white  border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 peer"




                {...register("lastName", {
                  required: "Last Name is required",
                  minLength: { value: 2, message: "Minimum 2 characters" },
                  maxLength: { value: 50, message: "Maximum 50 characters" },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Only alphabets are allowed",
                  },
                })}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                value={formData.lastName}
              />
              <label
                htmlFor="first-id"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                LastName
              </label>
              {errors.lastName && (
                <span className="text-red-500 text-xs">
                  {errors.lastName.message}
                </span>
              )}
            </div>
            <div className="w-1/4">
              <button className="bg-white border border-blue-500 text-blue-600 ">
                Select from history
              </button>
            </div>
          </div>

          {/* Date Input */}
          {/* <div className="relative w-full max-w-sm">
              <input
                type="date"
                id="date"
                {...register("dob", {
                  required: "Date of Birth is required",
                  validate: {
                    validateDOB: (value) => {
                      const selectedDate = new Date(value);
                      const max = new Date(
                        getMaxDate(passenger.passengerType)
                      );
                      const min = new Date(
                        getMinDate(passenger.passengerType)
                      );
                      if (selectedDate > max) {
                        return `${passenger.passengerType
                          } must be born on or before ${format(
                            max,
                            "yyyy-MM-dd"
                          )}`;
                      }
                      if (selectedDate < min) {
                        return `${passenger.passengerType
                          } must be born on or after ${format(
                            min,
                            "yyyy-MM-dd"
                          )}`;
                      }
                      return true;
                    },
                  },
                })}
                min={getMinDate(passenger.passengerType)}
                max={getMaxDate(passenger.passengerType)}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                value={formData.dob}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white  border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                placeholder=" "
              />
              <label
                htmlFor="date"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                DOB
              </label>
              {errors.dob && (
                <span className="text-red-500 text-xs">
                  {errors.dob.message}
                </span>
              )}
            </div> */}


          {/* <PassportDetails
              passenger={passenger}
              index={index}
              updatePassenger={updatePassenger}
              passport={formData.passport}
            /> */}
          {/* <div className="w-full justify-between md:flex-row gap-3 flex-col mt-4 flex">
            <button
              type="submit"
              className="button text-sm bg-[#007EC4] hover:bg-blue-600 text-white font-bold md:w-1/2 py-2 px-4  "
            >
              Save
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleModalOpen}
              className="button text-sm bg-green-500 hover:bg-green-600 text-white font-bold py-2 md:w-1/2 "
            >
              {loading ? (
                <div className="text-center text-white "><span className="italic">Loading...</span></div>
              ) : ("Select From History")}

            </button>
            <ModalHistoryData
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              historyData={historyData}
              onSelect={handleSelectFromHistory}
              loading={loading}
            />

            {error && (
              <div className="text-center text-red-500 mt-4">
                Error: {error.message}
              </div>
            )}
          </div> */}
        </form>
      </div>

    </div>
  );
};

export default PassengerForm;
