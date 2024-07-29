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

import React, { useState, useEffect } from 'react';
import FlightDetailsCard from '../Cards/FlightDetailsCard';
import RoundSideBar from './Roundsidebar';
import BookingCard from './BookingCards';

const RoundTrip = ({ onwardProps = [], returnProps = [] }) => {
  const [filteredOnward, setFilteredOnward] = useState([]);
  const [filteredReturn, setFilteredReturn] = useState([]);
  const [activeDirection, setActiveDirection] = useState('onward');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOnwardFlight, setSelectedOnwardFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);

  const [filters, setFilters] = useState({
    onward: {
      maxPrice: Math.max(...onwardProps.flatMap(flight => flight.totalPriceList.map(price => price.fd.ADULT.fC.TF))),
      stops: [],
      departureTime: [],
      arrivalTime: [],
      airlines: [],
    },
    return: {
      maxPrice: Math.max(...returnProps.flatMap(flight => flight.totalPriceList.map(price => price.fd.ADULT.fC.TF))),
      stops: [],
      departureTime: [],
      arrivalTime: [],
      airlines: [],
    },
    specialReturn: false
  });

  const applyFilters = (flights, direction) => {
    return flights.filter(flight => {
      if (!flight.sI || flight.sI.length === 0) {
        console.error('Invalid flight data:', flight);
        return false;
      }

      const directionFilters = filters[direction];
      const stops = flight.sI.length - 1;
      const airline = flight.sI[0]?.fD?.aI?.name || '';
      const departureTime = new Date(flight.sI[0].dt).getHours();
      const arrivalTime = new Date(flight.sI[flight.sI.length - 1].at).getHours();
      const price = flight.totalPriceList[0].fd.ADULT.fC.TF;

      const isInTimeRange = (time, ranges) => {
        if (ranges.length === 0) return true;
        return ranges.some(range => {
          const [start, end] = range.split('-').map(Number);
          return time >= start && time < end;
        });
      };

      return (
        price <= directionFilters.maxPrice &&
        (directionFilters.stops.length === 0 || directionFilters.stops.includes(stops.toString())) &&
        (directionFilters.airlines.length === 0 || directionFilters.airlines.includes(airline)) &&
        isInTimeRange(departureTime, directionFilters.departureTime) &&
        isInTimeRange(arrivalTime, directionFilters.arrivalTime)
      );
    });
  };

  const applySpecialReturnFilter = (onwardFlights, returnFlights) => {
    const specialReturnOnward = onwardFlights.filter(flight =>
      flight.totalPriceList.some(price => price.fareIdentifier === 'SPECIAL_RETURN')
    );

    const specialReturnReturn = returnFlights.filter(flight =>
      flight.totalPriceList.some(price => price.fareIdentifier === 'SPECIAL_RETURN')
    );

    const matchedPairs = [];

    specialReturnOnward.forEach(onwardFlight => {
      const onwardSri = onwardFlight.totalPriceList.find(price => price.fareIdentifier === 'SPECIAL_RETURN')?.sri;
      const onwardMsri = onwardFlight.totalPriceList.find(price => price.fareIdentifier === 'SPECIAL_RETURN')?.msri;

      specialReturnReturn.forEach(returnFlight => {
        const returnSri = returnFlight.totalPriceList.find(price => price.fareIdentifier === 'SPECIAL_RETURN')?.sri;
        const returnMsri = returnFlight.totalPriceList.find(price => price.fareIdentifier === 'SPECIAL_RETURN')?.msri;

        if (
          (!onwardSri && !onwardMsri && !returnSri && !returnMsri) ||
          (onwardMsri && onwardMsri.includes(returnSri)) ||
          (returnMsri && returnMsri.includes(onwardSri))
        ) {
          matchedPairs.push({ onward: onwardFlight, return: returnFlight });
        }
      });
    });

    return matchedPairs;
  };

  useEffect(() => {
    const fetchAndFilterFlights = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let filteredOnwardFlights = applyFilters(onwardProps, 'onward');
        let filteredReturnFlights = applyFilters(returnProps, 'return');
        
        if (filters.specialReturn) {
          const specialReturnPairs = applySpecialReturnFilter(filteredOnwardFlights, filteredReturnFlights);
          filteredOnwardFlights = specialReturnPairs.map(pair => pair.onward);
          filteredReturnFlights = specialReturnPairs.map(pair => pair.return);
        }
  
        console.log(filteredOnwardFlights, "filtered onward flights", filteredReturnFlights, "filtered return flights");
        
        setFilteredOnward(filteredOnwardFlights);
        setFilteredReturn(filteredReturnFlights);
      } catch (err) {
        console.error('Error filtering flights:', err);
        setError('An error occurred while loading flight information. Please try again.');
      } finally {
        setIsLoading(false);
        setSelectedOnwardFlight(null); 
        setSelectedReturnFlight(null); 
      }
    };
  
    fetchAndFilterFlights();
  }, [filters, onwardProps, returnProps]);

  const handleSelectOnwardFlight = (flight, priceIndex) => {
    setSelectedOnwardFlight({ ...flight, selectedPriceIndex: priceIndex });
  };

  const handleSelectReturnFlight = (flight, priceIndex) => {
    setSelectedReturnFlight({ ...flight, selectedPriceIndex: priceIndex });
  };

  const renderFlightSection = (flights, direction) => {
    if (isLoading) {
      return <div>Loading flights...</div>;
    }
  
    if (error) {
      return <div className="text-red-500">{error}</div>;
    }
  
    if (!Array.isArray(flights) || flights.length === 0) {
      return <div>No flights available for the selected route.</div>;
    }
  
    return (
      <div>
        {flights.map((flight, index) => (
          <FlightDetailsCard 
            key={index} 
            flightDetails={flight} 
            isSelected={direction === 'onward' ? selectedOnwardFlight?.sI === flight.sI : selectedReturnFlight?.sI === flight.sI} 
            onSelect={(priceIndex) => direction === 'onward' ? handleSelectOnwardFlight(flight, priceIndex) : handleSelectReturnFlight(flight, priceIndex)} 
          />
        ))}
      </div>
    );
  };

  const getRoute = (flights) => {
    if (flights.length > 0 && flights[0].sI.length > 0) {
      const departureCity = flights[0].sI[0].da.city;
      const arrivalCity = flights[0].sI[0].aa.city;
      return `${departureCity} - ${arrivalCity}`;
    }
    return '';
  };

  const calculateTotalPrice = () => {
    const onwardPrice = selectedOnwardFlight ? selectedOnwardFlight.totalPriceList[selectedOnwardFlight.selectedPriceIndex]?.fd?.ADULT.fC.TF : 0;
    const returnPrice = selectedReturnFlight ? selectedReturnFlight.totalPriceList[selectedReturnFlight.selectedPriceIndex]?.fd?.ADULT.fC.TF : 0;
    return onwardPrice + returnPrice;
  };


  const handleBooking = () => {
  
    console.log(selectedReturnFlight.totalPriceList,selectedOnwardFlight)
    const returnFlight=selectedReturnFlight?.totalPriceList[selectedReturnFlight.selectedPriceIndex].id
    const onwardFlight=selectedOnwardFlight?.totalPriceList[selectedOnwardFlight.selectedPriceIndex].id

    const data =[{return:selectedReturnFlight.sI,returnFlight},{onward:selectedReturnFlight.sI,onwardFlight}]
  console.log(data)
   
  };

  return (
    <div className="flex flex-col md:flex-row mb-24">
      <RoundSideBar
        filters={filters}
        setFilters={setFilters}
        onwardData={onwardProps}
        returnData={returnProps}
        activeDirection={activeDirection}
        setActiveDirection={setActiveDirection}
      />
      <div className="flex flex-col md:p-4 md:w-3/4">
        <div className='flex'>
          <div className='w-1/2'> <h2 className="text-xl font-semibold mb-2">{getRoute(filteredOnward)}</h2></div>
          <div className='w-1/2'> <h2 className="text-xl font-semibold mb-2">{getRoute(filteredReturn)}</h2></div>
        </div>
        <div className="flex h-[850px] overflow-y-auto no-scroll">
          <div className="w-1/2 md:pr-2">
            {renderFlightSection(filteredOnward, 'onward')}
          </div>
          <div className="w-1/2 md:pl-2">
            {renderFlightSection(filteredReturn, 'return')}
          </div>
        </div>
      </div>
      <BookingCard
        selectedFlights={[selectedOnwardFlight, selectedReturnFlight].filter(Boolean)}
        totalPrice={calculateTotalPrice()}
        onBook={() => handleBooking()}
      />
    </div>
  );
};

export default RoundTrip;

