import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { MenuItem, Select, TextField, FormHelperText } from "@mui/material";
import PassportDetails from "./passportDetails";
import { format } from "date-fns";
import ModalHistoryData from "./modalHistoryData";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactToast from "../../util/ReactToast";

const PassengerForm = forwardRef(
  (
    { passenger, index, updatePassenger, condition, flightData, setPassengers },
    ref
  ) => {
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
    const [savePassengerInfo, setSavePassengerInfo] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [departureDate, setDepartureDate] = useState(
      flightData?.tripInfos[0].sI[0]?.dt
    );

    useImperativeHandle(ref, () => ({
      validateForm: async () => {
        const result = await trigger();
        const passportValid = condition
          ? await passportRef.current?.validatePassport()
          : true;
        return result && passportValid;
      },
    }));

    const handleModalOpen = (e) => {
      e.preventDefault();
      fetchHistoryData();
      setIsModalOpen(true);
    };

    const fetchHistoryData = () => {
      setLoading(true);
      // fetchHistoryData();
      axios
        .get(`${import.meta.env.VITE_SERVER_URL}user/all-passengers`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setHistoryData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
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

    const handleSelectFromHistory = (index, selectedPassenger) => {
      const { ti, fN, dob, lN } = selectedPassenger;

      setPassengers((prevPassengers) => {
        const updatedPassengers = [...prevPassengers];

        // Update all fields for the selected passenger
        updatedPassengers[index] = {
          ...updatedPassengers[index],
          title: ti,
          firstName: fN,
          dob: dob,
          lastName: lN,
        };

        return updatedPassengers;
      });

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
    const handleCheckboxChange = async (event) => {
      const isChecked = event.target.checked;
      setSavePassengerInfo(isChecked);

      if (isChecked) {
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_SERVER_URL}user/add-passenger`,
            { passenger },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          // Handle successful response
          if (response?.data) ReactToast("Passenger saved succesfully");
          // You might want to show a success message to the user here
        } catch (error) {
          // Handle error
          console.error(
            "Error saving passenger information:",
            error.response?.data || error.message
          );
          // You might want to show an error message to the user here
        }
      }
    };
    return (
      <div className="flex">
        <form>
          <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-evenly gap-2 items-center mx-4">
            <div className="  flex justify-center items-center font-semibold">
              <h2>
                {passenger.passengerType} {passenger.typeCount}
              </h2>
            </div>
            <div className="  ">
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
                    {passenger.passengerType === "ADULT"
                      ? [
                          <MenuItem key="Mr" value="Mr">
                            Mr
                          </MenuItem>,
                          <MenuItem key="Mrs" value="Mrs">
                            Mrs
                          </MenuItem>,
                          <MenuItem key="Ms" value="Ms">
                            Ms
                          </MenuItem>,
                        ]
                      : [
                          <MenuItem key="Ms" value="Ms">
                            Ms
                          </MenuItem>,
                          <MenuItem key="Master" value="Master">
                            Master
                          </MenuItem>,
                        ]}
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
                    value: /^[A-Za-z\s]+$/,
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
                    value: /^[A-Za-z\s]+$/,
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
            <div>
              {condition && (
                <Controller
                  name="dob"
                  control={control}
                  rules={{
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
              )}
            </div>
            {condition?.dobe ||
              (passenger.passengerType === "INFANT" && (
                <div>
                  <Controller
                    name="dob"
                    control={control}
                    rules={{
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
              ))}
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

          <div className="flex flex-wrap mt-4">
            <div>
              <input
                type="checkbox"
                className="text-2xl ml-4"
                checked={savePassengerInfo}
                onChange={handleCheckboxChange}
              />
              <label className="text-sm font-semibold ml-2 " htmlFor="">
                Save passenger information
              </label>
            </div>
            <div>
              <button
                onClick={handleModalOpen}
                type="button"
                className="bg-[#1B1D29] text-[#D7B56D] px-2 py-2 m-2 rounded-md text-sm font-medium mx-4"
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
            onSelect={handleSelectFromHistory}
            historyData={historyData}
            DATAindex={index}
          />
        )}
      </div>
    );
  }
);

export default React.memo(PassengerForm);
