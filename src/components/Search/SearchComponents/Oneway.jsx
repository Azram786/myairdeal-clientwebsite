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


import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import FlightDetailsCard from "../Cards/FlightDetailsCard";
import { ArrowRightOutlined } from "@ant-design/icons";
import flightLogo from "../../../assets/home/logo/image 40.png";
import OneWaySideBar from "./OneWaySidebar";
import BookingCard from "./BookingCards"; 
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

const Oneway = ({ flightProps }) => {
  console.log("flightProps in Oneway:", flightProps);

  const [filteredFlights, setFilteredFlights] = useState(flightProps);
  const [filters, setFilters] = useState({
    maxPrice: 100000,
    stops: [],
    departureTime: [],
    arrivalTime: [],
    airlines: []
  });

  const [selectedFlight, setSelectedFlight] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    console.log("Filters changed:", filters);
    const newFilteredFlights = flightProps.filter(flight => {
      console.log("Processing flight:", flight);
      const price = flight.totalPriceList[0].fd.ADULT.fC.TF;
      const stops = flight.sI[0].stops;
      const departureHour = new Date(flight.sI[0].dt).getHours();
      const arrivalHour = new Date(flight.sI[0].at).getHours();
      const airline = flight.sI[0].fD.aI.name;

      const priceMatch = price <= filters.maxPrice;
      const stopsMatch = filters.stops.length === 0 || filters.stops.includes(stops.toString());
      const departureMatch = filters.departureTime.length === 0 || filters.departureTime.some(range => {
        const [start, end] = range.split('-').map(Number);
        return departureHour >= start && departureHour < end;
      });
      const arrivalMatch = filters.arrivalTime.length === 0 || filters.arrivalTime.some(range => {
        const [start, end] = range.split('-').map(Number);
        return arrivalHour >= start && arrivalHour < end;
      });
      const airlineMatch = filters.airlines.length === 0 || filters.airlines.includes(airline);

      return priceMatch && stopsMatch && departureMatch && arrivalMatch && airlineMatch;
    });

    console.log("New filtered flights:", newFilteredFlights);
    setFilteredFlights(newFilteredFlights);
  }, [filters, flightProps]);

  const startSegment = filteredFlights[0]?.sI[0];
  const endSegment = filteredFlights[0]?.sI[filteredFlights[0]?.sI.length - 1];

  const handleFlightSelection = (flightIndex, priceIndex) => {
    setSelectedFlight([{ flightIndex, priceIndex }]);
  };

  const handleBooking = () => {
    if (selectedFlight.length > 0) {
      const bookings = selectedFlight.map(selected => ({
        flightDetails: filteredFlights[selected.flightIndex].sI,
        priceId: filteredFlights[selected.flightIndex].totalPriceList[selected.priceIndex].id
      }));
      console.log("Processing bookings:", bookings);
  
      navigate("/book-flight", { state: { bookings } });
    }
  };
  
  const getTotalPrice = () => {
    if (selectedFlight.length > 0) {
      const selected = selectedFlight[0];
      const flight = filteredFlights[selected.flightIndex];
      if (flight && flight.totalPriceList && flight.totalPriceList[selected.priceIndex]) {
        return flight.totalPriceList[selected.priceIndex].fd.ADULT.fC.TF;
      }
    }
    return 0;
  };

  return (
    <div className="flex">
      <OneWaySideBar flights={flightProps} filters={filters} setFilters={setFilters} />
      <div className="flex-grow">
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                {filteredFlights[0]?.sI[0]?.da.city} <ArrowRightOutlined /> {filteredFlights[0]?.sI[filteredFlights[0]?.sI.length - 1]?.aa.city}
              </span>
            }
            key="1"
          >
            {filteredFlights.length > 0 ? (
              filteredFlights.map((flight, index) => (
                <FlightDetailsCard
                  key={index}
                  logo={flightLogo}
                  flightDetails={flight}
                  isSelected={selectedFlight.some(selected => selected.flightIndex === index)}
                  selectedPriceIndex={selectedFlight.find(selected => selected.flightIndex === index)?.priceIndex}
                  onSelect={(priceIndex) => handleFlightSelection(index, priceIndex)}
                />
              ))
            ) : (
              <p>No flights match the current filters.</p>
            )}
          </TabPane>
        </Tabs>
      </div>
      {selectedFlight.length > 0 && (
  <BookingCard
    selectedFlights={selectedFlight.map(selected => filteredFlights[selected.flightIndex])}
    totalPrice={getTotalPrice()}
    onBook={handleBooking}
  />
)}
    </div>
  );
};

export default Oneway;