import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const SubmitAmendment = ({ singleBookingData }) => {
  const { token } = useSelector((state) => state.auth);
  const [bookingId] = useState(singleBookingData.order.bookingId);
  const [fullBookingData, setFullbookingData] = useState({});
  const [Loading, setLoading] = useState(true);
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [selectedTravelers, setSelectedTravelers] = useState([]);
  const [cancelWholeTicket, setCancelWholeTicket] = useState(false);
  const [remarks, setRemarks] = useState("");

  const getData = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}booking/retrieve-booking`,
        { bookingId },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setFullbookingData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const spinnerVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      },
    },
  };

  const handleTripSelection = (tripIndex) => {
    if (cancelWholeTicket) return; // Prevent trip selection when whole ticket is selected
    setSelectedTrips((prevSelectedTrips) => {
      if (prevSelectedTrips.includes(tripIndex)) {
        return prevSelectedTrips.filter((index) => index !== tripIndex);
      } else {
        // Uncheck all passengers for this trip
        setSelectedTravelers((prevSelectedTravelers) =>
          prevSelectedTravelers.filter(
            (traveler) => !traveler.startsWith(`${tripIndex}-`)
          )
        );
        return [...prevSelectedTrips, tripIndex];
      }
    });
  };

  const handleTravelerSelection = (tripIndex, travelerIndex) => {
    if (cancelWholeTicket || selectedTrips.includes(tripIndex)) return; // Prevent traveler selection when whole ticket or trip is selected
    const travelerKey = `${tripIndex}-${travelerIndex}`;
    setSelectedTravelers((prevSelectedTravelers) => {
      if (prevSelectedTravelers.includes(travelerKey)) {
        return prevSelectedTravelers.filter((key) => key !== travelerKey);
      } else {
        return [...prevSelectedTravelers, travelerKey];
      }
    });
  };

  const handleCancelWholeTicket = () => {
    if (cancelWholeTicket) {
      setCancelWholeTicket(false);
      setSelectedTrips([]);
      setSelectedTravelers([]);
    } else {
      setCancelWholeTicket(true);
      setSelectedTrips([]);
      setSelectedTravelers([]);
    }
  };

  const getFormattedData = () => {
    if (cancelWholeTicket) {
      return {
        bookingId,
        type: "CANCELLATION",
        remarks,
      };
    }

    const tripsData = selectedTrips.map((tripIndex) => {
      const trip = fullBookingData?.itemInfos?.AIR?.tripInfos[tripIndex];
      return {
        src: trip?.sI[0].da.code,
        dest: trip.sI.length === 1 ? trip?.sI[0].aa.code : trip?.sI[trip.sI.length - 1].aa.code,
        departureDate: trip?.sI[0].dt,
      };
    });

    selectedTravelers.forEach((travelerKey) => {
      const tripIndex = parseInt(travelerKey.split("-")[0]);
      const travelerIndex = parseInt(travelerKey.split("-")[1]);
      const trip = fullBookingData?.itemInfos?.AIR?.tripInfos[tripIndex];
      const traveler = fullBookingData?.itemInfos?.AIR?.travellerInfos[travelerIndex];

      const tripDataIndex = tripsData.findIndex((tripData) =>
        tripData.src === trip?.sI[0].da.code &&
        tripData.dest === (trip.sI.length === 1 ? trip?.sI[0].aa.code : trip?.sI[trip.sI.length - 1].aa.code) &&
        tripData.departureDate === trip?.sI[0].dt
      );

      if (tripDataIndex !== -1) {
        if (!tripsData[tripDataIndex].travellers) {
          tripsData[tripDataIndex].travellers = [];
        }
        tripsData[tripDataIndex].travellers.push({
          fn: traveler.fN,
          ln: traveler.lN,
        });
      } else {
        tripsData.push({
          src: trip?.sI[0].da.code,
          dest: trip.sI.length === 1 ? trip?.sI[0].aa.code : trip?.sI[trip.sI.length - 1].aa.code,
          departureDate: trip?.sI[0].dt,
          travellers: [
            {
              fn: traveler.fN,
              ln: traveler.lN,
            },
          ],
        });
      }
    });

    return {
      bookingId,
      type: "CANCELLATION",
      remarks,
      trips: tripsData,
    };
  };

  const submitAmendment = async () => {
    const data = getFormattedData();
    console.log({ data });
    // Add the rest of the submit logic here...
  };

  return (
    <div className="px-4 py-4 flex justify-center items-center h-[50vh]">
      <div className="px-4 py-4 h-[50vh]">
        <div className="transition-padding duration-300">
          {Loading ? (
            <div className="flex justify-center items-center h-full">
              <motion.div
                className="w-12 h-12 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full"
                variants={spinnerVariants}
                animate="animate"
              />
            </div>
          ) : (
            <div>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Select the Trips and Passengers to Cancel</h3>
                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-6 w-6 text-[#ffeb3b] border-gray-300 rounded focus:ring-[#ffeb3b] focus:outline-none"
                    onChange={handleCancelWholeTicket}
                    checked={cancelWholeTicket}
                  />
                  <span className="ml-3 text-[#3951b9] font-semibold">Cancel Whole Ticket</span>
                </label>
                {fullBookingData?.itemInfos?.AIR?.tripInfos.map((trip, tripIndex) => (
                  <div key={tripIndex} className="mt-4">
                    <label className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-6 w-6 text-[#ffeb3b] border-gray-300 rounded focus:ring-[#ffeb3b] focus:outline-none"
                        onChange={() => handleTripSelection(tripIndex)}
                        checked={selectedTrips.includes(tripIndex)}
                        disabled={cancelWholeTicket}
                      />
                      <span className="ml-3 text-[#3951b9] font-semibold">
                        Trip {tripIndex + 1} - {trip?.sI[0].da.code} to {trip.sI.length === 1 ? trip?.sI[0].aa.code : trip?.sI[trip.sI.length - 1].aa.code}
                      </span>
                    </label>
                    {fullBookingData?.itemInfos?.AIR?.travellerInfos.map((traveler, travelerIndex) => (
                      <div key={travelerIndex} className="ml-6 mt-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-6 w-6 text-[#ffeb3b] border-gray-300 rounded focus:ring-[#ffeb3b] focus:outline-none"
                            onChange={() => handleTravelerSelection(tripIndex, travelerIndex)}
                            checked={selectedTravelers.includes(`${tripIndex}-${travelerIndex}`)}
                            disabled={cancelWholeTicket || selectedTrips.includes(tripIndex)}
                          />
                          <span className="ml-3 text-[#3951b9] font-semibold">
                            {traveler.fN} {traveler.lN}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="mt-4">
                  <label className="block text-[#3951b9] font-semibold mb-2">Remarks</label>
                  <textarea
                    className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ffeb3b] focus:ring focus:ring-[#ffeb3b] focus:ring-opacity-50"
                    rows="3"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  ></textarea>
                </div>
                <div className="mt-8">
                  <button
                    className="px-4 py-2 bg-[#3951b9] text-white font-semibold rounded-md hover:bg-[#ffeb3b] hover:text-[#3951b9] transition-colors"
                    onClick={submitAmendment}
                  >
                    Submit Cancellation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitAmendment;
