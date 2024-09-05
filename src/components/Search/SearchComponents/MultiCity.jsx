import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import FlightDetailsCard from "../Cards/FlightDetailsCard";
import { ArrowRightOutlined } from "@ant-design/icons";
import flightLogo from "../../../assets/home/logo/image 40.png";
import SideBar from "./SideBar";
import BookingCard from "./BookingCards";
import { useNavigate } from "react-router-dom";
import ReactJoyride from "react-joyride";
import { useSelector, useDispatch } from "react-redux";
import ReactToast from "../../util/ReactToast";
import { FaFilter, FaTimes } from "react-icons/fa";
import { BsFillFilterSquareFill } from "react-icons/bs";
import { setLastSearch } from "../../../store/slices/aut.slice";
import { FallOutlined, StopOutlined, RiseOutlined } from "@ant-design/icons";
import { Virtuoso } from "react-virtuoso";
const { TabPane } = Tabs;

const MultiCity = ({ flightProps, passenger, query }) => {
  const dispatch = useDispatch();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const token = useSelector((state) => state.auth.token);
  const [cheapest, setCheaptest] = useState(false);
  const [highest, setHighest] = useState(false);
  const [filters, setFilters] = useState(
    flightProps.map(() => ({
      maxPrice: 100000,
      stops: [],
      departureTime: [],
      arrivalTime: [],
      airlines: [],
    }))
  );
  const [filteredFlights, setFilteredFlights] = useState(flightProps);
  const [selectedFlights, setSelectedFlights] = useState(
    flightProps.map(() => ({}))
  );

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

  const getStopsCount = (flight) => {
    return flight.sI.length - 1;
  };

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

  useEffect(() => {
    const newFilteredFlights = flightProps.map((flights, index) => {
      const filteredFlights = flights.filter((flight) => {
        const price = calculateTotalPrice(flight);
        const stops = getStopsCount(flight);
        const departureTime = new Date(flight.sI[0].dt).getHours();
        const arrivalTime = new Date(
          flight.sI[flight.sI.length - 1].at
        ).getHours();
        const airline = flight.sI[0].fD.aI.name;
        const departureTimeRange =
          departureTime >= 0 && departureTime < 6
            ? "00-06"
            : departureTime >= 6 && departureTime < 12
            ? "06-12"
            : departureTime >= 12 && departureTime < 18
            ? "12-18"
            : "18-00";
        const arrivalTimeRange =
          arrivalTime >= 0 && arrivalTime < 6
            ? "00-06"
            : arrivalTime >= 6 && arrivalTime < 12
            ? "06-12"
            : arrivalTime >= 12 && arrivalTime < 18
            ? "12-18"
            : "18-00";
        return (
          price <= filters[index].maxPrice &&
          (filters[index].stops.length === 0 ||
            filters[index].stops.includes(stops.toString())) &&
          (filters[index].departureTime.length === 0 ||
            filters[index].departureTime.includes(departureTimeRange)) &&
          (filters[index].arrivalTime.length === 0 ||
            filters[index].arrivalTime.includes(arrivalTimeRange)) &&
          (filters[index].airlines.length === 0 ||
            filters[index].airlines.includes(airline))
        );
      });
      if (cheapest) {
        return filteredFlights.sort((a, b) => {
          const priceA = calculateTotalPrice(a);
          const priceB = calculateTotalPrice(b);
          return priceA - priceB;
        });
      } else if (highest) {
        return filteredFlights.sort((a, b) => {
          const priceA = calculateTotalPrice(a);
          const priceB = calculateTotalPrice(b);
          return priceB - priceA;
        });
      } else {
        return filteredFlights;
      }
    });

    setFilteredFlights(newFilteredFlights);

    setSelectedFlights((prev) =>
      prev.map((selected, index) => {
        if (selected.flightIndex !== null) {
          const flightStillAvailable = newFilteredFlights[index].some(
            (flight, idx) => idx === selected.flightIndex
          );
          return flightStillAvailable
            ? selected
            : { flightIndex: null, priceIndex: null };
        }
        return selected;
      })
    );
  }, [filters, flightProps, passenger, cheapest, highest]);

  const handleTabChange = (activeKey) => {
    setActiveTabIndex(Number(activeKey));
  };

  const handleFlightSelection = (tabIndex, flightIndex, priceIndex) => {
    setSelectedFlights((prev) => {
      const newSelected = [...prev];
      newSelected[tabIndex] = { flightIndex, priceIndex };
      return newSelected;
    });
  };

  const getTotalPrice = () => {
    return selectedFlights.reduce((total, selected, index) => {
      if (selected.flightIndex !== null && selected.priceIndex !== null) {
        const flight = filteredFlights[index][selected.flightIndex];
        return total + calculateTotalPrice(flight);
      }
      return total;
    }, 0);
  };

  const handleBooking = () => {
    const allFlightsSelected = selectedFlights.every(
      (selected) =>
        selected.flightIndex !== null && selected.priceIndex !== null
    );

    if (!allFlightsSelected) {
      ReactToast("Please select all connection flights before booking.");
      return;
    }

    const bookingData = selectedFlights.map((selected, index) => {
      const flight = filteredFlights[index][selected.flightIndex];
      return {
        priceId: flight.totalPriceList[selected.priceIndex].id,
        flightDetails: flight.sI,
      };
    });

    if (!token) {
      ReactToast("Please login first");
      navigate("/sign-in");
      dispatch(setLastSearch(bookingData));
    }
    navigate("/book-flight", { state: { bookings: bookingData } });
  };

  if (flightProps.length === 0) {
    return <div>No flights available</div>;
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const allFiltersHaveZero = filters.every((filter) =>
    filter.stops.includes("0")
  );

  const [runJoyride, setRunJoyride] = useState(false);

  useEffect(() => {
    const storedJoyride = localStorage.getItem("multicity-Tutorial");
    if (!storedJoyride) {
      localStorage.setItem("multicity-Tutorial", "notexecuted");
    }

    if (storedJoyride === "notexecuted") {
      setRunJoyride(true);
      setTimeout(() => {
        localStorage.setItem("multicity-Tutorial", "executed");
      }, 1000);
    }
    if (storedJoyride === "executed") setRunJoyride(false);
  }, []);

  const joyrideSteps = [
    {
      target: ".multicity-sidebar",
      content: "Navigate through available options using this sidebar.",
    },
    {
      target: ".price-selection",
      content: "Choose your preferred price range from the options here.",
    },
    {
      target: ".view-details",
      content: "Click here to view more details about the selected flight.",
    },
  ];

  return (
    <div>
      {runJoyride && (
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
        )}
      <div className="filter-container price-selection">
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
            allFiltersHaveZero ? "filter-container-button-active" : ""
          }`}
          onClick={() => {
            const newFilters = [...filters];

            // Check if all filters have 0 in their stops array
            const allHaveZero = newFilters.every((filter) =>
              filter.stops.includes("0")
            );

            // Update each filter based on the condition
            newFilters.forEach((filter, index) => {
              newFilters[index] = {
                ...filter,
                stops: allHaveZero ? [] : ["0"], // If all have 0, clear stops; otherwise, set to [0]
              };
            });

            setFilters(newFilters);
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
      <div className=" relative flex flex-col md:flex-row mb-3 ">
        <button
          className="absolute top-4 right-0 z-50 flex justify-center items-center flex-col lg-custom:hidden"
          onClick={toggleSidebar}
        >
          <BsFillFilterSquareFill className="w-6 h-6 white" />
          <div className="text-xs white">Filters</div>
        </button>

        <div className="relative h-full flex flex-wrap flex-col lg-custom:flex-row">
          <div
            className={`fixed h-full overflow-y-auto lg-custom:static top-0 bottom-0 right-0 z-50 lg-custom:z-0 bg-white transform multicity-sidebar ${
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
            <div className="rounded-xl flex flex-col items-center">
              <SideBar
                flights={flightProps}
                filters={filters}
                setFilters={setFilters}
                activeTabIndex={activeTabIndex}
                passenger={passenger}
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

        <div className=" flex-grow pb-20 ">
          <Tabs className="m-0" defaultActiveKey="0" onChange={handleTabChange}>
            {flightProps.map((flights, tabIndex) => {
              const startCode =
                flights.length > 0 ? flights[0].sI[0].da.city : "Unknown";
              const endCode =
                flights.length > 0
                  ? flights[0].sI[flights[0].sI.length - 1].aa.city
                  : "Unknown";
              const dt =
                flights.length > 0
                  ? new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                      .format(
                        new Date(flights[0].sI[flights[0].sI.length - 1].dt)
                      )
                      .split("/")
                      .join("-")
                  : "N/A";

              return (
                <TabPane
                  className=""
                  tab={
                    <span className="flex  flex-col justify-start items-center ">
                      <p className="space-x-1">
                        {" "}
                        <span>{startCode}</span>{" "}
                        <span>
                          <ArrowRightOutlined className="" />
                        </span>{" "}
                        <span>{endCode}</span>{" "}
                      </p>
                      <p>{dt}</p>{" "}
                    </span>
                  }
                  key={tabIndex}
                >
                  <div className="h-[700px] overflow-y-auto no-scroll ">
                    {filteredFlights[tabIndex].length === 0 ? (
                      <div>No flights available for this route</div>
                    ) : (
                      filteredFlights[tabIndex].map((flight, flightIndex) => (
                        <FlightDetailsCard
                          key={flightIndex}
                          logo={flightLogo}
                          flightDetails={flight}
                          passenger={passenger}
                          isSelected={
                            selectedFlights[tabIndex].flightIndex ===
                            flightIndex
                          }
                          selectedPriceIndex={
                            selectedFlights[tabIndex].flightIndex ===
                            flightIndex
                              ? selectedFlights[tabIndex].priceIndex
                              : 0
                          }
                          onSelect={(priceIndex) =>
                            handleFlightSelection(
                              tabIndex,
                              flightIndex,
                              priceIndex
                            )
                          }
                          totalPrice={calculateTotalPrice(flight)}
                        />
                      ))
                    )}
                  </div>
                </TabPane>
              );
            })}
          </Tabs>
        </div>

        {(selectedFlights[0]?.priceIndex != null ||
          selectedFlights[1]?.priceIndex != null) && (
          <BookingCard
            selectedFlights={selectedFlights
              .map((selected, index) =>
                selected.flightIndex !== null
                  ? {
                      ...filteredFlights[index][selected.flightIndex],
                      selectedPriceIndex: selected.priceIndex,
                    }
                  : null
              )
              .filter((flight) => flight !== null)}
            onBook={handleBooking}
            passenger={passenger}
            selectedPriceIndex={selectedFlights}
          />
        )}
      </div>
    </div>
  );
};

export default MultiCity;
