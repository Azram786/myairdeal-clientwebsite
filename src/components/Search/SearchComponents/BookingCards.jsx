// import { ArrowRightOutlined } from "@ant-design/icons";

// export const BookingCard = ({ selectedFlights, totalPrice, onBook }) => (
//     <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center">
//       <div className="flex items-center space-x-4">
//         {selectedFlights.map((flight, index) => (
//           <div key={index} className="flex items-center">
//             <span>{flight.sI[0].da.city}</span>
//             <ArrowRightOutlined className="mx-2" />
//             <span>{flight.sI[0].aa.city}</span>
//             {index < selectedFlights.length - 1 && <span className="mx-2">|</span>}
//           </div>
//         ))}
//       </div>
//       <div className="flex items-center space-x-4">
//         <span className="font-bold">Total: ₹{totalPrice.toFixed(2)}</span>
//         <button
//           onClick={onBook}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md"
//         >
//           Book
//         </button>
//       </div>
//     </div>
//   );

// import React from "react";

// const BookingCard = ({ selectedFlights, totalPrice, onBook }) => {
//   return (

//     <div className="fixed grid grid-cols-2 bg-white bottom-0 w-full ">
//       <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
//       {selectedFlights.map((flight, index) => (
//         <div key={index} className="mb-4 flex">
//           <div className="font-bold mb-2">
//             {flight.sI[0].da.city} → {flight.sI[0].aa.city}
//           </div>
//           <div className="text-sm">
//             <div>Flight: {flight.sI[0].fD.aI.name} {flight.sI[0].fD.fN}</div>
//             <div>Price: ${flight.totalPriceList[flight.selectedPriceIndex].fd.ADULT.fC.TF}</div>
//           </div>
//         </div>
//       ))}
//       <div className="font-bold text-lg mb-4">Total Price: ${totalPrice}</div>
//       <button onClick={onBook} className="btn btn-primary w-full">Book Now</button>
//     </div>
//   );
// };

// export default BookingCard;

// import React from "react";

// const BookingCard = ({ selectedFlights, totalPrice, onBook }) => {
//   console.log("selectedFlights:", selectedFlights);
//   return (
//     <div className="fixed items-center md:justify-around flex left-0 px-10 flex-col md:flex-row gap-2 border-t bg-gray-100 bottom-0 w-full p-2 shadow-md">
//       <div className="grid grid-cols-2  md:grid-cols-6 w-[70%] overflow-x-auto no-scroll  gap-2 ">
//         {selectedFlights.map((flight, index) => (
        
//           <div key={index} className="mb-4 p-1 rounded-md flex border flex-col">
//             <div className="font-bold mb-2">
//               {flight?.sI[0]?.da?.code} → {flight?.sI[0]?.aa?.code}
//             </div>
//             <div className="text-sm">
//               <div>Flight: {flight.sI[0].fD.aI.name} {flight.sI[0]?.fD?.fN}</div>
            
//               <div>Price: ₹ {flight?.totalPriceList[flight?.selectedPriceIndex]?.fd?.ADULT.fC.TF}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="">
//         <div className="font-bold text-lg mb-4 col-span-2">Total Price: ₹ {totalPrice}</div>
//         <button onClick={onBook} className="bg-green-500 text-white p-2 rounded-md  col-span-2">Book Now</button>
//       </div>
//     </div>
//   );
// };

// export default BookingCard;

// const BookingCard = ({ selectedFlights, totalPrice, onBook }) => {
//   console.log("selectedFlights:", selectedFlights);
//   return (
//     <div className="fixed items-center flex left-0  flex-col md:flex-row gap-2 border-t bg-gray-100 bottom-0 w-full p-2 shadow-md">
//       <div className="grid grid-cols-2 md:grid-cols-6 w-[70%] overflow-x-auto no-scroll gap-2">
//         {selectedFlights && selectedFlights.map((flight, index) => (
//           <div key={index} className="mb-4 p-1 rounded-md flex border flex-col">
//             <div className="font-bold mb-2">
//               {flight?.sI?.[0]?.da?.code} → {flight?.sI?.[0]?.aa?.code}
//             </div>
//             <div className="text-sm">
//               <div>Flight: {flight?.sI?.[0]?.fD?.aI?.name} {flight?.sI?.[0]?.fD?.fN}</div>
//               <div>Price: ₹ {flight?.totalPriceList?.[flight?.selectedPriceIndex || 0]?.fd?.ADULT?.fC?.TF}</div>
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


// import React, { useMemo } from 'react';

// const BookingCard = ({ selectedFlights, onBook, passenger, selectedPriceIndex }) => {
//   console.log(selectedFlights, "selectedFlights");
//   console.log(selectedPriceIndex, "selectedPriceIndex");

//   const calculateTotalPrice = useMemo(() => (flight, index) => {
//     let total = 0;
//     const priceIndex = flight.selectedPriceIndex || 0;
//     const priceList = flight.totalPriceList[priceIndex].fd;
//     for (const passengerType in passenger) {
//       if (priceList[passengerType]) {
//         total += priceList[passengerType].fC.TF * passenger[passengerType];
//       }
//     }
//     return total;
//   }, [passenger]);

//   const totalPrice = useMemo(() => {
//     return selectedFlights.reduce((acc, flight, index) => acc + calculateTotalPrice(flight, index), 0);
//   }, [selectedFlights, calculateTotalPrice]);

//   return (
//     <div className="fixed items-center flex left-0 flex-col md:flex-row gap-2 border-t bg-gray-100 bottom-0 w-full p-2 shadow-md">
//       <div className="grid grid-cols-2 md:grid-cols-6 w-[70%] overflow-x-auto no-scroll gap-2">
//         {selectedFlights && selectedFlights.map((flight, index) => (
          
//           <div key={index} className="mb-4 p-1 rounded-md flex border flex-col">
//             {console.log(flight,"-0-0-0-0-0-0-0")}
//             <div className="font-bold mb-2">
//               {flight?.sI[0]?.da?.city} → {flight?.sI[0]?.aa?.city}
//             </div>
//             <div className="text-sm">
//               <div>Flight: {flight?.sI[0]?.fD?.aI?.name} {flight?.sI[0]?.fD?.fN}</div>
//               <div>Price: ₹ {calculateTotalPrice(flight, index)}</div>
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

import React, { useMemo } from 'react';

const BookingCard = ({ selectedFlights, onBook, passenger }) => {
  console.log(selectedFlights, "selectedFlights");

  const calculateTotalPrice = useMemo(() => (flight) => {
    if (!flight || !flight.totalPriceList || flight.totalPriceList.length === 0) {
      return 0;
    }

    let total = 0;
    const priceIndex = flight.selectedPriceIndex || 0;
    const priceList = flight.totalPriceList[priceIndex].fd;
    
    for (const passengerType in passenger) {
      if (priceList[passengerType]) {
        total += priceList[passengerType].fC.TF * passenger[passengerType];
      }
    }
    return total;
  }, [passenger]);

  const totalPrice = useMemo(() => {
    return selectedFlights.reduce((acc, flight) => acc + calculateTotalPrice(flight), 0);
  }, [selectedFlights, calculateTotalPrice]);

  const getFlightDetails = (flight) => {
    const segments = flight.sI;
    const firstSegment = segments[0];
    const lastSegment = segments[segments.length - 1];

    return {
      departureCity: firstSegment.da.city,
      arrivalCity: lastSegment.aa.city,
      airline: firstSegment.fD.aI.name,
      flightNumber: firstSegment.fD.fN,
      stops: segments.length > 1 ? segments.length - 1 : 0
    };
  };

  return (
    <div className="fixed items-center flex left-0 flex-col md:flex-row gap-2 border-t bg-gray-100 bottom-0 w-full p-2 shadow-md">
      <div className="grid grid-cols-2 md:grid-cols-6 w-[70%] overflow-x-auto no-scroll gap-2">
        {selectedFlights.map((flight, index) => {
          const { departureCity, arrivalCity, airline, flightNumber, stops } = getFlightDetails(flight);

          return (
            <div key={index} className="mb-4 p-1 rounded-md flex border flex-col">
              <div className="font-bold mb-2">
                {departureCity} → {arrivalCity}
              </div>
              <div className="text-sm">
                <div>Flight: {airline} {flightNumber}</div>
                <div>Stops: {stops}</div>
                <div>Price: ₹ {calculateTotalPrice(flight)}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="">
        <div className="font-bold text-lg mb-4 col-span-2">Total Price: ₹ {totalPrice}</div>
        <button 
          onClick={onBook} 
          className="bg-green-500 text-white p-2 rounded-md col-span-2"
        >
          Book Now
        </button>
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
