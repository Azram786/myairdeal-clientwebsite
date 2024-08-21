//
import React, { useState } from "react";
import Modal from "../Util/Modal";
import SeatMap from "../Seats/seatsMaps";

const SeatSelection = ({
  passengers,
  setPassengers,
  flightReviewData,
  seatMapData,
  isSeatMapAvailable,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFlightId, setCurrentFlightId] = useState(null);

  const updateSeatSelection = (passengerIndex, seatInfo) => {
    setPassengers((prevPassengers) => {
      const newPassengers = [...prevPassengers];

      // Ensure selectedSeat is initialized as an array
      if (!Array.isArray(newPassengers[passengerIndex].selectedSeat)) {
        newPassengers[passengerIndex].selectedSeat = [];
      }

      const seatIndex = newPassengers[passengerIndex].selectedSeat.findIndex(
        (seat) => seat.key === currentFlightId
      );

      if (seatInfo) {
        if (seatIndex > -1) {
          // Update the existing seat entry for the flight
          newPassengers[passengerIndex].selectedSeat[seatIndex] = {
            key: currentFlightId,
            code: seatInfo.code,
            amount: seatInfo.amount,
            desc: seatInfo.desc,
          };
        } else {
          // Add a new seat entry for the flight
          newPassengers[passengerIndex].selectedSeat.push({
            key: currentFlightId,
            code: seatInfo.code,
            amount: seatInfo.amount,
            desc: seatInfo.desc,
          });
        }
      } else {
        // Remove the seat entry if seatInfo is null
        if (seatIndex > -1) {
          newPassengers[passengerIndex].selectedSeat.splice(seatIndex, 1);
        }
      }

      return newPassengers;
    });
  };

  const handleShowSeatMap = (flightId) => {
    setCurrentFlightId(flightId);
    setIsModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 ">
      <div>
        <div className="flex flex-col space-y-4 box-border ">
          {flightReviewData.tripInfos.map((trip, tripIndex) => (
            <div
              key={tripIndex}
              className="flex flex-col space-y-2 p-4 border rounded-lg w-full md:w-fit  shadow-lg "
            >
              {trip.sI.map((segment, segIndex) => {
                const flightId = segment?.id;
                return (
                  <div key={segIndex} className="flex flex-col space-y-2  ">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{segment?.da?.city}</span>
                      <span className="text-lg">→</span>
                      <span className="font-medium">{segment?.aa?.city}</span>
                    </div>

                    {isSeatMapAvailable ? (
                      <button
                        onClick={() => handleShowSeatMap(flightId)}
                        className="bg-[#1B1D29] text-[#D7B56D] text-sm px-4 py-2 rounded"
                      >
                        Show Seat Map
                      </button>
                    ) : (
                      <div className="text-red-500 text-sm">
                        Seat map not available for this flight.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          // title="Your booking is protected by MY AIR DEAL"
        >
          <SeatMap
            setModalClose={setIsModalOpen}
            Passengers={passengers}
            flightData={flightReviewData}
            booking={{
              tripSeatMap: {
                tripSeat: {
                  [currentFlightId]:
                    seatMapData?.tripSeatMap?.tripSeat[currentFlightId],
                },
              },
            }}
            onSeatSelect={(index, seatInfo) =>
              updateSeatSelection(index, seatInfo)
            }
            flightId={currentFlightId}
          />
        </Modal>
      </div>
    </div>
  );
};

export default SeatSelection;
