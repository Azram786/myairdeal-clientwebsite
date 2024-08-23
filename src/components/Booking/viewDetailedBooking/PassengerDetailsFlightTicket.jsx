// import React from "react";

// const PassengerDetailsFlightTicket = ({ passengerDetails }) => {
//     console.log({passengerDetails})
//     return (
//         <div className="flex flex-wrap gap-2 text-xs">
//             {passengerDetails.map((value, index) => (
//                 <div key={index} className="border border-gray-300 rounded p-2 w-full
//      flex justify-between
//          ">
//                     <div className="flex flex-col justify-between mb-1">
//                         <span className="font-bold">{value.ti} {value.fN} {value.lN}</span>
//                         <span className="text-gray-600">PNR: {value.pnrDetails["CCU-IXZ"]}</span>
//                         <span>Passport: {value.pNum}</span>
//                         <span>Nationality: {value.pNat}</span>
//                         <span>DOB: {value.dob}</span>
//                         <span>Expiry: {value.eD}</span>
//                     </div>
//                     <div className="mb-1">
//                         {Object.keys(value.pnrDetails).map((segment) => (
//                             <div key={segment} className="mb-1">
//                                 <div className="flex justify-between">
//                                     <span>{segment}</span>
//                                     <span>Ticket: {value.ticketNumberDetails[segment]}</span>
//                                 </div>
//                                 {/* {value.ssrMealInfos[segment] && (
//                                     <div className="text-[11px]">
//                                         Meal: {value.ssrMealInfos[segment].desc} ({value.ssrMealInfos[segment].code})
//                                     </div>
//                                 )} */}
//                                 {/* <div className="text-[11px]">
//                                     {value.checkinStatusMap[segment] ? 'Checked In' : 'Not Checked In'}
//                                 </div> */}
//                             </div>
//                         ))}
//                     </div>
//                     <div className="mb-1">
//                         {Object.keys(value.pnrDetails).map((segment) => (
//                             <div key={segment} className="mb-1">
//                                 <div className="flex justify-between">
//                                     <span>{segment}</span>
//                                     {/* <span>Ticket: {value.ticketNumberDetails[segment]}</span> */}
//                                     {value.ssrMealInfos[segment] && (
//                                         <div className="text-[11px]">
//                                              {value.ssrMealInfos[segment].desc} ({value.ssrMealInfos[segment].code})
//                                         </div>
//                                     )}
//                                 </div>
//                                 {/* <div className="text-[11px]">
//                                     {value.checkinStatusMap[segment] ? 'Checked In' : 'Not Checked In'}
//                                 </div> */}
//                             </div>
//                         ))}
//                     </div>

//                 </div>
//             ))}
//         </div>
//     );
// };

// export default PassengerDetailsFlightTicket;
import React from "react";

const PassengerDetailsTable = ({ passengerDetails }) => {
    return (
        <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-bold mb-4">Passenger Details ({passengerDetails.length})</h2>
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="text-left p-2">Sr.</th>

                        <th className="text-left p-2">Name, DOB & Passport & FF</th>
                        <th className="text-left p-2">PNR, Ticket No. & Status</th>
                        <th className="text-left p-2">Meal, Baggage, Seat & Other Preference</th>
                        {/* <th className="text-left p-2">Document Id</th> */}
                    </tr>
                </thead>
                <tbody>
                    {passengerDetails.map((passenger, index) => (
                        <tr key={index} className="border-b w-full text-sm">
                            <td className="p-2">{index + 1}</td>

                            <td className="p-2 w-1/3">
                                {passenger?.ti} {passenger?.fN.toUpperCase()} {passenger.lN.toUpperCase()} ({passenger.pt[0]})
                                <br />
                                <span className="text-gray-600 text-[.8rem]"> DOB:{passenger?.dob} | PM: {passenger?.pNum}|</span>

                                <span className="block text-gray-600 text-[.8rem]"> N: {passenger?.pNat} | ID:{passenger?.pid} | ED :{passenger?.eD}</span>
                            </td>
                            <td className="p-2">
                                {Object.keys(passenger.pnrDetails).map((segment) => (
                                    <div key={segment}>
                                        {segment}: <span className="text-green-500">{passenger.pnrDetails[segment]}</span> ({passenger.ticketNumberDetails[segment]})
                                    </div>
                                ))}
                            </td>
                            <td className="p-2  flex ">
                                {Object.keys(passenger.ssrMealInfos).map((segment) => (
                                    <div key={segment}>
                                        {segment}: <span className="text-green-500">{passenger.ssrMealInfos[segment].desc}</span> , Seat: <span className="text-green-500">{segment === "CCU-IXZ" ? "25C" : "N/A"}</span>
                                    </div>
                                ))}
                            </td>
                            {/* <td className="p-2">NA</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PassengerDetailsTable;
