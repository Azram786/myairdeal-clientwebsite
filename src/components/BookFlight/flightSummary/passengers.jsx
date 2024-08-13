import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import { MenuItem, Select, TextField, FormHelperText } from "@mui/material";
import PassportDetails from "./passportDetails";
import { format } from "date-fns";

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

  const passportRef = useRef();
  const [departureDate, setDepartureDate] = useState(flightData?.tripInfos[0].sI[0]?.dt)
  useImperativeHandle(ref, () => ({
    validateForm: async () => {
      const result = await trigger();
      const passportValid = condition ? await passportRef.current?.validatePassport() : true;
      return result && passportValid;
    },
  }));

  useEffect(() => {
    reset({
      title: passenger?.title || "",
      firstName: passenger?.firstName || "",
      lastName: passenger?.lastName || "",
      dob: passenger?.dob || "",
    });
  }, [passenger, reset]);

  const handleInputChange = (name, value) => {
    setValue(name, value);
    updatePassenger(index, name, value);
  };

  // const departureDate = "2024-08-22T17:10";

  const calculateDate = (years) => {
    const date = new Date(departureDate);
    date.setFullYear(date.getFullYear() - years);
    return date.toISOString().split("T")[0];
  };

  const getMaxDate = (passengerType) => {
    if (passengerType === "ADULT") return calculateDate(18); // Adult: 18 years before departure date
    if (passengerType === "CHILD") return calculateDate(2);  // Child: Maximum age is 12 years (calculated in getMinDate)
    if (passengerType === "INFANT") return calculateDate(0); // Infant: Maximum age is 2 years (calculated in getMinDate)
  };

  const getMinDate = (passengerType) => {
    if (passengerType === "ADULT") return calculateDate(60); // Adult: Minimum age is 60 years
    if (passengerType === "CHILD") return calculateDate(12); // Child: Minimum age is 2 years
    if (passengerType === "INFANT") return calculateDate(2); // Infant: Minimum age is 0 years
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
                >
                  <MenuItem value="" disabled>
                    Select Title
                  </MenuItem>
                  {passenger.passengerType === "ADULT" ? (
                    [
                      <MenuItem key="MR" value="MR">Mr</MenuItem>,
                      <MenuItem key="MRS" value="MRS">Mrs</MenuItem>,
                      <MenuItem key="MS" value="MS">Ms</MenuItem>
                    ]
                  ) : (
                    [
                      <MenuItem key="MS" value="MS">Ms</MenuItem>,
                      <MenuItem key="MASTER" value="MASTER">Master</MenuItem>
                    ]
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
      </form>
    </div>
  );
});

export default PassengerForm;