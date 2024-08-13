

import React, { useState, useEffect } from "react";

const BagAndMeal = ({ flightData, setPassenger, passengers }) => {
  console.log({ passengers })
  // console.log(flightData, "DAT DAT DATA");
  const [flightOptions, setFlightOptions] = useState([]);

  useEffect(() => {
    console.log({ flightData });
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
      console.log({ prevPassengers });
      const newPassengers = [...prevPassengers];

      if (type === "meal") {
        newPassengers[passengerIndex] = {
          ...newPassengers[passengerIndex],

          selectedMeal: [
            {
              ...newPassengers[passengerIndex].selectedMeal,
              meal: { code: value, key: flightId, amount, desc },
            },
          ],
        };
      } else if (type === "baggage") {
        newPassengers[passengerIndex] = {
          ...newPassengers[passengerIndex],
          selectedBaggages: {
            ...newPassengers[passengerIndex].selectedBaggages,
            [flightId]: { code: value, key: flightId, amount, desc },
          },
        };
      }
      return newPassengers;
    });
  };

  return (
    <div className="space-y-6 ">
      {flightOptions.map((flight) => {
        console.log({ flight });
        return (
          <div key={flight.id} className="border rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-4">{flight.route}</h2>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> */}
            <div className="grid grid-cols-1  gap-4">
              {/* Passenger Details */}
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-2">
                  Passenger Details
                </h3>
              </div>
              {/* Baggage Selections */}
              {flight.baggageOptions && flight.baggageOptions.length > 0 ? (
                <div>
                  <h3 className="font-semibold md:text-lg mb-2 text-base">
                    Select Baggage
                  </h3>
                  <div className="space-y-2">
                    {passengers.map(
                      (passenger, index) =>
                        passenger.passengerType !== "infant" && (
                          <div key={index} className="text-sm font-semibold">
                            {`${passenger.passengerType} ${passenger.typeCount}`}
                            <select
                              value={
                                passenger?.selectedBaggages?.[flight.id]
                                  ?.code || ""
                              }
                              onChange={(e) => {
                                const selectedBaggage =
                                  flight.baggageOptions.find(
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
                          </div>
                        )
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-red-600 rounded-md w-max md:text-sm">
                  No baggage options available for this flight.
                </div>
              )}

              {/* Meal Selections */}
              {flight.mealOptions && flight.mealOptions.length > 0 ? (
                <div>
                  <h3 className="font-semibold text-sm md:text-base mb-2">
                    Select Meal
                  </h3>
                  <div className="space-y-2">
                    {passengers?.map((passenger, index) => (
                      <div key={index}>
                        <div className="text-sm md:text-base font-semibold">
                          {`${passenger.passengerType} ${passenger.typeCount}`}
                        </div>

                        <select
                          key={index}
                          value={
                            passenger?.selectedMeals?.[flight.id]?.code || ""
                          }
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
                      </div>
                    )) || "N/A"}
                  </div>
                </div>
              ) : (
                <div className=" text-xs text-red-600 rounded-md  w-max md:text-sm">
                  No Meal options available for this flight.
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BagAndMeal;
