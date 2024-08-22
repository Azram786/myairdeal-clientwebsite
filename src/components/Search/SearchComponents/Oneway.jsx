// import React from "react";
// import { Tabs } from "antd";
// import FlightDetailsCard from "../../Cards/FlightDetailsCard";
// import { ArrowRightOutlined } from "@ant-design/icons";
// import flightLogo from "../../../assets/home/logo/image 40.png";
// import SideBar from "./SideBar";

// const { TabPane } = Tabs;

// const Oneway = ({ flightProps }) => {
//   const startSegment = flightProps[0];
//   const endSegment = flightProps[flightProps.length - 1];

//   console.log(flightProps,"flight props");

//   const flightDetails = flightProps.map(flight => {
//     return flight.sI.map(segment => {
//         return {
//             flightName: segment.fD.aI.name,
//             departureTime: segment.dt,
//             arrivalTime: segment.at
//         };
//     });
// }).flat();

// console.log(flightDetails, "flight details")

//   return (
//     <div className="flex flex-row h-screen">
//       <SideBar flights={flightDetails} />
//       <div className="flex-grow overflow-y-auto p-4 border shadow-md m-2 rounded-md">
//         <Tabs defaultActiveKey="1">
//           <TabPane
//             tab={
//               <span>
//                 {startSegment.sI[0].da.city}{" "}
//                 <ArrowRightOutlined className="m-2" />{" "}
//                 {endSegment.sI[0].aa.city}
//               </span>
//             }
//             key="1"
//           >
//             {flightProps.map((flight, index) => (
//               <FlightDetailsCard
//                 logo={flightLogo}
//                 key={index}
//                 flightDetails={flight.sI}
//               />
//             ))}
//           </TabPane>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default Oneway;

import React, { useState, useEffect, useMemo } from "react";
import { Tabs } from "antd";
import FlightDetailsCard from "../Cards/FlightDetailsCard";
import { ArrowRightOutlined } from "@ant-design/icons";
import flightLogo from "../../../assets/home/logo/image 40.png";
import OneWaySideBar from "./OneWaySidebar";
import BookingCard from "./BookingCards";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactToast from "../../util/ReactToast";
import { FaFilter, FaTimes } from "react-icons/fa";
import { BsFillFilterSquareFill } from "react-icons/bs";
import { setLastSearch } from "../../../store/slices/aut.slice";

const { TabPane } = Tabs;

const Oneway = ({ flightProps, passenger, query }) => {
  const dispatch = useDispatch();
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

  // useEffect(() => {
  //   console.log("Filters changed:", filters);
  //   const newFilteredFlights = flightProps.filter(flight => {
  //     console.log("Processing flight:", flight);
  //     const price = calculateTotalPrice(flight);
  //     const stops = getStopsCount(flight);
  //     const departureHour = new Date(flight.sI[0].dt).getHours();
  //     const arrivalHour = new Date(flight.sI[flight.sI.length - 1].at).getHours();
  //     const airline = flight.sI[0].fD.aI.name;

  //     const priceMatch = price <= filters.maxPrice;
  //     const stopsMatch = filters.stops.length === 0 || filters.stops.includes(stops.toString()) || (stops >= 3 && filters.stops.includes("3+"));
  //     const departureMatch = filters.departureTime.length === 0 || filters.departureTime.some(range => {
  //       const [start, end] = range.split('-').map(Number);
  //       return departureHour >= start && departureHour < end;
  //     });
  //     const arrivalMatch = filters.arrivalTime.length === 0 || filters.arrivalTime.some(range => {
  //       const [start, end] = range.split('-').map(Number);
  //       return arrivalHour >= start && arrivalHour < end;
  //     });
  //     const airlineMatch = filters.airlines.length === 0 || filters.airlines.includes(airline);

  //     return priceMatch && stopsMatch && departureMatch && arrivalMatch && airlineMatch;
  //   });

  //   console.log("New filtered flights:", newFilteredFlights);
  //   setFilteredFlights(newFilteredFlights);
  // }, [filters, flightProps, calculateTotalPrice]);

  const isHourInRange = (hour, range) => {
    const [start, end] = range.split("-").map(Number);
    if (start < end) {
      return hour >= start && hour < end;
    } else {
      return hour >= start || hour < end;
    }
  };

  useEffect(() => {
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

    setFilteredFlights(newFilteredFlights);
  }, [filters, flightProps, calculateTotalPrice]);

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

  return (
    <div className="flex  relative md:flex-row flex-col">
      {/* <OneWaySideBar
        flights={flightProps}
        filters={filters}
        setFilters={setFilters}
        passenger={passenger}
        calculateTotalPrice={calculateTotalPrice}
      /> */}

      <button
        className="absolute top-10 right-0 z-50 flex justify-center items-center flex-col  lg-custom:hidden"
        onClick={toggleSidebar}
      >
        <BsFillFilterSquareFill className="w-6 h-6 white" />
        <div className="text-xs white">Filters</div>
      </button>
      <div className="relative h-full flex flex-wrap flex-col lg-custom:flex-row">
        <div
          className={`fixed h-full overflow-y-auto lg-custom:static top-0 bottom-0 bg-blur right-0 z-50 lg-custom:z-0 rounded-xl bg-white transform ${
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
            className="absolute top-2 right-4 z-50 white  lg-custom:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes className="w-6 h-6" />
          </button>

          <div className="font-semibold p-2 text-left text-base">Filters</div>
          <div className="rounded-xl flex flex-col items-center ">
            <OneWaySideBar
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

      <div className="flex-grow">
        <h1 className="text-sm font-bold">
          {" "}
          {filteredFlights.length} flights Found{" "}
        </h1>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span className="flex gap-2">
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
                <span className="flex flex-col justify-center ">
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
            <div className="h-[630px] overflow-y-auto no-scroll">
              {filteredFlights.length > 0 ? (
                filteredFlights.map((flight, index) => (
                  <FlightDetailsCard
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
                ))
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
          selectedFlights={selectedFlight.map(
            (selected) => filteredFlights[selected.flightIndex]
          )}
          totalPrice={getTotalPrice()}
          onBook={handleBooking}
          calculateTotalPrice={calculateTotalPrice}
        />
      )}
    </div>
  );
};

export default Oneway;
