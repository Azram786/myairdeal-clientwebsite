// import React from "react";

// const PassengerDetailsFlightTicket = ({ passengerDetails }) => {
//   return (
//     <div className="bg-[#1B1D29] text-white p-6 rounded-lg shadow-md">
//       {passengerDetails.map((value, index) => (
//         <div
//           key={index}
//           className="bg-[#2A2D3B] p-4 my-4 rounded-lg shadow-md"
//         >
//           {/* Passenger Info */}
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-bold">
//               {value.ti} {value.fN} {value.lN}
//             </h3>
//             <span className="text-sm text-[#D7B56D]">PNR: {value.pnrDetails["CCU-IXZ"]}</span>
//           </div>

//           {/* Flight Segments */}
//           {Object.keys(value.pnrDetails).map((segment) => (
//             <div key={segment} className="mb-4">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <span className="block text-sm text-[#D7B56D]">{segment}</span>
//                   <span className="block text-sm">
//                     Ticket No: {value.ticketNumberDetails[segment]}
//                   </span>
//                   {value.ssrMealInfos[segment] && (
//                     <span className="block text-sm">
//                       Meal: {value.ssrMealInfos[segment].desc} (Code: {value.ssrMealInfos[segment].code})
//                     </span>
//                   )}
//                 </div>
//                 <div>
//                   <span className={`block text-sm ${value.checkinStatusMap[segment] ? 'text-green-500' : 'text-red-500'}`}>
//                     {value.checkinStatusMap[segment] ? 'Checked In' : 'Not Checked In'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Passport Details */}
//           <div className="border-t border-[#D7B56D] pt-4">
//             <div className="text-sm">
//               <p>Passport Number: {value.pNum}</p>
//               <p>Nationality: {value.pNat}</p>
//               <p>Date of Birth: {value.dob}</p>
//               <p>Expiry Date: {value.eD}</p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PassengerDetailsFlightTicket;
import React from "react";

const PassengerDetailsFlightTicket = ({ passengerDetails }) => {
  return (
    <div className="bg-[#1B1D29] text-white p-4 rounded-lg shadow-md">
      {passengerDetails.map((value, index) => (
        <div key={index} className="bg-[#2A2D3B] p-2 my-2 rounded-lg shadow-md">
          {/* Passenger Info */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold">
              {value.ti} {value.fN} {value.lN}
            </h3>
            <span className="text-xs text-[#D7B56D]">PNR: {value.pnrDetails["CCU-IXZ"]}</span>
          </div>

          {/* Flight Segments */}
          {Object.keys(value.pnrDetails).map((segment) => (
            <div key={segment} className="mb-2">
              <div className="flex justify-between items-center">
                <div className="text-xs">
                  <span className="block text-[#D7B56D]">{segment}</span>
                  <span>Ticket: {value.ticketNumberDetails[segment]}</span>
                  {value.ssrMealInfos[segment] && (
                    <span> | Meal: {value.ssrMealInfos[segment].desc}</span>
                  )}
                </div>
                <div>
                  <span
                    className={`block text-xs ${
                      value.checkinStatusMap[segment] ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {value.checkinStatusMap[segment] ? "Checked In" : "Not Checked In"}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Passport Details */}
          <div className="border-t border-[#D7B56D] pt-2 mt-2">
            <div className="text-xs">
              <p>Passport: {value.pNum}</p>
              <p>Nationality: {value.pNat}</p>
              <p>DOB: {value.dob}</p>
              <p>Expiry: {value.eD}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PassengerDetailsFlightTicket;

