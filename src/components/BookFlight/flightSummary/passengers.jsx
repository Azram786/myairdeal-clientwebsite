
// import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { MenuItem, Select, TextField, FormHelperText } from "@mui/material";
// import PassportDetails from "./passportDetails";
// import { format } from "date-fns";
// import ModalHistoryData from "./modalHistoryData";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const PassengerForm = forwardRef(({ passenger, index, updatePassenger, condition, flightData }, ref) => {


//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     trigger,
//     reset,
//   } = useForm({
//     defaultValues: {
//       title: passenger?.title || "",
//       firstName: passenger?.firstName || "",
//       lastName: passenger?.lastName || "",
//       dob: passenger?.dob || "",
//     },
//   });

//   const { token } = useSelector((state) => state.auth)
//   const passportRef = useRef();

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [historyData, setHistoryData] = useState([]);
//   console.log({ historyData })
//   const [loading, setLoading] = useState(false);

//   const [departureDate, setDepartureDate] = useState(flightData?.tripInfos[0].sI[0]?.dt);

//   useImperativeHandle(ref, () => ({
//     validateForm: async () => {
//       const result = await trigger();
//       const passportValid = condition ? await passportRef.current?.validatePassport() : true;
//       return result && passportValid;
//     },
//   }));

//   const handleModalOpen = async (e) => {
//     // e.preventDefault()
//     setIsModalOpen(true);
//   };

//   // Fetch history data with loading state
//   const fetchHistoryData = () => {
//     // setLoading(true);
//     axios
//       .get(`${import.meta.env.VITE_SERVER_URL}user/all-passengers`, {
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
//     reset({
//       title: passenger?.title || "",
//       firstName: passenger?.firstName || "",
//       lastName: passenger?.lastName || "",
//       dob: passenger?.dob || "",
//     });
//   }, [passenger, reset]);


//   const handleInputChange = (name, value) => {
//     setValue(name, value);
//     updatePassenger(index, name, value);
//   };

//   const handleSelectFromHistory = (selectedPassenger) => {
//     setFormData({
//       title: selectedPassenger.ti,
//       firstName: selectedPassenger.fN,
//       lastName: selectedPassenger.lN,
//       dob: selectedPassenger.dob,

//     });
//     // Update react-hook-form values
//     setValue("title", selectedPassenger.ti);
//     setValue("firstName", selectedPassenger.fN);
//     setValue("lastName", selectedPassenger.lN);
//     setValue("dob", selectedPassenger.dob);
//     // Add other fields as necessary
//     setIsModalOpen(false);
//   };

//   useEffect(() => {
//     fetchHistoryData();
//   }, []);
//   const calculateDate = (years) => {
//     const date = new Date(departureDate);
//     date.setFullYear(date.getFullYear() - years);
//     return date.toISOString().split("T")[0];
//   };


//   const getMaxDate = (passengerType) => {
//     if (passengerType === "ADULT") return calculateDate(18);
//     if (passengerType === "CHILD") return calculateDate(2);
//     if (passengerType === "INFANT") return calculateDate(0);
//   };

//   const getMinDate = (passengerType) => {
//     if (passengerType === "ADULT") return calculateDate(60);
//     if (passengerType === "CHILD") return calculateDate(12);
//     if (passengerType === "INFANT") return calculateDate(2);
//   };

//   return (
//     <div className="flex">
//       <form>
//         <div className="flex gap-2 items-center">
//           <div className="font-semibold">
//             <h2>
//               {passenger.passengerType} {passenger.typeCount}
//             </h2>
//           </div>
//           <div>
//             <Controller
//               name="title"
//               control={control}
//               rules={{ required: "Title is required" }}
//               render={({ field }) => (
//                 <Select
//                   {...field}
//                   fullWidth
//                   error={!!errors.title}
//                   displayEmpty
//                   onChange={(e) => {
//                     field.onChange(e);
//                     handleInputChange("title", e.target.value);
//                   }}
//                   onBlur={() => trigger("title")} // Trigger validation on blur
//                 >
//                   <MenuItem value="" disabled>
//                     Select Title
//                   </MenuItem>
//                   {passenger.passengerType === "ADULT" ? (
//                     <>
//                       <MenuItem value="MR">Mr</MenuItem>
//                       <MenuItem value="MRS">Mrs</MenuItem>
//                       <MenuItem value="MS">Ms</MenuItem>
//                     </>
//                   ) : (
//                     <>
//                       <MenuItem value="MS">Ms</MenuItem>
//                       <MenuItem value="MASTER">Master</MenuItem>
//                     </>
//                   )}
//                 </Select>
//               )}
//             />
//             {errors.title && (
//               <FormHelperText error>{errors.title.message}</FormHelperText>
//             )}
//           </div>
//           <div>
//             <Controller
//               name="firstName"
//               control={control}
//               rules={{
//                 required: "First Name is required",
//                 minLength: { value: 2, message: "Minimum 2 characters" },
//                 maxLength: { value: 50, message: "Maximum 50 characters" },
//                 pattern: {
//                   value: /^[A-Za-z]+$/,
//                   message: "Only alphabets are allowed",
//                 },
//               }}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   fullWidth
//                   label="First Name"
//                   error={!!errors.firstName}
//                   helperText={errors.firstName?.message}
//                   onChange={(e) => {
//                     field.onChange(e);
//                     handleInputChange("firstName", e.target.value);
//                   }}
//                   onBlur={() => trigger("firstName")} // Trigger validation on blur
//                 />
//               )}
//             />
//           </div>
//           <div>
//             <Controller
//               name="lastName"
//               control={control}
//               rules={{
//                 required: "Last Name is required",
//                 minLength: { value: 2, message: "Minimum 2 characters" },
//                 maxLength: { value: 50, message: "Maximum 50 characters" },
//                 pattern: {
//                   value: /^[A-Za-z]+$/,
//                   message: "Only alphabets are allowed",
//                 },
//               }}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   fullWidth
//                   label="Last Name"
//                   error={!!errors.lastName}
//                   helperText={errors.lastName?.message}
//                   onChange={(e) => {
//                     field.onChange(e);
//                     handleInputChange("lastName", e.target.value);
//                   }}
//                   onBlur={() => trigger("lastName")} // Trigger validation on blur
//                 />
//               )}
//             />
//           </div>
//           {condition?.dobe && (
//             <div>
//               <Controller
//                 name="dob"
//                 control={control}
//                 rules={{
//                   required: "Date of Birth is required",
//                   validate: {
//                     validateDOB: (value) => {
//                       const selectedDate = new Date(value);
//                       const max = new Date(getMaxDate(passenger.passengerType));
//                       const min = new Date(getMinDate(passenger.passengerType));
//                       if (selectedDate > max) {
//                         return `${passenger.passengerType} must be born on or before ${format(max, "yyyy-MM-dd")}`;
//                       }
//                       if (selectedDate < min) {
//                         return `${passenger.passengerType} must be born on or after ${format(min, "yyyy-MM-dd")}`;
//                       }
//                       return true;
//                     },
//                   },
//                 }}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label="Date of Birth"
//                     type="date"
//                     InputLabelProps={{ shrink: true }}
//                     error={!!errors.dob}
//                     helperText={errors.dob?.message}
//                     inputProps={{
//                       min: getMinDate(passenger.passengerType),
//                       max: getMaxDate(passenger.passengerType),
//                     }}
//                     onChange={(e) => {
//                       field.onChange(e);
//                       handleInputChange("dob", e.target.value);
//                     }}
//                     onBlur={() => trigger("dob")} // Trigger validation on blur
//                   />
//                 )}
//               />
//             </div>
//           )}
//         </div>
//         {condition && (
//           <PassportDetails
//             ref={passportRef}
//             passenger={passenger}
//             index={index}
//             updatePassenger={updatePassenger}
//             condition={condition}
//             passengerType={passenger.passengerType}
//             flightData={flightData}
//             departureDate={departureDate}
//           />
//         )}

//         <div>
//           <div>
//             <input type="checkbox" />
//             <label htmlFor="">save passenger information</label>
//           </div>
//           <div><button
//             onClick={()=>handleModalOpen()}
//             className="bg-red-500">Select from history</button></div>
//         </div>
//       </form>
//       { isModalOpen && 

//       <div className="bg-purple-500 w-full h-96">
//         <h1>modal opened</h1>
//       </div>
//       }


//     </div>
//   );
// });

// export default PassengerForm;


import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import { MenuItem, Select, TextField, FormHelperText } from "@mui/material";
import PassportDetails from "./passportDetails";
import { format } from "date-fns";
import ModalHistoryData from "./modalHistoryData";
import { useSelector } from "react-redux";
import axios from "axios";

const PassengerForm = forwardRef(({ passenger, index, updatePassenger, condition, flightData }, ref) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      title: passenger?.title || "",
      firstName: passenger?.firstName || "",
      lastName: passenger?.lastName || "",
      dob: passenger?.dob || "",
    },
  });

  const { token } = useSelector((state) => state.auth);
  const passportRef = useRef();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [departureDate, setDepartureDate] = useState(flightData?.tripInfos[0].sI[0]?.dt);

  useImperativeHandle(ref, () => ({
    validateForm: async () => {
      const result = await trigger();
      const passportValid = condition ? await passportRef.current?.validatePassport() : true;
      return result && passportValid;
    },
  }));

  const handleModalOpen = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const fetchHistoryData = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}user/all-passengers`, {
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
    reset({
      title: passenger?.title || "",
      firstName: passenger?.firstName || "",
      lastName: passenger?.lastName || "",
      dob: passenger?.dob || "",
    });
  }, [passenger, reset]);

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const handleInputChange = (name, value) => {
    setValue(name, value);
    updatePassenger(index, name, value);
  };

  const handleSelectFromHistory = (selectedPassenger) => {
    setValue("title", selectedPassenger.ti);
    setValue("firstName", selectedPassenger.fN);
    setValue("lastName", selectedPassenger.lN);
    setValue("dob", selectedPassenger.dob);
    updatePassenger(index, "title", selectedPassenger.ti);
    updatePassenger(index, "firstName", selectedPassenger.fN);
    updatePassenger(index, "lastName", selectedPassenger.lN);
    updatePassenger(index, "dob", selectedPassenger.dob);
    setIsModalOpen(false);
  };

  const calculateDate = (years) => {
    const date = new Date(departureDate);
    date.setFullYear(date.getFullYear() - years);
    return date.toISOString().split("T")[0];
  };

  const getMaxDate = (passengerType) => {
    if (passengerType === "ADULT") return calculateDate(18);
    if (passengerType === "CHILD") return calculateDate(2);
    if (passengerType === "INFANT") return calculateDate(0);
  };

  const getMinDate = (passengerType) => {
    if (passengerType === "ADULT") return calculateDate(60);
    if (passengerType === "CHILD") return calculateDate(12);
    if (passengerType === "INFANT") return calculateDate(2);
  };

  return (
    <div className="flex">
      <form>
        <div className="flex gap-2 items-center">
          <div className="font-semibold">
            <h2>
              {passenger.passengerType} {passenger.typeCount}
            </h2>
          </div>
          <div>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  fullWidth
                  error={!!errors.title}
                  displayEmpty
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange("title", e.target.value);
                  }}
                  onBlur={() => trigger("title")}
                >
                  <MenuItem value="" disabled>
                    Select Title
                  </MenuItem>
                  {passenger.passengerType === "ADULT" ? (
                    <>
                      <MenuItem value="MR">Mr</MenuItem>
                      <MenuItem value="MRS">Mrs</MenuItem>
                      <MenuItem value="MS">Ms</MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem value="MS">Ms</MenuItem>
                      <MenuItem value="MASTER">Master</MenuItem>
                    </>
                  )}
                </Select>
              )}
            />
            {errors.title && (
              <FormHelperText error>{errors.title.message}</FormHelperText>
            )}
          </div>
          <div>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: "First Name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
                maxLength: { value: 50, message: "Maximum 50 characters" },
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Only alphabets are allowed",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="First Name"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange("firstName", e.target.value);
                  }}
                  onBlur={() => trigger("firstName")}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: "Last Name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
                maxLength: { value: 50, message: "Maximum 50 characters" },
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Only alphabets are allowed",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Last Name"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange("lastName", e.target.value);
                  }}
                  onBlur={() => trigger("lastName")}
                />
              )}
            />
          </div>
          {condition?.dobe && (
            <div>
              <Controller
                name="dob"
                control={control}
                rules={{
                  required: "Date of Birth is required",
                  validate: {
                    validateDOB: (value) => {
                      const selectedDate = new Date(value);
                      const max = new Date(getMaxDate(passenger.passengerType));
                      const min = new Date(getMinDate(passenger.passengerType));
                      if (selectedDate > max) {
                        return `${passenger.passengerType} must be born on or before ${format(max, "yyyy-MM-dd")}`;
                      }
                      if (selectedDate < min) {
                        return `${passenger.passengerType} must be born on or after ${format(min, "yyyy-MM-dd")}`;
                      }
                      return true;
                    },
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.dob}
                    helperText={errors.dob?.message}
                    inputProps={{
                      min: getMinDate(passenger.passengerType),
                      max: getMaxDate(passenger.passengerType),
                    }}
                    onChange={(e) => {
                      field.onChange(e);
                      handleInputChange("dob", e.target.value);
                    }}
                    onBlur={() => trigger("dob")}
                  />
                )}
              />
            </div>
          )}
        </div>
        {condition && (
          <PassportDetails
            ref={passportRef}
            passenger={passenger}
            index={index}
            updatePassenger={updatePassenger}
            condition={condition}
            passengerType={passenger.passengerType}
            flightData={flightData}
            departureDate={departureDate}
          />
        )}

        <div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Save passenger information</label>
          </div>
          <div>
            <button
              onClick={handleModalOpen}
              type="button"
              className="bg-red-500"
            >
              Select from history
            </button>
          </div>
        </div>
      </form>

      {isModalOpen && (
        <ModalHistoryData
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelectPassenger={handleSelectFromHistory}
          historyData={historyData}
        />
      )}
    </div>
  );
});

export default React.memo(PassengerForm);