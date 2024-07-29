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

const BookingCard = ({ selectedFlights, totalPrice, onBook }) => {
  console.log("selectedFlights:", selectedFlights);
  return (
    <div className="fixed items-center flex left-0  flex-col md:flex-row gap-2 border-t bg-gray-100 bottom-0 w-full p-2 shadow-md">
      <div className="grid grid-cols-2 md:grid-cols-6 w-[70%] overflow-x-auto no-scroll gap-2">
        {selectedFlights && selectedFlights.map((flight, index) => (
          <div key={index} className="mb-4 p-1 rounded-md flex border flex-col">
            <div className="font-bold mb-2">
              {flight?.sI?.[0]?.da?.code} → {flight?.sI?.[0]?.aa?.code}
            </div>
            <div className="text-sm">
              <div>Flight: {flight?.sI?.[0]?.fD?.aI?.name} {flight?.sI?.[0]?.fD?.fN}</div>
              <div>Price: ₹ {flight?.totalPriceList?.[flight?.selectedPriceIndex || 0]?.fd?.ADULT?.fC?.TF}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="">
        <div className="font-bold text-lg mb-4 col-span-2">Total Price: ₹ {totalPrice}</div>
        <button onClick={onBook} className="bg-green-500 text-white p-2 rounded-md col-span-2">Book Now</button>
      </div>
    </div>
  );
};

export default BookingCard;