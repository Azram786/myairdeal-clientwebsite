import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { MenuItem, Select, TextField, Button, FormHelperText } from "@mui/material";
import PassportDetails from "./passportDetails";
import ModalHistoryData from "./modalHistoryData";
import { format } from "date-fns";

const PassengerForm = ({ passenger, index, updatePassenger }) => {
  const [historyData, setHistoryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [error, setError] = useState(null);

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

  const fetchHistoryData = () => {
    setLoading(true);
    axios
      .get("https://myairdeal-backend.onrender.com/user/all-passengers", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // console.log(response.data,"Data Data Data")
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
    });
    setValue("title", selectedPassenger.ti);
    setValue("firstName", selectedPassenger.fN);
    setValue("lastName", selectedPassenger.lN);
    setValue("dob", selectedPassenger.dob);
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
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);
  }, [passenger, reset, formData]);

  const departureDate = "2024-08-22T17:10";

  const handleInputChange = async (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setValue(name, value);
    updatePassenger(index, name, value);
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {/* <div>
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
          </div> */}
          <div className="text-[.5rem]">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleModalOpen}
              disabled={loading}
              style={{
                fontSize: ".7rem"
              }}
            >
              {loading ? "Loading..." : "Select from history"}
            </Button>
          </div>
        </div>
        <PassportDetails
          passenger={passenger}
          index={index}
          updatePassenger={updatePassenger}
          passport={formData.passport}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Save
        </Button>
      </form>
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
  );
};

export default PassengerForm;