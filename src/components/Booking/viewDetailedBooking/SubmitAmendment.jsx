import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { PiAirplaneInFlightDuotone } from "react-icons/pi";
import CancelConfirmModal from "./CancelConfirmModal";
import ReactToast from "../../util/ReactToast";
const SubmitAmendment = ({ singleBookingData, setModalIsOpen }) => {




  const { token } = useSelector((state) => state.auth);
  const [bookingId] = useState(singleBookingData.order.bookingId);
  const [fullBookingData, setFullbookingData] = useState({});
  const [Loading, setLoading] = useState(true);
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [selectedTravelers, setSelectedTravelers] = useState([]);
  const [cancelWholeTicket, setCancelWholeTicket] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amendmentLoading, setAmendmentLoadin] = useState(false)
  const openModal = () => {
    if (!remarks) toast("enter remarks");
    else {
      setIsModalOpen(true);
    }
  }
  function convertDateFormat(inputDate) {
    // Create a Date object from the input string
    const date = new Date(inputDate);

    // Extract the year, month, and day components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2,
      '0');

    // Format the date   
    //  as YYYY - MM - DD
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }
  const closeModal = () => setIsModalOpen(false);
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
        // Remove the trip and all related travelers
        setSelectedTravelers((prevSelectedTravelers) =>
          prevSelectedTravelers.filter((traveler) => !traveler.startsWith(`${tripIndex}-`))
        );
        return prevSelectedTrips.filter((index) => index !== tripIndex);
      } else {
        // Uncheck all passengers for this trip
        setSelectedTravelers((prevSelectedTravelers) =>
          prevSelectedTravelers.filter((traveler) => !traveler.startsWith(`${tripIndex}-`))
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
      const tripData = {
        src: trip?.sI[0].da.code,
        dest: trip.sI.length === 1 ? trip?.sI[0].aa.code : trip?.sI[trip.sI.length - 1].aa.code,
        departureDate: convertDateFormat(trip?.sI[0].dt),
      };

      const tripTravelers = selectedTravelers
        .filter((traveler) => traveler.startsWith(`${tripIndex}-`))
        .map((traveler) => {
          const travelerIndex = parseInt(traveler.split("-")[1]);
          const travelerData = fullBookingData?.itemInfos?.AIR?.travellerInfos[travelerIndex];
          return {
            fn: travelerData.fN,
            ln: travelerData.lN,
          };
        });

      if (tripTravelers.length > 0) {
        tripData.travellers = tripTravelers;
      }

      return tripData;
    });

    // Include trips for travelers that don't have their trips selected
    selectedTravelers.forEach((travelerKey) => {
      const [tripIndex] = travelerKey.split("-").map(Number);
      if (!selectedTrips.includes(tripIndex)) {
        const trip = fullBookingData?.itemInfos?.AIR?.tripInfos[tripIndex];
        const tripData = {
          src: trip?.sI[0].da.code,
          dest: trip.sI.length === 1 ? trip?.sI[0].aa.code : trip?.sI[trip.sI.length - 1].aa.code,
          departureDate: trip?.sI[0].dt,
        };

        const tripTravelers = selectedTravelers
          .filter((traveler) => traveler.startsWith(`${tripIndex}-`))
          .map((traveler) => {
            const travelerIndex = parseInt(traveler.split("-")[1]);
            const travelerData = fullBookingData?.itemInfos?.AIR?.travellerInfos[travelerIndex];
            return {
              fn: travelerData.fN,
              ln: travelerData.lN,
            };
          });

        if (tripTravelers.length > 0) {
          tripData.travellers = tripTravelers;
        }

        tripsData.push(tripData);
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
    setAmendmentLoadin(true)
    const data = getFormattedData();
    console.log({ data });
    console.log({ cancelWholeTicket, selectedTravelers, selectedTrips });

    try {
      if (!remarks) toast("enter remarks");
      else {

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        if (cancelWholeTicket) {
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}booking/submit-amendment`,
            { bookingId: data.bookingId, remarks, type: data.type },
            { headers }
          );
          console.log({ response });
        } else {
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}booking/submit-amendment`,
            data,
            { headers }
          );
          console.log({ response })
        }
      }
      setAmendmentLoadin(false)
      setModalIsOpen(false)


    } catch (error) {
      console.log(error)
      setAmendmentLoadin(false)
      setModalIsOpen(false)
      toast(error.response.data.errors[0].message);

    }
  };

  const handleConfirm = (selection) => {
    console.log(`User selected: ${selection}`);
    if (selection == "no") {
      ReactToast("press yes to confirm submit amendment")
    } else {

      submitAmendment()
    }
  };

  return (
    <div className="px-4 py-4 flex justify-center items-center  h-[50vh] w-full">
      <div className="px-4 py-4 h-[50vh] bg-white  w-full rounded-lg">
        <div className="transition-padding duration-300 h-full w-full">
          {Loading ? (
            <div className="flex justify-center items-center w-full h-full">
              <motion.div
                className="w-12 h-12 border-4 border-t-4 border-t-[#007EC4] border-gray-200 rounded-full"
                variants={spinnerVariants}
                animate="animate"
              />
            </div>
          ) : (
            <div>
              <div className="mt-2">
                <h3 className="text-2xl font-bold mb-4 text-center">Select the Trips and Passengers to Cancel</h3>
                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-6 w-6 text-blue-500 border-gray-300 rounded focus:ring-yellow-500 focus:outline-none"
                    onChange={handleCancelWholeTicket}
                    checked={cancelWholeTicket}
                  />
                  <span className={`ml-3 font-bold border p-1 rounded-md ${cancelWholeTicket ? 'border-blue-700 bg-blue-200' : 'bg-gray-100'}`}>
                    Cancel Whole Ticket
                  </span>
                </label>

                {fullBookingData?.itemInfos?.AIR?.tripInfos.map((trip, tripIndex) => (
                  <div key={tripIndex} className="mt-4">
                    <div className={`flex flex-col gap-1 p-2 mb-2 font-extrabold border rounded-lg ${selectedTrips.includes(tripIndex) && "border-blue-700 bg-blue-200"}`}>
                      Trip {tripIndex + 1}

                      <p className="text-blue-700 text-2xl
                        
                        font-extrabold">
                        {trip?.sI[0].da.code} -
                        {trip.sI.length === 1 ? trip?.sI[0].aa.code : trip?.sI[trip.sI.length - 1].aa.code}
                      </p>
                      <label className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          className="form-checkbox h-6 w-6 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500 focus:outline-none"
                          onChange={() => handleTripSelection(tripIndex)}
                          checked={selectedTrips.includes(tripIndex)}
                          disabled={cancelWholeTicket}
                        />
                        <span className="ml-3  font-semibold">Cancel this trip</span>
                      </label>
                    </div>
                    {fullBookingData?.itemInfos?.AIR?.travellerInfos.map((traveler, travelerIndex) => (
                      <div key={travelerIndex} className={`flex items-center p-4 bg-blue-100 rounded-lg mt-2 ${selectedTravelers.includes(`${tripIndex}-${travelerIndex}`) ? 'border border-blue-800' : ''}`}>
                        <div className="h-16 w-16 flex items-center justify-center bg-blue-500 text-white font-bold text-xl rounded-full mr-4">
                          {traveler.fN.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-md font-bold">
                            {traveler.fN} {traveler.lN}
                          </div>
                          <div className="text-md font-bold">
                            {traveler.dob}
                          </div>
                          <div className="text-md font-bold">
                            {traveler.pt}
                          </div>
                        </div>
                        <div className="ml-auto">
                          <input
                            type="checkbox"
                            className="form-checkbox h-6 w-6 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500 focus:outline-none"
                            onChange={() => handleTravelerSelection(tripIndex, travelerIndex)}
                            checked={selectedTravelers.includes(`${tripIndex}-${travelerIndex}`)}
                            disabled={cancelWholeTicket || selectedTrips.includes(tripIndex)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="mt-4">
                  <label className="block text-blue-700 font-semibold mb-2">Remarks</label>
                  <textarea
                    className="form-textarea mt-1 block w-[96%] rounded-md border border-gray-800 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
                    rows="3"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  ></textarea>
                </div>
                <div className="mt-8">

                  {amendmentLoading ? <><div className="flex justify-center items-center h-full">
                    <motion.div
                      className="w-12 h-12 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full"
                      variants={spinnerVariants}
                      animate="animate"
                    />
                  </div></> : <button
                    className="px-4 py-2 bg-blue-700 text-white font-semibold mb-4 rounded-md hover:bg-yellow-500 hover:text-blue-700 transition-colors"
                    // onClick={submitAmendment}
                    onClick={openModal}
                  >
                    Submit Cancellation
                  </button>
                  }
                  <CancelConfirmModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={handleConfirm}
                    title="Confirmation"
                    message="Are you sure you want to proceed?"
                  />
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
