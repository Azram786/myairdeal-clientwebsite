import React, { useRef, useState, useEffect, useMemo } from "react";
import { Tabs } from "antd";
import { FaFilter, FaTimes } from "react-icons/fa";
import { ArrowRightOutlined } from "@ant-design/icons";
import { FallOutlined, StopOutlined, RiseOutlined } from "@ant-design/icons";
import ReactJoyride from "react-joyride";
import flightLogo from "../../../assets/home/logo/image 40.png";
import { BsFillFilterSquareFill } from "react-icons/bs";
import BookingCard from "./BookingCards";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactToast from "../../util/ReactToast";
import { setLastSearch } from "../../../store/slices/aut.slice";
import ComboSideBar from "./ComboSidebar";
import ComboFlightCard from "../Cards/ComboFlightCard";
import { VariableSizeList as List } from "react-window";
import { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import "./Combo.css";

const { TabPane } = Tabs;

const Oneway = ({ flightProps, passenger, query }) => {
  const dispatch = useDispatch();
  const [cheapest, setCheaptest] = useState(false);
  const [highest, setHighest] = useState(false);
  const [nonStop, setNonStop] = useState(false);
  const [filteredFlights, setFilteredFlights] = useState(flightProps);
  const [filters, setFilters] = useState({
    maxPrice: 100000,
    stops: [],
    departureTime: [],
    arrivalTime: [],
    airlines: [],
  });

  const token = useSelector((state) => state.auth.token);
  const [selectedFlight, setSelectedFlight] = useState([
    // { flightIndex: 0, priceIndex: 0 },
  ]);
  const navigate = useNavigate();

  const calculateTotalPrice = useMemo(
    () => (flight) => {
      let total = 0;
      const priceList = flight.totalPriceList[0].fd;
      for (const passengerType in passenger) {
        if (priceList[passengerType]) {
          total += priceList[passengerType].fC.TF * passenger[passengerType];
        }
      }
      return total;
    },
    [passenger]
  );

  const getStopsCount = (flight) => {
    return flight.sI.length - 1;
  };

  const isHourInRange = (hour, range) => {
    const [start, end] = range.split("-").map(Number);
    if (start < end) {
      return hour >= start && hour < end;
    } else {
      return hour >= start || hour < end;
    }
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
    setSelectedFlight([]);
    const newFilteredFlights = flightProps.filter((flight) => {
      const price = calculateTotalPrice(flight);
      const stops = getStopsCount(flight);
      const departureHour = new Date(flight.sI[0].dt).getHours();
      const arrivalHour = new Date(
        flight.sI[flight.sI.length - 1].at
      ).getHours();
      const airline = flight.sI[0].fD.aI.name;

      const priceMatch = price <= filters.maxPrice;
      const stopsMatch =
        filters.stops.length === 0 ||
        filters.stops.includes(stops.toString()) ||
        (stops >= 3 && filters.stops.includes("3+"));
      const departureMatch =
        filters.departureTime.length === 0 ||
        filters.departureTime.some((range) =>
          isHourInRange(departureHour, range)
        );
      const arrivalMatch =
        filters.arrivalTime.length === 0 ||
        filters.arrivalTime.some((range) => isHourInRange(arrivalHour, range));
      const airlineMatch =
        filters.airlines.length === 0 || filters.airlines.includes(airline);

      return (
        priceMatch &&
        stopsMatch &&
        departureMatch &&
        arrivalMatch &&
        airlineMatch
      );
    });
    if (cheapest) {
      const sortedFilteredFlight = sortFlightsByLowestPrice(newFilteredFlights);
      setFilteredFlights(sortedFilteredFlight);
    } else if (highest) {
      const sortedFilteredFlight =
        sortFlightsByHighestPrice(newFilteredFlights);
      setFilteredFlights(sortedFilteredFlight);
    } else {
      setFilteredFlights(newFilteredFlights);
    }
  }, [filters, flightProps, calculateTotalPrice, cheapest, highest]);

  const handleFlightSelection = (flightIndex, priceIndex) => {
    setSelectedFlight([{ flightIndex, priceIndex }]);
  };

  const handleBooking = () => {
    if (selectedFlight.length > 0) {
      const bookings = selectedFlight?.map((selected) => ({
        flightDetails: filteredFlights[selected.flightIndex].sI,
        priceId:
          filteredFlights[selected.flightIndex].totalPriceList[
            selected.priceIndex
          ].id,
      }));

      if (!token) {
        ReactToast("Please login first");
        navigate("/sign-in");
        dispatch(setLastSearch(bookings));
      }

      navigate("/book-flight", { state: { bookings } });
    }
  };

  const getTotalPrice = () => {
    if (selectedFlight.length > 0) {
      const selected = selectedFlight[0];
      const flight = filteredFlights[selected.flightIndex];
      if (flight) {
        return calculateTotalPrice(flight);
      }
    }
    return 0;
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const itemCount = filteredFlights.length;


  const [runJoyride, setRunJoyride] = useState(false);

  useEffect(() => {
    const storedJoyride = localStorage.getItem("combo-Tutorial");
    if (!storedJoyride) {
      localStorage.setItem("combo-Tutorial", "notexecuted");
    }

    if (storedJoyride === "notexecuted") {
      setRunJoyride(true);
      setTimeout(() => {
        localStorage.setItem("combo-Tutorial", "executed");
      }, 1000);
    }
    if (storedJoyride === "executed") setRunJoyride(false);
  }, []);

  const joyrideSteps = [
    {
      target: ".combo-sidebar",
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
            scrollOffset={600}
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
            nonStop ? "filter-container-button-active" : ""
          }`}
          onClick={() => {
            setNonStop(!nonStop);
            setFilters((prevFilters) => ({
              ...prevFilters,
              stops: prevFilters.stops.includes("0")
                ? prevFilters.stops.filter((stop) => stop !== "0") // Remove "0" if it's already in the array
                : ["0"], // Add "0" and remove all other stops
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
      <div className="relative flex md:flex-row flex-col">
        <button
          className="absolute top-0 right-1 z-50 flex justify-center items-center flex-col  lg-custom:hidden"
          onClick={toggleSidebar}
        >
          <BsFillFilterSquareFill className="w-6 h-6 white" />
          <div className="text-xs white">Filters</div>
        </button>
        <div className="relative h-full flex flex-wrap flex-col lg-custom:flex-row">
          <div
            className={`fixed h-full overflow-y-auto lg-custom:static top-0 bottom-0 bg-blur right-0 z-50 lg-custom:z-0 rounded-xl bg-white transform combo-sidebar ${
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
              className="absolute top-2  right-4 z-50 white  lg-custom:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaTimes className="w-6 h-6" />
            </button>

            <div className="font-semibold p-2 text-left text-base">Filters</div>
            <div className="rounded-xl flex flex-col items-center ">
              <ComboSideBar
                flights={flightProps}
                filters={filters}
                setFilters={setFilters}
                passenger={passenger}
                calculateTotalPrice={calculateTotalPrice}
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
      <div className="flex-grow  ">
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span className="hidden">
                <span className="flex flex-col justify-center ">
                  <p>{filteredFlights[0]?.sI[0]?.da?.city}</p>
                  <p className="text-[10px]">
                    {filteredFlights[0]?.sI[0] &&
                      new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                        .format(new Date(filteredFlights[0].sI[0].dt))
                        .split("/")
                        .join("-")}
                  </p>
                </span>
                <ArrowRightOutlined />
                <span className="flex flex-col justify-center">
                  <p>
                    {
                      filteredFlights[0]?.sI[filteredFlights[0]?.sI.length - 1]
                        ?.aa?.city
                    }
                  </p>
                  <p className="text-[10px]">
                    {filteredFlights[0]?.sI[0] &&
                      new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                        .format(
                          new Date(
                            filteredFlights[0].sI[
                              filteredFlights[0]?.sI.length - 1
                            ].at
                          )
                        )
                        .split("/")
                        .join("-")}
                  </p>
                </span>
              </span>
            }
            key="1"
          >
            <div className="h-[1000px] overflow-y-auto no-scroll">
              {itemCount > 0 ? (
                <Virtuoso
                  totalCount={itemCount}
                  itemContent={(index) => {
                    const flight = filteredFlights[index];
                    return (
                      <ComboFlightCard
                        key={index}
                        passenger={passenger}
                        logo={flightLogo}
                        flightDetails={flight}
                        isSelected={selectedFlight.some(
                          (selected) => selected.flightIndex === index
                        )}
                        selectedPriceIndex={
                          selectedFlight.find(
                            (selected) => selected.flightIndex === index
                          )?.priceIndex
                        }
                        onSelect={(priceIndex) =>
                          handleFlightSelection(index, priceIndex)
                        }
                        totalPrice={calculateTotalPrice(flight)}
                      />
                    );
                  }}
                />
              ) : (
                <p>No flights match the current filters.</p>
              )}
            </div>
          </TabPane>
        </Tabs>
      </div>
      {selectedFlight.length > 0 && (
        <BookingCard
          passenger={passenger}
          selectedPriceIndex={selectedFlight}
          // selectedFlights={selectedFlight.map(
          //   (selected) => filteredFlights[selected.flightIndex]
          // )}
          selectedFlights={selectedFlight.map((selected) => ({
            ...filteredFlights[selected.flightIndex],
            selectedPriceIndex: selected.priceIndex,
          }))}
          totalPrice={getTotalPrice()}
          onBook={handleBooking}
          calculateTotalPrice={calculateTotalPrice}
          combo={true}
        />
      )}
    </div>
    </div>
  );
};

export default Oneway;
