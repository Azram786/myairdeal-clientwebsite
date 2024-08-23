import React, { useState, useEffect } from "react";
import ReactJoyride from "react-joyride";

const BagAndMeal = ({ flightData, setPassengers, passengers }) => {
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
    setPassengers((prevPassengers) => {
      const newPassengers = [...prevPassengers];

      const passenger = newPassengers[passengerIndex];

      if (type === "meal") {
        const updatedMeals = [...passenger.selectedMeal];

        const mealIndex = updatedMeals.findIndex(
          (meal) => meal.key === flightId && meal.passengerId === passenger.id
        );

        if (value === "") {
          if (mealIndex > -1) {
            updatedMeals.splice(mealIndex, 1);
          }
        } else {
          if (mealIndex > -1) {
            updatedMeals[mealIndex] = {
              ...updatedMeals[mealIndex],
              code: value,
              amount,
              desc,
            };
          } else {
            updatedMeals.push({
              code: value,
              key: flightId,
              amount,
              desc,
              passengerId: passenger.id,
            });
          }
        }

        passenger.selectedMeal = updatedMeals;
      } else if (type === "baggage") {
        const updatedBaggage = [...passenger.selectedBaggage];

        const baggageIndex = updatedBaggage.findIndex(
          (baggage) =>
            baggage.key === flightId && baggage.passengerId === passenger.id
        );

        if (value === "") {
          if (baggageIndex > -1) {
            updatedBaggage.splice(baggageIndex, 1);
          }
        } else {
          if (baggageIndex > -1) {
            updatedBaggage[baggageIndex] = {
              ...updatedBaggage[baggageIndex],
              code: value,
              amount,
              desc,
            };
          } else {
            updatedBaggage.push({
              code: value,
              key: flightId,
              amount,
              desc,
              passengerId: passenger.id,
            });
          }
        }

        passenger.selectedBaggage = updatedBaggage;
      }

      newPassengers[passengerIndex] = passenger;
      return newPassengers;
    });
  };
  const [runJoyride, setRunJoyride] = useState(true);

  // useEffect(() => {
  //   sessionStorage.setItem("joyride", "notexecuted"); // Mark it as executed
  //   // Check if joyride was previously run from localStorage
  //   const storedJoyride = sessionStorage.getItem("joyride");

  //   if (storedJoyride === "executed") {
  //     setRunJoyride(false); // Don't run joyride again if it has been executed
  //   } else if(storedJoyride !== "executed") {
  //     setRunJoyride(true); // Run joyride if it has not been executed yet
  //     sessionStorage.setItem("joyride", "executed"); // Mark it as executed
  //   }
  // }, [runJoyride]);

  // State for Joyride steps
  const [joyrideSteps] = useState([
    {
      target: ".flight-type-buttons",
      content: "Choose your travel type (One-way, Round-trip, or Multi-city)",
    },
    {
      target: ".from-city-select",
      content: "Select your departure city or airport.",
    },
    {
      target: ".to-city-select",
      content: "Select your destination city or airport.",
    },
    {
      target: ".travel-date-picker",
      content: "Pick your travel date here.",
    },
    {
      target: ".travel-passenger-details",
      content:
        "Select the number of passengers and class preferences traveling with you.",
    },
    {
      target: ".search-button",
      content: "Hit this button to search for flights.",
    },
  ]);

  return (
    <div className="space-y-6 ">
      <ReactJoyride
        steps={joyrideSteps}
        run={runJoyride}
        continuous={true}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        callback={(data) => {
          if (data.action === "reset") {
            setRunJoyride(false);
          }
        }}
      />
      {flightOptions.map((flight) => {
        return (
          <div key={flight.id} className="border rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-4">{flight.route}</h2>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-2">
                  Passenger Details
                </h3>
              </div>

              {flight.baggageOptions && flight.baggageOptions.length > 0 ? (
                <div>
                  <h3 className="font-semibold md:text-lg mb-2 text-base">
                    Select Baggage
                  </h3>
                  <div className="space-y-2 ">
                    {passengers.map((passenger, index) =>
                      passenger.passengerType !== "INFANT" ? (
                        <div key={index} className="text-sm">
                          <div className="font-semibold text-sm md:text-base">
                            {`${passenger.passengerType} ${passenger.typeCount}`}
                          </div>

                          {/* Baggage Selection Dropdown */}
                          <select
                            value={
                              passenger.selectedBaggage?.find(
                                (baggage) => baggage.key === flight.id
                              )?.code || ""
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
                            className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm flight-type-buttons"
                          >
                            <option className="font-medium" value="">
                              Select a Baggage
                            </option>
                            {flight.baggageOptions.map((baggage) => (
                              <option key={baggage.code} value={baggage.code}>
                                {baggage.desc} - ₹{baggage.amount}
                              </option>
                            ))}
                          </select>

                          {/* Display selected baggage details */}
                          {passenger.selectedBaggage?.map(
                            (baggage) =>
                              baggage.key === flight.id && (
                                <div
                                  key={baggage.code}
                                  className="mt-2 text-sm text-gray-600"
                                >
                                  <button
                                    className="mt-2 text-sm px-1 py-1 text-[#D7B56D] bg-[#1B1D29] rounded"
                                    onClick={() => {
                                      updateAddonSelection(
                                        index,
                                        flight.id,
                                        "baggage",
                                        "",
                                        "",
                                        ""
                                      );
                                    }}
                                  >
                                    Remove Baggage
                                  </button>
                                </div>
                              )
                          )}
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-red-600 rounded-md md:text-sm">
                  No baggage options available for this flight.
                </div>
              )}

              {/* Meal Selections */}
              {flight.mealOptions && flight.mealOptions.length > 0 ? (
                <div>
                  <h3 className="font-semibold text-sm md:text-base mb-2 .search-button">
                    Select Meal
                  </h3>
                  <div className="space-y-2">
                    {passengers.map((passenger, index) =>
                      passenger.passengerType !== "INFANT" ? (
                        <div key={index}>
                          <div className="text-sm md:text-base font-semibold">
                            {`${passenger.passengerType} ${passenger.typeCount}`}
                          </div>

                          {/* Meal Selection Dropdown */}
                          <select
                            value={
                              passenger.selectedMeal?.find(
                                (meal) => meal.key === flight.id
                              )?.code || ""
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
                            className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 text-sm bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option className="font-medium" value="">
                              Select a meal
                            </option>
                            {flight.mealOptions.map((meal) => (
                              <option key={meal.code} value={meal.code}>
                                {meal.desc} - ₹{meal.amount}
                              </option>
                            ))}
                          </select>

                          {/* Display selected meal details */}
                          {passenger.selectedMeal?.map(
                            (meal) =>
                              meal.key === flight.id && (
                                <div
                                  key={meal.code}
                                  className="mt-2 text-sm text-gray-600"
                                >
                                  <button
                                    className="mt-2 text-sm px-1 py-1 text-[#D7B56D] bg-[#1B1D29] rounded"
                                    onClick={() => {
                                      updateAddonSelection(
                                        index,
                                        flight.id,
                                        "meal",
                                        "",
                                        "",
                                        ""
                                      );
                                    }}
                                  >
                                    Remove Meal
                                  </button>
                                </div>
                              )
                          )}
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-red-600 rounded-md w-max md:text-sm">
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
