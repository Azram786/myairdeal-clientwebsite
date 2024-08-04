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
import { useSelector } from "react-redux";
import ReactToast from "../../util/ReactToast";

const { TabPane } = Tabs;

const Oneway = ({ flightProps, passenger,query }) => {
  console.log("flightProps in Oneway:", flightProps);

  const [filteredFlights, setFilteredFlights] = useState(flightProps);
  const [filters, setFilters] = useState({
    maxPrice: 100000,
    stops: [],
    departureTime: [],
    arrivalTime: [],
    airlines: []
  });

  const token = useSelector((state) => state.auth.token);
  const [selectedFlight, setSelectedFlight] = useState([]);
  const navigate = useNavigate();

  const calculateTotalPrice = useMemo(() => (flight) => {
    let total = 0;
    const priceList = flight.totalPriceList[0].fd;
    for (const passengerType in passenger) {
      if (priceList[passengerType]) {
        total += priceList[passengerType].fC.TF * passenger[passengerType];
      }
    }
    return total;
  }, [passenger]);

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
    const [start, end] = range.split('-').map(Number);
    if (start < end) {
      return hour >= start && hour < end;
    } else {
      return hour >= start || hour < end;
    }
  };

  useEffect(() => {
    console.log("Filters changed:", filters);
    const newFilteredFlights = flightProps.filter(flight => {
      console.log("Processing flight:", flight);
      const price = calculateTotalPrice(flight);
      const stops = getStopsCount(flight);
      const departureHour = new Date(flight.sI[0].dt).getHours();
      const arrivalHour = new Date(flight.sI[flight.sI.length - 1].at).getHours();
      const airline = flight.sI[0].fD.aI.name;

      const priceMatch = price <= filters.maxPrice;
      const stopsMatch = filters.stops.length === 0 || filters.stops.includes(stops.toString()) || (stops >= 3 && filters.stops.includes("3+"));
      const departureMatch = filters.departureTime.length === 0 || filters.departureTime.some(range => isHourInRange(departureHour, range));
      const arrivalMatch = filters.arrivalTime.length === 0 || filters.arrivalTime.some(range => isHourInRange(arrivalHour, range));
      const airlineMatch = filters.airlines.length === 0 || filters.airlines.includes(airline);

      return priceMatch && stopsMatch && departureMatch && arrivalMatch && airlineMatch;
    });

    console.log("New filtered flights:", newFilteredFlights);
    setFilteredFlights(newFilteredFlights);
  }, [filters, flightProps, calculateTotalPrice]);

  const handleFlightSelection = (flightIndex, priceIndex) => {
    setSelectedFlight([{ flightIndex, priceIndex }]);
  };

  const handleBooking = () => {
    if (selectedFlight.length > 0) {
      const bookings = selectedFlight?.map(selected => ({
        flightDetails: filteredFlights[selected.flightIndex].sI,
        priceId: filteredFlights[selected.flightIndex].totalPriceList[selected.priceIndex].id
      }));
      console.log("Processing bookings:", bookings);

      if(!token){
      ReactToast('Please login first')
      navigate("/sign-in");
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

  console.log(filteredFlights, "filtered flights");
  return (
    <div className="flex md:flex-row flex-col">
      <OneWaySideBar 
        flights={flightProps} 
        filters={filters} 
        setFilters={setFilters} 
        passenger={passenger}
        calculateTotalPrice={calculateTotalPrice}
      />
      <div className="flex-grow">
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span className="flex gap-2">
               <span className="flex flex-col justify-center ">
      <p>{filteredFlights[0]?.sI[0]?.da?.city}</p>
      <p className="text-[10px]">
        {filteredFlights[0]?.sI[0] && new Date(filteredFlights[0].sI[0].dt).toISOString().split('T')[0]}
      </p>
    </span>
    <ArrowRightOutlined />
    <span className="flex flex-col justify-center ">
      <p>{filteredFlights[0]?.sI[filteredFlights[0]?.sI.length - 1]?.aa?.city}</p>
      <p className="text-[10px]">
        {filteredFlights[0]?.sI[filteredFlights[0]?.sI.length - 1] &&
          new Date(filteredFlights[0].sI[filteredFlights[0]?.sI.length - 1].at).toISOString().split('T')[0]}
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
                    isSelected={selectedFlight.some(selected => selected.flightIndex === index)}
                    selectedPriceIndex={selectedFlight.find(selected => selected.flightIndex === index)?.priceIndex}
                    onSelect={(priceIndex) => handleFlightSelection(index, priceIndex)}
                    totalPrice={calculateTotalPrice(flight)}
                  />
                ))
              ) : (
                <p>No flights match the current filters.</p>
              )}
            </div>
          </TabPane>
        </Tabs>

        {console.log(selectedFlight,"djloe")}
      </div>
      {selectedFlight.length > 0 && (
        <BookingCard
          passenger={passenger}
          selectedPriceIndex={selectedFlight}
          selectedFlights={selectedFlight.map(selected => filteredFlights[selected.flightIndex])}
          totalPrice={getTotalPrice()}
          onBook={handleBooking}
          calculateTotalPrice={calculateTotalPrice}
        />
      )}
    </div>
  );
};

export default Oneway;