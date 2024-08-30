import React from "react";

function FlightSummaryCard({ data, currentStep }) {
 
  return (
    <div>
      <div className="w-full md:w-[70%] rounded-lg bg-white p-2 space-y-4">
        {currentStep === 0 ? (
          <>
            <div className="border-b border-gray-300 pb-4 ">
              {data?.tripInfos?.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-lg p-2 mb-4"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between bg-blue-200 p-2 rounded-t-lg">
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
                    <div className=" text-base sm:text-lg font-semibold text-gray-600 flex items-center">
                      <FaRegClock className="mr-2" />
                      {calculateTotalDuration(item.sI)}
                    </div>
                  </div>
                  <div className="mt-4">
                    {item.sI.map((segment, index) => (
                      <React.Fragment key={index}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex-col w-1/3 ">
                            <div className="w-full">
                              <div className="mb-2">
                                <div className="font-semibold text-xs border rounded-md inline-flex items-center shadow-md p-1 space-x-2">
                                  <div className="w-8 h-8">
                                
                                    <img
                                      src={`${import.meta.env.VITE_SERVER_URL}uploads/AirlinesLogo/${segment.fD.aI.code}.png`}
                                      onError={(e) =>
                                        (e.currentTarget.src = defaultAirline)
                                      }
                                      alt={segment?.fD?.aI?.code}
                                      className="w-full h-full object-contain "
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
                            <div className="text-lg font-bold ">
                              {segment.da.code}
                            </div>
                            <div className="text-sm">
                              {segment.da.city}, {segment.da.country}
                            </div>

                            <div className="text-sm">{segment.da.name}</div>
                            <div className="text-sm">{segment.da.terminal}</div>
                            <div className="text-sm font-semibold">
                              {new Date(segment.dt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })}
                            </div>
                          </div>
                          <div className="flex-col items-center w-1/3">
                            <div className="text-center">
                              <span className="text-sm">
                                {(() => {
                                  const totalMinutes = segment.duration;
                                  const hours = Math.floor(totalMinutes / 60);
                                  const minutes = totalMinutes % 60;
                                  return `${hours}h ${minutes}m`;
                                })()}
                              </span>
                            </div>

                            <div className="flex justify-center items-center">
                              <hr className="w-1/3 border-t border-gray-300 " />
                              <MdFlight className="w-7 h-5 mx-2 rotate-90" />
                              <hr className="w-1/3 border-t border-gray-300" />
                            </div>
                            <div className="text-center text-sm">
                              {item.sI.length === 1 ? "Non Stop" : "connection"}
                            </div>
                          </div>
                          <div className="flex-col w-1/3 text-right">
                            <div className="text-lg font-bold">
                              {segment.aa.code}
                            </div>
                            <div className="text-sm">
                              {segment.aa.city}, {segment.aa.country}
                            </div>
                            <div className="text-sm">{segment.aa.name}</div>
                            <div className="text-sm">{segment.aa.terminal}</div>
                            <div className="text-sm font-semibold">
                              {new Date(segment.at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="text-sm text-gray-500 mt-4">
                          <span>
                            There is a Special No Meal fare Provided by the
                            Airline
                          </span>
                          {index !== item.sI.length - 1 && (
                            <div className="flex justify-between bg-blue-900 text-white p-3 rounded-md mt-4 mb-4">
                              <div className="text-sm">
                                Require to change plane
                              </div>
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

            <div className="flex justify-center mt-6 px-4">
              <button
                className="w-full sm:w-3/4 md:w-1/2 h-10 sm:h-12 px-4 sm:px-6 font-poppins text-[#D7B56D] bg-[#1B1D29] rounded-md text-sm sm:text-base flex items-center justify-center"
                onClick={handleSaveAndContinue}
              >
                {isSeatMapLoading ? (
                  <FaSpinner className="animate-spin mr-2 text-xs sm:text-base" />
                ) : (
                  "Save and Continue"
                )}
              </button>
            </div>
          </>
        ) : currentStep === 1 ? (
          <AddDetails
            bookingId={data?.bookingId}
            Step={handleSaveAndContinue}
            flightData={data}
          />
        ) : (
          currentStep === 2 && (
            <Review
              setCurrentStep={setCurrentStep}
              flightData={data}
              passengerDetails={passengerDetails}
              updatePssenger={updatePssenger}
            />
          )
        )}
      </div>
    </div>
  );
}

export default FlightSummaryCard;
