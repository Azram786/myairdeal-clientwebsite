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
    <div className="rounded-lg  mb-4 bg-white ">
      <div className="text-lg font-semibold mb-4">
        {passenger.passengerType} {passenger.typeCount}
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="relative p-2">
                <select
                  {...register("title", { required: "Title is required" })}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  value={formData.title}
                  className="h-10 border w-full border-gray-300 rounded-lg py-1 px-2 text-sm focus:outline-none peer"
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
                <label className="absolute top-0 left-2 text-gray-500 text-sm transition-transform duration-300 transform -translate-y-4 scale-75 origin-top-left peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">
                  Title
                </label>
                {errors.title && (
                  <span className="text-red-500 text-xs">
                    {errors.title.message}
                  </span>
                )}
              </div>
              <div className="relative p-2">
                <input
                  type="text"
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
                  className="peer w-full h-10 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none placeholder-transparent"
                />
                <label className="absolute top-0 left-2 text-gray-500 text-sm transition-transform duration-300 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">
                  First Name
                </label>
                {errors.firstName && (
                  <span className="text-red-500 text-xs">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="relative p-2">
                <input
                  type="text"
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
                  className="peer w-full h-10 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none placeholder-transparent"
                />
                <label className="absolute top-0 left-2 text-gray-500 text-sm transition-transform duration-300 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">
                  Last Name
                </label>
                {errors.lastName && (
                  <span className="text-red-500 text-xs">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
              <div className="relative p-2">
                <input
                  type="date"
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
                          return `${
                            passenger.passengerType
                          } must be born on or before ${format(
                            max,
                            "yyyy-MM-dd"
                          )}`;
                        }
                        if (selectedDate < min) {
                          return `${
                            passenger.passengerType
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
                  className="peer w-full h-10 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none placeholder-transparent"
                />
                <label className="absolute top-0 left-2 text-gray-500 text-sm transition-transform duration-300 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">
                  Date of Birth
                </label>
                {errors.dob && (
                  <span className="text-red-500 text-xs">
                    {errors.dob.message}
                  </span>
                )}
              </div>
            </div>

            <PassportDetails
              passenger={passenger}
              index={index}
              updatePassenger={updatePassenger}
              passport={formData.passport}
            />
            <div className="w-full justify-between md:flex-row gap-3 flex-col mt-4 flex">
              <button
                type="submit"
                className="button text-sm bg-[#007EC4] hover:bg-blue-600 text-white font-bold md:w-1/2 py-2 px-4 rounded "
              >
                Save
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleModalOpen}
                className="button text-sm bg-green-500 hover:bg-green-600 text-white font-bold py-2 md:w-1/2 rounded"
              >
                {loading ? (
                <div className="text-center text-white "><span className="italic">Loading...</span></div>
              ):( "Select From History")}
               
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PassengerForm;
