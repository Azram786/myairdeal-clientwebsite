//// WORK

// import React, { useState, useEffect } from 'react';
// import FlightDetailsCard from '../../Cards/FlightDetailsCard';
// import RoundSideBar from './Roundsidebar';

// const RoundTrip = ({ onwardProps = [], returnProps = [] }) => {
//   const [filteredOnward, setFilteredOnward] = useState([]);
//   const [filteredReturn, setFilteredReturn] = useState([]);
//   const [activeDirection, setActiveDirection] = useState('onward');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   console.log(onwardProps,"ORN",returnProps,"R")

//   const [filters, setFilters] = useState({
//     onward: {
//       maxPrice: Math.max(...onwardProps.flatMap(flight => flight.totalPriceList.map(price => price.fd.ADULT.fC.TF))),
//       stops: [],
//       departureTime: [],
//       arrivalTime: [],
//       airlines: [],
//     },
//     return: {
//       maxPrice: Math.max(...returnProps.flatMap(flight => flight.totalPriceList.map(price => price.fd.ADULT.fC.TF))),
//       stops: [],
//       departureTime: [],
//       arrivalTime: [],
//       airlines: [],
//     },
//     specialReturn: false
//   });

//   const applyFilters = (flights, direction) => {
//     return flights.filter(flight => {
//       if (!flight.sI || flight.sI.length === 0) {
//         console.error('Invalid flight data:', flight);
//         return false;
//       }

//       const directionFilters = filters[direction];
//       const stops = flight.sI.length - 1;
//       const airline = flight.sI[0]?.fD?.aI?.name || '';
//       const departureTime = new Date(flight.sI[0].dt).getHours();
//       const arrivalTime = new Date(flight.sI[flight.sI.length - 1].at).getHours();
//       const price = flight.totalPriceList[0].fd.ADULT.fC.TF;

//       const isInTimeRange = (time, ranges) => {
//         if (ranges.length === 0) return true;
//         return ranges.some(range => {
//           const [start, end] = range.split('-').map(Number);
//           return time >= start && time < end;
//         });
//       };

//       return (
//         price <= directionFilters.maxPrice &&
//         (directionFilters.stops.length === 0 || directionFilters.stops.includes(stops.toString())) &&
//         (directionFilters.airlines.length === 0 || directionFilters.airlines.includes(airline)) &&
//         isInTimeRange(departureTime, directionFilters.departureTime) &&
//         isInTimeRange(arrivalTime, directionFilters.arrivalTime)
//       );
//     });
//   };

//   const applySpecialReturnFilter = (onwardFlights, returnFlights) => {
//     const specialReturnOnward = onwardFlights.filter(flight =>
//       flight.totalPriceList.some(price => price.fareIdentifier === 'SPECIAL_RETURN')
//     );

//     const specialReturnReturn = returnFlights.filter(flight =>
//       flight.totalPriceList.some(price => price.fareIdentifier === 'SPECIAL_RETURN')
//     );

//     const matchedPairs = [];

//     specialReturnOnward.forEach(onwardFlight => {
//       const onwardSri = onwardFlight.totalPriceList.find(price => price.fareIdentifier === 'SPECIAL_RETURN')?.sri;
//       const onwardMsri = onwardFlight.totalPriceList.find(price => price.fareIdentifier === 'SPECIAL_RETURN')?.msri;

//       specialReturnReturn.forEach(returnFlight => {
//         const returnSri = returnFlight.totalPriceList.find(price => price.fareIdentifier === 'SPECIAL_RETURN')?.sri;
//         const returnMsri = returnFlight.totalPriceList.find(price => price.fareIdentifier === 'SPECIAL_RETURN')?.msri;

//         if (
//           (!onwardSri && !onwardMsri && !returnSri && !returnMsri) ||
//           (onwardMsri && onwardMsri.includes(returnSri)) ||
//           (returnMsri && returnMsri.includes(onwardSri))
//         ) {
//           matchedPairs.push({ onward: onwardFlight, return: returnFlight });
//         }
//       });
//     });

//     return matchedPairs;
//   };

//   useEffect(() => {
//     const fetchAndFilterFlights = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         let filteredOnwardFlights = applyFilters(onwardProps, 'onward');
//         let filteredReturnFlights = applyFilters(returnProps, 'return');

//         if (filters.specialReturn) {
//           const specialReturnPairs = applySpecialReturnFilter(filteredOnwardFlights, filteredReturnFlights);
//           filteredOnwardFlights = specialReturnPairs.map(pair => pair.onward);
//           filteredReturnFlights = specialReturnPairs.map(pair => pair.return);
//         }

//         console.log(filteredOnwardFlights, "filtered onward flights", filteredReturnFlights, "filtered return flights");

//         setFilteredOnward(filteredOnwardFlights);
//         setFilteredReturn(filteredReturnFlights);
//       } catch (err) {
//         console.error('Error filtering flights:', err);
//         setError('An error occurred while loading flight information. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAndFilterFlights();
//   }, [filters, onwardProps, returnProps]);

//   const renderFlightSection = (flights) => {
//     if (isLoading) {
//       return <div>Loading flights...</div>;
//     }

//     if (error) {
//       return <div className="text-red-500">{error}</div>;
//     }

//     if (!Array.isArray(flights) || flights.length === 0) {
//       return <div>No flights available for the selected route.</div>;
//     }

//     return (
//       <div>
//         {flights.map((flight, index) => (
//           <FlightDetailsCard key={index} flightDetails={flight} />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="flex">
//       <RoundSideBar
//         filters={filters}
//         setFilters={setFilters}
//         onwardData={onwardProps}
//         returnData={returnProps}
//         activeDirection={activeDirection}
//         setActiveDirection={setActiveDirection}
//       />
//       <div className="flex flex-col p-4 w-3/4">
//         {/* <h1 className="text-2xl font-bold mb-4">
//           {filters.specialReturn ? "Special Return Flight Combinations" : "Flights"}
//         </h1> */}
//         <div className="flex">
//           <div className="w-1/2 pr-2">
//             <h2 className="text-xl font-semibold mb-2">Onward Flights</h2>
//             {renderFlightSection(filteredOnward)}
//           </div>
//           <div className="w-1/2 pl-2">
//             <h2 className="text-xl font-semibold mb-2">Return Flights</h2>
//             {renderFlightSection(filteredReturn)}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RoundTrip;

// import React, { useState, useEffect } from 'react';
// import FlightDetailsCard from '../../Cards/FlightDetailsCard';
// import RoundSideBar from './Roundsidebar';

// const RoundTrip = ({ onwardProps = [], returnProps = [] }) => {
//   const [filteredOnward, setFilteredOnward] = useState([]);
//   const [filteredReturn, setFilteredReturn] = useState([]);
//   const [activeDirection, setActiveDirection] = useState('onward');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [filters, setFilters] = useState({
//     onward: {
//       maxPrice: Math.max(...onwardProps.flatMap(flight => flight.totalPriceList.map(price => price.fd.ADULT.fC.TF))),
//       stops: [],
//       departureTime: [],
//       arrivalTime: [],
//       airlines: [],
//     },
//     return: {
//       maxPrice: Math.max(...returnProps.flatMap(flight => flight.totalPriceList.map(price => price.fd.ADULT.fC.TF))),
//       stops: [],
//       departureTime: [],
//       arrivalTime: [],
//       airlines: [],
//     },
//     specialReturn: false
//   });

//   const applyFilters = (flights, direction) => {
//     return flights.filter(flight => {
//       if (!flight.sI || flight.sI.length === 0) {
//         console.error('Invalid flight data:', flight);
//         return false;
//       }

//       const directionFilters = filters[direction];
//       const stops = flight.sI.length - 1;
//       const airline = flight.sI[0]?.fD?.aI?.name || '';
//       const departureTime = new Date(flight.sI[0].dt).getHours();
//       const arrivalTime = new Date(flight.sI[flight.sI.length - 1].at).getHours();
//       const price = flight.totalPriceList[0].fd.ADULT.fC.TF;

//       const isInTimeRange = (time, ranges) => {
//         if (ranges.length === 0) return true;
//         return ranges.some(range => {
//           const [start, end] = range.split('-').map(Number);
//           return time >= start && time < end;
//         });
//       };

//       return (
//         price <= directionFilters.maxPrice &&
//         (directionFilters.stops.length === 0 || directionFilters.stops.includes(stops.toString())) &&
//         (directionFilters.airlines.length === 0 || directionFilters.airlines.includes(airline)) &&
//         isInTimeRange(departureTime, directionFilters.departureTime) &&
//         isInTimeRange(arrivalTime, directionFilters.arrivalTime)
//       );
//     });
//   };

//   const applySpecialReturnFilter = (onwardFlights, returnFlights) => {
//     const specialReturnOnward = onwardFlights.filter(flight =>
//       flight.totalPriceList.some(price => price.fareIdentifier === 'SPECIAL_RETURN')
//     );

//     const specialReturnReturn = returnFlights.filter(flight =>
//       flight.totalPriceList.some(price => price.fareIdentifier === 'SPECIAL_RETURN')
//     );

//     const matchedPairs = [];

//     specialReturnOnward.forEach(onwardFlight => {
//       const onwardSri = onwardFlight.totalPriceList.find(price => price.fareIdentifier === 'SPECIAL_RETURN')?.sri;
//       const onwardMsri = onwardFlight.totalPriceList.find(price => price.fareIdentifier === 'SPECIAL_RETURN')?.msri;

//       specialReturnReturn.forEach(returnFlight => {
//         const returnSri = returnFlight.totalPriceList.find(price => price.fareIdentifier === 'SPECIAL_RETURN')?.sri;
//         const returnMsri = returnFlight.totalPriceList.find(price => price.fareIdentifier === 'SPECIAL_RETURN')?.msri;

//         if (
//           (!onwardSri && !onwardMsri && !returnSri && !returnMsri) ||
//           (onwardMsri && onwardMsri.includes(returnSri)) ||
//           (returnMsri && returnMsri.includes(onwardSri))
//         ) {
//           matchedPairs.push({ onward: onwardFlight, return: returnFlight });
//         }
//       });
//     });

//     return matchedPairs;
//   };

//   useEffect(() => {
//     const fetchAndFilterFlights = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         let filteredOnwardFlights = applyFilters(onwardProps, 'onward');
//         let filteredReturnFlights = applyFilters(returnProps, 'return');

//         if (filters.specialReturn) {
//           const specialReturnPairs = applySpecialReturnFilter(filteredOnwardFlights, filteredReturnFlights);
//           filteredOnwardFlights = specialReturnPairs.map(pair => pair.onward);
//           filteredReturnFlights = specialReturnPairs.map(pair => pair.return);
//         }

//         console.log(filteredOnwardFlights, "filtered onward flights", filteredReturnFlights, "filtered return flights");

//         setFilteredOnward(filteredOnwardFlights);
//         setFilteredReturn(filteredReturnFlights);
//       } catch (err) {
//         console.error('Error filtering flights:', err);
//         setError('An error occurred while loading flight information. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAndFilterFlights();
//   }, [filters, onwardProps, returnProps]);

//   const renderFlightSection = (flights) => {
//     if (isLoading) {
//       return <div>Loading flights...</div>;
//     }

//     if (error) {
//       return <div className="text-red-500">{error}</div>;
//     }

//     if (!Array.isArray(flights) || flights.length === 0) {
//       return <div>No flights available for the selected route.</div>;
//     }

//     return (
//       <div>
//         {flights.map((flight, index) => (
//           <FlightDetailsCard key={index} flightDetails={flight} />
//         ))}
//       </div>
//     );
//   };

//   const getRoute = (flights) => {
//     if (flights.length > 0 && flights[0].sI.length > 0) {
//       const departureCity = flights[0].sI[0].da.city;
//       const arrivalCity = flights[0].sI[0].aa.city;
//       return `${departureCity} - ${arrivalCity}`;
//     }
//     return '';
//   };

//   return (
//     <div className="flex flex-col md:flex-row">
//       <RoundSideBar
//         filters={filters}
//         setFilters={setFilters}
//         onwardData={onwardProps}
//         returnData={returnProps}
//         activeDirection={activeDirection}
//         setActiveDirection={setActiveDirection}
//       />
//       <div className="flex flex-col md:p-4 md:w-3/4">
//       <div className='flex'>
//         <div className='w-1/2'> <h2 className="text-xl font-semibold mb-2">{getRoute(filteredOnward)}</h2></div>
//         <div className='w-1/2'> <h2 className="text-xl font-semibold mb-2">{getRoute(filteredReturn)}</h2></div>
//       </div>
//         <div className="flex h-[850px] overflow-y-auto no-scroll">
//           <div className="w-1/2 md:pr-2 ">

//             {renderFlightSection(filteredOnward)}
//           </div>
//           <div className="w-1/2 md:pl-2">

//             {renderFlightSection(filteredReturn)}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RoundTrip;

// import React, { useState, useEffect } from "react";
// import FlightDetailsCard from "../Cards/FlightDetailsCard";
// import RoundSideBar from "./Roundsidebar";
// import BookingCard from "./BookingCards";
// import ReactToast from "../../util/ReactToast";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import RoundTripCard from "../Cards/RoundTripFlightCard";

// const RoundTrip = ({ onwardProps = [], returnProps = [], passenger,query }) => {
//   const [filteredOnward, setFilteredOnward] = useState([]);
//   const [filteredReturn, setFilteredReturn] = useState([]);
//   const [activeDirection, setActiveDirection] = useState("onward");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOnwardFlight, setSelectedOnwardFlight] = useState(null);
//   const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);

//   const token = useSelector((state) => state.auth.token);

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

//   const [filters, setFilters] = useState({
//     onward: {
//       maxPrice: Math.max(...onwardProps.map(calculateTotalPrice)),
//       stops: [],
//       departureTime: [],
//       arrivalTime: [],
//       airlines: [],
//     },
//     return: {
//       maxPrice: Math.max(...returnProps.map(calculateTotalPrice)),
//       stops: [],
//       departureTime: [],
//       arrivalTime: [],
//       airlines: [],
//     },
//     specialReturn: false,
//   });

//   const navigate = useNavigate();

//   const applyFilters = (flights, direction) => {
//     return flights.filter((flight) => {
//       if (!flight.sI || flight.sI.length === 0) {
//         console.error("Invalid flight data:", flight);
//         return false;
//       }
  
//       const directionFilters = filters[direction];
//       const stops = flight.sI.length - 1;
//       const airline = flight.sI[0]?.fD?.aI?.name || "";
//       const departureTime = new Date(flight.sI[0].dt).getHours();
//       const arrivalTime = new Date(flight.sI[flight.sI.length - 1].at).getHours();
//       const price = calculateTotalPrice(flight);
  
//       const isInTimeRange = (time, ranges) => {
//         if (ranges.length === 0) return true;
//         return ranges.some((range) => {
//           const [start, end] = range.split("-").map(Number);
//           if (start < end) {
//             return time >= start && time < end;
//           } else {
//             // Handle the case for 18-00 (6 PM to midnight)
//             return time >= start || time < end;
//           }
//         });
//       };
  
//       return (
//         price <= directionFilters.maxPrice &&
//         (directionFilters.stops.length === 0 ||
//           directionFilters.stops.includes(stops.toString())) &&
//         (directionFilters.airlines.length === 0 ||
//           directionFilters.airlines.includes(airline)) &&
//         isInTimeRange(departureTime, directionFilters.departureTime) &&
//         isInTimeRange(arrivalTime, directionFilters.arrivalTime)
//       );
//     });
//   };
//   const applySpecialReturnFilter = (onwardFlights, returnFlights) => {
//     const specialReturnOnward = onwardFlights.filter((flight) =>
//       flight.totalPriceList.some(
//         (price) => price.fareIdentifier === "SPECIAL_RETURN"
//       )
//     );

//     const specialReturnReturn = returnFlights.filter((flight) =>
//       flight.totalPriceList.some(
//         (price) => price.fareIdentifier === "SPECIAL_RETURN"
//       )
//     );

//     const matchedPairs = [];

//     specialReturnOnward.forEach((onwardFlight) => {
//       const onwardSri = onwardFlight.totalPriceList.find(
//         (price) => price.fareIdentifier === "SPECIAL_RETURN"
//       )?.sri;
//       const onwardMsri = onwardFlight.totalPriceList.find(
//         (price) => price.fareIdentifier === "SPECIAL_RETURN"
//       )?.msri;

//       specialReturnReturn.forEach((returnFlight) => {
//         const returnSri = returnFlight.totalPriceList.find(
//           (price) => price.fareIdentifier === "SPECIAL_RETURN"
//         )?.sri;
//         const returnMsri = returnFlight.totalPriceList.find(
//           (price) => price.fareIdentifier === "SPECIAL_RETURN"
//         )?.msri;

//         if (
//           (!onwardSri && !onwardMsri && !returnSri && !returnMsri) ||
//           (onwardMsri && onwardMsri.includes(returnSri)) ||
//           (returnMsri && returnMsri.includes(onwardSri))
//         ) {
//           matchedPairs.push({ onward: onwardFlight, return: returnFlight });
//         }
//       });
//     });

//     return matchedPairs;
//   };

//   useEffect(() => {
//     const fetchAndFilterFlights = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         let filteredOnwardFlights = applyFilters(onwardProps, "onward");
//         let filteredReturnFlights = applyFilters(returnProps, "return");
  
//         if (filters.specialReturn) {
//           const specialReturnPairs = applySpecialReturnFilter(
//             filteredOnwardFlights,
//             filteredReturnFlights
//           );
//           filteredOnwardFlights = specialReturnPairs.map((pair) => pair.onward);
//           filteredReturnFlights = specialReturnPairs.map((pair) => pair.return);
//         }
  
//         console.log(
//           filteredOnwardFlights,
//           "filtered onward flights",
//           filteredReturnFlights,
//           "filtered return flights"
//         );
  
//         setFilteredOnward(filteredOnwardFlights);
//         setFilteredReturn(filteredReturnFlights);
//       } catch (err) {
//         console.error("Error filtering flights:", err);
//         setError(
//           "An error occurred while loading flight information. Please try again."
//         );
//       } finally {
//         setIsLoading(false);
//         setSelectedOnwardFlight(null);
//         setSelectedReturnFlight(null);
//       }
//     };
  
//     fetchAndFilterFlights();
//   }, [filters, onwardProps, returnProps]);

//   const handleSelectOnwardFlight = (flight, priceIndex) => {
//     setSelectedOnwardFlight({ ...flight, selectedPriceIndex: priceIndex });
//   };

//   const handleSelectReturnFlight = (flight, priceIndex) => {
//     setSelectedReturnFlight({ ...flight, selectedPriceIndex: priceIndex });
//   };

//   const renderFlightSection = (flights, direction) => {
//     if (isLoading) {
//       return <div>Loading flights...</div>;
//     }

//     if (error) {
//       return <div className="text-red-500">{error}</div>;
//     }

//     if (!Array.isArray(flights) || flights.length === 0) {
//       return <div>No flights available for the selected route.</div>;
//     }

//     return (
//       <div>
//         {flights.map((flight, index) => (
//           <RoundTripCard
//             key={index}
//             flightDetails={flight}
//             isSelected={
//               direction === "onward"
//                 ? selectedOnwardFlight?.sI === flight.sI
//                 : selectedReturnFlight?.sI === flight.sI
//             }
//             onSelect={(priceIndex) =>
//               direction === "onward"
//                 ? handleSelectOnwardFlight(flight, priceIndex)
//                 : handleSelectReturnFlight(flight, priceIndex)
//             }
//             passenger={passenger}
//           />
//         ))}
//       </div>
//     );
//   };

//   const getRoute = (flights) => {
//     if (flights.length > 0 && flights[0].sI && flights[0].sI.length > 0) {
//       const departureCity = flights[0].sI[0].da.city;
//       const arrivalCity = flights[0].sI[flights[0]?.sI?.length - 1].aa.city;
//       const departureTime = new Intl.DateTimeFormat('en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric'
//       }).format(new Date(flights[0].sI[0].dt)).split('/').join('-');
      
//       return (
//         <span className="flex flex-col">
//           <p>{departureCity} - {arrivalCity}</p>
//           <p className="text-xs">{departureTime}</p>
//         </span>
//       );
//     }
//     return "";
//   };

//   const calculateTotalBookingPrice = () => {
//     const onwardPrice = selectedOnwardFlight
//       ? calculateTotalPrice(selectedOnwardFlight)
//       : 0;
//     const returnPrice = selectedReturnFlight
//       ? calculateTotalPrice(selectedReturnFlight)
//       : 0;
//     return onwardPrice + returnPrice;
//   };

//   const handleBooking = () => {
//     if (!selectedOnwardFlight || !selectedReturnFlight) {
//       ReactToast("Please select both onward and return flight");
//       return;
//     }

//     const returnFlight =
//       selectedReturnFlight.totalPriceList[
//         selectedReturnFlight.selectedPriceIndex
//       ].id;
//     const onwardFlight =
//       selectedOnwardFlight.totalPriceList[
//         selectedOnwardFlight.selectedPriceIndex
//       ].id;
//     const data = [
//       {
//         returnFlightDetails: selectedReturnFlight.sI,
//         priceId: returnFlight,
//       },
//       {
//         onwardFlightDetails: selectedOnwardFlight.sI,
//         priceId: onwardFlight,
//       },
//     ];
//     console.log(data);

//     if(!token){
//       ReactToast('Please login first')
//       navigate("/sign-in");
//       return;
//     }

//     navigate("/book-flight", { state: { bookings: data } });
//   };

//   return (
//     <div className="flex flex-col md:flex-row mb-24">
//       <RoundSideBar
//         passenger={passenger}
//         filters={filters}
//         setFilters={setFilters}
//         onwardData={onwardProps}
//         returnData={returnProps}
//         activeDirection={activeDirection}
//         setActiveDirection={setActiveDirection}
//         calculateTotalPrice={calculateTotalPrice}
//       />
//       <div className="flex flex-col  md:w-3/4">
//         <div className="flex">
//           <div className="w-1/2">
//             <h2 className="text-sm text-center md:text-xl font-semibold mb-2">
//               {getRoute(filteredOnward)}
//             </h2>
//           </div>
//           <div className="w-1/2">
//             <h2 className="text-sm text-center md:text-xl font-semibold mb-2">
//               {getRoute(filteredReturn)}
//             </h2>
//           </div>
//         </div>
//         <div className="flex h-[850px] ">
//           <div className="w-1/2 overflow-y-auto no-scroll">
//             {renderFlightSection(filteredOnward, "onward")}
//           </div>
//           <div className="w-1/2  overflow-y-auto no-scroll">
//             {renderFlightSection(filteredReturn, "return")}
//           </div>
//         </div>
//       </div>

//       {console.log(selectedOnwardFlight, selectedReturnFlight, "selected flights")}
//       {(selectedOnwardFlight || selectedReturnFlight) && <BookingCard
//         selectedFlights={[selectedOnwardFlight, selectedReturnFlight].filter(
//           Boolean
//         )}
//         totalPrice={calculateTotalBookingPrice()}
//         onBook={() => handleBooking()}
//         passenger={passenger}
//       />}
//     </div>
//   );
// };

// export default RoundTrip;



// import React, { useState, useEffect } from "react";
// import RoundTripCard from "../Cards/RoundTripFlightCard";
// import RoundSideBar from "./Roundsidebar";
// import BookingCard from "./BookingCards";
// import ReactToast from "../../util/ReactToast";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const RoundTrip = ({ onwardProps = [], returnProps = [], passenger, query }) => {
//   const [filteredOnward, setFilteredOnward] = useState([]);
//   const [filteredReturn, setFilteredReturn] = useState([]);
//   const [activeDirection, setActiveDirection] = useState("onward");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOnwardFlight, setSelectedOnwardFlight] = useState(null);
//   const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
//   const [isSpecialReturn, setIsSpecialReturn] = useState(false);
//   const [specialReturnOnward, setSpecialReturnOnward] = useState([]);
//   const [specialReturnReturn, setSpecialReturnReturn] = useState([]);

//   const token = useSelector((state) => state.auth.token);
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

//   const [filters, setFilters] = useState({
//     onward: {
//       maxPrice: Math.max(...onwardProps.map(calculateTotalPrice)),
//       stops: [],
//       departureTime: [],
//       arrivalTime: [],
//       airlines: [],
//     },
//     return: {
//       maxPrice: Math.max(...returnProps.map(calculateTotalPrice)),
//       stops: [],
//       departureTime: [],
//       arrivalTime: [],
//       airlines: [],
//     },
//     specialReturn: false,
//   });
  

//   const applyFilters = (flights, direction) => {
//     return flights.filter((flight) => {
//       if (!flight.sI || flight.sI.length === 0) {
//         console.error("Invalid flight data:", flight);
//         return false;
//       }
  
//       const directionFilters = filters[direction];
//       const stops = flight.sI.length - 1;
//       const airline = flight.sI[0]?.fD?.aI?.name || "";
//       const departureTime = new Date(flight.sI[0].dt).getHours();
//       const arrivalTime = new Date(flight.sI[flight.sI.length - 1].at).getHours();
//       const price = calculateTotalPrice(flight);
  
//       const isInTimeRange = (time, ranges) => {
//         if (ranges.length === 0) return true;
//         return ranges.some((range) => {
//           const [start, end] = range.split("-").map(Number);
//           return (start < end) ? (time >= start && time < end) : (time >= start || time < end);
//         });
//       };
  
//       const hasSpecialReturn = flight.totalPriceList.some(price => price.fareIdentifier === "SPECIAL_RETURN");
  
//       return (
//         (!isSpecialReturn || hasSpecialReturn) &&
//         price <= directionFilters.maxPrice &&
//         (directionFilters.stops.length === 0 || directionFilters.stops.includes(stops.toString())) &&
//         (directionFilters.airlines.length === 0 || directionFilters.airlines.includes(airline)) &&
//         isInTimeRange(departureTime, directionFilters.departureTime) &&
//         isInTimeRange(arrivalTime, directionFilters.arrivalTime)
//       );
//     });
//   };

//   useEffect(() => {
//     const fetchAndFilterFlights = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         let filteredOnwardFlights = applyFilters(onwardProps, "onward");
//         let filteredReturnFlights = applyFilters(returnProps, "return");

//         setFilteredOnward(filteredOnwardFlights);
//         setFilteredReturn(filteredReturnFlights);
//       } catch (err) {
//         console.error("Error filtering flights:", err);
//         setError("An error occurred while loading flight information. Please try again.");
//       } finally {
//         setIsLoading(false);
//         setSelectedOnwardFlight(null);
//         setSelectedReturnFlight(null);
//       }
//     };

//     fetchAndFilterFlights();
//   }, [filters, onwardProps, returnProps, isSpecialReturn]);

//   // const findMatchingFlights = (flights, msri, sri) => {
//   //   return flights.filter((flight) =>
//   //     flight.totalPriceList.some(
//   //       (price) =>
//   //         price.fareIdentifier === "SPECIAL_RETURN" &&
//   //         (msri.includes(price.sri) || price.msri.includes(sri))
//   //     )
//   //   );
//   // };
//   const getRoute = (flights) => {
//     // console.log(flights[0].sI, "flights");
//     if (flights.length > 0 && flights[0].sI && flights[0].sI.length > 0) {
//       const departureCity = flights[0].sI[0].da.city;
//       const arrivalCity = flights[0].sI[flights[0].sI.length - 1].aa.city;
//       const departureTime = new Intl.DateTimeFormat('en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric'
//       }).format(new Date(flights[0].sI[0].dt)).split('/').join('-');
      
//       return (
//         <span className="flex flex-col">
//           <p>{departureCity} - {arrivalCity}</p>
//           <p className="text-xs">{departureTime}</p>
//         </span>
//       );
//     }
//     return "";
//   };

//   const applySpecialReturnFilter = (onwardFlights, returnFlights) => {
//     if (!filters.specialReturn) return { onwardFlights, returnFlights };

//     const specialReturnOnward = onwardFlights.filter((flight) =>
//       flight.totalPriceList.some((price) => price.fareIdentifier === "SPECIAL_RETURN")
//     );

//     const specialReturnReturn = returnFlights.filter((flight) =>
//       flight.totalPriceList.some((price) => price.fareIdentifier === "SPECIAL_RETURN")
//     );

//     return { onwardFlights: specialReturnOnward, returnFlights: specialReturnReturn };
//   };


//   const calculateTotalBookingPrice = () => {
//         const onwardPrice = selectedOnwardFlight
//           ? calculateTotalPrice(selectedOnwardFlight)
//           : 0;
//         const returnPrice = selectedReturnFlight
//           ? calculateTotalPrice(selectedReturnFlight)
//           : 0;
//         return onwardPrice + returnPrice;
//       };

//       useEffect(() => {
//         const fetchAndFilterFlights = async () => {
//           setIsLoading(true);
//           setError(null);
//           try {
//             let filteredOnwardFlights = applyFilters(onwardProps, "onward");
//             let filteredReturnFlights = applyFilters(returnProps, "return");
    
//             setFilteredOnward(filteredOnwardFlights);
//             setFilteredReturn(filteredReturnFlights);
//           } catch (err) {
//             console.error("Error filtering flights:", err);
//             setError("An error occurred while loading flight information. Please try again.");
//           } finally {
//             setIsLoading(false);
//             setSelectedOnwardFlight(null);
//             setSelectedReturnFlight(null);
//           }
//         };
    
//         fetchAndFilterFlights();
//       }, [filters, onwardProps, returnProps]);
    
//       const findMatchingFlights = (flights, msri, sri) => {
//         return flights.filter((flight) =>
//           flight.totalPriceList.some(
//             (price) =>
//               price.fareIdentifier === "SPECIAL_RETURN" &&
//               (msri.includes(price.sri) || price.msri.includes(sri))
//           )
//         );
//       };
    
//       const handleSelectSpecialReturn = (flight, priceIndex, direction) => {
//         if(isSpecialReturn){
//           console.log('sepceilff',flight)
//           const selectedPrice = flight.totalPriceList[priceIndex];
        
//           if (selectedPrice.fareIdentpifier === "SPECIAL_RETURN") {
//             const msri = selectedPrice.msri;
//             const sri = selectedPrice.sri;
      
//             if (direction === "onward") {
//               const matchingReturnFlights = findMatchingFlights(returnProps, msri, sri);
//               setFilteredReturn(matchingReturnFlights);
//               setSelectedOnwardFlight({ ...flight, selectedPriceIndex: priceIndex });
//               setSelectedReturnFlight(null);
//             } else {
//               const matchingOnwardFlights = findMatchingFlights(onwardProps, msri, sri);
//               setFilteredOnward(matchingOnwardFlights);
//               setSelectedReturnFlight({ ...flight, selectedPriceIndex: priceIndex });
//               setSelectedOnwardFlight(null);
//             }
//           } 
//         }
         
//           // For non-special return flights, reset the other direction
//           if (direction === "onward") {
//             setSelectedOnwardFlight({ ...flight, selectedPriceIndex: priceIndex });
//             setFilteredReturn(applyFilters(returnProps, "return"));
//             setSelectedReturnFlight(null);
//           } else {
//             setSelectedReturnFlight({ ...flight, selectedPriceIndex: priceIndex });
//             setFilteredOnward(applyFilters(onwardProps, "onward"));
//             setSelectedOnwardFlight(null);
//           }
        
//       };
//   const handleBooking = () => {
//     if (!selectedOnwardFlight || !selectedReturnFlight) {
//       ReactToast("Please select both onward and return flight");
//       return;
//     }

//     const returnFlight =
//       selectedReturnFlight.totalPriceList[
//         selectedReturnFlight.selectedPriceIndex
//       ].id;
//     const onwardFlight =
//       selectedOnwardFlight.totalPriceList[
//         selectedOnwardFlight.selectedPriceIndex
//       ].id;
//     const data = [
//       {
//         returnFlightDetails: selectedReturnFlight.sI,
//         priceId: returnFlight,
//       },
//       {
//         onwardFlightDetails: selectedOnwardFlight.sI,
//         priceId: onwardFlight,
//       },
//     ];
//     console.log(data);

//     if (!token) {
//       ReactToast('Please login first')
//       navigate("/sign-in");
//       return;
//     }
//     navigate("/book-flight", { state: { bookings: data } });
//   };

//   const renderFlightSection = (flights, direction) => {
//     if (isLoading) {
//       return <div>Loading flights...</div>;
//     }

//     if (error) {
//       return <div className="text-red-500">{error}</div>;
//     }

//     if (!Array.isArray(flights) || flights.length === 0) {
//       return <div>No flights available for the selected criteria.</div>;
//     }

//     return (
//       <div>
//         {flights.map((flight, index) => (
//           <RoundTripCard
//             key={index}
//             flightDetails={flight}
//             isSelected={
//               direction === "onward"
//                 ? selectedOnwardFlight?.sI === flight.sI
//                 : selectedReturnFlight?.sI === flight.sI
//             }
//             onSelect={(priceIndex) =>
//               handleSelectSpecialReturn(flight, priceIndex, direction)
//             }
//             passenger={passenger}
//             specialReturnMode={isSpecialReturn}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="flex flex-col md:flex-row mb-24">
//       <RoundSideBar
//         passenger={passenger}
//         filters={filters}
//         setFilters={setFilters}
//         onwardData={onwardProps}
//         returnData={returnProps}
//         activeDirection={activeDirection}
//         setActiveDirection={setActiveDirection}
//         calculateTotalPrice={calculateTotalPrice}
//         isSpecialReturn={isSpecialReturn}
//         setIsSpecialReturn={setIsSpecialReturn}
//       />
//       <div className="flex flex-col md:w-3/4">
//         <div className="flex">
//           <div className="w-1/2">
//             <h2 className="text-sm text-center md:text-xl font-semibold mb-2">
//               {getRoute(filteredOnward)}
//             </h2>
//           </div>
//           <div className="w-1/2">
//             <h2 className="text-sm text-center md:text-xl font-semibold mb-2">
//               {getRoute(filteredReturn)}
//             </h2>
//           </div>
//         </div>
//         <div className="flex h-[850px]">
//           <div className="w-1/2 overflow-y-auto no-scroll">
//             {renderFlightSection(filteredOnward, "onward")}
//           </div>
//           <div className="w-1/2 overflow-y-auto no-scroll">
//             {renderFlightSection(filteredReturn, "return")}
//           </div>
//         </div>
//       </div>

//       {(selectedOnwardFlight || selectedReturnFlight) && (
//         <BookingCard
//           selectedFlights={[selectedOnwardFlight, selectedReturnFlight].filter(Boolean)}
//           totalPrice={calculateTotalBookingPrice()}
//           onBook={() => handleBooking()}
//           passenger={passenger}
//         />
//       )}
//     </div>
//   );
// };

// export default RoundTrip;


import React, { useState, useEffect } from "react";
import RoundTripCard from "../Cards/RoundTripFlightCard";
import RoundSideBar from "./Roundsidebar";
import BookingCard from "./BookingCards";
import ReactToast from "../../util/ReactToast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoundTrip = ({ onwardProps = [], returnProps = [], passenger, query }) => {
  const [filteredOnward, setFilteredOnward] = useState([]);
  const [filteredReturn, setFilteredReturn] = useState([]);
  const [activeDirection, setActiveDirection] = useState("onward");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOnwardFlight, setSelectedOnwardFlight] = useState({...onwardProps[0], selectedPriceIndex: 0});
  const [selectedReturnFlight, setSelectedReturnFlight] = useState({...returnProps[0], selectedPriceIndex: 0});
  const [specialReturnOnward, setSpecialReturnOnward] = useState([]);
  const [specialReturnReturn, setSpecialReturnReturn] = useState([]);
  const [isSpecialReturnActive, setIsSpecialReturnActive] = useState(false);

  console.log(specialReturnOnward,specialReturnReturn,"-0-0-0-0-0-0-0-")

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
      const arrivalTime = new Date(flight.sI[flight.sI.length - 1].at).getHours();
      const price = calculateTotalPrice(flight);
  
      const isInTimeRange = (time, ranges) => {
        if (ranges.length === 0) return true;
        return ranges.some((range) => {
          const [start, end] = range.split("-").map(Number);
          return (start < end) ? (time >= start && time < end) : (time >= start || time < end);
        });
      };
  
      const hasSpecialReturn = flight.totalPriceList.some(price => price.fareIdentifier === "SPECIAL_RETURN");
      const hasNonSpecialReturn = flight.totalPriceList.some(price => price.fareIdentifier !== "SPECIAL_RETURN");
  
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
        (directionFilters.stops.length === 0 || directionFilters.stops.includes(stops.toString())) &&
        (directionFilters.airlines.length === 0 || directionFilters.airlines.includes(airline)) &&
        isInTimeRange(departureTime, directionFilters.departureTime) &&
        isInTimeRange(arrivalTime, directionFilters.arrivalTime) &&
        (filters.specialReturnAirlines.length === 0 || 
          (hasSpecialReturn && filters.specialReturnAirlines.includes(airline)))
      );
    });
  };

  useEffect(() => {
    const fetchAndFilterFlights = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let filteredOnwardFlights = applyFilters(onwardProps, "onward");
        let filteredReturnFlights = applyFilters(returnProps, "return");

        setFilteredOnward(filteredOnwardFlights);
        setFilteredReturn(filteredReturnFlights);

        // Store special return flights for onward journey
        const specialOnward = onwardProps.filter(flight => 
          flight.totalPriceList.some(price => price.fareIdentifier === "SPECIAL_RETURN")
        );
        setSpecialReturnOnward(specialOnward);

        // Store special return flights for return journey
        const specialReturn = returnProps.filter(flight => 
          flight.totalPriceList.some(price => price.fareIdentifier === "SPECIAL_RETURN")
        );
        setSpecialReturnReturn(specialReturn);

      } catch (err) {
        console.error("Error filtering flights:", err);
        setError("An error occurred while loading flight information. Please try again.");
      } finally {
        setIsLoading(false);
        // setSelectedOnwardFlight(null);
        // setSelectedReturnFlight(null);
      }
    };

    fetchAndFilterFlights();
  }, [filters, onwardProps, returnProps]);

  const getRoute = (flights) => {
    if (flights.length > 0 && flights[0].sI && flights[0].sI.length > 0) {
      const departureCity = flights[0].sI[0].da.city;
      const arrivalCity = flights[0].sI[flights[0].sI.length - 1].aa.city;
      const departureTime = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(new Date(flights[0].sI[0].dt)).split('/').join('-');
      
      return (
        <span className="flex flex-col">
          <p>{departureCity} - {arrivalCity}</p>
          <p className="text-xs">{departureTime}</p>
        </span>
      );
    }
    return "";
  };

  const findMatchingSpecialReturnFlights = (flights, selectedFlight, selectedPriceInfo) => {
    return flights.filter(flight => {
      const matchingPrices = flight.totalPriceList.filter(price => {
        if (price.fareIdentifier !== "SPECIAL_RETURN") return false;
        
        // Case 1: msri and sri are not present
        if (!selectedPriceInfo.sri && !selectedPriceInfo.msri) {
          return price.fareIdentifier === "SPECIAL_RETURN" && 
                 flight.sI[0].fD.aI.code === selectedFlight.sI[0].fD.aI.code;
        }
        
        // Case 2: sri and msri are present
        if (selectedPriceInfo.sri && selectedPriceInfo.msri) {
          return selectedPriceInfo.msri.includes(price.sri) || price.msri.includes(selectedPriceInfo.sri);
        }
        
        return false;
      });
      
      return matchingPrices.length > 0;
    });
  };

  const extractMatchingReturnFlightAndPrice = (matchingReturnFlights, sri, msri) => {
    for (const returnFlight of matchingReturnFlights) {
      for (const price of returnFlight.totalPriceList) {
        if (price.fareIdentifier === 'SPECIAL_RETURN' && 
            (price.sri === sri || msri.includes(price.sri))) {
          return {
            flight: returnFlight,
            matchingPrice: price,
            priceIndex: returnFlight.totalPriceList.indexOf(price)
          };
        }
      }
    }
    return null;
  };
  const updateReturnFlightsWithExactPrice = (matchingReturnFlights, sri, msri) => {
    const exactMatchingReturnFlight = matchingReturnFlights.find(returnFlight => 
      returnFlight.totalPriceList.some(price => 
        price.fareIdentifier === 'SPECIAL_RETURN' && 
        (price.sri === sri || msri.includes(price.sri))
      )
    );
  
    if (!exactMatchingReturnFlight) {
      console.log("No exact matching return flight found");
      return matchingReturnFlights;
    }
  
    const exactMatchingPrice = exactMatchingReturnFlight.totalPriceList.find(price => 
      price.fareIdentifier === 'SPECIAL_RETURN' && 
      (price.sri === sri || msri.includes(price.sri))
    );
  
    console.log(exactMatchingReturnFlight, "exact matching return flight");
    console.log(exactMatchingPrice, "exact matching price");
  
    const updatedReturnFlights = matchingReturnFlights.map(flight => ({
      ...flight,
      totalPriceList: [exactMatchingPrice]
    }));
  
    console.log(updatedReturnFlights, "updated return flights");
  
    return updatedReturnFlights;
  };

  const handleSelectFlight = (flight, priceIndex, direction) => {

    if(isSpecialReturnActive){
      const specialReturn=flight.totalPriceList.filter((item)=>item.fareIdentifier=='SPECIAL_RETURN')
      const selected=specialReturn[priceIndex]

            const msri = selected.msri;
            const sri = selected.sri;

            console.log(msri,sri,"8787878787")
            if (direction === "onward") {
              // const matching=filteredReturn.map((item)=>item.priceList.some((price)=>((price.msri.includes(sri)|| msri.includes(price.sir)))))
              const matchingReturnFlights = findMatchingSpecialReturnFlights(returnProps, flight, selected);
              // setSelectedReturnFlight(null)
    //           const exactMatchingReturnFlight = extractMatchingReturnFlightAndPrice(matchingReturnFlights, sri, msri);
    // console.log(exactMatchingReturnFlight, "exact matching return flight");

    //           console.log(matchingReturnFlights,"matching")

    //           const updatedReturnFlights = matchingReturnFlights.map(flight => ({
    //             ...flight,
    //             totalPriceList: [exactMatchingReturnFlight]
    //           }));

    const updatedReturnFlights = updateReturnFlightsWithExactPrice(matchingReturnFlights, sri, msri);
              console.log(updatedReturnFlights,"final")

        setFilteredReturn(updatedReturnFlights);
        setSelectedOnwardFlight({ ...flight, selectedPriceIndex: priceIndex });
        // setSelectedReturnFlight(null);
       
          setSelectedReturnFlight({ ...updatedReturnFlights[0], selectedPriceIndex: 0 });
        
      } else {
        const matchingOnwardFlights = findMatchingSpecialReturnFlights(onwardProps, flight,selected );
        // setSelectedOnwardFlight(null);
        const updatedOnwardFlights = updateReturnFlightsWithExactPrice(matchingOnwardFlights, sri, msri);
        console.log(updatedOnwardFlights,"final")
        setFilteredOnward(updatedOnwardFlights);
        setSelectedReturnFlight({ ...flight, selectedPriceIndex: priceIndex });
       
          setSelectedOnwardFlight({ ...updatedOnwardFlights[0], selectedPriceIndex: 0 });
        
      }
          

      console.log("this is special return flight",specialReturn,selected)
    }
   
      
    console.log(flight,priceIndex,direction,"-=-=-=-=-=-=-=-")
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

    const returnFlight = selectedReturnFlight.totalPriceList[selectedReturnFlight.selectedPriceIndex].id;
    const onwardFlight = selectedOnwardFlight.totalPriceList[selectedOnwardFlight.selectedPriceIndex].id;
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
    console.log(data);

    if (!token) {
      ReactToast('Please login first')
      navigate("/sign-in");
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
      <div>
        {flights.map((flight, index) => (
          <RoundTripCard
            key={index}
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
            onSelect={(priceIndex) => handleSelectFlight(flight, priceIndex, direction)}
            passenger={passenger}
            specialReturnMode={filters.specialReturnAirlines.length > 0}
          />
        ))}
      </div>
    );
  };


  return (
    <div className="flex flex-col md:flex-row mb-24">
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
      <div className="flex flex-col md:w-3/4">
        <div className="flex">
          <div className="w-1/2">
            <h2 className="text-sm text-center md:text-xl font-semibold mb-2">
              {getRoute(filteredOnward)}
            </h2>
          </div>
          <div className="w-1/2">
            <h2 className="text-sm text-center md:text-xl font-semibold mb-2">
              {getRoute(filteredReturn)}
            </h2>
          </div>
        </div>
        <div className="flex h-[850px]">
          <div className="w-1/2 overflow-y-auto no-scroll">
            {renderFlightSection(filteredOnward, "onward")}
          </div>
          <div className="w-1/2 overflow-y-auto no-scroll">
            {renderFlightSection(filteredReturn, "return")}
          </div>
        </div>
      </div>

      {(selectedOnwardFlight || selectedReturnFlight) && (
        <BookingCard
          selectedFlights={[selectedOnwardFlight, selectedReturnFlight].filter(Boolean)}
          totalPrice={calculateTotalBookingPrice()}
          onBook={() => handleBooking()}
          passenger={passenger}
        />
      )}
    </div>
  );
};

export default RoundTrip;