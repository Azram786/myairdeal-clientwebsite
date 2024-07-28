// import React from "react";
// import FlightDetailsCard from "../../Cards/FlightDetailsCard";
// import { ArrowRightOutlined } from "@ant-design/icons";
// import { Tabs } from "antd";
// import flightLogo from "../../../assets/home/logo/image 40.png";
// import SideBar from "./SideBar";

// const { TabPane } = Tabs;

// const MultiCity = ({ flightProps }) => {
//   if (flightProps.length === 0) {
//     return <div>No flights available</div>;
//   }

//   console.log(flightProps,"propes")

//   return (
//     <div className="flex flex-row h-screen">
//       <SideBar flights={flightProps}/>
//       <div>
//         <Tabs defaultActiveKey="0">
//           {flightProps.map((routes, index) => {
//             const startCode = routes[0].sI[0].da.city;
//             const endCode = routes[routes.length - 1].sI[0].aa.city;
//             return (
//               <>
//                 {" "}
//                 <TabPane
//                   tab={
//                     <span>
//                       {startCode} <ArrowRightOutlined className="mx-2" />{" "}
//                       {endCode}
//                     </span>
//                   }
//                   key={index}
//                 >
//                   {routes.length === 0 ? (
//                     <div>No flights available for this route</div>
//                   ) : (
//                     routes.map((flights, flightIndex) => (
//                       <FlightDetailsCard
//                         logo={flightLogo}
//                         key={flightIndex}
//                         flightDetails={flights.sI}
//                       />
//                     ))
//                   )}
//                 </TabPane>
//               </>
//             );
//           })}
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default MultiCity;

// import React, { useState, useEffect } from "react";
// import { Tabs } from "antd";
// import FlightDetailsCard from "../../Cards/FlightDetailsCard";
// import { ArrowRightOutlined } from "@ant-design/icons";
// import flightLogo from "../../../assets/home/logo/image 40.png";
// import SideBar from "./SideBar";

// const { TabPane } = Tabs;

// const MultiCity = ({ flightProps }) => {
//   const [activeTabIndex, setActiveTabIndex] = useState(0);
//   const [filters, setFilters] = useState(
//     flightProps.map((flights) => ({
//       maxPrice: Math.max(...flights.map(flight => flight.totalPriceList[0].fd.ADULT.fC.TF)),
//       stops: [],
//       departureTime: [],
//       arrivalTime: [],
//       airlines: []
//     }))
//   );
//   const [filteredFlights, setFilteredFlights] = useState(flightProps);

//   useEffect(() => {
//     const newFilteredFlights = flightProps.map((flights, index) =>
//       flights.filter(flight => {
//         const price = flight.totalPriceList[0].fd.ADULT.fC.TF;
//         const stops = flight.sI[0].stops.toString();
//         const departureTime = new Date(flight.sI[0].dt).getHours();
//         const arrivalTime = new Date(flight.sI[0].at).getHours();
//         const airline = flight.sI[0].fD.aI.name;

//         const departureTimeRange =
//           departureTime >= 0 && departureTime < 6 ? "00-06" :
//           departureTime >= 6 && departureTime < 12 ? "06-12" :
//           departureTime >= 12 && departureTime < 18 ? "12-18" : "18-00";

//         const arrivalTimeRange =
//           arrivalTime >= 0 && arrivalTime < 6 ? "00-06" :
//           arrivalTime >= 6 && arrivalTime < 12 ? "06-12" :
//           arrivalTime >= 12 && arrivalTime < 18 ? "12-18" : "18-00";

//         return (
//           price <= filters[index].maxPrice &&
//           (filters[index].stops.length === 0 || filters[index].stops.includes(stops)) &&
//           (filters[index].departureTime.length === 0 || filters[index].departureTime.includes(departureTimeRange)) &&
//           (filters[index].arrivalTime.length === 0 || filters[index].arrivalTime.includes(arrivalTimeRange)) &&
//           (filters[index].airlines.length === 0 || filters[index].airlines.includes(airline))
//         );
//       })
//     );
//     setFilteredFlights(newFilteredFlights);
//   }, [filters, flightProps]);

//   if (flightProps.length === 0) {
//     return <div>No flights available</div>;
//   }

//   const handleTabChange = (activeKey) => {
//     setActiveTabIndex(Number(activeKey));
//   };

//   return (
//     <div className="flex md:flex-row md:h-screen ">
//       <SideBar
//         flights={flightProps}
//         filters={filters}
//         setFilters={setFilters}
//         activeTabIndex={activeTabIndex}
//       />
//       <div className="flex-grow ">
//         <Tabs defaultActiveKey="0" onChange={handleTabChange}>
//           {flightProps.map((flights, index) => {
//             const startCode = flights.length > 0 ? flights[0].sI[0].da.city : "Unknown";
//             const endCode = flights.length > 0 ? flights[0].sI[0].aa.city : "Unknown";

//             return (
//               <TabPane
//                 tab={
//                   <span>
//                     {startCode} <ArrowRightOutlined className="mx-2" /> {endCode}
//                   </span>
//                 }
//                 key={index}
//               >
//                 <div className="h-[700px] overflow-y-auto no-scroll">
//                   {filteredFlights[index].length === 0 ? (
//                     <div>No flights available for this route</div>
//                   ) : (
//                     filteredFlights[index].map((flight, flightIndex) => (
//                       <FlightDetailsCard
//                         logo={flightLogo}
//                         key={flightIndex}
//                         flightDetails={flight}
//                       />
//                     ))
//                   )}
//                 </div>
//               </TabPane>
//             );
//           })}
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default MultiCity;

import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import FlightDetailsCard from "../Cards/FlightDetailsCard";
import { ArrowRightOutlined } from "@ant-design/icons";
import flightLogo from "../../../assets/home/logo/image 40.png";
import SideBar from "./SideBar";
import BookingCard from "./BookingCards";

const { TabPane } = Tabs;

const MultiCity = ({ flightProps }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [filters, setFilters] = useState(
    flightProps.map((flights) => ({
      maxPrice: Math.max(
        ...flights.map((flight) => flight.totalPriceList[0].fd.ADULT.fC.TF)
      ),
      stops: [],
      departureTime: [],
      arrivalTime: [],
      airlines: [],
    }))
  );
  const [filteredFlights, setFilteredFlights] = useState(flightProps);
  const [selectedFlights, setSelectedFlights] = useState(
    flightProps.map(() => ({ flightIndex: null, priceIndex: null }))
  );

  useEffect(() => {
    const newFilteredFlights = flightProps.map((flights, index) =>
      flights.filter((flight) => {
        const price = flight.totalPriceList[0].fd.ADULT.fC.TF;
        const stops = flight.sI[0].stops.toString();
        const departureTime = new Date(flight.sI[0].dt).getHours();
        const arrivalTime = new Date(flight.sI[0].at).getHours();
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
            filters[index].stops.includes(stops)) &&
          (filters[index].departureTime.length === 0 ||
            filters[index].departureTime.includes(departureTimeRange)) &&
          (filters[index].arrivalTime.length === 0 ||
            filters[index].arrivalTime.includes(arrivalTimeRange)) &&
          (filters[index].airlines.length === 0 ||
            filters[index].airlines.includes(airline))
        );
      })
    );
    setFilteredFlights(newFilteredFlights);
  }, [filters, flightProps]);

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
        return (
          total + flight.totalPriceList[selected.priceIndex].fd.ADULT.fC.TF
        );
      }
      return total;
    }, 0);
  };

  const handleBooking = () => {
    const bookingData = selectedFlights
      .map((selected, index) => {
        if (selected.flightIndex !== null && selected.priceIndex !== null) {
          const flight = filteredFlights[index][selected.flightIndex];
          return {
            priceId: flight.totalPriceList[selected.priceIndex].id,
            flightDetails: flight.sI,
          };
        }
        return null;
      })
      .filter((booking) => booking !== null);

    console.log("Booking:", bookingData);
    // Here you would typically send this data to your booking API
  };

  if (flightProps.length === 0) {
    return <div>No flights available</div>;
  }

  return (
    <div className="flex md:flex-row md:h-screen relative">
      <SideBar
        flights={flightProps}
        filters={filters}
        setFilters={setFilters}
        activeTabIndex={activeTabIndex}
      />
      <div className="flex-grow pb-20">
        <Tabs defaultActiveKey="0" onChange={handleTabChange}>
          {flightProps.map((flights, tabIndex) => {
            const startCode =
              flights.length > 0 ? flights[0].sI[0].da.city : "Unknown";
            const endCode =
              flights.length > 0 ? flights[0].sI[0].aa.city : "Unknown";
            return (
              <TabPane
                tab={
                  <span>
                    {startCode} <ArrowRightOutlined className="mx-2" />{" "}
                    {endCode}
                  </span>
                }
                key={tabIndex}
              >
                <div className="h-[calc(100vh-180px)] overflow-y-auto no-scroll">
                  {filteredFlights[tabIndex].length === 0 ? (
                    <div>No flights available for this route</div>
                  ) : (
                    filteredFlights[tabIndex].map((flight, flightIndex) => (
                      <FlightDetailsCard
                        key={flightIndex}
                        logo={flightLogo}
                        flightDetails={flight}
                        isSelected={
                          selectedFlights[tabIndex].flightIndex === flightIndex
                        }
                        selectedPriceIndex={
                          selectedFlights[tabIndex].flightIndex === flightIndex
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
                      />
                    ))
                  )}
                </div>
              </TabPane>
            );
          })}
        </Tabs>
      </div>
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
        totalPrice={getTotalPrice()}
        onBook={handleBooking}
      />
    </div>
  );
};

export default MultiCity;
