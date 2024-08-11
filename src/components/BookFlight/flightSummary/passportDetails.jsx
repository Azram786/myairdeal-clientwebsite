// import React, { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { TextField } from "@mui/material";
// import Select from 'react-select';
// import { getCode, getName, getNames } from 'country-list';
// import Flag from 'react-world-flags';

// const PassportDetails = ({ passenger, index, updatePassenger, condition }) => {
//   const {
//     control,
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

//   const [selectedNationality, setSelectedNationality] = useState(null);

//   const countryNames = getNames();

//   const options = countryNames.map((country) => ({
//     label: (
//       <div className="flex items-center">
//         <Flag code={getCode(country)} style={{ width: '20px', marginRight: '8px' }} />
//         {country}
//       </div>
//     ),
//     value: getCode(country),
//   }));

//   useEffect(() => {
//     if (passenger?.nationality) {
//       const countryCode = getCode(passenger.nationality) || passenger.nationality;
//       const countryName = getName(countryCode) || passenger.nationality;
//       setSelectedNationality({
//         label: (
//           <div className="flex items-center">
//             <Flag code={countryCode} style={{ width: '20px', marginRight: '8px' }} />
//             {countryName}
//           </div>
//         ),
//         value: countryCode,
//       });
//       setValue('nationality', countryCode);
//     } else {
//       setSelectedNationality(null);
//       setValue('nationality', '');
//     }
//   }, [passenger, setValue]);

//   useEffect(() => {
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

//   const handleChange = (selectedOption, field) => {
//     setSelectedNationality(selectedOption);
//     const countryCode = selectedOption.value;
//     handleInputChange('nationality', countryCode);
//     field.onChange(countryCode);
//   };

//   const handleInputChange = (name, value) => {
//     setValue(name, value);
//     trigger(name);
//     updatePassenger(index, name, value);
//   };

//   const CustomPlaceholder = ({ placeholder }) => (
//     <div>
//       <span>{placeholder}</span>
//     </div>
//   );

//   return (
//     <div className="mt-4">
//       <div className="text-lg font-semibold mb-4">Add Passport Information</div>
//       <div className="flex justify-between">
//         <Controller
//           name="nationality"
//           control={control}
//           rules={{
//             required: "Nationality is required",
//           }}
//           render={({ field }) => (
//             <Select
//               value={selectedNationality}
//               placeholder={<CustomPlaceholder placeholder={"Nationality"} />}
//               options={options}
//               onChange={(selectedOption) => handleChange(selectedOption, field)}
//               styles={{
//                 control: (provided, state) => ({
//                   ...provided,
//                   boxShadow: "none",
//                   borderColor: errors.nationality ? 'red' : provided.borderColor,
//                   borderRadius: '4px',
//                   borderWidth: '1px',
//                   height: '100%',
//                   '&:hover': {
//                     borderColor: state.isFocused ? '#2684FF' : provided.borderColor,
//                   },
//                 }),
//                 indicatorSeparator: () => ({
//                   display: 'none',
//                 }),
//                 dropdownIndicator: (provided) => ({
//                   ...provided,
//                   color: errors.nationality ? 'red' : provided.color,
//                 }),
//                 valueContainer: (provided) => ({
//                   ...provided,
//                   padding: '0 8px',
//                 }),
//               }}
//             />
//           )}
//         />

//         <Controller
//           name="passportNumber"
//           control={control}
//           rules={{
//             required: "Passport Number is required",
//             minLength: { value: 8, message: "Minimum 8 characters" },
//             maxLength: { value: 15, message: "Maximum 15 characters" },
//           }}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               label="Passport Number"
//               error={!!errors.passportNumber}
//               helperText={errors.passportNumber?.message}
//               onChange={(e) => {
//                 field.onChange(e);
//                 handleInputChange("passportNumber", e.target.value);
//               }}
//             />
//           )}
//         />

//         {condition?.pid && (
//           <Controller
//             name="issueDate"
//             control={control}
//             rules={{
//               required: "Issue Date is required",
//             }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Issue Date"
//                 type="date"
//                 InputLabelProps={{ shrink: true }}
//                 error={!!errors.issueDate}
//                 helperText={errors.issueDate?.message}
//                 onChange={(e) => {
//                   field.onChange(e);
//                   handleInputChange("issueDate", e.target.value);
//                 }}
//               />
//             )}
//           />
//         )}

//         {condition?.pped && (
//           <Controller
//             name="expiryDate"
//             control={control}
//             rules={{
//               required: "Expiry Date is required",
//             }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Expiry Date"
//                 type="date"
//                 InputLabelProps={{ shrink: true }}
//                 error={!!errors.expiryDate}
//                 helperText={errors.expiryDate?.message}
//                 onChange={(e) => {
//                   field.onChange(e);
//                   handleInputChange("expiryDate", e.target.value);
//                 }}
//               />
//             )}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PassportDetails;
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import Select from 'react-select';
import { getCode, getName, getNames } from 'country-list';
import Flag from 'react-world-flags';

const PassportDetails = ({ passenger, index, updatePassenger, condition }) => {
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

  const [selectedNationality, setSelectedNationality] = useState(null);

  const countryNames = getNames();

  const options = countryNames.map((country) => ({
    label: country,
    value: getCode(country),
  }));

  useEffect(() => {
    if (passenger?.nationality) {
      const countryCode = getCode(passenger.nationality) || passenger.nationality;
      const countryName = getName(countryCode) || passenger.nationality;
      setSelectedNationality({
        label: countryName,
        value: countryCode,
      });
      setValue('nationality', countryCode);
    } else {
      setSelectedNationality(null);
      setValue('nationality', '');
    }
  }, [passenger, setValue]);

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

  const handleChange = (selectedOption, field) => {
    setSelectedNationality(selectedOption);
    const countryCode = selectedOption.value;
    handleInputChange('nationality', countryCode);
    field.onChange(countryCode);
  };

  const handleInputChange = (name, value) => {
    setValue(name, value);
    trigger(name);
    updatePassenger(index, name, value);
  };

  const CustomPlaceholder = ({ placeholder }) => (
    <div>
      <span>{placeholder}</span>
    </div>
  );

  const customFilterOption = (option, inputValue) => {
    const { label, value } = option;
    return (
      label.toLowerCase().includes(inputValue.toLowerCase()) ||
      value.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const formatOptionLabel = ({ label, value }) => (
    <div className="flex items-center">
      <Flag code={value} style={{ width: '20px', marginRight: '8px' }} />
      {label}
    </div>
  );

  return (
    <div className="mt-4">
      <div className="text-lg font-semibold mb-4">Add Passport Information</div>
      <div className="flex justify-between">
        <Controller
          name="nationality"
          control={control}
          rules={{
            required: "Nationality is required",
          }}
          render={({ field }) => (
            <Select
              value={selectedNationality}
              placeholder={<CustomPlaceholder placeholder={"Nationality"} />}
              options={options}
              onChange={(selectedOption) => handleChange(selectedOption, field)}
              filterOption={customFilterOption}
              formatOptionLabel={formatOptionLabel}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  boxShadow: "none",
                  borderColor: errors.nationality ? 'red' : provided.borderColor,
                  borderRadius: '4px',
                  borderWidth: '1px',
                  height: '100%',
                  '&:hover': {
                    borderColor: state.isFocused ? '#2684FF' : provided.borderColor,
                  },
                }),
                indicatorSeparator: () => ({
                  display: 'none',
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  color: errors.nationality ? 'red' : provided.color,
                }),
                valueContainer: (provided) => ({
                  ...provided,
                  padding: '0 8px',
                }),
              }}
            />
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
              error={!!errors.passportNumber}
              helperText={errors.passportNumber?.message}
              onChange={(e) => {
                field.onChange(e);
                handleInputChange("passportNumber", e.target.value);
              }}
            />
          )}
        />

        {condition?.pid && (
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
        )}

        {condition?.pped && (
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
        )}
      </div>
    </div>
  );
};

export default PassportDetails;