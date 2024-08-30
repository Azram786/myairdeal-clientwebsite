////// new one

import React, { useMemo } from "react";

const BookingCard = ({
  selectedFlights,
  onBook,
  passenger,
  selectedPriceIndex,
  combo,
}) => {
  console.log("heeee", selectedPriceIndex);
  console.log(selectedFlights);
  const calculateTotalPrice = useMemo(
    () => (flight) => {
      if (
        !flight ||
        !flight.totalPriceList ||
        flight.totalPriceList.length === 0
      ) {
        return 0;
      }
      let total = 0;

      const priceIndex = flight?.selectedPriceIndex || 0;
      const priceList = flight.totalPriceList[priceIndex].fd;

      for (const passengerType in passenger) {
        if (priceList[passengerType]) {
          total += priceList[passengerType].fC.TF * passenger[passengerType];
        }
      }
      return total;
    },
    [passenger]
  );

  const totalPrice = useMemo(() => {
    return selectedFlights.reduce(
      (acc, flight) => acc + calculateTotalPrice(flight),
      0
    );
  }, [selectedFlights, calculateTotalPrice]);

  const getFlightDetails = (flight) => {
    console.log(flight, "getFlightDetails");
    let segments;
    if (combo) {
      segments = flight;
    } else {
      segments = flight?.sI || [];
    }

    const firstSegment = segments[0] || {};
    const lastSegment = segments[segments.length - 1] || {};
    return {
      departureCity: firstSegment?.da?.code,
      departureTime: firstSegment?.dt?.substring(11, 16),
      arrivalCity: lastSegment?.aa?.code,
      arrivalTime: lastSegment?.at?.substring(11, 16),
      airline: firstSegment?.fD?.aI?.name,
      flightNumber: firstSegment?.fD?.fN,
      airlineCode: firstSegment?.fD?.aI?.code,
    };
  };

  function groupFlightsBySN(flightOffer) {
    console.log(flightOffer);
    const groupedFlights = [];
    let currentGroup = [];

    flightOffer[0].sI.forEach((flight) => {
      if (flight.sN === 0) {
        // If there's already a group, push it to groupedFlights before starting a new one
        if (currentGroup.length > 0) {
          groupedFlights.push(currentGroup);
        }
        // Start a new group
        currentGroup = [flight];
      } else {
        // Add the flight to the current group
        currentGroup.push(flight);
      }
    });

    // Push the last group if it exists
    if (currentGroup.length > 0) {
      groupedFlights.push(currentGroup);
    }
    console.log(groupedFlights);
    return groupedFlights;
  }
  let groupedFlights = [];
  if (combo) {
    groupedFlights = groupFlightsBySN(selectedFlights);
  }

  return (
    <div className="fixed left-0 bottom-0 w-full bg-[#1B1D29]  text-white p-2 z-40 lg-custom:z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="w-[55%] md:w-[70%] flex overflow-x-auto no-scroll gap-2">
          {!combo &&
            selectedFlights.map((flight, index) => {
              const {
                departureCity,
                departureTime,
                arrivalCity,
                arrivalTime,
                airline,
                flightNumber,
                airlineCode,
              } = getFlightDetails(flight);
              return (
                <div
                  key={index}
                  className="flex items-center py-4   shrink-0 space-x-4"
                >
                  {/* <img
                  src={`/api/placeholder/30/30?text=${airlineCode}`}
                  alt={airline}
                  className="w-8 h-8 rounded-full"
                /> */}
                  <img
                    src={`${
                      import.meta.env.VITE_SERVER_URL
                    }uploads/AirlinesLogo/${airlineCode}.png`}
                    alt={airlineCode}
                    className=" size-8 rounded-md mr-4"
                  />
                  <div className="flex flex-col">
                    <div className="text-sm font-semibold">{airline}</div>
                    <div className="text-xs">{flightNumber}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex flex-col">
                      <div className="text-sm font-bold">{departureTime}</div>
                      <div>{departureCity}</div>
                    </div>

                    <div className="text-xs">→</div>
                    <div className="flex-col">
                      <div className="text-sm font-bold">{arrivalTime}</div>
                      <div>{arrivalCity}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold">
                    ₹{calculateTotalPrice(flight).toLocaleString()}
                  </div>
                  <data value="" className="border-l size-7"></data>
                </div>
              );
            })}
          {combo &&
            groupedFlights.map((flight, index) => {
              const {
                departureCity,
                departureTime,
                arrivalCity,
                arrivalTime,
                airline,
                flightNumber,
                airlineCode,
              } = getFlightDetails(flight);
              return (
                <div
                  key={index}
                  className="flex items-center py-4   shrink-0 space-x-4"
                >
                  {/* <img
                  src={`/api/placeholder/30/30?text=${airlineCode}`}
                  alt={airline}
                  className="w-8 h-8 rounded-full"
                /> */}
                  <img
                    src={`${
                      import.meta.env.VITE_SERVER_URL
                    }uploads/AirlinesLogo/${airlineCode}.png`}
                    alt={airlineCode}
                    className=" size-8 rounded-md mr-4"
                  />
                  <div className="flex flex-col">
                    <div className="text-sm font-semibold">{airline}</div>
                    <div className="text-xs">{flightNumber}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex flex-col">
                      <div className="text-sm font-bold">{departureTime}</div>
                      <div>{departureCity}</div>
                    </div>

                    <div className="text-xs">→</div>
                    <div className="flex-col">
                      <div className="text-sm font-bold">{arrivalTime}</div>
                      <div>{arrivalCity}</div>
                    </div>
                  </div>
                  {!combo && (
                    <div className="text-sm font-bold">
                      ₹{calculateTotalPrice(flight).toLocaleString()}
                    </div>
                  )}

                  <data value="" className="border-l size-7"></data>
                </div>
              );
            })}
        </div>
        <div className="flex w-[45%] md:w-[30%] flex-col md:flex-row items-center space-x-4">
          <div className="text-lg font-bold">
            ₹{totalPrice.toLocaleString()}
          </div>
          <button
            onClick={onBook}
            className="bg-[#D7B56D] text-black px-6 py-2 rounded font-bold"
          >
            BOOK
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;

// import React, { useMemo } from 'react';

// const BookingCard = ({ selectedFlights, onBook, passenger }) => {
//   console.log(selectedFlights, "selectedFlights");

//   const calculateTotalPrice = (flight) => {
//     console.log(flight, "flight");
//     let total = 0;
//     const priceIndex = flight.selectedPriceIndex;
//     const priceList = flight.totalPriceList[priceIndex].fd;
//     console.log(passenger, "passengerType");
//     for (const passengerType in passenger) {
//       if (priceList[passengerType]) {
//         total += priceList[passengerType].fC.TF * passenger[passengerType];
//       }
//     }
//     return total;
//   };

//   const totalPrice = useMemo(() => {
//     return selectedFlights.reduce((acc, flight) => acc + calculateTotalPrice(flight), 0);
//   }, [selectedFlights, passenger]);

//   return (
//     <div className="fixed items-center flex left-0 flex-col md:flex-row gap-2 border-t bg-gray-100 bottom-0 w-full p-2 shadow-md">
//       <div className="grid grid-cols-2 md:grid-cols-6 w-[70%] overflow-x-auto no-scroll gap-2">
//         {selectedFlights && selectedFlights.map((flight, index) => (
//           <div key={index} className="mb-4 p-1 rounded-md flex border flex-col">
//             <div className="font-bold mb-2">
//               {flight?.sI?.[0]?.da?.code} → {flight?.sI?.[0]?.aa?.code}
//             </div>
//             <div className="text-sm">
//               <div>Flight: {flight?.sI?.[0]?.fD?.aI?.name} {flight?.sI?.[0]?.fD?.fN}</div>
//               <div>Price: ₹ {calculateTotalPrice(flight)}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="">
//         <div className="font-bold text-lg mb-4 col-span-2">Total Price: ₹ {totalPrice}</div>
//         <button onClick={onBook} className="bg-green-500 text-white p-2 rounded-md col-span-2">Book Now</button>
//       </div>
//     </div>
//   );
// };

// export default BookingCard;
