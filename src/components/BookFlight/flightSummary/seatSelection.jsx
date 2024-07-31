import React, { useState } from "react";
import Modal from "../Util/Modal";
import SeatMap from "../Seats/seatsMaps";

const SeatSelection = ({
  passengers,
  setPassengers,
  flightReviewData,
  seatMapData,
  isSeatMapAvailable
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFlightId, setCurrentFlightId] = useState(null);

  const updateSeatSelection = (passengerIndex, seatInfo) => {
    setPassengers((prevPassengers) => {
      const newPassengers = [...prevPassengers];
      if (seatInfo) {
        newPassengers[passengerIndex].selectedSeat = {
          ...newPassengers[passengerIndex].selectedSeat,
          [currentFlightId]: seatInfo,
        };
      } else {
        delete newPassengers[passengerIndex].selectedSeat[currentFlightId];
      }
      return newPassengers;
    });
  };

  const handleShowSeatMap = (flightId) => {
    setCurrentFlightId(flightId);
    setIsModalOpen(true);
  };

  console.log("seatMapData", seatMapData);

 
  return (
    <div className="grid grid-cols-2 p-3">
      <div>
        <div className="flex flex-col space-y-4">
          {flightReviewData.tripInfos.map((trip, tripIndex) => (
            <div key={tripIndex} className="flex flex-col space-y-2 p-4 border rounded-lg shadow-lg">
              {trip.sI.map((segment, segIndex) => {
                const flightId = segment.id;
                return (
                  <div key={segIndex} className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{segment?.da.city}</span>
                      <span className="text-lg">→</span>
                      <span className="font-medium">{segment?.aa.city}</span>
                    </div>
                    <button
                  onClick={() => handleShowSeatMap(flightId)}
                  className={`bg-[#007ec4] text-white px-4 py-2 rounded ${!isSeatMapAvailable?'bg-gray-500 cursor-not-allowed':''}`}
                  disabled={!isSeatMapAvailable}
                >
                  Show Seat Map
                </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Your booking is protected by MY AIR DEAL"
        >
          
            <SeatMap
              setModalClose={setIsModalOpen}
              Passengers={passengers}
              flightData={flightReviewData}
              booking={{
                tripSeatMap: {
                  tripSeat: {
                    [currentFlightId]: seatMapData?.tripSeatMap?.tripSeat[currentFlightId]
                  }
                }
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