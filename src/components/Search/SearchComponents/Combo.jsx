// import React, { useEffect, useState } from "react";
// import { Tabs, Button } from "antd";
// import ComboFlightCard from "../../Cards/ComboFlightCard";
// import flightLogo from "../../../assets/home/logo/image 40.png"
// import ComboSideBar from "./ComboSidebar";


// const { TabPane } = Tabs;

// const Combo = ({ flightprops }) => {
//   if (!flightprops || flightprops.length === 0) {
//     return <h1>No flights available ..</h1>;
//   }

//   console.log("flightprops:", flightprops);

//   const groupFlights = (flights) => {
//     let groupedFlights = [];
//     let currentGroup = [];

//     flights.forEach((elem) => {
//       if (elem.sn === 0 && currentGroup.length > 0) {
//         groupedFlights.push(currentGroup);
//         currentGroup = [];
//       }
//       currentGroup.push(elem);
//     });

//     if (currentGroup.length > 0) {
//       groupedFlights.push(currentGroup);
//     }

//     return groupedFlights;
//   };

//   const findMaxPrice = (flights) => {
//     return Math.max(...flights.map(flight => flight.totalPriceList[0].fd.ADULT.fC.TF));
//   };

//   const maxPrice = findMaxPrice(flightprops);

//   const [filteredFlights, setFilteredFlights] = useState(flightprops);
//   const [filters, setFilters] = useState({
//     maxPrice: maxPrice, 
//     stops: [],
//     departureTime: [],
//     arrivalTime: [],
//     airlines: []
//   });

//   useEffect(() => {
//     const newFilteredFlights = flightprops.filter(flight => {
//       const price = flight.totalPriceList[0].fd.ADULT.fC.TF;
//       const stops = flight.sI[0].stops;
//       const departureHour = new Date(flight.sI[0].dt).getHours();
//       const arrivalHour = new Date(flight.sI[flight.sI.length - 1].at).getHours();
//       const airline = flight.sI[0].fD.aI.name;
  
//       const priceMatch = price <= filters.maxPrice;
//       const stopsMatch = filters.stops.length === 0 || filters.stops.includes(stops.toString());
//       const departureMatch = filters.departureTime.length === 0 || filters.departureTime.some(range => {
//         const [start, end] = range.split('-').map(Number);
//         return departureHour >= start && departureHour < end;
//       });
//       const arrivalMatch = filters.arrivalTime.length === 0 || filters.arrivalTime.some(range => {
//         const [start, end] = range.split('-').map(Number);
//         return arrivalHour >= start && arrivalHour < end;
//       });
//       const airlineMatch = filters.airlines.length === 0 || filters.airlines.includes(airline);
  
//       return priceMatch && stopsMatch && departureMatch && arrivalMatch && airlineMatch;
//     });
  
//     setFilteredFlights(newFilteredFlights);
//   }, [filters, flightprops]);

//   const startSegment = filteredFlights[0]?.sI[0];
//   const endSegment = filteredFlights[0]?.sI[filteredFlights[0]?.sI.length - 1];


//   console.log(flightprops,"pros")


//   return (
//     <div className="flex flex-row h-screen">
//       <ComboSideBar filters={filters} setFilters={setFilters} flights={flightprops} maxPrice={maxPrice}/>
//       <div>
//         <div>
//           <Tabs defaultActiveKey="1">
//             <TabPane tab="All Combo flights" key="1">
//               {flightprops.map((segments, segIndex) => {
//                 console.log(`segments[${segIndex}]:`, segments);
//                 const { sI } = segments;
//                 return (
//                   <React.Fragment key={segIndex}>
//                     {groupFlights(sI).map((group, groupIndex) => (
//                       <div key={groupIndex} className="border shadow-xl p-4 mb-4 rounded-lg relative">
//                         {group.map((elem, elemIndex) => (
//                           <ComboFlightCard logo={flightLogo} key={elem.id || elemIndex} flightDetails={elem} />
//                         ))}
//                         <div className="flex justify-start">
//                           <Button className="py-4 m-2" type="primary">Book now</Button>
//                         </div>
//                       </div>
//                     ))}
//                   </React.Fragment>
//                 );
//               })}
//             </TabPane>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Combo;


// import React, { useEffect, useState } from "react";
// import { Tabs, Button } from "antd";
// import { useNavigate } from 'react-router-dom';
// import ComboFlightCard from "../Cards/ComboFlightCard";
// import flightLogo from "../../../assets/home/logo/image 40.png"
// import ComboSideBar from "./ComboSidebar";

// const { TabPane } = Tabs;

// const Combo = ({ flightprops,passenger }) => {
//   if (!flightprops || flightprops.length === 0) {
//     return <h1>No flights available ..</h1>;
//   }

//   const findMaxPrice = (flights) => {
//     return Math.max(...flights.map(flight => flight.totalPriceList[0].fd.ADULT.fC.TF));
//   };

//   const maxPrice = findMaxPrice(flightprops);


//   const [filteredFlights, setFilteredFlights] = useState(flightprops);
//   const [filters, setFilters] = useState({
//     maxPrice: maxPrice, 
//     stops: [],
//     departureTime: [],
//     arrivalTime: [],
//     airlines: []
//   });

//   const navigate=useNavigate()

//   useEffect(() => {
//     const newFilteredFlights = flightprops.filter(flight => {
//       const price = flight.totalPriceList[0].fd.ADULT.fC.TF;
//       const stops = flight.sI[0].stops;
//       const departureHour = new Date(flight.sI[0].dt).getHours();
//       const arrivalHour = new Date(flight.sI[flight.sI.length - 1].at).getHours();
//       const airline = flight.sI[0].fD.aI.name;
  
//       const priceMatch = price <= filters.maxPrice;
//       const stopsMatch = filters.stops.length === 0 || filters.stops.includes(stops.toString());
//       const departureMatch = filters.departureTime.length === 0 || filters.departureTime.some(range => {
//         const [start, end] = range.split('-').map(Number);
//         return departureHour >= start && departureHour < end;
//       });
//       const arrivalMatch = filters.arrivalTime.length === 0 || filters.arrivalTime.some(range => {
//         const [start, end] = range.split('-').map(Number);
//         return arrivalHour >= start && arrivalHour < end;
//       });
//       const airlineMatch = filters.airlines.length === 0 || filters.airlines.includes(airline);
  
//       return priceMatch && stopsMatch && departureMatch && arrivalMatch && airlineMatch;
//     });
  
//     setFilteredFlights(newFilteredFlights);
//   }, [filters, flightprops]);


//   const handleBooking = (flightIndex, priceIndex) => {
    
//     const selectedFlight = filteredFlights[flightIndex];
//     const selectedPrice = selectedFlight.totalPriceList[priceIndex];
//     const priceId = selectedPrice.id;
//     const data=[{flightDetails:selectedFlight,priceId}]

//     navigate("/book-flight", { state: { bookings:data } });
//   };

//   return (
//     <div className="flex flex-col md:flex-row md:h-screen">
//       <ComboSideBar filters={filters} setFilters={setFilters} flights={flightprops} maxPrice={maxPrice} passenger={passenger}/>
//       <div className="flex-1 overflow-y-auto">
//         <Tabs defaultActiveKey="1">
//           <TabPane tab="All Combo flights" key="1">
//           {filteredFlights.map((flight, index) => (
//         <div key={index} className="border shadow-xl p-4 mb-4 rounded-lg relative">
//           <ComboFlightCard 
//             key={index} 
//             logo={flightLogo} 
//             flightDetails={flight} 
//             onBooking={(priceIndex) => handleBooking(index, priceIndex)}
//             passenger={passenger}
//           />
//         </div>
//       ))}
//           </TabPane>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default Combo;

// import React, { useEffect, useState, useMemo } from "react";
// import { Tabs } from "antd";
// import { useNavigate } from 'react-router-dom';
// import ComboFlightCard from "../Cards/ComboFlightCard";
// import flightLogo from "../../../assets/home/logo/image 40.png"
// import ComboSideBar from "./ComboSidebar";

// const { TabPane } = Tabs;

// const Combo = ({ flightprops, passenger }) => {
//   if (!flightprops || flightprops.length === 0) {
//     return <h1>No flights available ..</h1>;
//   }

//   const navigate = useNavigate();

//   const calculateTotalPrice = useMemo(() => (flight) => {
//     let total = 0;
//     const priceList = flight.totalPriceList[0].fd;
//     for (const passengerType in passenger) {
//       if (priceList[passengerType]) {
//         total += priceList[passengerType].fC.TF * passenger[passengerType];
//       }
//     }
//     return total;
//   }, [passenger]);

//   const [filteredFlights, setFilteredFlights] = useState(flightprops);
//   const [filters, setFilters] = useState({
//     maxPrice: Math.max(...flightprops.map(calculateTotalPrice)),
//     stops: [],
//     departureTime: [],
//     arrivalTime: [],
//     airlines: []
//   });

//   useEffect(() => {
//     const newFilteredFlights = flightprops.filter(flight => {
//       const price = calculateTotalPrice(flight);
//       const stops = flight.sI[0].stops;
//       const departureHour = new Date(flight.sI[0].dt).getHours();
//       const arrivalHour = new Date(flight.sI[flight.sI.length - 1].at).getHours();
//       const airline = flight.sI[0].fD.aI.name;

//       const priceMatch = price <= filters.maxPrice;
//       const stopsMatch = filters.stops.length === 0 || filters.stops.includes(stops.toString());
//       const departureMatch = filters.departureTime.length === 0 || filters.departureTime.some(range => {
//         const [start, end] = range.split('-').map(Number);
//         return departureHour >= start && departureHour < end;
//       });
//       const arrivalMatch = filters.arrivalTime.length === 0 || filters.arrivalTime.some(range => {
//         const [start, end] = range.split('-').map(Number);
//         return arrivalHour >= start && arrivalHour < end;
//       });
//       const airlineMatch = filters.airlines.length === 0 || filters.airlines.includes(airline);

//       return priceMatch && stopsMatch && departureMatch && arrivalMatch && airlineMatch;
//     });

//     setFilteredFlights(newFilteredFlights);
//   }, [filters, flightprops, calculateTotalPrice]);

//   const handleBooking = (flightIndex, priceIndex) => {
//     const selectedFlight = filteredFlights[flightIndex];
//     const selectedPrice = selectedFlight.totalPriceList[priceIndex];
//     const priceId = selectedPrice.id;
//     const data = [{ flightDetails: selectedFlight, priceId }];
//     navigate("/book-flight", { state: { bookings: data } });
//   };

//   return (
//     <div className="flex flex-col md:flex-row md:h-screen">
//       <ComboSideBar
//         filters={filters}
//         setFilters={setFilters}
//         flights={flightprops}
//         passenger={passenger}
//       />
//       <div className="flex-1 overflow-y-auto">
//         <Tabs defaultActiveKey="1">
//           <TabPane tab="All Combo flights" key="1">
//             {filteredFlights.map((flight, index) => (
//               <div key={index} className="border shadow-xl p-4 mb-4 rounded-lg relative">
//                 <ComboFlightCard
//   key={index}
//   logo={flightLogo}
//   flightDetails={flight}
//   onBooking={(priceIndex) => handleBooking(index, priceIndex)}
//   passenger={passenger}
//   totalPrice={calculateTotalPrice(flight)}
// />
//               </div>
//             ))}
//           </TabPane>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default Combo;


// import React, { useEffect, useState, useMemo } from "react";
// import { Tabs } from "antd";
// import { useNavigate } from 'react-router-dom';
// import ComboFlightCard from "../Cards/ComboFlightCard";
// import flightLogo from "../../../assets/home/logo/image 40.png"
// import ComboSideBar from "./ComboSidebar";

// const { TabPane } = Tabs;

// const Combo = ({ flightprops, passenger }) => {
//   if (!flightprops || flightprops.length === 0) {
//     return <h1>No flights available ..</h1>;
//   }

//   const navigate = useNavigate();

//   const calculateTotalPrice = useMemo(() => (flight) => {
//     let total = 0;
//     const priceList = flight.totalPriceList[0].fd;
//     for (const passengerType in passenger) {
//       if (priceList[passengerType]) {
//         total += priceList[passengerType].fC.TF * passenger[passengerType];
//       }
//     }
//     return total;
//   }, [passenger]);

//   const [filteredFlights, setFilteredFlights] = useState(flightprops);
//   const [filters, setFilters] = useState({
//     maxPrice: Math.max(...flightprops.map(calculateTotalPrice)),
//     stops: [],
//     departureTime: [],
//     arrivalTime: [],
//     airlines: []
//   });

//   useEffect(() => {
//     const newFilteredFlights = flightprops.filter(flight => {
//       const price = calculateTotalPrice(flight);
//       const stops = flight.sI[0].stops;
//       const departureHour = new Date(flight.sI[0].dt).getHours();
//       const arrivalHour = new Date(flight.sI[flight.sI.length - 1].at).getHours();
//       const airline = flight.sI[0].fD.aI.name;

//       const priceMatch = price <= filters.maxPrice;
//       const stopsMatch = filters.stops.length === 0 || filters.stops.includes(stops.toString());
//       const departureMatch = filters.departureTime.length === 0 || filters.departureTime.some(range => {
//         const [start, end] = range.split('-').map(Number);
//         return departureHour >= start && departureHour < end;
//       });
//       const arrivalMatch = filters.arrivalTime.length === 0 || filters.arrivalTime.some(range => {
//         const [start, end] = range.split('-').map(Number);
//         return arrivalHour >= start && arrivalHour < end;
//       });
//       const airlineMatch = filters.airlines.length === 0 || filters.airlines.includes(airline);

//       return priceMatch && stopsMatch && departureMatch && arrivalMatch && airlineMatch;
//     });

//     setFilteredFlights(newFilteredFlights);
//   }, [filters, flightprops, calculateTotalPrice]);

//   const handleBooking = (flightIndex, priceIndex) => {
//     const selectedFlight = filteredFlights[flightIndex];
//     const selectedPrice = selectedFlight.totalPriceList[priceIndex];
//     const priceId = selectedPrice.id;
//     const data = [{ flightDetails: selectedFlight, priceId }];
//     navigate("/book-flight", { state: { bookings: data } });
//   };



//   return (
//     <div className="flex flex-col md:flex-row md:h-screen">
//       <ComboSideBar
//         filters={filters}
//         setFilters={setFilters}
//         flights={flightprops}
//         passenger={passenger}
//       />
//       <div className="flex-1 overflow-y-auto">
//         <Tabs defaultActiveKey="1">
//           <TabPane tab="All Combo flights" key="1">
//             {filteredFlights.map((flight, index) => (
//               <div key={index} className="border shadow-xl p-4 mb-4 rounded-lg relative">
//                 <ComboFlightCard
//                   key={index}
//                   flightDetails={flight}
//                   onBooking={(priceIndex) => handleBooking(index, priceIndex)}
//                   passenger={passenger}
//                   totalPrice={calculateTotalPrice(flight)}
//                 />
//               </div>
//             ))}
//           </TabPane>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default Combo;

import React, { useEffect, useState, useMemo } from "react";
import { Tabs } from "antd";
import { useNavigate } from 'react-router-dom';
import ComboFlightCard from "../Cards/ComboFlightCard";
import ComboSideBar from "./ComboSidebar";
import { useSelector } from "react-redux";
import ReactToast from "../../util/ReactToast";
const { TabPane } = Tabs;

const Combo = ({ flightprops, passenger,query }) => {
  if (!flightprops || flightprops.length === 0) {
    return <h1>No flights available ..</h1>;
  }
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

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

  const [filteredFlights, setFilteredFlights] = useState(flightprops);
  const [filters, setFilters] = useState({
    maxPrice: Math.max(...flightprops.map(calculateTotalPrice)),
    stops: [],
    departureTime: [],
    arrivalTime: [],
    airlines: []
  });

  useEffect(() => {
    const newFilteredFlights = flightprops.filter(flight => {
      const price = calculateTotalPrice(flight);
      const stops = flight.sI.length - 1;
      const stopCategory = stops >= 3 ? "3+" : stops.toString();
      const departureHour = new Date(flight.sI[0].dt).getHours();
      const arrivalHour = new Date(flight.sI[flight.sI.length - 1].at).getHours();
      const airline = flight.sI[0].fD.aI.name;

      const priceMatch = price <= filters.maxPrice;
      const stopsMatch = filters.stops.length === 0 || filters.stops.includes(stopCategory);
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
    setFilteredFlights(newFilteredFlights);
  }, [filters, flightprops, calculateTotalPrice]);

  const handleBooking = (flightIndex, priceIndex) => {
    const selectedFlight = filteredFlights[flightIndex];
    const selectedPrice = selectedFlight.totalPriceList[priceIndex];
    const priceId = selectedPrice.id;
    const data = [{ flightDetails: selectedFlight, priceId }];

    if(!token){
      ReactToast('Please login first')
      navigate("/sign-in",{state:{booking:query}});
    }
    navigate("/book-flight", { state: { bookings: data } });
  };

  return (
    <div className="flex flex-col md:flex-row md:h-screen">
      <ComboSideBar
        filters={filters}
        setFilters={setFilters}
        flights={flightprops}
        passenger={passenger}
      />
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultActiveKey="1">
          <TabPane tab="All Combo flights" key="1">
            {filteredFlights.map((flight, index) => (
              <div key={index} className="border shadow-xl p-4 mb-4 rounded-lg relative">
                <ComboFlightCard
                  key={index}
                  flightDetails={flight}
                  onBooking={(priceIndex) => handleBooking(index, priceIndex)}
                  passenger={passenger}
                  totalPrice={calculateTotalPrice(flight)}
                />
              </div>
            ))}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Combo;