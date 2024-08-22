import { useEffect, useRef, useState } from "react";
import axios from "axios";
// icons
import { RiFlightTakeoffFill, RiFlightTakeoffLine } from "react-icons/ri";
import { RiFlightLandLine } from "react-icons/ri";
import { MdOutlineDateRange } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { GoArrowSwitch } from "react-icons/go";
import { FaTelegramPlane } from "react-icons/fa";
import ReactJoyride from "react-joyride";
import CustomInput from "../util/DatePickerCustom";
import DatePicker from "react-datepicker";
import CustomSelect from "../util/CustomSelect";
import MultiCityForm from "../util/MultiCityForm";
// import Modal from "../util/CustomModal";
import ReactToast from "../util/ReactToast";

import "react-datepicker/dist/react-datepicker.css";

import formatDate from "../util/DateFormatChanger";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsaModifySearch,
  setLastSearch,
  setResentSearch,
} from "../../store/slices/aut.slice";
import PassengerSelector from "./PassengerSelector";
import getCountryCode from "../util/getCity";
import { AsYouType } from "libphonenumber-js";
const FilterSection = ({
  formData,
  setFormData,
  dynamicFormData,
  setDynamicFormData,
  setTypeOfTravel,
  typeOfTravel,
}) => {
  const navigate = useNavigate();
  const { isModifySearch } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const [Loading, setLoading] = useState(false);
  const [preferredAirline, setPrefferedAirLine] = useState();
  const dispatch = useDispatch();

  const [runJoyride, setRunJoyride] = useState(false);

  useEffect(() => {
    localStorage.setItem("joyride", "notexecuted"); 
    const storedJoyride = localStorage.getItem("joyride");
  
    if (storedJoyride === "notexecuted") {

      setRunJoyride(true); 
      localStorage.setItem("joyride", "executed"); 
    } else {
     
    }
  }, []);
  

  // State for Joyride steps
  const [joyrideSteps] = useState([
    {
      target: ".flight-type-buttons",
      content: "Choose your travel type (One-way, Round-trip, or Multi-city)",
    },
    {
      target: ".from-city-select",
      content: "Select your departure city or airport.",
    },
    {
      target: ".to-city-select",
      content: "Select your destination city or airport.",
    },
    {
      target: ".travel-date-picker",
      content: "Pick your travel date here.",
    },
    {
      target: ".travel-passenger-details",
      content:
        "Select the number of passengers and class preferences traveling with you.",
    },
    {
      target: ".search-button",
      content: "Hit this button to search for flights.",
    },
  ]);

  //filter state for country code
  const [countryCodeone, setCountryCodeOne] = useState("IN");
  const [defaultOptions, setDefaultOptions] = useState([]);

  //state for modal
  const [modalIsOpen, setModelIsOpen] = useState(false);

  const [preferredAirlines, setPrefferedAirLines] = useState([]);

  // Joyride state

  // state for filteration

  //changing type-of-travel
  const handleTypeOfTravelChange = (type) => {
    setTypeOfTravel(type);
  };

  //set country code where from
  const setContryCodeFrom = (value) => {
    setFormData((prev) => ({ ...prev, fromCityOrAirport: value }));
  };

  //set country code where to
  const setContryCodeTo = (value) => {
    if (formData.fromCityOrAirport === value && value !== "") {
      ReactToast("You cannot select the same airport twice");
    } else {
      setDynamicFormData((prevFormData) => {
        const newFormData = [...prevFormData];

        if (newFormData[0]) {
          newFormData[0] = {
            ...newFormData[0],
            fromCity: value,
          };
        } else {
          newFormData[0] = {
            fromCity: value,
            toCity: "",
            travelDate: formData.travelDate,
          };
        }

        return newFormData;
      });
      setFormData((prev) => ({
        ...prev,
        toCityOrAirport: value,
      }));
    }
  };

  // API search for first select tag

  const getCountriesHandlerOne = async (inputValue, callback) => {
    try {
      let response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }search/user-get-all-airports?search=${inputValue}`
      );

      const options = response.data.data.map((item) => ({
        value: `${item.code}-${item.city}`,
        label: `${item.city}(${item.code})
        -${item?.name}`,
      }));

      callback(options);
    } catch (error) {
      // ReactToast("Please reload the page")
      callback([]);
    }
  };
  const getPreferedAirLine = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}airlines/preferred-airline`
      );
    
      setPrefferedAirLines(response.data.preferredAirlines);
    } catch (error) {
      console.log(error.message);
    }
  };
  // API search for second select tag
  const getCountriesHandlerTwo = async (inputValue, callback) => {
    try {
      let response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }search/user-get-all-airports?search=${inputValue}`
      );

      const options = response.data.data.map((item) => {
        return {
          value: `${item.code}-${item.city}`,
          label: `${item.city}(${item.code})
          -${item?.name}`,
        };
      });

      callback(options);
    } catch (error) {
      // ReactToast("Please reload the page")
      callback([]);
    }
  };

  //select tag default value
  const fetchDefaultOptions = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }search/airport-country-code?countrycode=IN`
      );
      const options = response.data.data.map((item) => {
        return {
          value: `${item.code}-${item.city}`,
          label: `${item.city}(${item.code})
          -${item?.name}`,
        };
      });

      setDefaultOptions(options);
    } catch (error) {}
  };
  useEffect(() => {
    getPreferedAirLine();
  }, []);

  const submitHandler = async () => {
    try {
      setLoading(true);
      if (
        formData.fromCityOrAirport === formData.toCityOrAirport &&
        formData.fromCityOrAirport !== "" &&
        formData.fromCityOrAirport !== ""
      ) {
        ReactToast("You cannot select the same airport twice");
        return;
      }
      const validateFormData = (data) => {
        // Validate common fields
        if (
          !data.cabinClass ||
          !data.ADULT ||
          !data.fromCityOrAirport ||
          !data.toCityOrAirport ||
          !data.travelDate
        ) {
          return false;
        }

        // Validate round-trip specific fields
        if (typeOfTravel === "round-trip" && !data.returnDate) {
          return false;
        }
        return true;
      };

      const validateDynamicFormData = (dynamicData) => {
        for (let i = 0; i < dynamicData.length; i++) {
          const { fromCity, toCity, travelDate } = dynamicData[i];
          if (!fromCity || !toCity || !travelDate) {
            return false;
          }
        }
        return true;
      };

      // Perform validation
      if (!validateFormData(formData)) {
        setLoading(false);
        ReactToast("Please fill in all required fields");
        return;
      }

      if (
        typeOfTravel === "multi-city" &&
        !validateDynamicFormData(dynamicFormData)
      ) {
        setLoading(false);
        ReactToast("Please fill in all required fields for each trip");
        return;
      }

      let query;
      let saving;
      if (typeOfTravel === "one-way") {
        query = {
          searchQuery: {
            cabinClass: formData.cabinClass,
            paxInfo: {
              ADULT: formData.ADULT,
              CHILD: formData.CHILD,
              INFANT: formData.INFANT,
            },
            routeInfos: [
              {
                fromCityOrAirport: {
                  code: getCountryCode(formData.fromCityOrAirport),
                },
                toCityOrAirport: {
                  code: getCountryCode(formData.toCityOrAirport),
                },
                travelDate: formatDate(formData.travelDate),
              },
            ],
            searchModifiers: {
              isDirectFlight: formData.isDirectFlight,
              isConnectingFlight: formData.isConnectingFlight,
            },
          },
        };
        saving = {
          searchQuery: {
            cabinClass: formData.cabinClass,
            paxInfo: {
              ADULT: formData.ADULT,
              CHILD: formData.CHILD,
              INFANT: formData.INFANT,
            },
            routeInfos: [
              {
                fromCityOrAirport: {
                  code: formData.fromCityOrAirport,
                },
                toCityOrAirport: {
                  code: formData.toCityOrAirport,
                },
                travelDate: formatDate(formData.travelDate),
              },
            ],
            searchModifiers: {
              isDirectFlight: formData.isDirectFlight,
              isConnectingFlight: formData.isConnectingFlight,
            },
          },
        };
      } else if (typeOfTravel === "round-trip") {
        query = {
          searchQuery: {
            cabinClass: formData.cabinClass,
            paxInfo: {
              ADULT: formData.ADULT,
              CHILD: formData.CHILD,
              INFANT: formData.INFANT,
            },
            routeInfos: [
              {
                fromCityOrAirport: {
                  code: getCountryCode(formData.fromCityOrAirport),
                },
                toCityOrAirport: {
                  code: getCountryCode(formData.toCityOrAirport),
                },
                travelDate: formatDate(formData.travelDate),
              },
              {
                fromCityOrAirport: {
                  code: getCountryCode(formData.toCityOrAirport),
                },
                toCityOrAirport: {
                  code: getCountryCode(formData.fromCityOrAirport),
                },
                travelDate: formatDate(formData.returnDate),
              },
            ],
            searchModifiers: {
              isDirectFlight: formData.isDirectFlight,
              isConnectingFlight: formData.isConnectingFlight,
            },
          },
        };
        saving = {
          searchQuery: {
            cabinClass: formData.cabinClass,
            paxInfo: {
              ADULT: formData.ADULT,
              CHILD: formData.CHILD,
              INFANT: formData.INFANT,
            },
            routeInfos: [
              {
                fromCityOrAirport: {
                  code: formData.fromCityOrAirport,
                },
                toCityOrAirport: {
                  code: formData.toCityOrAirport,
                },
                travelDate: formatDate(formData.travelDate),
              },
              {
                fromCityOrAirport: {
                  code: formData.toCityOrAirport,
                },
                toCityOrAirport: {
                  code: formData.fromCityOrAirport,
                },
                travelDate: formatDate(formData.returnDate),
              },
            ],
            searchModifiers: {
              isDirectFlight: formData.isDirectFlight,
              isConnectingFlight: formData.isConnectingFlight,
            },
          },
        };
      } else {
        const dynamic = dynamicFormData.map((value) => ({
          fromCityOrAirport: {
            code: getCountryCode(value.fromCity),
          },
          toCityOrAirport: {
            code: getCountryCode(value.toCity),
          },
          travelDate: formatDate(value.travelDate),
        }));
        const dynamicLast = dynamicFormData.map((value) => ({
          fromCityOrAirport: {
            code: value.fromCity,
          },
          toCityOrAirport: {
            code: value.toCity,
          },
          travelDate: formatDate(value.travelDate),
        }));

        query = {
          searchQuery: {
            cabinClass: formData.cabinClass,
            paxInfo: {
              ADULT: formData.ADULT,
              CHILD: formData.CHILD,
              INFANT: formData.INFANT,
            },
            routeInfos: [
              {
                fromCityOrAirport: {
                  code: getCountryCode(formData.fromCityOrAirport),
                },
                toCityOrAirport: {
                  code: getCountryCode(formData.toCityOrAirport),
                },
                travelDate: formatDate(formData.travelDate),
              },
              ...dynamic,
            ],
            searchModifiers: {
              isDirectFlight: formData.isDirectFlight,
              isConnectingFlight: formData.isConnectingFlight,
            },
          },
        };
        saving = {
          searchQuery: {
            cabinClass: formData.cabinClass,
            paxInfo: {
              ADULT: formData.ADULT,
              CHILD: formData.CHILD,
              INFANT: formData.INFANT,
            },
            routeInfos: [
              {
                fromCityOrAirport: {
                  code: getCountryCode(formData.fromCityOrAirport),
                },
                toCityOrAirport: {
                  code: getCountryCode(formData.toCityOrAirport),
                },
                travelDate: formatDate(formData.travelDate),
              },
              ...dynamicLast,
            ],
            searchModifiers: {
              isDirectFlight: formData.isDirectFlight,
              isConnectingFlight: formData.isConnectingFlight,
            },
          },
        };
      }

      console.log({ query, saving });
      console.log({ query, saving });
      // dispatch(setLastSearch(query));
      dispatch(setResentSearch(saving));
      if (token) {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}search/searchQueryHistory`,
          query,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setLoading(false);
      navigate(`/search`, { state: { query } });
      dispatch(setIsaModifySearch(false));
      dispatch(setIsaModifySearch(false));
    } catch (error) {
      setLoading(false);
      // console.log(error.message);
      ReactToast("Something went wrong");
    }
  };
  const mergeHandler = () => {
    try {
      const cityFrom = formData.fromCityOrAirport;
      const cityTo = formData.toCityOrAirport;
      setFormData((prev) => ({ ...prev, fromCityOrAirport: cityTo, toCityOrAirport: cityFrom }))

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchDefaultOptions();
  }, []);

  return (
    <div className=" flex flex-col items-center  min-h-[200px]   justify-between md:justify-evenly  max-w-[1800px] md:mx-auto">
     {
      runJoyride &&
      <ReactJoyride
        steps={joyrideSteps}
        run={runJoyride}
        continuous={true}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        callback={(data) => {
          if (data.action === "reset") {
            setRunJoyride(false);
          }
        }}
      />
     } 
      {/* <div className="     md:rounded-xl w-[90%] mt-4  p-2 shadow-md border border-gray-200 bg-white flex gap-2  flex-col  justify-center md:px-5  md:gap-4   relative  md:top-[-60px]   "> */}
      <div
        className={`
  md:rounded-xl w-[90%] mt-4 p-2 shadow-md border border-gray-200 bg-white 
  flex gap-2 flex-col justify-center md:px-5 md:gap-4
  ${!isModifySearch ? "relative md:top-[-60px]" : ""}
`}
      >
        {/* type of travel selecting section */}

        <div className="flex justify-center md:justify-stretch text-white flight-type-buttons ">
          <button
            className={`bg-[#1B1D29]  text-sm md:text-base  rounded-l-lg p-2 md:p-3 border-2 ${
              typeOfTravel === "one-way" && "bg-[#D7B56D] text-black"
            }`}
            
            //click handler
            onClick={() => handleTypeOfTravelChange("one-way")}
          >
            One way
          </button>
          <button
            className={`bg-[#1B1D29]  text-sm md:text-base md:p-3 p-2 border-2 ${
              typeOfTravel === "round-trip" && "bg-[#D7B56D] text-black"
            } `}
            //click handler
            onClick={() => handleTypeOfTravelChange("round-trip")}
          >
            Round trip
          </button>
          <button
            className={` bg-[#1B1D29]  text-sm md:text-base rounded-r-lg md:p-3 p-2 border-2 ${
              typeOfTravel === "multi-city" && "bg-[#D7B56D] text-black"
            }`}
            //click handler
            onClick={() => handleTypeOfTravelChange("multi-city")}
          >
            Multi City
          </button>
        </div>

        <div>
          <h3 className="font-semibold my-0 text-base md:text-lg">
            Where are you flying?
          </h3>
        </div>

        {/* select country code and date section  */}
        <div className="flex flex-col w-full gap-2 ">
          <div className="flex flex-col  lg-custom:flex-row   w-full  gap-2 ">
            {/* {select country section} */}
            <div className="flex  flex-col lg-custom:w-1/2 md:flex-row  relative gap-2 md:gap-2 justify-between  ">
              <div className="flex   text-sm md:text-base  items-center border rounded p-2 md:w-1/2 from-city-select">
                <div>
                  <RiFlightTakeoffLine className=" text-2xl md:text-3xl " />
                </div>
                <div className="w-full ">
                  <CustomSelect
                    loadOptions={getCountriesHandlerOne}
                    placeholder="Where From ?"
                    icon={<RiFlightTakeoffFill />}
                    myFormData={formData}
                    setFormData={setContryCodeFrom}
                    defaultOptions={defaultOptions}

                    value={formData?.fromCityOrAirport}
                  />
                </div>
              </div>
              <div className="md:flex  hidden sm:items-center  justify-center text-white absolute left-1/2 top-1/2 transform -translate-x-1/2  -translate-y-1/2 bg-black w-8 h-8 rounded-full ">
                <GoArrowSwitch onClick={mergeHandler} />
              </div>
              <div className="flex md:ml-2   text-sm md:text-base items-center border rounded p-2 md:w-1/2 to-city-select ">
                <div>
                  <RiFlightLandLine className=" text-2xl md:text-3xl " />
                </div>
                <div className="w-full">
                  <CustomSelect
                    setFormData={setContryCodeTo}
                    loadOptions={getCountriesHandlerTwo}
                    placeholder="Where To ?"
                    defaultOptions={defaultOptions}
                    value={formData.toCityOrAirport}
                  />
                </div>
              </div>
            </div>

            {/* date picker section  */}
            <div className="flex flex-col md:flex-row    w-full  lg-custom:w-1/2 gap-2 ">
              <div className="  rounded   flex items-center border md:w-1/2  py-2 travel-date-picker">
                <div className="flex items-center text-sm md:text-base justify-center gap-4   w-full ">
                  <DatePicker
                    minDate={new Date()}
                    selected={formData.travelDate}
                    onChange={(date) => {
                      setFormData((prevState) => {
                        const newState = { ...prevState, travelDate: date };

                        if (date > prevState.returnDate) {
                          newState.returnDate = date;
                        }

                        return newState;
                      });
                    }}
                    customInput={
                      <CustomInput CustomIcon={MdOutlineDateRange} />
                    }
                    dateFormat="dd-MM-yyyy"
                    value={formData.travelDate}
                  />
                  {typeOfTravel !== "multi-city" ? (
                    <>
                      {" "}
                      <span className="">|</span>
                      <DatePicker
                        minDate={formData.travelDate}
                        selected={formData.returnDate}
                        onChange={(date) => {
                          setFormData((prev) => ({
                            ...prev,
                            returnDate: date,
                          }));
                        }}
                        customInput={<CustomInput />}
                        dateFormat="dd-MM-yyyy"
                        disabled={typeOfTravel !== "round-trip"}
                      />
                      <FaTimes
                        className="text-transparent cursor-pointer"
                        onClick={() => {
                          // setStartDate(null);
                          // setEndDate(null);
                        }}
                      />
                    </>
                  ) : (
                    <div className="p-2 md:w-[40%] "></div>
                  )}
                </div>
              </div>

              <div
                //click handler

                className="     text-sm md:text-base flex items-center flex-col border relative rounded-md md:w-1/2  justify-center p-3 md:p-0  cursor-pointer travel-passenger-details "
              >
                <div
                  className="flex w-full -details justify-center items-center travel-passenger "
                  onClick={() => setModelIsOpen((prev) => !prev)}
                >
                  <div className=" text-[2rem]  ">
                    <MdAirlineSeatReclineExtra />
                  </div>
                  <div className="flex flex-col w-[80%] ">
                    <h5 className="text-xs font-semibold text-gray-500 ">
                      Passenger and Class
                    </h5>
                    <input
                      className="pl-1 font-bold outline-none cursor-pointer "
                      type="text"
                      value={`${
                        Number(formData.ADULT) +
                        Number(formData.CHILD) +
                        Number(formData.INFANT)
                      } | ${formData.cabinClass}`}
                      readOnly
                    />
                  </div>
                </div>

                {modalIsOpen && (
                  <div className=" z-50 absolute items-center top-[59px] right-0 left-0 md:-left-80 bg-white  border-[2px] rounded-lg ">
                    <PassengerSelector
                      formData={formData}
                      setModelIsOpen={setModelIsOpen}
                      setFormData={setFormData}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {typeOfTravel === "multi-city" && (
            <MultiCityForm
              getCountriesHandlerOne={getCountriesHandlerOne}
              getCountriesHandlerTwo={getCountriesHandlerTwo}
              defaultOptions={defaultOptions}
              dynamicFormData={dynamicFormData}
              setDynamicFormData={setDynamicFormData}
              formData={formData}
            />
          )}
        </div>

        {/* fare type with submit button section  */}
        <div className=" md:items-center  flex flex-col lg-custom:flex-row mt-3 mb-3   ">
          <div className=" justify-around w-full  flex  flex-col md:flex-row gap-2 lg-custom::gap-0">
            <div className="text-sm md:text-base w-full flex justify-center md:w-1/3 ">
              <select
                id="fare-type"
                className=" outline-none border cursor-pointer rounded-md md:w-auto p-2 w-3/4 md:p-1  bg-white"
                name="fare_type"
                value={formData.pft}
                // onChange={(e) =>
                //   setFormData((prev) => ({
                //     ...prev,
                //     pft: e.target.value,
                //   }))
                // }
                onChange={(e) => {
                  const newPftValue = e.target.value;

                  setFormData((prev) => {
                    // If the new value of pft is not "REGULAR", reset CHILD and INFANT to "0"
                    if (newPftValue !== "REGULAR") {
                      return {
                        ...prev,
                        pft: newPftValue,
                        CHILD: "0",
                        INFANT: "0",
                      };
                    }

                    // Otherwise, just update the pft value
                    return {
                      ...prev,
                      pft: newPftValue,
                    };
                  });
                }}
              >
                <option disabled selected value="">
                  Fare Type
                </option>
                <option value="REGULAR">Regular Fares</option>
                <option value="STUDENT">Student Fares</option>
                <option value="SENIOR_CITIZEN">Senior Citizen Fares</option>
              </select>
            </div>
            <div className=" text-sm md:text-base lg:w-1/3 flex justify-center cursor-pointer">
              <select
                name=""
                className="border w-3/4  cursor-pointer  md:w-auto rounded-md l p-2 md:p-1    bg-white"
                id=""
                value={preferredAirline}
                onChange={(e) => setPrefferedAirLine(e.target.value)}
              >
                <option className="" value="" disabled selected>
                  Select Prefered Airline
                </option>
                <option value={null}>Select all</option>
                {preferredAirlines.map((value) => (
                  <option value={value.code}>{value.name}</option>
                ))}
                <option value={null}>Select all</option>
                {preferredAirlines.map((value) => (
                  <option value={value.code}>{value.name}</option>
                ))}
              </select>
            </div>
            <div className=" text-sm md:text-base flex gap-2 p-1 w-full  cursor-pointer justify-center items-center md:w-1/3  ">
              <label>Direct flights</label>
              <input
                type="checkbox"
                //state change
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    // isDirectFlight: e.target.checked,
                    isConnectingFlight: !e.target.checked,
                  }))
                }
                checked={!formData?.isConnectingFlight}
                className="h-4 w-4 cursor-pointer"
              />
            </div>
          </div>
          <div className="  md:w-1/4 items-center  flex  justify-center search-button ">
            <button
              disabled={Loading}
              // form submition
              onClick={submitHandler}
              className=" flex items-center mt-2 
              space-x-2  text-white bg-[#1B1D29] p-3 rounded"
            >
              <FaTelegramPlane className="text-white text-lg" />
              <span>{Loading ? "Searching..." : "Search Flights"}</span>
            </button>
          </div>
        </div>

        {/* {custom-modal} */}
      </div>
      {/* <div
        className="  flex flex-col md:flex-row
       justify-between     md:w-[90%]  md:mt-[-5%]"
      >
        <div className="flex flex-col items-start gap-4 2xl:gap-6 ">
          <h2 className="font-semibold text-[1.3rem]  md:text-4xl 2xl:text-[2.2rem] ">
            Explore places together
          </h2>
          <h4 className="font-light text-sm md:text-lg 2xl:text-2xl">
            Discover the latest offers and news and start planning your next
            trip with us.
          </h4>
        </div>

        <div className="flex items-center  rounded-lg w-full md:w-1/4 2xl:h-full ">
          <select
            className="flex justify-center relative  items-center p-2 w-full  outline-none sm:w-1/2 sm:mx-auto rounded-lg border border-blue-500 mt-1 font-roboto text-center font-light  bg-white md:w-3/4 2xl:w-3/4 2xl:p-4"
            name=""
            id=""
            // selected={}
            defaultValue={"i"}
          >
            <option value="i">International</option>
            <option value="d">Domestic</option>
          </select>
        </div>
      </div> */}
    </div>
  );
};

export default FilterSection;
