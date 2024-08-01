// import React, { useEffect, useState } from "react";

// const BagAndMeal = ({ flightData, setPassenger, passengers }) => {
//   const [flightId, setFlightId] = useState("");
//   const [baggageOptions, setBaggage] = useState([]);
//   const [mealOptions, setMeals] = useState([]);

//   useEffect(() => {
//     const firstFlightId = flightData.tripInfos[0].sI[0].id;
//     setFlightId(firstFlightId);
//     const baggageOptions = flightData?.tripInfos[0]?.sI[0]?.ssrInfo.BAGGAGE;
//     const mealOptions = flightData?.tripInfos[0]?.sI[0]?.ssrInfo.MEAL;
//     setBaggage(baggageOptions);
//     setMeals(mealOptions);
//   }, [flightData]);

//   console.log(baggageOptions,"baggage option")

//   const updateAddonSelection = (passengerIndex, type, value) => {
//     setPassenger((prevPassengers) => {
//       const newPassengers = [...prevPassengers];
//       if (type === "meal") {
//         newPassengers[passengerIndex] = {
//           ...newPassengers[passengerIndex],
//           selectedMeal: { code: value, key: flightId },
//         };
//       } else if (type === "baggage") {
//         newPassengers[passengerIndex] = {
//           ...newPassengers[passengerIndex],
//           selectedBaggage: { code: value, key: flightId },
//         };
//       }
//       return newPassengers;
//     });
//   };

//   return (
//     <form>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//         {/* Passenger Details */}
//         <div className="w-full">
//           <h3 className="font-semibold text-lg mb-2">Passenger Details</h3>
//           <div className="space-y-2">
//             {passengers.map((passenger, index) => (
//               <div key={index} className="flex items-center space-x-2">
//                 <span className="text-sm">{`${passenger.passengerType} ${passenger.typeCount}`}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Baggage Selections */}
//         <div className="w-full">
//           <h3 className="font-semibold text-sm mb-2">Select Baggage</h3>
//           {passengers.map((passenger, index) => (
//             <select
//               key={index}
//               value={passenger?.selectedBaggage?.code || ""}
//               onChange={(e) =>
//                 updateAddonSelection(index, "baggage", e.target.value)
//               }
//               className="mt-1 block border w-full py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md"
//             >
//               <option value="">Select a Baggage</option>
//               {baggageOptions?.map((baggage) => (
//                 <option key={baggage.code} value={baggage.code}>
//                   {baggage.desc} - ₹{baggage.amount}
//                 </option>
//               ))}
//             </select>
//           ))}
//         </div>
//         {/* Meal Selections */}
//         <div className="w-full">
//           <h3 className="font-semibold text-sm mb-2">Select Meal</h3>
//           {passengers.map((passenger, index) => (
//             <select
//               key={index}
//               value={passenger?.selectedMeal?.code || ""}
//               onChange={(e) =>
//                 updateAddonSelection(index, "meal", e.target.value)
//               }
//               className="mt-1 block border w-full py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md"
//             >
//               <option value="">Select a meal</option>
//               {mealOptions?.map((meal) => (
//                 <option key={meal.code} value={meal.code}>
//                   {meal.desc} - ₹{meal.amount}
//                 </option>
//               ))}
//             </select>
//           ))}
//         </div>
//       </div>
//     </form>
//   );
// };

// export default BagAndMeal;

// import React, { useEffect, useState } from "react";

// const BagAndMeal = ({ flightData, setPassenger, passengers }) => {
//   const [flightId, setFlightId] = useState("");
//   const [baggageOptions, setBaggage] = useState([]);
//   const [mealOptions, setMeals] = useState([]);

//   useEffect(() => {
//     const firstFlightId = flightData.tripInfos[0].sI[0].id;
//     setFlightId(firstFlightId);
//     const baggageOptions = flightData?.tripInfos[0]?.sI[0]?.ssrInfo.BAGGAGE;
//     const mealOptions = flightData?.tripInfos[0]?.sI[0]?.ssrInfo.MEAL;
//     setBaggage(baggageOptions);
//     setMeals(mealOptions);
//   }, [flightData]);

//   console.log(baggageOptions,"baggage option")

//   const updateAddonSelection = (passengerIndex, type, value) => {
//     setPassenger((prevPassengers) => {
//       const newPassengers = [...prevPassengers];
//       if (type === "meal") {
//         newPassengers[passengerIndex] = {
//           ...newPassengers[passengerIndex],
//           selectedMeal: { code: value, key: flightId },
//         };
//       } else if (type === "baggage") {
//         newPassengers[passengerIndex] = {
//           ...newPassengers[passengerIndex],
//           selectedBaggage: { code: value, key: flightId },
//         };
//       }
//       return newPassengers;
//     });
//   };

//   return (
//     <form>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//         {/* Passenger Details */}
//         <div className="w-full">
//           <h3 className="font-semibold text-lg mb-2">Passenger Details</h3>
//           <div className="space-y-2">
//             {passengers.map((passenger, index) => (
//               <div key={index} className="flex items-center space-x-2">
//                 <span className="text-sm">{`${passenger.passengerType} ${passenger.typeCount}`}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Baggage Selections */}
//         <div className="w-full">
//           <h3 className="font-semibold text-sm mb-2">Select Baggage</h3>
//           {passengers.map((passenger, index) => (
//             <select
//               key={index}
//               value={passenger?.selectedBaggage?.code || ""}
//               onChange={(e) =>
//                 updateAddonSelection(index, "baggage", e.target.value)
//               }
//               className="mt-1 block border w-full py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md"
//             >
//               <option value="">Select a Baggage</option>
//               {baggageOptions?.map((baggage) => (
//                 <option key={baggage.code} value={baggage.code}>
//                   {baggage.desc} - ₹{baggage.amount}
//                 </option>
//               ))}
//             </select>
//           ))}
//         </div>
//         {/* Meal Selections */}
//         <div className="w-full">
//           <h3 className="font-semibold text-sm mb-2">Select Meal</h3>
//           {passengers.map((passenger, index) => (
//             <select
//               key={index}
//               value={passenger?.selectedMeal?.code || ""}
//               onChange={(e) =>
//                 updateAddonSelection(index, "meal", e.target.value)
//               }
//               className="mt-1 block border w-full py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md"
//             >
//               <option value="">Select a meal</option>
//               {mealOptions?.map((meal) => (
//                 <option key={meal.code} value={meal.code}>
//                   {meal.desc} - ₹{meal.amount}
//                 </option>
//               ))}
//             </select>
//           ))}
//         </div>
//       </div>
//     </form>
//   );
// };

// export default BagAndMeal;

import React, { useState, useEffect } from "react";

const BagAndMeal = ({ flightData, setPassenger, passengers }) => {
  const [flightOptions, setFlightOptions] = useState([]);

  useEffect(() => {
    const options = flightData.tripInfos.flatMap((trip) =>
      trip.sI.map((segment) => ({
        id: segment.id,
        route: `${segment.da.code} → ${segment.aa.code}`,
        baggageOptions: segment.ssrInfo.BAGGAGE || [],
        mealOptions: segment.ssrInfo.MEAL || [],
      }))
    );
    setFlightOptions(options);
  }, [flightData]);

  // const updateAddonSelection = (passengerIndex, flightId, type, value) => {
  //   setPassenger((prevPassengers) => {
  //     const newPassengers = [...prevPassengers];
  //     if (type === "meal") {
  //       newPassengers[passengerIndex] = {
  //         ...newPassengers[passengerIndex],
  //         selectedMeals: {
  //           ...newPassengers[passengerIndex].selectedMeals,
  //           [flightId]: { code: value, key: flightId, amount },
  //         },
  //       };
  //     } else if (type === "baggage") {
  //       newPassengers[passengerIndex] = {
  //         ...newPassengers[passengerIndex],
  //         selectedBaggages: {
  //           ...newPassengers[passengerIndex].selectedBaggages,
  //           [flightId]: { code: value, key: flightId },
  //         },
  //       };
  //     }
  //     return newPassengers;
  //   });
  // };

  const updateAddonSelection = (
    passengerIndex,
    flightId,
    type,
    value,
    amount,
    desc
  ) => {
    setPassenger((prevPassengers) => {
      const newPassengers = [...prevPassengers];
      if (type === "meal") {
        newPassengers[passengerIndex] = {
          ...newPassengers[passengerIndex],
          selectedMeals: {
            ...newPassengers[passengerIndex].selectedMeals,
            [flightId]: { code: value, key: flightId, amount, desc },
          },
        };
      } else if (type === "baggage") {
        newPassengers[passengerIndex] = {
          ...newPassengers[passengerIndex],
          selectedBaggages: {
            ...newPassengers[passengerIndex].selectedBaggages,
            [flightId]: { code: value, key: flightId, amount,desc },
          },
        };
      }
      return newPassengers;
    });
  };

  return (
    <div className="space-y-6 ">
      {flightOptions.map((flight) => (
        <div key={flight.id} className="border rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4">{flight.route}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Passenger Details */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Passenger Details</h3>
              <div className="space-y-2">
                {passengers.map((passenger, index) => (
                  <div key={index} className="text-sm">
                    {`${passenger.passengerType} ${passenger.typeCount}`}
                  </div>
                ))}
              </div>
            </div>
            {/* Baggage Selections */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Select Baggage</h3>
              {passengers.map((passenger, index) => (
                <select
                  key={index}
                  value={passenger?.selectedBaggages?.[flight.id]?.code || ""}
                  
                  onChange={(e) => {
                    const selectedBaggage = flight.baggageOptions.find(
                      (baggage) => baggage.code === e.target.value
                    );
                    updateAddonSelection(
                      index,
                      flight.id,
                      "baggage",
                      e.target.value,
                      selectedBaggage?.amount || 0,
                      selectedBaggage?.desc || ""
                    );
                  }}
                  className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a Baggage</option>
                  {flight.baggageOptions.map((baggage) => (
                    <option key={baggage.code} value={baggage.code}>
                      {baggage.desc} - ₹{baggage.amount}
                    </option>
                  ))}
                </select>
              ))}
            </div>
            {/* Meal Selections */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Select Meal</h3>
              {passengers.map((passenger, index) => (
                <select
                  key={index}
                  value={passenger?.selectedMeals?.[flight.id]?.code || ""}
                  onChange={(e) => {
                    const selectedMeal = flight.mealOptions.find(
                      (meal) => meal.code === e.target.value
                    );
                    updateAddonSelection(
                      index,
                      flight.id,
                      "meal",
                      e.target.value,
                      selectedMeal?.amount || 0,
                      selectedMeal?.desc || ""
                    );
                  }}
                  className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a meal</option>
                  {flight.mealOptions.map((meal) => (
                    <option key={meal.code} value={meal.code}>
                      {meal.desc} - ₹{meal.amount}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BagAndMeal;
