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
    setSelectedTrips((prevSelectedTrips) => {
      if (prevSelectedTrips.includes(tripIndex)) {
        // If the trip is being deselected, deselect all travelers for that trip
        setSelectedTravelers((prevSelectedTravelers) =>
          prevSelectedTravelers.filter(
            (traveler) => !traveler.startsWith(`${tripIndex}-`)
          )
        );
        return prevSelectedTrips.filter((index) => index !== tripIndex);
      } else {
        // If the trip is being selected, select all travelers for that trip
        const allTravelers = fullBookingData?.itemInfos?.AIR?.travellerInfos.map(
          (_, index) => `${tripIndex}-${index}`
        );
        setSelectedTravelers((prevSelectedTravelers) => [
          ...prevSelectedTravelers,
          ...allTravelers,
        ]);
        return [...prevSelectedTrips, tripIndex];
      }
    });
  };

  const handleTravelerSelection = (tripIndex, travelerIndex) => {
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
      setSelectedTrips(fullBookingData?.itemInfos?.AIR?.tripInfos?.map((_, index) => index));
      setSelectedTravelers(
        fullBookingData?.itemInfos?.AIR?.tripInfos?.flatMap((_, tripIndex) =>
          fullBookingData?.itemInfos?.AIR?.travellerInfos?.map(
            (_, travellerIndex) => `${tripIndex}-${travellerIndex}`
          )
        )
      );
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
      const travelers = selectedTravelers
        .filter((traveler) => traveler.startsWith(`${tripIndex}-`))
        .map((travelerKey) => {
          const travelerIndex = parseInt(travelerKey.split("-")[1]);
          const traveler = fullBookingData?.itemInfos?.AIR?.travellerInfos[travelerIndex];
          return {
            fn: traveler.fN,
            ln: traveler.lN,
          };
        });

      // Include the travelers only if there are selected travelers for the trip
      return travelers.length > 0
        ? {
          src: trip?.sI[0].da.code,
          dest: trip.sI.length === 1 ? trip?.sI[0].aa.code : trip?.sI[trip.sI.length - 1].aa.code,
          departureDate: trip?.sI[0].dt,
          travellers: travelers,
        }
        : {
          src: trip?.sI[0].da.code,
          dest: trip.sI.length === 1 ? trip?.sI[0].aa.code : trip?.sI[trip.sI.length - 1].aa.code,
          departureDate: trip?.sI[0].dt,
        };
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
    // let confirmationMessage = "Are you sure you want to cancel ";
    // if (cancelWholeTicket) {
    //   confirmationMessage += "the whole ticket?";
    // } else {
    //   const tripCount = data.trips?.length || 0;
    //   const travellerCount = data.trips?.reduce((acc, trip) => acc + (trip.travellers?.length || 0), 0) || 0;
    //   confirmationMessage += `${tripCount} trip(s) and ${travellerCount} traveller(s)?`;
    // }

    // if (window.confirm(confirmationMessage)) {
    //   try {
    //     await axios.put(
    //       `${import.meta.env.VITE_SERVER_URL}booking/cancel`,
    //       data,
    //       {
    //         headers: {
    //           authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
    //     toast.success("Cancellation request submitted successfully!");
    //   } catch (error) {
    //     console.error("Error submitting cancellation request:", error);
    //     toast.error("Failed to submit cancellation request.");
    //   }
    // } else {
    //   toast.info("Cancellation request cancelled.");
    // }
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
              <div className="space-y-6 bg-yellow-300">
                <div className="bg-yellow-700">
                  <div>
                    <div>
                      <b>Source</b>: nithin
                    </div>
                    <div>
                      <b>Destination</b>: nithin
                    </div>
                    <div>
                      <b>Departure Date</b>: {/* Add departure date here */}
                    </div>
                    <div>
                      <b>Flight Numbers</b>: {/* Add flight numbers here */}
                    </div>
                    <div>
                      <b>Airlines</b>: {/* Add airlines here */}
                    </div>
                  </div>
                  <div className="amendment-category-container">
                    <div className="amendment-category">
                      <h4></h4>
                      <div>
                        <b>Amendment Charges</b>: {/* Add amendment charges here */}
                      </div>
                      <div>
                        <b>Refund Amount</b>: {/* Add refund amount here */}
                      </div>
                      <div>
                        <b>Total Fare</b>: {/* Add total fare here */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">
                  Select the Trips and Passengers to Cancel
                </h3>
                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-6 w-6 text-[#ffeb3b] border-gray-300 rounded focus:ring-[#ffeb3b] focus:outline-none"
                    onChange={handleCancelWholeTicket}
                    checked={cancelWholeTicket}
                  />
                  <span className="ml-3 text-[#3951b9] font-semibold">
                    Cancel Whole Ticket
                  </span>
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
                            disabled={cancelWholeTicket || !selectedTrips.includes(tripIndex)}
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
                  <label className="block text-[#3951b9] font-semibold mb-2">
                    Remarks
                  </label>
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
