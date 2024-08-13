// import React, { useEffect, useState } from "react";
// import ReactToast from "../util/ReactToast";

// const SeatMap = ({ Passengers, flightData, booking }) => {
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [flightId, setFlightId] = useState("");
//   const [flightDetails, setFlightDetails] = useState({});
//   const [sData, setSData] = useState(null);
//   const [sInfo, setSInfo] = useState([]);

//   console.log(booking.tripSeatMap,flightData,"dle")
//   useEffect(() => {
//     if (flightData && booking) {
//       const firstFlightId = flightData.tripInfos[0].sI[0].id;
//       console.log(firstFlightId,"id")
//       setFlightId(firstFlightId);

//       const flightInfo = flightData.tripInfos[0].sI[0];
//       setFlightDetails({
//         airline: flightInfo.fD.aI.name,
//         flightNumber: flightInfo.fD.fN,
//         flightClass: flightData.tripInfos[0].cabinClass,
//         departure: flightInfo.da.cityCode,
//         arrival: flightInfo.aa.cityCode,
//         departureTime: new Date(flightInfo.dt).toLocaleTimeString(),
//         arrivalTime: new Date(flightInfo.at).toLocaleTimeString(),
//       });

//       const tripSeat = booking?.tripSeatMap?.tripSeat[firstFlightId];
//       if (tripSeat) {
//         setSData(tripSeat.sData);
//         setSInfo(tripSeat.sInfo);
//       }
//     }
//   }, [flightData, booking]);

//   // for select the seats
//   const toggleSeat = (seat) => {
//     if (!seat.isBooked) {
//       setSelectedSeats((prevSeats) => {
//         if (prevSeats.find((s) => s.seatNo === seat.seatNo)) {
//           return prevSeats.filter((s) => s.seatNo !== seat.seatNo);
//         } else if (prevSeats.length < Passengers.length) {
//           return [...prevSeats, seat];
//         } else {
//           ReactToast("Please remove a selected seat before choosing a new one");
//           return prevSeats;
//         }
//       });
//     }
//   };

//   // checking seat selected or not
//   const isSeatSelected = (seatNo) =>
//     selectedSeats.some((seat) => seat.seatNo === seatNo);

//   // to render the seat based on the requirements
//   const renderSeat = (seat) => {
//     let className =
//       "w-10 h-10 m-1 rounded-md flex items-center justify-center text-xs font-semibold transition-colors duration-200 ";

//       // for booked seat
//     if (seat.isBooked) {
//       className += "bg-gray-400 cursor-not-allowed";
//     } else if (isSeatSelected(seat.seatNo)) {
//       className += "bg-blue-500 text-white";
//     } else {
//       // while hover
//       className += "bg-white hover:bg-gray-200";
//     }

//     // seat which have more leg space
//     if (seat.isLegroom) {
//       className += " border-t-8 border-green-500";
//     }

//     // leave the passage space between the seats

//     if (seat.isAisle) {
//       className += " mr-4";
//     }

//     return (
//       <button
//         key={seat.seatNo}
//         className={className}
//         onClick={() => toggleSeat(seat)}
//         disabled={seat.isBooked}
//       >
//         {seat.isBooked || isSeatSelected(seat.seatNo)
//           ? seat.seatNo
//           : `${seat.amount}`}
//       </button>
//     );
//   };

//   const renderSeatMap = () => {
//     if (!sData || !sInfo) {
//       return <div>Loading seat map...</div>;
//     }

//     const rows = [];
//     for (let i = 1; i <= sData.row; i++) {
//       const rowSeats = sInfo.filter((seat) => seat.seatPosition.row === i);
//       rows.push(
//         <div key={i} className="flex justify-center">
//           {rowSeats.map(renderSeat)}
//         </div>
//       );
//     }
//     return rows;
//   };

//   return (
//     <div className="container mx-auto ">
//       <div className="flex flex-col gap-6 md:flex-row w-full justify-around">
//         {/* First portion for displaying the data - make it sticky */}
//         <div className="md:sticky md:top-0 md:self-start md:min-h-screen bg-white md:w-1/4 border-r-2 flex flex-col">
//           <div className="flex-grow overflow-y-auto">
//             <div className="px-3 py-2">
//               <p className="font-semibold">Seat Selection</p>
//               <div className="border-b flex py-2 justify-between">
//                 <div className="rounded-md size-12 bg-slate-500">
//                   <img src={`https://imgs.search.brave.com/U7iB7Tg2MoOIZQEb7mbNXcBpgSlR7hdspQUeW6-AmBw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9k/L2QwL0VtaXJhdGVz/X2xvZ28uc3Zn`} alt={`logo`} />
//                 </div>
//                 <div>
//                   <p className="font-semibold">{flightDetails?.airline}</p>
//                   <span className="w-full flex gap-2 justify-center">
//                     <p>{flightDetails?.departure} - {flightDetails?.arrival}</p>
//                     <p>{flightDetails?.flightClass}</p>
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-6 md:max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
//               <div className="grid w-full grid-cols-3">
//                 <div className="flex flex-col justify-start items-center">
//                   <h1 className="font-semibold">Passengers</h1>
//                   <div className="flex flex-col">
//                     {Passengers.map((person) => (
//                       <p key={person.name} className="truncate w-20">
//                         {person?.name}
//                       </p>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="flex flex-col justify-start items-center">
//                   <h1 className="font-semibold">Seat</h1>
//                   <div className="flex flex-col">
//                     {selectedSeats?.map((seat) => (
//                       <p key={seat.seatNo} className="truncate">
//                         {seat?.seatNo}
//                       </p>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="flex flex-col justify-start items-center">
//                   <h1 className="font-semibold">Fee</h1>
//                   <div>
//                     {selectedSeats?.map((seat) => (
//                       <p key={seat.seatNo} className="truncate">
//                         $ {seat?.amount}
//                       </p>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Total and Proceed button - always visible */}
//           <div className="mt-auto flex flex-col items-center justify-center p-4 bg-white">
//             <div className="grid grid-cols-3 w-full">
//               <div>
//                 <h2 className="font-semibold">Total</h2>
//               </div>
//               <div>{`    `}</div>
//               <div>
//                 $ {selectedSeats.reduce((sum, seat) => sum + seat.amount, 0)}/-
//               </div>
//             </div>
//             <button

//               className={`mt-3 w-[60%] bg-green-500 text-white px-6 py-2 ${selectedSeats.length==0?'cursor-not-allowed bg-opacity-50':'cursor-pointer hover:bg-green-600'} rounded-md  transition-colors duration-200`}
//               disabled={selectedSeats?.length <= 0}
//             >
//               Proceed
//             </button>
//           </div>
//         </div>

//         {/*  Second portion - the seats interface */}
//         <div className="bg-gray-100 md:w-2/4 p-4 rounded-lg overflow-x-auto">
//           {renderSeatMap()}
//         </div>

//         {/*  Third Portion to display the Identifiers*/}
//         <div className="text-sm md:sticky md:top-0 md:self-start md:min-h-screen border-l-2 md:w-1/4 flex flex-col space-y-3 items-center md:items-start  p-4">
//         <h1 className="font-semibold">Seat Status</h1>
//           <div className="w-full grid grid-cols-2 md:grid-cols-1">
//             <div className="w-full sm:w-1/2 flex items-center ml-4 md:ml-0 mb-3">
//               <span className="inline-block w-4 h-4 bg-white border mr-2"></span>
//               <p>Available</p>
//             </div>
//             <div className="w-full sm:w-1/2 flex items-center ml-4 md:ml-0 mb-3">
//               <span className="inline-block w-4 h-4 bg-gray-400 mr-2"></span>
//               <p>Booked</p>
//             </div>
//             <div className="w-full sm:w-1/2 flex items-center ml-4 md:ml-0 mb-3">
//               <span className="inline-block w-4 h-4 bg-white border-t-8 border-t-green-500 mr-2 border border-slate-100"></span>
//               <p>Extra Legroom</p>
//             </div>
//             <div className="w-full sm:w-1/2 flex items-center ml-4 md:ml-0 mb-3">
//               <span className="inline-block w-4 h-4 bg-blue-500 mr-2"></span>
//               <p>Selected</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeatMap;

// import React, { useEffect, useState } from "react";
// import ReactToast from "../Util/ReactToast";
// import defaultAirline from "../../../assets/home/logo/defaultAirline.png";

// const SeatMap = ({
//   Passengers,
//   flightData,
//   booking,
//   onSeatSelect,
//   setModalClose,
//   flightId,
// }) => {
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [flightDetails, setFlightDetails] = useState({});
//   const [sData, setSData] = useState(null);
//   const [sInfo, setSInfo] = useState([]);

//   console.log(flightId,"heooeooeoeoeoeoeoeoeoeo")
//   useEffect(() => {
//     if (flightData && booking && flightId) {
//       const flightInfo = flightData.tripInfos
//         .flatMap((trip) => trip.sI)
//         .find((segment) => segment.id === flightId);

//       console.log(flightInfo, "ho77777777777777777");
//       if (flightInfo) {
//         setFlightDetails({
//           airline: flightInfo.fD?.aI?.name,
//           flightNumber: flightInfo?.fD.fN,
//           flightCode: flightInfo?.fD?.aI?.code,
//           flightClass: flightData.tripInfos.find((trip) =>
//             trip.sI.some((segment) => segment.id === flightId)
//           )?.cabinClass,
//           departure: flightInfo.da.cityCode,
//           arrival: flightInfo.aa.cityCode,
//           departureTime: new Date(flightInfo.dt).toLocaleTimeString(),
//           arrivalTime: new Date(flightInfo.at).toLocaleTimeString(),
//         });

//         const tripSeat = booking?.tripSeatMap?.tripSeat[flightId];
//         if (tripSeat) {
//           setSData(tripSeat.sData);
//           setSInfo(tripSeat.sInfo);
//         }
//       }
//     }
//   }, [flightData, booking, flightId]);

//   const toggleSeat = (seat) => {
//     if (!seat.isBooked) {
//       setSelectedSeats((prevSeats) => {
//         const seatIndex = prevSeats.findIndex((s) => s.code === seat.seatNo);

//         if (seatIndex !== -1) {
//           const updatedSeats = prevSeats.filter((s) => s.code !== seat.seatNo);
//           onSeatSelect(updatedSeats.length, null);
//           return updatedSeats;
//         } else if (prevSeats.length < Passengers.length) {
//           const newSeat = {
//             key: flightId,
//             code: seat.seatNo,
//             amount: seat.amount,
//           };
//           const updatedSeats = [...prevSeats, newSeat];
//           onSeatSelect(updatedSeats.length - 1, newSeat);
//           return updatedSeats;
//         } else {
//           ReactToast("Please remove a selected seat before choosing a new one");
//           return prevSeats;
//         }
//       });
//     }
//   };

//   const isSeatSelected = (seatNo) =>
//     selectedSeats.some((seat) => seat.code === seatNo);

//   const renderSeat = (seat) => {
//     let className =
//       "w-10 h-10 m-1 rounded-md flex items-center justify-center text-xs font-semibold transition-colors duration-200 ";

//     if (seat.isBooked) {
//       className += "bg-gray-400 cursor-not-allowed";
//     } else if (isSeatSelected(seat.seatNo)) {
//       className += "bg-blue-500 text-white";
//     } else {
//       className += "bg-white hover:bg-gray-200";
//     }

//     if (seat.isLegroom) {
//       className += " border-t-8 border-green-500";
//     }

//     if (seat.isAisle) {
//       className += " mr-4";
//     }

//     return (
//       <button
//         key={seat.seatNo}
//         className={className}
//         onClick={() => toggleSeat(seat)}
//         disabled={seat.isBooked}
//       >
//         {seat.isBooked || isSeatSelected(seat.seatNo)
//           ? seat.seatNo
//           : `${seat.amount}`}
//       </button>
//     );
//   };

//   const renderSeatMap = () => {
//     if (!sData || !sInfo) {
//       return <div>Loading seat map...</div>;
//     }

//     const rows = [];
//     for (let i = 1; i <= sData.row; i++) {
//       const rowSeats = sInfo.filter((seat) => seat.seatPosition.row === i);
//       rows.push(
//         <div key={i} className="flex justify-center">
//           {rowSeats.map(renderSeat)}
//         </div>
//       );
//     }
//     return rows;
//   };

//   const handleProceed = () => {
//     selectedSeats.forEach((seat, index) => {
//       onSeatSelect(index, seat);
//     });

//     setModalClose(false);
//   };

//   return (
//     <div className="container mx-auto ">
//       <div className="flex flex-col gap-6 md:flex-row w-full justify-around">
//         {/* First portion for displaying the data - make it sticky */}
//         <div className="md:sticky md:top-0 md:self-start md:min-h-screen bg-white md:w-1/4 border-r-2 flex flex-col">
//           <div className="flex-grow overflow-y-auto">
//             <div className="px-3 py-2">
//               <p className="font-semibold">Seat Selection</p>
//               <div className="border-b flex py-2 justify-between">
//                 <div className="rounded-md size-12 bg-slate-500">
//                   <img
//                     src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${flightDetails?.flightCode}.png`}
//                     onError={(e) => (e.currentTarget.src = defaultAirline)}
//                     alt={flightDetails?.flightCode}
//                     className="w-12 h-12 mr-6"
//                   />
//                 </div>
//                 <div>
//                   <p className="font-semibold">{flightDetails?.airline}</p>
//                   <span className="w-full flex gap-2 justify-center">
//                     <p>
//                       {flightDetails?.departure} - {flightDetails?.arrival}
//                     </p>
//                     <p>{flightDetails?.flightClass}</p>
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-6 md:max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
//               <div className="grid w-full grid-cols-3">
//                 <div className="flex flex-col justify-start items-center">
//                   <h1 className="font-semibold">Passengers</h1>
//                   <div className="flex flex-col">
//                     {Passengers.map((person, index) => (
//                       <p key={index} className="truncate w-20">
//                         {person?.firstName} {person?.lN}
//                       </p>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="flex flex-col justify-start items-center">
//                   <h1 className="font-semibold">Seat</h1>
//                   <div className="flex flex-col">
//                     {selectedSeats?.map((seat) => (
//                       <p key={seat?.code} className="truncate">
//                         {seat?.code}
//                       </p>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="flex flex-col justify-start items-center">
//                   <h1 className="font-semibold">Fee</h1>
//                   <div>
//                     {selectedSeats?.map((seat) => (
//                       <p key={seat?.code} className="truncate">
//                         ₹ {seat?.amount}
//                       </p>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Total and Proceed button - always visible */}
//           <div className="mt-auto flex flex-col items-center justify-center p-4 bg-white">
//             <div className="grid grid-cols-3 w-full">
//               <div>
//                 <h2 className="font-semibold">Total</h2>
//               </div>
//               <div>{`    `}</div>
//               <div>
//                 ₹ {selectedSeats.reduce((sum, seat) => sum + seat.amount, 0)}/-
//               </div>
//             </div>
//             <button
//               onClick={handleProceed}
//               className={`mt-3 w-[60%] bg-green-500 text-white px-6 py-2 ${
//                 selectedSeats.length === 0
//                   ? "cursor-not-allowed bg-opacity-50"
//                   : "cursor-pointer hover:bg-green-600"
//               } rounded-md transition-colors duration-200`}
//               disabled={selectedSeats.length === 0}
//             >
//               Proceed
//             </button>
//           </div>
//         </div>

//         {/*  Second portion - the seats interface */}
//         <div className="bg-gray-100 md:w-2/4 p-4 rounded-lg overflow-x-auto">
//           {renderSeatMap()}
//         </div>

//         {/*  Third Portion to display the Identifiers*/}
//         <div className="text-sm md:sticky md:top-0 md:self-start md:min-h-screen border-l-2 md:w-1/4 flex flex-col space-y-3 items-center md:items-start  p-4">
//           <h1 className="font-semibold">Seat Status</h1>
//           <div className="w-full grid grid-cols-2 md:grid-cols-1">
//             <div className="w-full sm:w-1/2 flex items-center ml-4 md:ml-0 mb-3">
//               <span className="inline-block w-4 h-4 bg-white border mr-2"></span>
//               <p>Available</p>
//             </div>
//             <div className="w-full sm:w-1/2 flex items-center ml-4 md:ml-0 mb-3">
//               <span className="inline-block w-4 h-4 bg-gray-400 mr-2"></span>
//               <p>Booked</p>
//             </div>
//             <div className="w-full sm:w-1/2 flex items-center ml-4 md:ml-0 mb-3">
//               <span className="inline-block w-4 h-4 bg-white border-t-8 border-t-green-500 mr-2 border border-slate-100"></span>
//               <p>Extra Legroom</p>
//             </div>
//             <div className="w-full sm:w-1/2 flex items-center ml-4 md:ml-0 mb-3">
//               <span className="inline-block w-4 h-4 bg-blue-500 mr-2"></span>
//               <p>Selected</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeatMap;

import React, { useEffect, useState } from "react";
import ReactToast from "../Util/ReactToast";
import defaultAirline from "../../../assets/home/logo/defaultAirline.png";

const SeatMap = ({
  Passengers,
  flightData,
  booking,
  onSeatSelect,
  setModalClose,
  flightId,
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [flightDetails, setFlightDetails] = useState({});
  const [sData, setSData] = useState(null);
  const [sInfo, setSInfo] = useState([]);

  // Filter out infants from passengers
  const adultPassengers = Passengers.filter(
    (passenger) => passenger.passengerType !== "INFANT"
  );

  useEffect(() => {
    if (flightData && booking && flightId) {
      const flightInfo = flightData.tripInfos
        .flatMap((trip) => trip.sI)
        .find((segment) => segment.id === flightId);

      if (flightInfo) {
        setFlightDetails({
          airline: flightInfo.fD?.aI?.name,
          flightNumber: flightInfo?.fD.fN,
          flightCode: flightInfo?.fD?.aI?.code,
          flightClass: flightData.tripInfos.find((trip) =>
            trip.sI.some((segment) => segment.id === flightId)
          )?.cabinClass,
          departure: flightInfo.da.cityCode,
          arrival: flightInfo.aa.cityCode,
          departureTime: new Date(flightInfo.dt).toLocaleTimeString(),
          arrivalTime: new Date(flightInfo.at).toLocaleTimeString(),
        });

        const tripSeat = booking?.tripSeatMap?.tripSeat[flightId];
        if (tripSeat) {
          setSData(tripSeat.sData);
          setSInfo(tripSeat.sInfo);
        }
      }
    }
  }, [flightData, booking, flightId]);

  const toggleSeat = (seat) => {
    if (!seat.isBooked) {
      setSelectedSeats((prevSeats) => {
        const seatIndex = prevSeats.findIndex((s) => s.code === seat.seatNo);

        if (seatIndex !== -1) {
          const updatedSeats = prevSeats.filter((s) => s.code !== seat.seatNo);
          onSeatSelect(updatedSeats.length, null);
          return updatedSeats;
        } else if (prevSeats.length < adultPassengers.length) {
          const newSeat = {
            key: flightId,
            code: seat.seatNo,
            amount: seat.amount,
          };
          const updatedSeats = [...prevSeats, newSeat];
          onSeatSelect(updatedSeats.length - 1, newSeat);
          return updatedSeats;
        } else {
          ReactToast("Please remove a selected seat before choosing a new one");
          return prevSeats;
        }
      });
    }
  };

  const isSeatSelected = (seatNo) =>
    selectedSeats.some((seat) => seat.code === seatNo);

  const renderSeat = (seat) => {
    let className =
      "w-10 h-10 m-1 rounded-md flex items-center justify-center text-xs font-semibold transition-colors duration-200 ";

    if (seat.isBooked) {
      className += "bg-gray-400 cursor-not-allowed";
    } else if (isSeatSelected(seat.seatNo)) {
      className += "bg-[#007EC4] text-white";
    } else {
      className += "bg-white hover:bg-gray-200";
    }

    if (seat.isLegroom) {
      className += " border-t-8 border-green-500";
    }

    if (seat.isAisle) {
      className += " mr-4";
    }

    return (
      <button
        key={seat.seatNo}
        className={className}
        onClick={() => toggleSeat(seat)}
        disabled={seat.isBooked}
      >
        {seat.isBooked || isSeatSelected(seat.seatNo)
          ? seat.seatNo
          : `${seat.amount}`}
      </button>
    );
  };

  const renderSeatMap = () => {
    if (!sData || !sInfo) {
      return <div className="text-sm font-semibold">Loading Seat Map...</div>;
    }

    const rows = [];
    for (let i = 1; i <= sData.row; i++) {
      const rowSeats = sInfo.filter((seat) => seat.seatPosition.row === i);
      rows.push(
        <div key={i} className="flex justify-center">
          {rowSeats.map(renderSeat)}
        </div>
      );
    }
    return rows;
  };

  const handleProceed = () => {
    adultPassengers.forEach((passenger, index) => {
      if (index < selectedSeats.length) {
        onSeatSelect(index, selectedSeats[index]);
      }
    });

    setModalClose(false);
  };

  return (
    <div className="container ">
      <div className="flex flex-col gap-6 md:flex-row w-full justify-around">
        {/* First portion for displaying the data - make it sticky */}
        <div className="md:sticky md:top-0 md:self-start md:min-h-screen bg-white md:w-[40%] border-r-2 flex flex-col">
          <div className="w-full  flex-grow overflow-y-auto">
            <div className=" px-3 py-2">
              <p className="text-sm md:text-base font-semibold">
                Seat Selection
              </p>
              <div className="border-b flex flex-wrap py-2 justify-between">
                <div className="rounded-md size-12 bg-slate-500">
                  <img
                    src={`https://myairdeal-backend.onrender.com/uploads/AirlinesLogo/${flightDetails?.flightCode}.png`}
                    onError={(e) => (e.currentTarget.src = defaultAirline)}
                    alt={flightDetails?.flightCode}
                    className="w-12 h-12 mr-6"
                  />
                </div>
                <div>
                  <p className="font-semibold">{flightDetails?.airline}</p>
                  <span className="w-full text-sm  flex gap-2 justify-center">
                    <p>
                      {flightDetails?.departure} - {flightDetails?.arrival}
                    </p>
                    <p>{flightDetails?.flightClass}</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:max-h-[calc(100vh-300px)] w-full   overflow-y-auto custom-scrollbar">
              <div className="grid w-full grid-cols-3">
                <div className="flex flex-col justify-start items-center">
                  <h1 className=" text-sm font-semibold">Passengers</h1>
                  <div className="flex flex-col">
                    {adultPassengers.map((person, index) => (
                      <p key={index} className="truncate w-max text-xs">
                        {person?.firstName} {person?.lastName}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-start items-center">
                  <h1 className=" text-sm font-semibold">Seat</h1>
                  <div className="flex flex-col">
                    {selectedSeats?.map((seat) => (
                      <p key={seat?.code} className="truncate">
                        {seat?.code}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-start items-center">
                  <h1 className="text-sm font-semibold">Fee</h1>
                  <div>
                    {selectedSeats?.map((seat) => (
                      <p key={seat?.code} className="truncate">
                        ₹ {seat?.amount}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Total and Proceed button - always visible */}
          <div className="mt-auto flex flex-col items-center p-4 bg-white">
            <div className="flex justify-between w-full">
              <div>
                <h2 className="text-sm md:text-base font-semibold">Total</h2>
              </div>
              <div>{`    `}</div>
              <div className="text-sm md:text-base">
                ₹ {selectedSeats.reduce((sum, seat) => sum + seat.amount, 0)}/-
              </div>
            </div>
            <button
              onClick={handleProceed}
              className={`mt-3 w-[60%]  text-white text-sm md:text-mase px-6 py-2 ${
                selectedSeats.length === 0 ||
                selectedSeats.length !== adultPassengers.length
                  ? "cursor-not-allowed bg-opacity-50"
                  : "cursor-pointer hover:bg-green-600"
              } rounded-md transition-colors duration-200`}
              disabled={
                selectedSeats.length === 0 ||
                selectedSeats.length !== adultPassengers.length
              }
            >
              Proceed
            </button>
          </div>
        </div>

        {/*  Second portion - the seats interface */}
        <div className="bg-gray-100 md:w-2/4 p-4 rounded-lg overflow-x-auto">
          {renderSeatMap()}
        </div>

        {/*  Third Portion to display the Identifiers*/}
        <div className="text-sm md:sticky md:top-0 md:self-start md:min-h-screen border-l-2 md:w-[20%] flex flex-col  items-center md:items-start  p-4">
          <h1 className="font-semibold">Seat Status</h1>
          <div className="w-32 grid grid-cols-2 gap-y-4 md:grid-cols-1">
            <div className="flex justify-center items-center">
              <span className="inline-block w-4 h-4 bg-white border mr-2"></span>
              <p className="ml-4">Available</p>
            </div>
            <div className="flex justify-center items-center">
              <span className="inline-block w-4 h-4 bg-gray-400 mr-2"></span>
              <p className="ml-4">Booked</p>
            </div>
            <div className="flex justify-center items-center">
              <span className="inline-block w-4 h-4 bg-white border-t-8 border-t-green-500 border border-slate-100 mr-2"></span>
              <p className="ml-4">Extra Legroom</p>
            </div>
            <div className="flex justify-center items-center">
              <span className="inline-block w-4 h-4 bg-[#007EC4] mr-2"></span>
              <p className="ml-4">Selected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
