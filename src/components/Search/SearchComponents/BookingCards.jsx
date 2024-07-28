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

import React from "react";

const BookingCard = ({ selectedFlights, totalPrice, onBook }) => {
  return (
    <div className="booking-card p-4 border-l">
      <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
      {selectedFlights.map((flight, index) => (
        <div key={index} className="mb-4">
          <div className="font-bold mb-2">
            {flight.sI[0].da.city} → {flight.sI[0].aa.city}
          </div>
          <div className="text-sm">
            <div>Flight: {flight.sI[0].fD.aI.name} {flight.sI[0].fD.fN}</div>
            <div>Price: ${flight.totalPriceList[flight.selectedPriceIndex].fd.ADULT.fC.TF}</div>
          </div>
        </div>
      ))}
      <div className="font-bold text-lg mb-4">Total Price: ${totalPrice}</div>
      <button onClick={onBook} className="btn btn-primary w-full">Book Now</button>
    </div>
  );
};

export default BookingCard;
