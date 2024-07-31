// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import ModalHistoryData from "./modalHistoryData";
// import PassportDetails from "./passportDetails"; // Import PassportDetails component

// const PassengerForm = ({ passenger, index, updatePassenger }) => {
//   const token = useSelector((state) => state.auth.token);
//   const [formData, setFormData] = useState({
//     title: passenger?.title || "",
//     firstName: passenger?.firstName || "",
//     lastName: passenger?.lastName || "",
//     dob: passenger?.dob || "",
//     passport: passenger?.passport || {
//       passportNumber: "",
//       nationality: "",
//       issueDate: "",
//       expiryDate: "",
//     },
//   });

//   const [historyData, setHistoryData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showReview, setShowReview] = useState(false);

//   // Fetch history data with loading state
//   const fetchHistoryData = () => {
//     setLoading(true);
//     axios
//       .get("https://myairdeal-backend.onrender.com/user/all-passengers", {
//         headers: { authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         setHistoryData(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching history data:", error);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchHistoryData();
//   }, []);

//   const handleModalOpen = async () => {
//     fetchHistoryData();
//     setIsModalOpen(true);
//   };

//   const handleSelectFromHistory = (selectedPassenger) => {
//     setFormData({
//       title: selectedPassenger.ti,
//       firstName: selectedPassenger.fN,
//       lastName: selectedPassenger.lN,
//       dob: selectedPassenger.dob,
//       // Add other fields as necessary
//     });
//     // Update react-hook-form values
//     setValue("title", selectedPassenger.ti);
//     setValue("firstName", selectedPassenger.fN);
//     setValue("lastName", selectedPassenger.lN);
//     setValue("dob", selectedPassenger.dob);
//     // Add other fields as necessary
//     setIsModalOpen(false);
//   };

//   const {
//     register,
//     handleSubmit,
//     trigger,
//     formState: { errors },
//     setValue,
//     reset,
//   } = useForm({
//     defaultValues: formData,
//   });

//   useEffect(() => {
//     reset(formData);
//   }, [formData, reset]);

//   const departureDate = "2024-08-22T17:10";

//   const handleInputChange = async (name, value) => {
//     console.log(name, value);
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     setValue(name, value);
//     await trigger(name);
//     updatePassenger(index, name, value); // Notify parent of change
//   };
//   const calculateDate = (years) => {
//     const date = new Date(departureDate);
//     date.setFullYear(date.getFullYear() - years);
//     return date.toISOString().split("T")[0];
//   };

//   const getMaxDate = (passengerType) => {
//     if (passengerType === "ADULT") return calculateDate(12);
//     if (passengerType === "CHILD") return calculateDate(2);
//     if (passengerType === "INFANT") return calculateDate(0);
//   };

//   const getMinDate = (passengerType) => {
//     if (passengerType === "ADULT") return calculateDate(60);
//     if (passengerType === "CHILD") return calculateDate(12);
//     if (passengerType === "INFANT") return calculateDate(2);
//   };

//   const onSubmit = (data) => {
//     const payload = {
//       ti: data.title,
//       fN: data.firstName,
//       lN: data.lastName,
//       pt: passenger.passengerType,
//       dob: data.dob,
//     };
//     setSubmittedData(payload);
//     setIsSubmitted(true);
//   };

//   const [submittedData, setSubmittedData] = useState(null);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (isSubmitted && submittedData) {
//       setLoading(true);
//       axios
//         .put(
//           "https://myairdeal-backend.onrender.com/user/add-passenger",
//           submittedData,
//           {
//             headers: {
//               authorization: `Bearer ${token}`,
//             },
//           }
//         )
//         .then((response) => {
//           setIsSubmitted(false);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//           setError(error);
//           setIsSubmitted(false);
//           setLoading(false);
//         });
//     }
//   }, [isSubmitted, submittedData]);

//   return (
//     <form
//       className="rounded-lg p-4 mb-4 bg-white shadow-md"
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       <div className="text-lg font-semibold mb-4">
//         {passenger.passengerType} {passenger.typeCount}
//       </div>
//       <div className="grid grid-cols-1 gap-4 sm:gap-6">
//         <div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
//             <div className="relative p-2">
//               <select
//                 {...register("title", { required: "Title is required" })}
//                 onChange={(e) =>
//                   handleInputChange(e.target.name, e.target.value)
//                 }
//                 value={formData.title}
//                 className="h-10 border w-full border-gray-300 rounded-lg py-1 px-2 text-sm sm:text-base focus:outline-none peer"
//               >
//                 <option value="" disabled>
//                   Select Title
//                 </option>
//                 {passenger.passengerType === "ADULT" && (
//                   <>
//                     <option value="MR">Mr</option>
//                     <option value="MRS">Mrs</option>
//                     <option value="MS">Ms</option>
//                   </>
//                 )}
//                 {(passenger.passengerType === "CHILD" ||
//                   passenger.passengerType === "INFANT") && (
//                   <>
//                     <option value="MS">Ms</option>
//                     <option value="MASTER">Master</option>
//                   </>
//                 )}
//               </select>
//               <label className="absolute top-0 left-2 text-gray-500 text-sm sm:text-base transition-transform duration-300 transform -translate-y-4 scale-75 origin-top-left peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">
//                 Title
//               </label>
//               {errors.title && (
//                 <span className="text-red-500 text-xs sm:text-sm">
//                   {errors.title.message}
//                 </span>
//               )}
//             </div>
//             <div className="relative p-2">
//               <input
//                 type="text"
//                 {...register("firstName", {
//                   required: "First Name is required",
//                   minLength: { value: 2, message: "Minimum 2 characters" },
//                   maxLength: { value: 50, message: "Maximum 50 characters" },
//                   pattern: {
//                     value: /^[A-Za-z]+$/,
//                     message: "Only alphabets are allowed",
//                   },
//                 })}
//                 onChange={(e) =>
//                   handleInputChange(e.target.name, e.target.value)
//                 }
//                 value={formData.firstName}
//                 className="peer w-full h-10 border border-gray-300 rounded-lg px-2 py-1 text-sm sm:text-base focus:outline-none placeholder-transparent"
//               />
//               <label className="absolute top-0 left-2 text-gray-500 text-sm sm:text-base transition-transform duration-300 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">
//                 First Name
//               </label>
//               {errors.firstName && (
//                 <span className="text-red-500 text-xs sm:text-sm">
//                   {errors.firstName.message}
//                 </span>
//               )}
//             </div>
//             <div className="relative p-2">
//               <input
//                 type="text"
//                 {...register("lastName", {
//                   required: "Last Name is required",
//                   minLength: { value: 2, message: "Minimum 2 characters" },
//                   maxLength: { value: 50, message: "Maximum 50 characters" },
//                   pattern: {
//                     value: /^[A-Za-z]+$/,
//                     message: "Only alphabets are allowed",
//                   },
//                 })}
//                 onChange={(e) =>
//                   handleInputChange(e.target.name, e.target.value)
//                 }
//                 value={formData.lastName}
//                 className="peer w-full h-10 border border-gray-300 rounded-lg px-2 py-1 text-sm sm:text-base focus:outline-none placeholder-transparent"
//               />
//               <label className="absolute top-0 left-2 text-gray-500 text-sm sm:text-base transition-transform duration-300 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">
//                 Last Name
//               </label>
//               {errors.lastName && (
//                 <span className="text-red-500 text-xs sm:text-sm">
//                   {errors.lastName.message}
//                 </span>
//               )}
//             </div>
//             <div className="relative p-2">
//               <input
//                 type="date"
//                 {...register("dob", {
//                   required: "Date of Birth is required",
//                   validate: {
//                     validDate: (value) => {
//                       const minDate = getMinDate(passenger.passengerType);
//                       const maxDate = getMaxDate(passenger.passengerType);
//                       return (
//                         (new Date(value) >= new Date(minDate) &&
//                           new Date(value) <= new Date(maxDate)) ||
//                         `Date must be between ${minDate} and ${maxDate}`
//                       );
//                     },
//                   },
//                 })}
//                 onChange={(e) =>
//                   handleInputChange(e.target.name, e.target.value)
//                 }
//                 value={formData.dob}
//                 className="peer w-full h-10 border border-gray-300 rounded-lg px-2 py-1 text-sm sm:text-base focus:outline-none placeholder-transparent"
//               />
//               <label className="absolute top-0 left-2 text-gray-500 text-sm sm:text-base transition-transform duration-300 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">
//                 Date of Birth
//               </label>
//               {errors.dob && (
//                 <span className="text-red-500 text-xs sm:text-sm">
//                   {errors.dob.message}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//         <PassportDetails
//           passport={formData.passport}
//           // onChange={(name, value) => handleInputChange(name, value)}
//           register={register}
//           errors={errors}
//           updatePassenger={updatePassenger}
//         />
//         <div className="flex items-center justify-center">
//           <button
//             type="button"
//             onClick={handleModalOpen}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//           >
//             Select from History
//           </button>
//           <ModalHistoryData
//             isOpen={isModalOpen}
//             onClose={() => setIsModalOpen(false)}
//             historyData={historyData}
//             onSelect={handleSelectFromHistory}
//             loading={loading}
//           />
//         </div>
//         <div className="flex justify-between mt-4">
//           <button
//             type="submit"
//             className="bg-green-500 text-white px-4 py-2 rounded-lg"
//           >
//             Submit
//           </button>
//           <button
//             type="button"
//             onClick={() => setFormData({})}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg"
//           >
//             Reset
//           </button>
//         </div>
//         {loading && (
//           <div className="text-center text-gray-500 mt-4">Loading...</div>
//         )}
//         {error && (
//           <div className="text-center text-red-500 mt-4">
//             Error: {error.message}
//           </div>
//         )}
//       </div>
//     </form>
//   );
// };

// export default PassengerForm;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import PassportDetails from "./passportDetails";

const PassengerForm = ({ passenger, index, updatePassenger }) => {
  const [formData, setFormData] = useState({
    title: passenger?.title || "",
    firstName: passenger?.firstName || "",
    lastName: passenger?.lastName || "",
    dob: passenger?.dob || "",
  });

  const {
    register,
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
    <div className="rounded-lg p-4 mb-4 bg-white shadow-md">
      <div className="text-lg font-semibold mb-4">
        {passenger.passengerType} {passenger.typeCount}
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <form>
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
              <div className="relative ml-3 p-2">
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
            />
            <div>
              <button className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                Save
              </button>
              <button className="button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Select From History
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PassengerForm;
