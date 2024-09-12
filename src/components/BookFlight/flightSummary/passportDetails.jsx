import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import Select from "react-select";
import { getCode, getName, getNames } from "country-list";
import Flag from "react-world-flags";
import ReactToast from "../Util/ReactToast";

const PassportDetails = forwardRef(
  (
    {
      passenger,
      index,
      updatePassenger,
      condition,
      passengerType,
      departureDate,
    },
    ref
  ) => {
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

    useImperativeHandle(ref, () => ({
      validatePassport: async () => {
        const result = await trigger();
        return result;
      },
    }));

    useEffect(() => {
      if (
        passenger?.nationality &&
        (!selectedNationality ||
          selectedNationality.value !== passenger.nationality)
      ) {
        const countryCode =
          getCode(passenger.nationality) || passenger.nationality;
        const countryName = getName(countryCode) || passenger.nationality;
        setSelectedNationality({
          label: countryName,
          value: countryCode,
        });
        setValue("nationality", countryCode);
      }
    }, [passenger?.nationality, setValue, selectedNationality]);

    const watchPassportNumber = watch("passportNumber");
    const watchIssueDate = watch("issueDate");
    const watchExpiryDate = watch("expiryDate");
    const watchNationality = watch("nationality");

    useEffect(() => {
      if (
        passenger?.passportNumber !== watchPassportNumber ||
        passenger?.issueDate !== watchIssueDate ||
        passenger?.expiryDate !== watchExpiryDate ||
        passenger?.nationality !== watchNationality
      ) {
        reset({
          passportNumber: passenger?.passportNumber || "",
          issueDate: passenger?.issueDate || "",
          expiryDate: passenger?.expiryDate || "",
          nationality: passenger?.nationality || "",
        });
      }
    }, [passenger, reset]);

    // useEffect(() => {
    //   if (watchIssueDate) {
    //     const issueDate = new Date(watchIssueDate);
    //     issueDate.setFullYear(
    //       issueDate.getFullYear() + (passengerType === "ADULT" ? 10 : 5)
    //     );
    //     issueDate.setDate(issueDate.getDate() - 1);
    //     const expiryDate = issueDate.toISOString().split("T")[0];
    //     if (watchExpiryDate !== expiryDate) {
    //       setValue("expiryDate", expiryDate);
    //       updatePassenger(index, "expiryDate", expiryDate);
    //     }
    //   }
    // }, [
    //   watchIssueDate,
    //   setValue,
    //   watchExpiryDate,
    //   updatePassenger,
    //   index,
    //   passengerType,
    // ]);

    const handleChange = (selectedOption, field) => {
      setSelectedNationality(selectedOption);
      const countryCode = selectedOption.value;
      handleInputChange("nationality", countryCode);
      field.onChange(countryCode);
    };

    const handleInputChange = (name, value) => {
      if (!passenger.dob) {
        ReactToast("Please Select Date of Birth before, going further");
        setValue(name, "");
        trigger(name);
        updatePassenger(index, name, "");
      } else if (name === "issueDate") {
        setValue(name, value);
        trigger(name);
        updatePassenger(index, name, value);
      } else if (name === "expiryDate") {
        if (!passenger.issueDate) {
          ReactToast("Please Select Issue Date before going further");
          setValue(name, "");
          trigger(name);
          updatePassenger(index, name, "");
        } else {
          setValue(name, value);
          trigger(name);
          updatePassenger(index, name, value);
        }
      } else {
        setValue(name, value);
        trigger(name);
        updatePassenger(index, name, value);
      }
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
        <Flag code={value} style={{ width: "20px", marginRight: "8px" }} />
        {label}
      </div>
    );

    const today = new Date().toISOString().split("T")[0];

    const calculateDate = (years) => {
      const date = new Date(departureDate);
      date.setFullYear(date.getFullYear() - years);
      return date.toISOString().split("T")[0];
    };

    const getMinDateIssue = (birthdate) => {
      if (!birthdate) {
        return calculateDate(10);
      }
      const birthDate = new Date(birthdate);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      // Check if the birthdate has not yet occurred this year
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      if (age >= 18) {
        return calculateDate(10);
      } else {
        return calculateDate(5);
      }
    };

    const getMaxDateExpiry = () => {
      let date;
      if (passenger.issueDate) {
        date = new Date(passenger.issueDate);
      } else {
        date = new Date(departureDate);
      }
      date.setFullYear(date.getFullYear() + 11);
      return date.toISOString().split("T")[0];
    };

    const calculateDateFromDeparture = (departureDate, monthsToAdd) => {
      const date = new Date(departureDate);
      date.setMonth(date.getMonth() + monthsToAdd);
      // Add one extra day
      date.setDate(date.getDate() + 1);

      return date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
    };

    return (
      <div className=" mt-4">
        <div className="text-lg font-semibold mb-4 mx-4">
          Add Passport Information
        </div>
        <div className="grid  gap-2 grid-flow-row grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-4">
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
                onChange={(selectedOption) =>
                  handleChange(selectedOption, field)
                }
                onBlur={() => trigger("nationality")}
                filterOption={customFilterOption}
                formatOptionLabel={formatOptionLabel}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: "none",
                    borderColor: errors.nationality
                      ? "red"
                      : provided.borderColor,
                    borderRadius: "4px",
                    borderWidth: "1px",
                    height: "100%",
                    "&:hover": {
                      borderColor: state.isFocused
                        ? "#2684FF"
                        : provided.borderColor,
                    },
                  }),
                  indicatorSeparator: () => ({
                    display: "none",
                  }),
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    color: errors.nationality ? "red" : provided.color,
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    padding: "0 8px",
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
              minLength: { value: 6, message: "Minimum 6 characters" },
              maxLength: { value: 12, message: "Maximum 12 characters" },
              pattern: {
                value: /^(?!^0+$)[a-zA-Z0-9]{6,12}$/,
                message: "Invalid Passport",
              },
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
                onBlur={() => trigger("passportNumber")}
              />
            )}
          />

          {condition?.pid && (
            <Controller
              name="issueDate"
              control={control}
              rules={{
                required: "Issue Date is required",
                validate: (value) =>
                  value <= today || "Issue Date cannot be in the future",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Issue Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    max: today,
                    min: getMinDateIssue(passenger?.dob),
                  }}
                  error={!!errors.issueDate}
                  helperText={errors.issueDate?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange("issueDate", e.target.value);
                  }}
                  onBlur={() => trigger("issueDate")}
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
                validate: (value) =>
                  value >= today || "Expiry Date cannot be in the past",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Expiry Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    min: calculateDateFromDeparture(departureDate, 6),
                    max: getMaxDateExpiry(),
                  }}
                  error={!!errors.expiryDate}
                  helperText={errors.expiryDate?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange("expiryDate", e.target.value);
                  }}
                  onBlur={() => trigger("expiryDate")}
                />
              )}
            />
          )}
        </div>
      </div>
    );
  }
);

export default PassportDetails;
