import React, { useState, useEffect } from "react";
import RoundSideBar from "./Roundsidebar";
import BookingCard from "./BookingCards";
import ReactToast from "../../util/ReactToast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RoundTripCard from "../Cards/RoundTripFlightCard";
import { FaFilter, FaTimes } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import { BsFillFilterSquareFill } from "react-icons/bs";
import { setLastSearch } from "../../../store/slices/aut.slice";
import ReactJoyride from "react-joyride";
import { FallOutlined, StopOutlined, RiseOutlined } from "@ant-design/icons";
import { Virtuoso } from "react-virtuoso";
const RoundTrip = ({
  onwardProps = [],
  returnProps = [],
  passenger,
  query,
}) => {
  const dispatch = useDispatch();
  const [cheapest, setCheaptest] = useState(false);
  const [highest, setHighest] = useState(false);
  const [nonStop, setNonStop] = useState(false);
  const [filteredOnward, setFilteredOnward] = useState([]);
  const [filteredReturn, setFilteredReturn] = useState([]);
  const [activeDirection, setActiveDirection] = useState("onward");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOnwardFlight, setSelectedOnwardFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
  const [specialReturnOnward, setSpecialReturnOnward] = useState([]);
  const [specialReturnReturn, setSpecialReturnReturn] = useState([]);
  const [isSpecialReturnActive, setIsSpecialReturnActive] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const [activeSection, setActiveSection] = useState("onward");

  const handleToggleSection = (section) => {
    setActiveSection(section);
  };
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const calculateTotalPrice = (flight) => {
    let total = 0;
    const priceList = flight.totalPriceList[0].fd;
    for (const passengerType in passenger) {
      if (priceList[passengerType]) {
        total += priceList[passengerType].fC.TF * passenger[passengerType];
      }
    }
    return total;
  };

  const [filters, setFilters] = useState({
    onward: {
      maxPrice: Math.max(...onwardProps.map(calculateTotalPrice)),
      stops: [],
      departureTime: [],
      arrivalTime: [],
      airlines: [],
    },
    return: {
      maxPrice: Math.max(...returnProps.map(calculateTotalPrice)),
      stops: [],
      departureTime: [],
      arrivalTime: [],
      airlines: [],
    },
    specialReturnAirlines: [],
  });

  const sortFlightsByLowestPrice = (flights) => {
    return flights.sort((a, b) => {
      const priceA = calculateTotalPrice(a);
      const priceB = calculateTotalPrice(b);
      return priceA - priceB;
    });
  };

  const sortFlightsByHighestPrice = (flights) => {
    return flights.sort((a, b) => {
      const priceA = calculateTotalPrice(a);
      const priceB = calculateTotalPrice(b);
      return priceB - priceA;
    });
  };

  const applyFilters = (flights, direction) => {
    return flights.filter((flight) => {
      if (!flight.sI || flight.sI.length === 0) {
        console.error("Invalid flight data:", flight);
        return false;
      }

      const directionFilters = filters[direction];
      const stops = flight.sI.length - 1;
      const airline = flight.sI[0]?.fD?.aI?.name || "";
      const departureTime = new Date(flight.sI[0].dt).getHours();
      const arrivalTime = new Date(
        flight.sI[flight.sI.length - 1].at
      ).getHours();
      const price = calculateTotalPrice(flight);

      const isInTimeRange = (time, ranges) => {
        if (ranges.length === 0) return true;
        return ranges.some((range) => {
          const [start, end] = range.split("-").map(Number);
          return start < end
            ? time >= start && time < end
            : time >= start || time < end;
        });
      };

      const hasSpecialReturn = flight.totalPriceList.some(
        (price) => price.fareIdentifier === "SPECIAL_RETURN"
      );
      const hasNonSpecialReturn = flight.totalPriceList.some(
        (price) => price.fareIdentifier !== "SPECIAL_RETURN"
      );

      // Hide flights with only special return price lists from initial rendering
      if (!hasNonSpecialReturn) {
        return false;
      }

      // Hide flights without special return when user selects special return
      if (filters.specialReturnAirlines.length > 0 && !hasSpecialReturn) {
        return false;
      }

      return (
        price <= directionFilters.maxPrice &&
        (directionFilters.stops.length === 0 ||
          directionFilters.stops.includes(stops.toString())) &&
        (directionFilters.airlines.length === 0 ||
          directionFilters.airlines.includes(airline)) &&
        isInTimeRange(departureTime, directionFilters.departureTime) &&
        isInTimeRange(arrivalTime, directionFilters.arrivalTime) &&
        (filters.specialReturnAirlines.length === 0 ||
          (hasSpecialReturn && filters.specialReturnAirlines.includes(airline)))
      );
    });
  };

  useEffect(() => {
    setSelectedOnwardFlight(null);
    setSelectedReturnFlight(null);
    const fetchAndFilterFlights = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let filteredOnwardFlights = applyFilters(onwardProps, "onward");
        let filteredReturnFlights = applyFilters(returnProps, "return");
        if (cheapest) {
          const sortedOnwardFlights = sortFlightsByLowestPrice(
            filteredOnwardFlights
          );
          const sortedReturnFlights = sortFlightsByLowestPrice(
            filteredReturnFlights
          );
          setFilteredOnward(sortedOnwardFlights);
          setFilteredReturn(sortedReturnFlights);
        } else if (highest) {
          const sortedOnwardFlights = sortFlightsByHighestPrice(
            filteredOnwardFlights
          );
          const sortedReturnFlights = sortFlightsByHighestPrice(
            filteredReturnFlights
          );
          setFilteredOnward(sortedOnwardFlights);
          setFilteredReturn(sortedReturnFlights);
        } else {
          setFilteredOnward(filteredOnwardFlights);
          setFilteredReturn(filteredReturnFlights);
        }

        // Store special return flights for onward journey
        const specialOnward = onwardProps.filter((flight) =>
          flight.totalPriceList.some(
            (price) => price.fareIdentifier === "SPECIAL_RETURN"
          )
        );
        setSpecialReturnOnward(specialOnward);

        // Store special return flights for return journey
        const specialReturn = returnProps.filter((flight) =>
          flight.totalPriceList.some(
            (price) => price.fareIdentifier === "SPECIAL_RETURN"
          )
        );
        setSpecialReturnReturn(specialReturn);
      } catch (err) {
        console.error("Error filtering flights:", err);
        setError(
          "An error occurred while loading flight information. Please try again."
        );
      } finally {
        setIsLoading(false);
        // setSelectedOnwardFlight(null);
        // setSelectedReturnFlight(null);
      }
    };

    fetchAndFilterFlights();
  }, [filters, onwardProps, returnProps, cheapest, highest]);

  const getRoute = (flights) => {
    if (flights.length > 0 && flights[0].sI && flights[0].sI.length > 0) {
      const departureCity = flights[0].sI[0].da.city;
      const arrivalCity = flights[0].sI[flights[0].sI.length - 1].aa.city;
      const departureTime = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
        .format(new Date(flights[0].sI[0].dt))
        .split("/")
        .join("-");

      return (
        <span className="flex flex-col">
          <p>
            {departureCity} - {arrivalCity}
          </p>
          <p className="text-xs">{departureTime}</p>
        </span>
      );
    }
    return "";
  };

  const findMatchingSpecialReturnFlights = (
    flights,
    selectedFlight,
    selectedPriceInfo
  ) => {
    return flights.filter((flight) => {
      const matchingPrices = flight.totalPriceList.filter((price) => {
        if (price.fareIdentifier !== "SPECIAL_RETURN") return false;

        // Case 1: msri and sri are not present
        if (!selectedPriceInfo.sri && !selectedPriceInfo.msri) {
          return (
            price.fareIdentifier === "SPECIAL_RETURN" &&
            flight.sI[0].fD.aI.code === selectedFlight.sI[0].fD.aI.code
          );
        }

        // Case 2: sri and msri are present
        if (selectedPriceInfo.sri && selectedPriceInfo.msri) {
          return (
            selectedPriceInfo.msri.includes(price.sri) ||
            price.msri.includes(selectedPriceInfo.sri)
          );
        }

        return false;
      });

      return matchingPrices.length > 0;
    });
  };

  const extractMatchingReturnFlightAndPrice = (
    matchingReturnFlights,
    sri,
    msri
  ) => {
    for (const returnFlight of matchingReturnFlights) {
      for (const price of returnFlight.totalPriceList) {
        if (
          price.fareIdentifier === "SPECIAL_RETURN" &&
          (price.sri === sri || msri.includes(price.sri))
        ) {
          return {
            flight: returnFlight,
            matchingPrice: price,
            priceIndex: returnFlight.totalPriceList.indexOf(price),
          };
        }
      }
    }
    return null;
  };
  const updateReturnFlightsWithExactPrice = (
    matchingReturnFlights,
    sri,
    msri
  ) => {
    const exactMatchingReturnFlight = matchingReturnFlights.find(
      (returnFlight) =>
        returnFlight.totalPriceList.some(
          (price) =>
            price.fareIdentifier === "SPECIAL_RETURN" &&
            (price.sri === sri || msri.includes(price.sri))
        )
    );

    if (!exactMatchingReturnFlight) {
      ReactToast("No exact matching return flight found");
      return matchingReturnFlights;
    }

    const exactMatchingPrice = exactMatchingReturnFlight.totalPriceList.find(
      (price) =>
        price.fareIdentifier === "SPECIAL_RETURN" &&
        (price.sri === sri || msri.includes(price.sri))
    );

    const updatedReturnFlights = matchingReturnFlights.map((flight) => ({
      ...flight,
      totalPriceList: [exactMatchingPrice],
    }));

    return updatedReturnFlights;
  };

  const handleSelectFlight = (flight, priceIndex, direction) => {
    if (isSpecialReturnActive) {
      const specialReturn = flight.totalPriceList.filter(
        (item) => item.fareIdentifier == "SPECIAL_RETURN"
      );
      const selected = specialReturn[priceIndex];

      const msri = selected.msri;
      const sri = selected.sri;

      if (direction === "onward") {
        // const matching=filteredReturn.map((item)=>item.priceList.some((price)=>((price.msri.includes(sri)|| msri.includes(price.sir)))))
        const matchingReturnFlights = findMatchingSpecialReturnFlights(
          returnProps,
          flight,
          selected
        );
        // setSelectedReturnFlight(null)
        //           const exactMatchingReturnFlight = extractMatchingReturnFlightAndPrice(matchingReturnFlights, sri, msri);
        // console.log(exactMatchingReturnFlight, "exact matching return flight");

        //           console.log(matchingReturnFlights,"matching")

        //           const updatedReturnFlights = matchingReturnFlights.map(flight => ({
        //             ...flight,
        //             totalPriceList: [exactMatchingReturnFlight]
        //           }));

        const updatedReturnFlights = updateReturnFlightsWithExactPrice(
          matchingReturnFlights,
          sri,
          msri
        );

        setFilteredReturn(updatedReturnFlights);
        setSelectedOnwardFlight({
          ...flight,
          selectedPriceIndex: priceIndex ,
        });
        // setSelectedReturnFlight(null);

        setSelectedReturnFlight({
          ...updatedReturnFlights[0],
          selectedPriceIndex: 0,
        });
      } else {
        const matchingOnwardFlights = findMatchingSpecialReturnFlights(
          onwardProps,
          flight,
          selected
        );
        // setSelectedOnwardFlight(null);
        const updatedOnwardFlights = updateReturnFlightsWithExactPrice(
          matchingOnwardFlights,
          sri,
          msri
        );
        setFilteredOnward(updatedOnwardFlights);
        setSelectedReturnFlight({ ...flight, selectedPriceIndex: priceIndex });

        setSelectedOnwardFlight({
          ...updatedOnwardFlights[0],
          selectedPriceIndex: 0,
        });
      }
    }

    if (direction === "onward") {
      setSelectedOnwardFlight({ ...flight, selectedPriceIndex: priceIndex });
    } else {
      setSelectedReturnFlight({ ...flight, selectedPriceIndex: priceIndex });
    }
  };

  const calculateTotalBookingPrice = () => {
    const onwardPrice = selectedOnwardFlight
      ? calculateTotalPrice(selectedOnwardFlight)
      : 0;
    const returnPrice = selectedReturnFlight
      ? calculateTotalPrice(selectedReturnFlight)
      : 0;
    return onwardPrice + returnPrice;
  };

  const handleBooking = () => {
    if (!selectedOnwardFlight || !selectedReturnFlight) {
      ReactToast("Please select both onward and return flight");
      return;
    }

    const returnFlight =
      selectedReturnFlight.totalPriceList[
        selectedReturnFlight.selectedPriceIndex
      ].id;
    const onwardFlight =
      selectedOnwardFlight.totalPriceList[
        selectedOnwardFlight.selectedPriceIndex
      ].id;
    const data = [
      {
        returnFlightDetails: selectedReturnFlight.sI,
        priceId: returnFlight,
      },
      {
        onwardFlightDetails: selectedOnwardFlight.sI,
        priceId: onwardFlight,
      },
    ];

    if (!token) {
      ReactToast("Please login first");
      navigate("/sign-in");
      dispatch(setLastSearch(data));
      return;
    }
    navigate("/book-flight", { state: { bookings: data } });
  };

  const renderFlightSection = (flights, direction) => {
    if (isLoading) {
      return <div>Loading flights...</div>;
    }

    if (error) {
      return <div className="text-red-500">{error}</div>;
    }

    if (!Array.isArray(flights) || flights.length === 0) {
      return <div>No flights available for the selected criteria.</div>;
    }

    return (
      <div className="h-[900px] overflow-y-auto no-scroll">
        {flights.length > 0 ? (
          <Virtuoso
            totalCount={flights.length}
            itemContent={(index) => {
              const flight = flights[index];
              return (
                <RoundTripCard
                  key={flight.sI[0].id} // Use a unique ID if available
                  flightDetails={flight}
                  isSelected={
                    direction === "onward"
                      ? selectedOnwardFlight?.sI[0].id === flight.sI[0].id
                      : selectedReturnFlight?.sI[0].id === flight.sI[0].id
                  }
                  selectedPriceIndex={
                    direction === "onward"
                      ? selectedOnwardFlight?.selectedPriceIndex
                      : selectedReturnFlight?.selectedPriceIndex
                  }
                  onSelect={(priceIndex) =>
                    handleSelectFlight(flight, priceIndex, direction)
                  }
                  passenger={passenger}
                  specialReturnMode={filters.specialReturnAirlines.length > 0}
                />
              );
            }}
          />
        ) : (
          <p>No flights available.</p>
        )}
      </div>
    );
  };

  const [runJoyride, setRunJoyride] = useState(false);

  useEffect(() => {
    const storedJoyride = localStorage.getItem("roundTrip-Tutorial");
    if (!storedJoyride) {
      localStorage.setItem("roundTrip-Tutorial", "notexecuted");
    }

    if (storedJoyride === "notexecuted") {
      setRunJoyride(true);
      setTimeout(() => {
        localStorage.setItem("roundTrip-Tutorial", "executed");
      }, 1000);
    }
    if (storedJoyride === "executed") setRunJoyride(false);
  }, []);

  const joyrideSteps = [
    {
      target: ".onward-section",
      content:
        "Select your first trip (outbound flight) for the round trip here.",
    },
    {
      target: ".return-section",
      content:
        "Now, select your second trip (return flight) for the round trip here.",
    },
  ];

  return (
    <div>
      <div className="filter-container">
        <div
          className={`filter-container-button ${
            cheapest ? "filter-container-button-active" : ""
          }`}
          onClick={() => {
            setHighest(false);
            setCheaptest(!cheapest);
          }}
        >
          {" "}
          <FallOutlined />
          <b>Lowest Prices</b>
        </div>
        <div
          className={`filter-container-button ${
            filters.onward.stops.includes("0") &&
            filters.return.stops.includes("0")
              ? "filter-container-button-active"
              : ""
          }`}
          onClick={() => {
            setNonStop(!nonStop);
            setFilters((prevFilters) => ({
              ...prevFilters,
              onward: {
                ...prevFilters.onward,
                stops: prevFilters.onward.stops.includes("0")
                  ? [] // If "0" is already present, clear the array
                  : ["0"], // If "0" is not present, set the array to ["0"]
              },
              return: {
                ...prevFilters.return,
                stops: prevFilters.return.stops.includes("0")
                  ? [] // If "0" is already present, clear the array
                  : ["0"], // If "0" is not present, set the array to ["0"]
              },
            }));
          }}
        >
          {" "}
          <StopOutlined />
          <b>No Stops</b>
        </div>
        <div
          className={`filter-container-button ${
            highest ? "filter-container-button-active" : ""
          }`}
          onClick={() => {
            setCheaptest(false);
            setHighest(!highest);
          }}
        >
          <RiseOutlined />
          <b>Highest Prices</b>
        </div>
      </div>
      <div className="relative  flex flex-wrap flex-col  md:flex-row mb-24  w-full ">
        {runJoyride && (
          <ReactJoyride
            steps={joyrideSteps}
            run={runJoyride}
            continuous={true}
            scrollToFirstStep={true}
            showProgress={true}
            scrollOffset={300}
            showSkipButton={true}
            callback={(data) => {
              if (data.action === "reset") {
                setRunJoyride(false);
              }
            }}
          />
        )}

        <button
          className="absolute top-3 right-0 z-50 flex flex-col items-center justify-center  lg-custom:hidden"
          onClick={toggleSidebar}
        >
          <BsFillFilterSquareFill className="w-6 h-6 white" />
          <div className="text-xs text-[#1B1D29]">Filters</div>
        </button>
        <div className=" w-[20%] h-full flex flex-wrap flex-col lg-custom:flex-row ">
          <div
            className={`fixed h-full overflow-y-auto lg-custom:static m-2 top-0 bottom-0 right-0 z-50 lg-custom:z-0 rounded-xl w-full bg-white transform ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out lg-custom:transform-none`}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              marginTop: "2%",
              marginBottom: "2%",
              height: "auto",
              width: "auto",
            }}
          >
            <button
              className="absolute top-2 right-4 z-50 white lg-custom:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <div className="font-semibold p-2 text-left text-base">Filters</div>
            <div className="min-w-[250px]  rounded-xl p-2 flex flex-col items-center ">
              <RoundSideBar
                passenger={passenger}
                filters={filters}
                setFilters={setFilters}
                onwardData={onwardProps}
                returnData={returnProps}
                activeDirection={activeDirection}
                setActiveDirection={setActiveDirection}
                calculateTotalPrice={calculateTotalPrice}
                isSpecialReturn={isSpecialReturnActive}
                setIspecialReturn={setIsSpecialReturnActive}
              />
            </div>
          </div>

          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-30 lg-custom:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </div>
        <div className="flex flex-wrap h-full  mx-0 flex-col w-full lg-custom:w-[80%]">
          <div className="flex gap-6">
            <div className="w-max lg-custom:w-1/2 relative onward-section">
              <h2
                className={`text-sm text-center p-2 lg-custom:text-xl font-semibold mb-2 cursor-pointer lg-custom:cursor-default ${
                  activeSection === "onward"
                    ? "bg-[#1B1D29] text-[#D7B56D]"
                    : "bg-white text-[#1B1D29]"
                } lg-custom:bg-white lg-custom:text-[#1B1D29]`}
                onClick={() => handleToggleSection("onward")}
              >
                {getRoute(filteredOnward)}
              </h2>
            </div>
            <div className="w-max lg-custom:w-1/2 return-section">
              <h2
                className={`text-sm text-center lg-custom:text-xl p-2 font-semibold mb-2 cursor-pointer lg-custom:cursor-default ${
                  activeSection === "return"
                    ? "bg-[#1B1D29] text-[#D7B56D]"
                    : "bg-white text-[#1B1D29]"
                } lg-custom:bg-white lg-custom:text-[#1B1D29]`}
                onClick={() => handleToggleSection("return")}
              >
                {getRoute(filteredReturn)}
              </h2>
            </div>
          </div>

          <div className="  flex h-[950px] flex-col lg-custom:flex-row w-full">
            <div
              className={`w-full lg-custom:w-1/2 overflow-auto no-scroll ${
                activeSection === "onward" ? "block" : "hidden"
              } lg-custom:block`}
            >
              {renderFlightSection(filteredOnward, "onward")}
            </div>
            <div
              className={`w-full lg-custom:w-1/2 overflow-auto no-scroll ${
                activeSection === "return" ? "block" : "hidden"
              } lg-custom:block`}
            >
              {renderFlightSection(filteredReturn, "return")}
            </div>
          </div>
        </div>

        {(selectedOnwardFlight || selectedReturnFlight) && (
          <BookingCard
            selectedFlights={[
              selectedOnwardFlight,
              selectedReturnFlight,
            ].filter(Boolean)}
            totalPrice={calculateTotalBookingPrice()}
            onBook={() => handleBooking()}
            passenger={passenger}
          />
        )}
      </div>
    </div>
  );
};

export default RoundTrip;
