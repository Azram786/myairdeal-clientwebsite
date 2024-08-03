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



// import React, { useState, useEffect } from "react";
// import { Tabs } from "antd";
// import FlightDetailsCard from "../Cards/FlightDetailsCard";
// import { ArrowRightOutlined } from "@ant-design/icons";
// import flightLogo from "../../../assets/home/logo/image 40.png";
// import SideBar from "./SideBar";
// import BookingCard from "./BookingCards";
// import { useNavigate } from 'react-router-dom';

// const { TabPane } = Tabs;

// const MultiCity = ({ flightProps,passenger }) => {
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
//   const [selectedFlights, setSelectedFlights] = useState(
//     flightProps.map(() => ({ flightIndex: null, priceIndex: null }))
//   );

//   const navigate=useNavigate()

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
//     setSelectedFlights(flightProps.map(() => ({ flightIndex: null, priceIndex: null })));

//     setFilteredFlights(newFilteredFlights);
//   }, [filters, flightProps]);

//   const handleTabChange = (activeKey) => {
//     setActiveTabIndex(Number(activeKey));
//   };

//   const handleFlightSelection = (tabIndex, flightIndex, priceIndex) => {
//     setSelectedFlights(prev => {
//       const newSelected = [...prev];
//       newSelected[tabIndex] = { flightIndex, priceIndex };
//       return newSelected;
//     });
//   };

//   const getTotalPrice = () => {
//     return selectedFlights.reduce((total, selected, index) => {
//       if (selected.flightIndex !== null && selected.priceIndex !== null) {
//         const flight = filteredFlights[index][selected.flightIndex];
//         return total + flight.totalPriceList[selected.priceIndex].fd.ADULT.fC.TF;
//       }
//       return total;
//     }, 0);
//   };

//   const handleBooking = () => {
//     const allFlightsSelected = selectedFlights.every(selected => 
//       selected.flightIndex !== null && selected.priceIndex !== null
//     );
  
//     if (!allFlightsSelected) {
//       alert("Please select all connection flights before booking.");
//       return;
//     }
  
//     // If all flights are selected, proceed with booking
//     const bookingData = selectedFlights.map((selected, index) => {
//       const flight = filteredFlights[index][selected.flightIndex];
//       return {
//         priceId: flight.totalPriceList[selected.priceIndex].id,
//         flightDetails: flight.sI
//       };
//     });
  
//     console.log("Booking:", bookingData);
//     navigate("/book-flight", { state: { bookings:bookingData } });
    
//   };

//   if (flightProps.length === 0) {
//     return <div>No flights available</div>;
//   }

//   return (
//     <div className="flex flex-col md:flex-row mb-3 relative">
//       <SideBar
//         flights={flightProps}
//         filters={filters}
//         setFilters={setFilters}
//         activeTabIndex={activeTabIndex}
//         passenger={passenger}
//       />
//       <div className="flex-grow pb-20">
//         <Tabs defaultActiveKey="0" onChange={handleTabChange}>
//           {flightProps.map((flights, tabIndex) => {
//             const startCode = flights.length > 0 ? flights[0].sI[0].da.city : "Unknown";
//             const endCode = flights.length > 0 ? flights[0].sI[0].aa.city : "Unknown";
//             return (
//               <TabPane
//                 tab={
//                   <span>
//                     {startCode} <ArrowRightOutlined className="mx-2" /> {endCode}
//                   </span>
//                 }
//                 key={tabIndex}
//               >
//                 <div className="h-[700px] overflow-y-auto no-scroll">
//                   {filteredFlights[tabIndex].length === 0 ? (
//                     <div>No flights available for this route</div>
//                   ) : (
//                     filteredFlights[tabIndex].map((flight, flightIndex) => (
//                       <FlightDetailsCard
//                         key={flightIndex}
//                         logo={flightLogo}
//                         flightDetails={flight}
                        
//                         isSelected={selectedFlights[tabIndex].flightIndex === flightIndex}
//                         selectedPriceIndex={selectedFlights[tabIndex].flightIndex === flightIndex ? selectedFlights[tabIndex].priceIndex : 0}
//                         onSelect={(priceIndex) => handleFlightSelection(tabIndex, flightIndex, priceIndex)}
//                       />
//                     ))
//                   )}
//                 </div>
//               </TabPane>
//             );
//           })}
//         </Tabs>
//       </div>
      
//       <BookingCard
//   selectedFlights={selectedFlights.map((selected, index) => 
//     selected.flightIndex !== null ? {
//       ...filteredFlights[index][selected.flightIndex],
//       selectedPriceIndex: selected.priceIndex
//     } : null
//   ).filter(flight => flight !== null)}
//   totalPrice={getTotalPrice()}
//   onBook={handleBooking}
// />
//     </div>
//   );
// };

// export default MultiCity;


// import React, { useState, useEffect } from "react";
// import { Tabs } from "antd";
// import FlightDetailsCard from "../Cards/FlightDetailsCard";
// import { ArrowRightOutlined } from "@ant-design/icons";
// import flightLogo from "../../../assets/home/logo/image 40.png";
// import SideBar from "./SideBar";
// import BookingCard from "./BookingCards";
// import { useNavigate } from 'react-router-dom';

// const { TabPane } = Tabs;

// const MultiCity = ({ flightProps, passenger }) => {
//   const [activeTabIndex, setActiveTabIndex] = useState(0);
//   const [filters, setFilters] = useState(
//     flightProps.map(() => ({
//       maxPrice: 100000,
//       stops: [],
//       departureTime: [],
//       arrivalTime: [],
//       airlines: []
//     }))
//   );

//   console.log({flightProps})
//   const [filteredFlights, setFilteredFlights] = useState(flightProps);
//   const [selectedFlights, setSelectedFlights] = useState(
//     flightProps.map(() => ({ flightIndex: null, priceIndex: null }))
//   );

//   const navigate = useNavigate();

//   const calculateTotalPrice = (flight) => {
//     let total = 0;
//     const priceList = flight.totalPriceList[0].fd;
//     for (const passengerType in passenger) {
//       if (priceList[passengerType]) {
//         total += priceList[passengerType].fC.TF * passenger[passengerType];
//       }
//     }
//     return total;
//   };

//   useEffect(() => {
//     const newFilteredFlights = flightProps.map((flights, index) =>
//       flights.filter(flight => {
//         const price = calculateTotalPrice(flight);
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
  
//     // Update selectedFlights only for the flights that are no longer available
//     setSelectedFlights(prev => prev.map((selected, index) => {
//       if (selected.flightIndex !== null) {
//         const flightStillAvailable = newFilteredFlights[index].some(
//           (flight, idx) => idx === selected.flightIndex
//         );
//         return flightStillAvailable ? selected : { flightIndex: null, priceIndex: null };
//       }
//       return selected;
//     }));
  
//   }, [filters, flightProps, passenger]);
//   const handleTabChange = (activeKey) => {
//     setActiveTabIndex(Number(activeKey));
//   };

//   const handleFlightSelection = (tabIndex, flightIndex, priceIndex) => {
//     setSelectedFlights(prev => {
//       const newSelected = [...prev];
//       newSelected[tabIndex] = { flightIndex, priceIndex };
//       return newSelected;
//     });
//   };

//   const getTotalPrice = () => {
//     return selectedFlights.reduce((total, selected, index) => {
//       if (selected.flightIndex !== null && selected.priceIndex !== null) {
//         const flight = filteredFlights[index][selected.flightIndex];
//         return total + calculateTotalPrice(flight);
//       }
//       return total;
//     }, 0);
//   };

//   const handleBooking = () => {
//     const allFlightsSelected = selectedFlights.every(selected => 
//       selected.flightIndex !== null && selected.priceIndex !== null
//     );
  
//     if (!allFlightsSelected) {
//       alert("Please select all connection flights before booking.");
//       return;
//     }
  
//     const bookingData = selectedFlights.map((selected, index) => {
//       const flight = filteredFlights[index][selected.flightIndex];
//       return {
//         priceId: flight.totalPriceList[selected.priceIndex].id,
//         flightDetails: flight.sI
//       };
//     });
  
//     console.log("Booking:", bookingData);
//     navigate("/book-flight", { state: { bookings: bookingData } });
//   };

//   if (flightProps.length === 0) {
//     return <div>No flights available</div>;
//   }

//   console.log(selectedFlights,"fjoe-----------")

//   return (
//     <div className="flex flex-col md:flex-row mb-3 relative">
//       <SideBar
//         flights={flightProps}
//         filters={filters}
//         setFilters={setFilters}
//         activeTabIndex={activeTabIndex}
//         passenger={passenger}
//       />
//       <div className="flex-grow pb-20">
//         <Tabs defaultActiveKey="0" onChange={handleTabChange}>
//           {flightProps.map((flights, tabIndex) => {
//             const startCode = flights.length > 0 ? flights[0].sI[0].da.city : "Unknown";
//             const endCode = flights.length > 0 ? flights[0].sI[0].aa.city : "Unknown";
//             return (
//               <TabPane
//                 tab={
//                   <span>
//                     {startCode} <ArrowRightOutlined className="mx-2" /> {endCode}
//                   </span>
//                 }
//                 key={tabIndex}
//               >
//                 <div className="h-[700px] overflow-y-auto no-scroll">
//                   {filteredFlights[tabIndex].length === 0 ? (
//                     <div>No flights available for this route</div>
//                   ) : (
//                     filteredFlights[tabIndex].map((flight, flightIndex) => (
//                       <FlightDetailsCard
//                         key={flightIndex}
//                         logo={flightLogo}
//                         flightDetails={flight}
//                         passenger={passenger}
//                         isSelected={selectedFlights[tabIndex].flightIndex === flightIndex}
//                         selectedPriceIndex={selectedFlights[tabIndex].flightIndex === flightIndex ? selectedFlights[tabIndex].priceIndex : 0}
//                         onSelect={(priceIndex) => handleFlightSelection(tabIndex, flightIndex, priceIndex)}
//                         totalPrice={calculateTotalPrice(flight)}
//                       />
//                     ))
//                   )}
//                 </div>
//               </TabPane>
//             );
//           })}
//         </Tabs>
//       </div>
      
//       <BookingCard
//         selectedFlights={selectedFlights.map((selected, index) => 
//           selected.flightIndex !== null ? {
//             ...filteredFlights[index][selected.flightIndex],
//             selectedPriceIndex: selected.priceIndex
//           } : null
//         ).filter(flight => flight !== null)}
//         onBook={handleBooking}
//         passenger={passenger}
//         selectedPriceIndex={selectedFlights}
//       />
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
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import ReactToast from "../../util/ReactToast";

const { TabPane } = Tabs;

const MultiCity = ({ flightProps, passenger,query }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const token = useSelector((state) => state.auth.token);

  const [filters, setFilters] = useState(
    flightProps.map(() => ({
      maxPrice: 100000,
      stops: [],
      departureTime: [],
      arrivalTime: [],
      airlines: []
    }))
  );
  const [filteredFlights, setFilteredFlights] = useState(flightProps);
  const [selectedFlights, setSelectedFlights] = useState(
    flightProps.map(() => ({ flightIndex: null, priceIndex: null }))
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

  useEffect(() => {
    const newFilteredFlights = flightProps.map((flights, index) =>
      flights.filter(flight => {
        const price = calculateTotalPrice(flight);
        const stops = getStopsCount(flight);
        const departureTime = new Date(flight.sI[0].dt).getHours();
        const arrivalTime = new Date(flight.sI[flight.sI.length - 1].at).getHours();
        const airline = flight.sI[0].fD.aI.name;
        const departureTimeRange =
          departureTime >= 0 && departureTime < 6 ? "00-06" :
          departureTime >= 6 && departureTime < 12 ? "06-12" :
          departureTime >= 12 && departureTime < 18 ? "12-18" : "18-00";
        const arrivalTimeRange =
          arrivalTime >= 0 && arrivalTime < 6 ? "00-06" :
          arrivalTime >= 6 && arrivalTime < 12 ? "06-12" :
          arrivalTime >= 12 && arrivalTime < 18 ? "12-18" : "18-00";
        return (
          price <= filters[index].maxPrice &&
          (filters[index].stops.length === 0 || filters[index].stops.includes(stops.toString())) &&
          (filters[index].departureTime.length === 0 || filters[index].departureTime.includes(departureTimeRange)) &&
          (filters[index].arrivalTime.length === 0 || filters[index].arrivalTime.includes(arrivalTimeRange)) &&
          (filters[index].airlines.length === 0 || filters[index].airlines.includes(airline))
        );
      })
    );
  
    setFilteredFlights(newFilteredFlights);
  
    setSelectedFlights(prev => prev.map((selected, index) => {
      if (selected.flightIndex !== null) {
        const flightStillAvailable = newFilteredFlights[index].some(
          (flight, idx) => idx === selected.flightIndex
        );
        return flightStillAvailable ? selected : { flightIndex: null, priceIndex: null };
      }
      return selected;
    }));
  
  }, [filters, flightProps, passenger]);

  const handleTabChange = (activeKey) => {
    setActiveTabIndex(Number(activeKey));
  };

  const handleFlightSelection = (tabIndex, flightIndex, priceIndex) => {
    setSelectedFlights(prev => {
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
    const allFlightsSelected = selectedFlights.every(selected => 
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
        flightDetails: flight.sI
      };
    });
  
    console.log("Booking:", bookingData);
    if(!token){
      ReactToast('Please login first')
      navigate("/sign-in",{state:{booking:query}});

    }
    navigate("/book-flight", { state: { bookings: bookingData } });
  };

  if (flightProps.length === 0) {
    return <div>No flights available</div>;
  }

  return (
    <div className="flex flex-col md:flex-row mb-3 relative">
      <SideBar
        flights={flightProps}
        filters={filters}
        setFilters={setFilters}
        activeTabIndex={activeTabIndex}
        passenger={passenger}
      />
      <div className="flex-grow pb-20">
        <Tabs defaultActiveKey="0" onChange={handleTabChange}>
          {flightProps.map((flights, tabIndex) => {
            const startCode = flights.length > 0 ? flights[0].sI[0].da.city : "Unknown";
            const endCode = flights.length > 0 ? flights[0].sI[flights[0].sI.length - 1].aa.city : "Unknown";
            return (
              <TabPane
                tab={
                  <span>
                    {startCode} <ArrowRightOutlined className="mx-2" /> {endCode}
                  </span>
                }
                key={tabIndex}
              >
                <div className="h-[700px] overflow-y-auto no-scroll">
                  {filteredFlights[tabIndex].length === 0 ? (
                    <div>No flights available for this route</div>
                  ) : (
                    filteredFlights[tabIndex].map((flight, flightIndex) => (
                      <FlightDetailsCard
                        key={flightIndex}
                        logo={flightLogo}
                        flightDetails={flight}
                        passenger={passenger}
                        isSelected={selectedFlights[tabIndex].flightIndex === flightIndex}
                        selectedPriceIndex={selectedFlights[tabIndex].flightIndex === flightIndex ? selectedFlights[tabIndex].priceIndex : 0}
                        onSelect={(priceIndex) => handleFlightSelection(tabIndex, flightIndex, priceIndex)}
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
      
      {console.log(selectedFlights[0].priceIndex,"heoo")}
      {(selectedFlights[0].priceIndex!=null ||selectedFlights[1].priceIndex!=null) && ( <BookingCard
        selectedFlights={selectedFlights.map((selected, index) => 
          selected.flightIndex !== null ? {
            ...filteredFlights[index][selected.flightIndex],
            selectedPriceIndex: selected.priceIndex
          } : null
        ).filter(flight => flight !== null)}
        onBook={handleBooking}
        passenger={passenger}
        selectedPriceIndex={selectedFlights}
      />)}
    </div>
  );
};

export default MultiCity;