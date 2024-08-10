// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";

// const PassportDetails = ({ passenger, index, updatePassenger }) => {
//   const {
//     register,
//     trigger,
//     formState: { errors },
//     setValue,
//     watch,
//     reset,
//   } = useForm({
//     defaultValues: {
//       passportNumber: passenger?.passportNumber || "",
//       issueDate: passenger?.issueDate || "",
//       expiryDate: passenger?.expiryDate || "",
//       nationality: passenger?.nationality || "",
//     },
//   });

//   useEffect(() => {
//     // Only reset if the passenger data has actually changed
//     if (
//       passenger?.passportNumber !== watch("passportNumber") ||
//       passenger?.issueDate !== watch("issueDate") ||
//       passenger?.expiryDate !== watch("expiryDate") ||
//       passenger?.nationality !== watch("nationality")
//     ) {
//       reset({
//         passportNumber: passenger?.passportNumber || "",
//         issueDate: passenger?.issueDate || "",
//         expiryDate: passenger?.expiryDate || "",
//         nationality: passenger?.nationality || "",
//       });
//     }
//   }, [passenger, reset, watch]);

//   const handleInputChange = (name, value) => {
//     setValue(name, value);
//     trigger(name);
//     updatePassenger(index, name, value);
//   };

//   return (
//     <div className="mt-4">
//       <div className="text-lg font-semibold mb-4">Add Passport Information</div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//         <div className="relative p-2 mt-2">
//           <select
//             {...register("nationality", {
//               required: "Nationality is required",
//               minLength: { value: 2, message: "Minimum 2 characters" },
//               maxLength: { value: 50, message: "Maximum 50 characters" },
//             })}
//             onChange={(e) => handleInputChange(e.target.name, e.target.value)}
//             value={watch("nationality")}
//             className="peer w-full h-10 border border-gray-300 rounded-lg  px-2 py-1 text-sm focus:outline-none"
//             aria-label="Nationality"
//           >
//             <option value="" disabled>
//               Select Nationality
//             </option>
//             <option value="US">United States</option>
//             <option value="CA">Canada</option>
//             <option value="GB">United Kingdom</option>
//             <option value="IN">India</option>
//             <option value="AU">Australia</option>
//             <option value="DE">Germany</option>
//             <option value="FR">France</option>
//             <option value="JP">Japan</option>
//           </select>
//           <label className="absolute top-0 left-2 text-gray-500 text-sm transition-transform duration-300 transform -translate-y-4 scale-75 origin-top-left peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">
//             Nationality
//           </label>
//           {errors.nationality && (
//             <span className="text-red-500 text-xs">
//               {errors.nationality.message}
//             </span>
//           )}
//         </div>

//         <div className="relative p-2 mt-2">
//           <input
//             type="text"
//             {...register("passportNumber", {
//               required: "Passport Number is required",
//               minLength: { value: 8, message: "Minimum 8 characters" },
//               maxLength: { value: 15, message: "Maximum 15 characters" },
//             })}
//             onChange={(e) => handleInputChange(e.target.name, e.target.value)}
//             value={watch("passportNumber")}
//             className="peer w-full h-10 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none placeholder-transparent"
//             aria-label="Passport Number"
//           />
//           <label className=" absolute top-0 left-2 w-44 text-gray-500 text-sm transition-transform duration-300 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">
//             Passport Number
//           </label>

//           {errors.passportNumber && (
//             <span className="text-red-500 text-xs">
//               {errors.passportNumber.message}
//             </span>
//           )}
//         </div>

//         <div className="relative p-2 mt-2">
//           <input
//             type="date"
//             {...register("issueDate", {
//               required: "Issue Date is required",
//             })}
//             onChange={(e) => handleInputChange(e.target.name, e.target.value)}
//             value={watch("issueDate")}
//             className="peer w-full h-10 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none placeholder-gray-400"
//             placeholder="YYYY-MM-DD"
//             aria-label="Issue Date"
//           />
//           <label className="absolute top-0 left-2 text-gray-500 text-sm transition-transform duration-300 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">
//             Issue Date
//           </label>
//           {errors.issueDate && (
//             <span className="text-red-500 text-xs">
//               {errors.issueDate.message}
//             </span>
//           )}
//         </div>

//         <div className="relative p-2 mt-2">
//           <input
//             type="date"
//             {...register("expiryDate", {
//               required: "Expiry Date is required",
//             })}
//             onChange={(e) => handleInputChange(e.target.name, e.target.value)}
//             value={watch("expiryDate")}
//             className="peer w-full h-10 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none placeholder-gray-400"
//             placeholder="YYYY-MM-DD"
//             aria-label="Expiry Date"
//           />
//           <label className="absolute top-0 left-2 text-gray-500 text-sm transition-transform duration-300 transform -translate-y-4 scale-75 origin-top-left peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600">
//             Expiry Date
//           </label>
//           {errors.expiryDate && (
//             <span className="text-red-500 text-xs">
//               {errors.expiryDate.message}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PassportDetails;
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import Select from 'react-select';
import { getCode, getNames } from 'country-list';

const PassportDetails = ({ passenger, index, updatePassenger }) => {
  const {
    control,
    trigger,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      passportNumber: passenger?.passportNumber || "",
      issueDate: passenger?.issueDate || "",
      expiryDate: passenger?.expiryDate || "",
      nationality: passenger?.nationality || "",
    },
  });

  useEffect(() => {
    if (
      passenger?.passportNumber !== watch("passportNumber") ||
      passenger?.issueDate !== watch("issueDate") ||
      passenger?.expiryDate !== watch("expiryDate") ||
      passenger?.nationality !== watch("nationality")
    ) {
      reset({
        passportNumber: passenger?.passportNumber || "",
        issueDate: passenger?.issueDate || "",
        expiryDate: passenger?.expiryDate || "",
        nationality: passenger?.nationality || "",
      });
    }
  }, [passenger, reset, watch]);

  const countryNames = getNames();


  const options = countryNames.map(country => ({
    label: country,
    value: getCode(country),
  }));

  const handleChange = (selectedOption) => {
    onSelectCountry(selectedOption.value);
  };

  const handleInputChange = (name, value) => {
    setValue(name, value);
    trigger(name);
    updatePassenger(index, name, value);
  };

  return (
    <div className="mt-4">
      <div className="text-lg font-semibold mb-4">Add Passport Information</div>
      <div className="flex">
        <Controller
          name="nationality"
          control={control}
          rules={{
            required: "Nationality is required",
          }}
          render={({ field }) => (
            <div className="">

              <Select
                options={options}
                onChange={handleChange}
                placeholder="Nationality"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    display: "flex",
                    boxShadow: "none",
                    border: "none",
                    cursor: "pointer",
                   
                  }),
                }}
              />

            </div>
          )}
        />

        <Controller
          name="passportNumber"
          control={control}
          rules={{
            required: "Passport Number is required",
            minLength: { value: 8, message: "Minimum 8 characters" },
            maxLength: { value: 15, message: "Maximum 15 characters" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Passport Number"
              fullWidth
              error={!!errors.passportNumber}
              helperText={errors.passportNumber?.message}
              onChange={(e) => {
                field.onChange(e);
                handleInputChange("passportNumber", e.target.value);
              }}
            />
          )}
        />

        <Controller
          name="issueDate"
          control={control}
          rules={{
            required: "Issue Date is required",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Issue Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.issueDate}
              helperText={errors.issueDate?.message}
              onChange={(e) => {
                field.onChange(e);
                handleInputChange("issueDate", e.target.value);
              }}
            />
          )}
        />

        <Controller
          name="expiryDate"
          control={control}
          rules={{
            required: "Expiry Date is required",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Expiry Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.expiryDate}
              helperText={errors.expiryDate?.message}
              onChange={(e) => {
                field.onChange(e);
                handleInputChange("expiryDate", e.target.value);
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default PassportDetails;
