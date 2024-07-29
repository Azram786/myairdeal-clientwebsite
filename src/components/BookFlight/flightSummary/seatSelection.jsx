import React, { useState } from "react";
import Modal from "../Util/Modal";
import SeatMap from "../Seats/seatsMaps";
import { booking } from "../Seats/dummy";
import { ApiData } from "../dummy-meal";

const SeatSelection = ({
  passengers,
  setPassengers,
  flightReviewData,
  seatMapData,
}) => {
  console.log(flightReviewData, "helo=====================");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateSeatSelection = (passengerIndex, seatInfo) => {
    console.log(passengerIndex, seatInfo);
    setPassengers((prevPassengers) => {
      const newPassengers = [...prevPassengers];
      if (seatInfo) {
        newPassengers[passengerIndex].selectedSeat = seatInfo;
      } else {
        newPassengers[passengerIndex].selectedSeat = {};
      }
      return newPassengers;
    });
  };

  return (
    <div className="grid grid-cols-2 p-3">
      <div>
        <div className="flex flex-col space-y-4">
          {ApiData.tripInfos.map((item, index) => (
            <>
              <div
                key={index}
                className="flex flex-col space-y-2 p-4 border rounded-lg shadow-lg"
              >
                {item.sI.map((segment, segIndex) => (
                  <>
                    <div key={segIndex} className="flex items-center space-x-3">
                      <span className="font-medium">{segment.da.city}</span>
                      <span className="text-lg">→</span>
                      <span className="font-medium">{segment.aa.city}</span>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-[#007ec4] text-white px-4 py-2 rounded"
                    >
                      Show Seat Map
                    </button>
                  </>
                ))}
              </div>
              <div className="mb-6 flex justify-end">
                {/* <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#007ec4] text-white px-4 py-2 rounded"
                >
                  Show Seat Map
                </button> */}
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  title="Your booking is protected by MY AIR DEAL"
                >
                  {!seatMapData ? (
                    <div>Seat Map Not avilable</div>
                  ) : (
                    <SeatMap
                      setModalClose={setIsModalOpen}
                      Passengers={passengers}
                      flightData={flightReviewData}
                      booking={seatMapData}
                      onSeatSelect={(index, seatInfo) =>
                        updateSeatSelection(index, seatInfo)
                      }
                      flightId={flightReviewData?.tripInfos[0]?.sI[0]?.id}
                    />
                  )}
                </Modal>
              </div>
            </>
          ))}
        </div>
        {/* <div className="flex items-center space-x-3 mb-2">
          <span className="text-lg font-semibold">Bengaluru</span>
          <span className="text-lg">→</span>
          <span className="text-lg font-semibold">Dubai</span>
        </div> */}
        {/* <div className="mb-2 text-gray-500">
          <span className="text-lg">on July 16, 2024</span>
        </div> */}
      </div>
      {/* <div className="mb-6 flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#007ec4] text-white px-4 py-2 rounded"
        >
          Show Seat Map
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Your booking is protected by MY AIR DEAL"
        >
          <SeatMap
            setModalClose={setIsModalOpen}
            Passengers={passengers}
            flightData={flightReviewData}
            booking={booking}
            onSeatSelect={(index, seatInfo) =>
              updateSeatSelection(index, seatInfo)
            }
            flightId={flightReviewData?.tripInfos[0]?.sI[0]?.id}
          />
        </Modal>
      </div> */}
    </div>
  );
};

export default SeatSelection;
