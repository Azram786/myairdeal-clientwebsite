// import React from "react";
// import { MdFlight } from "react-icons/md";
// import { FaArrowRight, FaRegClock } from "react-icons/fa";
// import ProgressBar from "./ProgressBar";

// const Review = ({ setCurrentStep, data, passengersData }) => {
//   console.log(passengersData, "passneger");
//   const calculateLayoverTime = (segments) => {
//     if (segments.length <= 1) return null;
//     let totalLayoverTime = 0;
//     for (let i = 0; i < segments.length - 1; i++) {
//       const arrivalTime = new Date(segments[i].at);
//       const departureTime = new Date(segments[i + 1].dt);
//       totalLayoverTime += (departureTime - arrivalTime) / (1000 * 60);
//     }
//     const hours = Math.floor(totalLayoverTime / 60);
//     const minutes = Math.round(totalLayoverTime % 60);
//     return `${hours}h ${minutes}m`;
//   };

//   const calculateTotalDuration = (segments) => {
//     if (!segments || segments.length === 0) return "N/A";
//     let totalDuration = 0;
//     for (let i = 0; i < segments.length; i++) {
//       totalDuration += segments[i].duration;
//       if (i < segments.length - 1) {
//         const arrivalTime = new Date(segments[i].at);
//         const departureTime = new Date(segments[i + 1].dt);
//         const layoverTime = (departureTime - arrivalTime) / (1000 * 60);
//         totalDuration += layoverTime;
//       }
//     }
//     const hours = Math.floor(totalDuration / 60);
//     const minutes = Math.round(totalDuration % 60);
//     return `${hours}h ${minutes}m`;
//   };

//   return (
//     <div className="sm:text-sm md:text-lg p-2 ">
//       <div className="font-poppins">
//         <div className="w-full max-w-full rounded-lg bg-white p-2 space-y-4">
//           {/* Flight Summary Section */}
//           <div className="border-b pb-4">
//             {data?.tripInfos?.map((item, index) => (
//               <div
//                 key={index}
//                 className="border border-gray-300  rounded-lg p-2 mb-4"
//               >
//                 <div className="flex flex-col sm:flex-row items-center justify-between bg-blue-200 p-2 rounded-t-lg">
//                   <div className="text-base sm:text-lg font-bold flex items-center">
//                     <span>{item.sI[0].da.city}</span>
//                     <FaArrowRight className="mx-2 hidden sm:inline" />
//                     <span>{item.sI[item.sI.length - 1].aa.city}</span>
//                     <div className="text-gray-600 text-sm mt-1 sm:mt-0 sm:ml-2">
//                       On{" "}
//                       {new Date(item.sI[0].dt).toLocaleDateString("en-US", {
//                         weekday: "short",
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </div>
//                   </div>
//                   <div className="text-base sm:text-lg font-semibold text-gray-600 flex items-center">
//                     <FaRegClock className="mr-2" />
//                     {calculateTotalDuration(item.sI)}
//                   </div>
//                 </div>
//                 <div className="mt-4">
//                   {item.sI.map((segment, segmentIndex) => (
//                     <React.Fragment key={segmentIndex}>
//                       <div className="flex items-center justify-between mb-4">
//                         <div className="flex-col w-1/3">
//                           <div className="w-full">
//                             <div className="mb-2">
//                               <div className="font-semibold text-xs border rounded-md inline-flex items-center shadow-md p-1 space-x-2">
//                                 <div className="w-8 h-8">
//                                   <img
//                                     src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${segment.fD.aI.code}.png`}
//                                     onError={(e) =>
//                                       (e.currentTarget.src = defaultAirline)
//                                     }
//                                     alt={segment?.fD?.aI?.code}
//                                     className="w-full h-full object-contain"
//                                   />
//                                 </div>
//                                 <div>
//                                   <div>{segment.fD.aI.name}</div>
//                                   <div className="flex items-center space-x-1">
//                                     <span>
//                                       {segment.fD.aI.code}-{segment.fD.fN}
//                                     </span>
//                                     <MdFlight className="w-3 h-3 rotate-45" />
//                                     <span>{segment.fD.eT}</span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="text-lg font-bold">
//                             {segment.da.code}
//                           </div>
//                           <div className="text-sm">
//                             {segment.da.city}, {segment.da.country}
//                           </div>
//                           <div className="text-sm">{segment.da.name}</div>
//                           <div className="text-sm">{segment.da.terminal}</div>
//                           <div className="text-sm font-semibold">
//                             {new Date(segment.dt).toLocaleTimeString([], {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                               hour12: true,
//                             })}
//                           </div>
//                         </div>
//                         <div className="flex-col items-center w-1/3">
//                           <div className="text-center">
//                             <span className="text-sm">
//                               {(() => {
//                                 const totalMinutes = segment.duration;
//                                 const hours = Math.floor(totalMinutes / 60);
//                                 const minutes = totalMinutes % 60;
//                                 return `${hours}h ${minutes}m`;
//                               })()}
//                             </span>
//                           </div>
//                           <div className="flex justify-center items-center">
//                             <hr className="w-1/3 border-t border-gray-300" />
//                             <MdFlight className="w-7 h-5 mx-2 rotate-90" />
//                             <hr className="w-1/3 border-t border-gray-300" />
//                           </div>
//                           <div className="text-center text-sm">
//                             {item.sI.length === 1 ? "Non Stop" : "Connection"}
//                           </div>
//                         </div>
//                         <div className="flex-col w-1/3 text-right">
//                           <div className="text-lg font-bold">
//                             {segment.aa.code}
//                           </div>
//                           <div className="text-sm">
//                             {segment.aa.city}, {segment.aa.country}
//                           </div>
//                           <div className="text-sm">{segment.aa.name}</div>
//                           <div className="text-sm">{segment.aa.terminal}</div>
//                           <div className="text-sm font-semibold">
//                             {new Date(segment.at).toLocaleTimeString([], {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                               hour12: true,
//                             })}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="text-sm text-gray-500 mt-4">
//                         <span>
//                           There is a Special No Meal fare Provided by the
//                           Airline
//                         </span>
//                         {segmentIndex !== item.sI.length - 1 && (
//                           <div className="flex justify-between bg-blue-900 text-white p-3 rounded-md mt-4 mb-4">
//                             <div className="text-sm">
//                               Require to change plane
//                             </div>
//                             <div className="text-base font-medium">
//                               <span className="text-sm">
//                                 {item.sI.length > 1 && (
//                                   <div className="text-center">
//                                     <span className="text-sm">
//                                       Total Layover Time:{" "}
//                                       {calculateLayoverTime(item.sI)}
//                                     </span>
//                                   </div>
//                                 )}
//                               </span>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </React.Fragment>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Passenger & Contact Details Section */}
//           <div className="mb-6">
//             <h2 className="text-xl font-bold mb-4">Passenger Details</h2>
//             <table className="min-w-full bg-white border border-gray-300 rounded-lg">
//               <thead>
//                 <tr className="bg-gray-100 text-left">
//                   <th className="py-2 px-4 border-b">First Name</th>
//                   <th className="py-2 px-4 border-b">Last Name</th>
//                   <th className="py-2 px-4 border-b">Passenger Type</th>
//                   <th className="py-2 px-4 border-b">Selected Seats</th>
//                   <th className="py-2 px-4 border-b">Selected Meals</th>
//                   <th className="py-2 px-4 border-b">Baggage</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {passengersData?.passengers?.map((passenger, index) => (
//                   <tr key={index}>
//                     <td className="py-2 px-4 border-b">
//                       {passenger.firstName}
//                     </td>
//                     <td className="py-2 px-4 border-b">{passenger.lastName}</td>
//                     <td className="py-2 px-4 border-b">
//                       {passenger.passengerType}
//                     </td>
//                     <td className="py-2 px-4 border-b">
//                       {Object.entries(passenger.selectedSeats || {}).map(
//                         ([flightId, seat]) => (
//                           <div key={flightId}>
//                             Flight {flightId}: {seat.code}
//                           </div>
//                         )
//                       )}
//                     </td>
//                     <td className="py-2 px-4 border-b">
//                       {Object.entries(passenger.selectedMeals || {}).map(
//                         ([flightId, meal]) => (
//                           <div key={flightId}>
//                             Flight {flightId}: {meal.code} (₹{meal.amount})
//                           </div>
//                         )
//                       )}
//                     </td>
//                     <td className="py-2 px-4 border-b">
//                       {Object.entries(passenger.baggage || {}).map(
//                         ([flightId, bag]) => (
//                           <div key={flightId}>
//                             Flight {flightId}: {bag.details}
//                           </div>
//                         )
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="flex justify-between items-center bg-gray-200 p-2 rounded-lg shadow-md mt-4">
//             <button
//               onClick={() => setCurrentStep(1)}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
//             >
//               Back
//             </button>
//             <button
//               onClick={() => setCurrentStep(3)}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
//             >
//               Continue to Payment
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Review;

import React from "react";
import { MdFlight } from "react-icons/md";
import { FaArrowRight, FaRegClock } from "react-icons/fa";
import ProgressBar from "./ProgressBar";

const Review = ({ setCurrentStep, data, passengersData }) => {
  console.log(setCurrentStep, data, passengersData, "passenger");
  console.log(data, "DATA FROM REVIEW");

  const renderValue = (value) => value || "N/A";

  const renderObjectEntries = (obj, renderFunction) => {
    if (!obj || Object.keys(obj).length === 0) return "N/A";
    return Object.entries(obj).map(([flightId, data]) => (
      <div key={flightId}>{renderFunction(flightId, data)}</div>
    ));
  };

  const calculateLayoverTime = (segments) => {
    if (segments.length <= 1) return null;
    let totalLayoverTime = 0;
    for (let i = 0; i < segments.length - 1; i++) {
      const arrivalTime = new Date(segments[i].at);
      const departureTime = new Date(segments[i + 1].dt);
      totalLayoverTime += (departureTime - arrivalTime) / (1000 * 60);
    }
    const hours = Math.floor(totalLayoverTime / 60);
    const minutes = Math.round(totalLayoverTime % 60);
    return `${hours}h ${minutes}m`;
  };

  const calculateTotalDuration = (segments) => {
    if (!segments || segments.length === 0) return "N/A";
    let totalDuration = 0;
    for (let i = 0; i < segments.length; i++) {
      totalDuration += segments[i].duration;
      if (i < segments.length - 1) {
        const arrivalTime = new Date(segments[i].at);
        const departureTime = new Date(segments[i + 1].dt);
        const layoverTime = (departureTime - arrivalTime) / (1000 * 60);
        totalDuration += layoverTime;
      }
    }
    const hours = Math.floor(totalDuration / 60);
    const minutes = Math.round(totalDuration % 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    // <div className="bg-gray-100 sm:text-sm md:text-lg p-2">
    <div className="mx-auto max-w-5xl  font-poppins mb-2">
      {/* <div className="w-full max-w-full rounded-lg bg-white p-2 space-y-4"> */}

      {/* Flight Summary Section */}
      <div className="border-b  border-gray-300 pb-4">
        {data?.tripInfos?.map((item, index) => (
          <div
            key={index}
            className="border  shadow-sm border-gray-300 rounded-lg p-2 mb-4"
          >
            {/* <div className="flex flex-col sm:flex-row items-center justify-between bg-blue-200 p-2 rounded-t-lg mb-2">
              <div className="text-base sm:text-lg font-bold flex items-center">
                <span>{item.sI[0].da.city}</span>
                <FaArrowRight className="mx-2 hidden sm:inline" />
                <span>{item.sI[item.sI.length - 1].aa.city}</span>
                <div className="text-gray-600 text-sm mt-1 sm:mt-0 sm:ml-2">
                  On{" "}
                  {new Date(item.sI[0].dt).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className="text-base sm:text-lg font-semibold text-gray-600 flex items-center">
                <FaRegClock className="mr-2" />
                {calculateTotalDuration(item.sI)}
              </div>
            </div> */}
            <div className="mt-4">
              {item.sI.map((segment, segmentIndex) => (
                <React.Fragment key={segmentIndex}>
                  <div className="  w-full">
                    <div className=" mb-2">
                      <div className="font-semibold text-xs border rounded-md inline-flex items-center shadow-md p-1 space-x-2">
                        <div className="w-8 h-8">
                          <img
                            src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${segment.fD.aI.code}.png`}
                            onError={(e) =>
                              (e.currentTarget.src = defaultAirline)
                            }
                            alt={segment?.fD?.aI?.code}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <div>{segment.fD.aI.name}</div>
                          <div className="flex items-center space-x-1">
                            <span>
                              {segment.fD.aI.code}-{segment.fD.fN}
                            </span>
                            <MdFlight className="w-3 h-3 rotate-45" />
                            <span>{segment.fD.eT}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" flex-wrap md:flex-nowrap w-full overflow-x-auto flex items-center justify-between mb-4">
                    <div className=" flex-col text-left items-center w-full  md:min-w-[250px]">
                      <div className=" text-lg font-bold">
                        {segment.da.code}
                      </div>

                      <div className="text-sm font-semibold">
                        {new Date(segment.dt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                        ,
                        {new Date(segment.dt).toLocaleDateString("en-US", {
                         year:"numeric",
                        })},
                        {new Date(segment.dt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </div>
                      <div className="text-sm">
                        {segment.da.city}, {segment.da.country}
                      </div>
                      <div className="text-sm">{segment.da.name}</div>
                      <div className="text-sm">{segment.da.terminal || "N/A"}</div>
                    </div>
                    <div className="flex-col items-center   w-full md:min-w-[250px]">
                      <div className="text-center">
                        <span className="text-xs">
                          {(() => {
                            const totalMinutes = segment.duration;
                            const hours = Math.floor(totalMinutes / 60);
                            const minutes = totalMinutes % 60;
                            return `${hours}h ${minutes}m`;
                          })()}
                        </span>
                      </div>
                      <div className="flex justify-center items-center">
                        <hr className="w-1/3 border-t border-gray-300" />
                        <MdFlight className="w-7 h-5 mx-2 rotate-90" />
                        <hr className="w-1/3 border-t border-gray-300" />
                      </div>
                      <div className="text-center text-sm">
                        {/* {item.sI.length === 1 ? "Non Stop" : "Connection"} */}
                        <div className="font-bold text-sm">
                          {data?.searchQuery?.cabinClass || "No-Class"}
                        </div>
                        <p className="text-xs">Non Stop</p>
                      </div>
                    </div>
                    <div className="flex-col  w-full md:min-w-[250px]  md:ml-24 items-center text-left  ">
                      <div className="text-lg font-bold">{segment.aa.code}</div>
                      <div className="text-sm font-semibold">
                        {new Date(segment.dt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                        ,
                        {new Date(segment.dt).toLocaleDateString("en-US", {
                         year:"numeric",
                        })},
                        {new Date(segment.at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </div>
                      <div className="text-sm">
                        {segment.aa.city}, {segment.aa.country}
                      </div>
                      <div className="text-sm">{segment.aa.name}</div>
                      <div className="text-sm">
                        {segment?.aa?.terminal || "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-4">
                    {/* <span>
                      There is a Special No Meal fare Provided by the Airline
                    </span> */}
                    {segmentIndex !== item.sI.length - 1 && (
                      <div className="flex justify-between bg-blue-900 text-white p-3 rounded-md mt-4 mb-4">
                        <div className="text-sm">Require to change plane</div>
                        <div className="text-base font-medium">
                          <span className="text-sm">
                            {item.sI.length > 1 && (
                              <div className="text-center">
                                <span className="text-sm">
                                  Total Layover Time:{" "}
                                  {calculateLayoverTime(item.sI)}
                                </span>
                              </div>
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Passenger & Contact Details Section */}
      <div className="mb-6 overflow-x-scroll">
        <h2 className="text-xl font-semibold mb-4 mt-2">Passenger Details</h2>
        <div className="overflow-auto">
          <table className="min-w-full bg-white  rounded-lg">
            <thead className="sticky top-0 bg-gray-100">
              <tr className="text-left">
                <th className="py-2 px-4  text-sm w-max md:min-w-[11rem]">Sl No</th>
                <th className="py-2 px-4  text-sm w-max md:min-w-[11rem]">Name</th>
                <th className="py-2 px-4 text-sm w-max md:min-w-[11rem]">
                  Seat Booking
                </th>
                <th className="py-2 px-4 text-sm w-max md:min-w-[11rem]">
                  Meal and Baggage
                </th>
              </tr>
            </thead>
            <tbody>
              {passengersData?.passengers?.map((passenger, index) => (
                <tr key={index} className=" h-24 border-t">
                  <td className="py-2 px-4 border-b text-xs min-w-[11rem]">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b text-xs min-w-[11rem]">
                    {`${renderValue(passenger.firstName)} ${renderValue(
                      passenger.lastName
                    )}`}
                  </td>
                  <td className="py-2 px-4 border-b text-xs min-w-[11rem]">
                    {/* Seat Booking - Leave this cell empty */}
                  </td>
                  <td className="py-2 px-4 border-b text-xs min-w-[11rem]">
                    <div>
                      <div>
                        {renderObjectEntries(
                          passenger.selectedMeals,
                          (flightId, meal) =>
                            `Meal: Flight ${flightId}: ${meal.code} (₹${meal.amount})`
                        )}
                      </div>
                      <div>
                        {renderObjectEntries(
                          passenger.baggage,
                          (flightId, bag) =>
                            `Baggage: Flight ${flightId}: ${bag.details}`
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center bg-gray-200 p-2 rounded-lg shadow-md mt-4">
        <button
          onClick={() => setCurrentStep(1)}
          className="bg-[#007EC4] hover:bg-blue-600 text-white font-bold text-base py-2 px-4 rounded-md focus:outline-none"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          className="bg-[#007EC4] hover:bg-blue-600 text-base text-white font-bold py-2 px-4 rounded-md focus:outline-none"
        >
          Continue to Payment
        </button>
      </div>
      {/* </div> */}
      {/* </div> */}
    </div>
    // <div className="mx-auto max-w-5xl bg-red-400 font-poppins mb-2 ">
    //   <div className="w-full bg-green-400 ">
    //     <div className="flex ">
    //       <div className="flex justify-center items-center max-h-36">
    //         <div className="w-32 h-32 m-2 bg-red-800"></div>
    //         <div className="p-2"><p>Classtype</p>
    //         <p>Airline</p>
    //         <p>Checkin Details</p></div>

    //       </div>
    //     </div>
    //   </div>
    //   <div></div>
    //   <div></div>
    // </div>
  );
};

export default Review;
