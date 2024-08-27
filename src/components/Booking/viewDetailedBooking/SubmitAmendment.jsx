import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { PiAirplaneInFlightDuotone } from "react-icons/pi";
import CancelConfirmModal from "./CancelConfirmModal";
import ReactToast from "../../util/ReactToast";
import ComboAmendment from "../../Home/ComboAmendment";

const SubmitAmendment = ({
  singleBookingData,
  setModalIsOpen,
  searchQuery,
}) => {
  const { token } = useSelector((state) => state.auth);
  const [bookingId] = useState(singleBookingData.order.bookingId);
  const [fullBookingData, setFullbookingData] = useState({});
  const [Loading, setLoading] = useState(true);
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [selectedTravelers, setSelectedTravelers] = useState([]);
  const [cancelWholeTicket, setCancelWholeTicket] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amendmentLoading, setAmendmentLoadin] = useState(false);
  const [activeTrip, setActiveTrip] = useState(null);

  const openModal = () => {
    if (!remarks) ReactToast("Please Enter Remarks");
    else {
      setIsModalOpen(true);
    }
  };

  function convertDateFormat(inputDate) {
    const formattedDate = inputDate.split("T")[0];
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
      ReactToast(error.message);
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
    if (cancelWholeTicket) return;
    setSelectedTrips((prevSelectedTrips) => {
      if (prevSelectedTrips.includes(tripIndex)) {
        setSelectedTravelers((prevSelectedTravelers) =>
          prevSelectedTravelers.filter(
            (traveler) => !traveler.startsWith(`${tripIndex}-`)
          )
        );
        return prevSelectedTrips.filter((index) => index !== tripIndex);
      } else {
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
    if (cancelWholeTicket || selectedTrips.includes(tripIndex)) return;
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
        dest:
          trip.sI.length === 1
            ? trip?.sI[0].aa.code
            : trip?.sI[trip.sI.length - 1].aa.code,
        departureDate: convertDateFormat(trip?.sI[0].dt),
      };

      const tripTravelers = selectedTravelers
        .filter((traveler) => traveler.startsWith(`${tripIndex}-`))
        .map((traveler) => {
          const travelerIndex = parseInt(traveler.split("-")[1]);
          const travelerData =
            fullBookingData?.itemInfos?.AIR?.travellerInfos[travelerIndex];
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
          dest:
            trip.sI.length === 1
              ? trip?.sI[0].aa.code
              : trip?.sI[trip.sI.length - 1].aa.code,
          departureDate: convertDateFormat(trip?.sI[0].dt),
        };

        const tripTravelers = selectedTravelers
          .filter((traveler) => traveler.startsWith(`${tripIndex}-`))
          .map((traveler) => {
            const travelerIndex = parseInt(traveler.split("-")[1]);
            const travelerData =
              fullBookingData?.itemInfos?.AIR?.travellerInfos[travelerIndex];
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
    setAmendmentLoadin(true);
    const data = getFormattedData();

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
          console.log({ data });
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}booking/submit-amendment`,
            data,
            { headers }
          );
          console.log({ response });
        }
      }
      setAmendmentLoadin(false);
      setModalIsOpen(false);
      window.location.reload();
      ReactToast("Amendment Submitted");
    } catch (error) {
      ReactToast(error.response.data.errors[0].message);
      setAmendmentLoadin(false);
      setModalIsOpen(false);
      toast(error.response.data.errors[0].message);
    }
  };

  const handleConfirm = (selection) => {
    if (selection == "no") {
      ReactToast("press yes to confirm submit amendment");
    } else {
      submitAmendment();
    }
  };

  const togglePassengers = (tripIndex) => {
    setActiveTrip(activeTrip === tripIndex ? null : tripIndex);
  };

  return (
    // <div className="px-4 py-4 flex justify-center items-center h-[70vh] w-full">
    //   <div className="px-4 py-4 h-[70vh] bg-white w-full rounded-lg ">
    //     <div className="transition-padding duration-300 h-full w-full">
    //       {Loading ? (
    //         <div className="flex justify-center items-center w-full h-full">
    //           <motion.div
    //             className="w-12 h-12 border-4 border-t-4 border-t-[#D7B56D] border-gray-200 rounded-full"
    //             variants={spinnerVariants}
    //             animate="animate"
    //           />
    //         </div>
    //       ) : (
    //         <div>
    //           <div>
    //             {searchQuery?.isDomestic === false &&
    //             searchQuery?.searchType !== "ONEWAY" ? (
    //               <ComboAmendment singleBookingData={singleBookingData} setMainModalIsOpen={setModalIsOpen} />
    //             ) : (
    //               <>
    //                 <h3 className="text-base md:text-lg font-semibold mb-4 text-left">
    //                   Select the Trips and Passengers to Cancel
    //                 </h3>
    //                 <label className="flex items-center mt-2 mb-4">
    //                   <input
    //                     type="checkbox"
    //                     className="form-checkbox h-6 w-6 text-[#1B1D29] border-gray-300 rounded focus:ring-yellow-500 focus:outline-none"
    //                     onChange={handleCancelWholeTicket}
    //                     checked={cancelWholeTicket}
    //                   />
    //                   <span
    //                     className={`ml-3 md:text-sm font-semibold p-1 rounded-md ${
    //                       cancelWholeTicket ? "border-[#1B1D29]" : "bg-gray-100"
    //                     }`}
    //                   >
    //                     Select to cancel all the trip
    //                   </span>
    //                 </label>
    //                 <div
    //                   className="flex overflow-x-scroll
    //                  pb-4"
    //                 >
    //                   {fullBookingData?.itemInfos?.AIR?.tripInfos.map(
    //                     (trip, tripIndex) => (
    //                       <div
    //                         key={tripIndex}
    //                         className="mt-4 mr-4 flex-shrink-0"
    //                       >
    //                         <div
    //                           className={`flex flex-col gap-1 p-2 mb-2 text-sm md:text-base font-bold  border rounded-lg ${
    //                             selectedTrips.includes(tripIndex)
    //                               ? "bg-[#7da2c2] border-[#1B1D29] text-black"
    //                               : activeTrip === tripIndex
    //                               ? "bg-[#D7B56D] border-[#1B1D29] text-black"
    //                               : "bg-gray-400 text-white"
    //                           }`}
    //                         >
    //                           <div className="flex justify-between items-center">
    //                             <span>
    //                               Trip {tripIndex + 1}
    //                               <p className="text-[#1B1D29] text-base md:text-lg font-bold">
    //                                 {trip?.sI[0].da.code} -
    //                                 {trip.sI.length === 1
    //                                   ? trip?.sI[0].aa.code
    //                                   : trip?.sI[trip.sI.length - 1].aa.code}
    //                               </p>
    //                             </span>
    //                           </div>

    //                           <label className="flex items-center mt-2">
    //                             <input
    //                               type="checkbox"
    //                               className="form-checkbox h-6 w-6 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500 focus:outline-none"
    //                               onChange={() =>
    //                                 handleTripSelection(tripIndex)
    //                               }
    //                               checked={selectedTrips.includes(tripIndex)}
    //                               disabled={cancelWholeTicket}
    //                             />
    //                             <span className="ml-3 text-sm font-semibold">
    //                               Cancel this trip
    //                             </span>
    //                           </label>
    //                           <button
    //                             onClick={() => togglePassengers(tripIndex)}
    //                             className="text-[#D7B56D] bg-black mt-1 py-1 rounded-lg w-full text-sm font-bold"
    //                           >
    //                             {activeTrip === tripIndex
    //                               ? "Hide Passengers"
    //                               : "Show Passengers"}
    //                           </button>
    //                         </div>
    //                       </div>
    //                     )
    //                   )}
    //                 </div>
    //                 {activeTrip !== null && (
    //                   <div className="mt-4">
    //                     <h2 className="font-bold p-1">
    //                       Passengers for Trip {activeTrip + 1}
    //                     </h2>
    //                     {fullBookingData?.itemInfos?.AIR?.travellerInfos.map(
    //                       (traveler, travelerIndex) => (
    //                         <div
    //                           key={travelerIndex}
    //                           className={`flex flex-wrap items-center p-4 rounded-lg border-2 mt-2 ${
    //                             selectedTravelers.includes(
    //                               `${activeTrip}-${travelerIndex}`
    //                             )
    //                               ? "border-[#1B1D29]"
    //                               : "border-gray-200"
    //                           }`}
    //                         >
    //                           <div className="flex flex-wrap">
    //                             <div className="h-8 md:h-16 w-8 md:w-16 flex items-center justify-center bg-[#1B1D29] text-[#D7B56D] font-medium text-xl rounded-full mr-4">
    //                               {traveler.fN.charAt(0).toUpperCase()}
    //                             </div>
    //                             <div>
    //                               <div className="text-sm font-bold">
    //                                 {traveler.fN} {traveler.lN}
    //                               </div>
    //                               <div className="text-sm font-bold">
    //                                 {traveler.dob}
    //                               </div>
    //                               <div className="text-sm font-bold">
    //                                 {traveler.pt}
    //                               </div>
    //                             </div>
    //                           </div>
    //                           <div className="ml-auto">
    //                             <input
    //                               type="checkbox"
    //                               className="form-checkbox h-6 w-6 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500 focus:outline-none"
    //                               onChange={() =>
    //                                 handleTravelerSelection(
    //                                   activeTrip,
    //                                   travelerIndex
    //                                 )
    //                               }
    //                               checked={selectedTravelers.includes(
    //                                 `${activeTrip}-${travelerIndex}`
    //                               )}
    //                               disabled={
    //                                 cancelWholeTicket ||
    //                                 selectedTrips.includes(activeTrip)
    //                               }
    //                             />
    //                           </div>
    //                         </div>
    //                       )
    //                     )}
    //                   </div>
    //                 )}
    //                 <div className="mt-4">
    //                   <label className="block text-[#1B1D29] font-semibold mb-2">
    //                     Remarks
    //                   </label>
    //                   <textarea
    //                     className="form-textarea mt-1 block w-full rounded-md border border-gray-800 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
    //                     rows="3"
    //                     value={remarks}
    //                     onChange={(e) => setRemarks(e.target.value)}
    //                   ></textarea>
    //                 </div>
    //                 <div className="mt-8">
    //                   {amendmentLoading ? (
    //                     <div className="flex justify-center items-center h-full">
    //                       <motion.div
    //                         className="w-12 h-12 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full"
    //                         variants={spinnerVariants}
    //                         animate="animate"
    //                       />
    //                     </div>
    //                   ) : (
    //                     <button
    //                       className="px-4 py-2 bg-[#1B1D29] text-white font-semibold mb-4 rounded-md transition-colors"
    //                       onClick={openModal}
    //                     >
    //                       Submit Cancellation
    //                     </button>
    //                   )}
    //                   <CancelConfirmModal
    //                     isOpen={isModalOpen}
    //                     onClose={closeModal}
    //                     onConfirm={handleConfirm}
    //                     title="Confirmation"
    //                     message="Are you sure you want to proceed?"
    //                   />
    //                 </div>
    //               </>
    //             )}
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className="px-2 sm:px-4 py-4 flex justify-center items-center max-h-[90vh] w-full overflow-y-auto">
      <div className="bg-white w-full rounded-lg shadow-lg">
        <div className="p-4 sm:p-6">
          {Loading ? (
            <div className="flex justify-center items-center w-full h-40">
              <motion.div
                className="w-12 h-12 border-4 border-t-4 border-t-[#D7B56D] border-gray-200 rounded-full"
                variants={spinnerVariants}
                animate="animate"
              />
            </div>
          ) : (
            <div>
              {searchQuery?.isDomestic === false &&
              searchQuery?.searchType !== "ONEWAY" ? (
                <ComboAmendment
                  singleBookingData={singleBookingData}
                  setMainModalIsOpen={setModalIsOpen}
                />
              ) : (
                <>
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 text-left text-[#1B1D29]">
                    Select the Trips and Passengers to Cancel
                  </h3>
                  <label className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-[#1B1D29] border-gray-300 rounded focus:ring-[#D7B56D] focus:outline-none"
                      onChange={handleCancelWholeTicket}
                      checked={cancelWholeTicket}
                    />
                    <span className="ml-2 text-sm sm:text-base font-semibold">
                      Select to cancel all the trip
                    </span>
                  </label>
                  <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:px-0">
                    {fullBookingData?.itemInfos?.AIR?.tripInfos.map(
                      (trip, tripIndex) => (
                        <div
                          key={tripIndex}
                          className="mr-4 flex-shrink-0 w-64 sm:w-72"
                        >
                          <div
                            className={`flex flex-col gap-1 p-3 mb-2 text-sm border rounded-lg ${
                              selectedTrips.includes(tripIndex)
                                ? "bg-[#7da2c2] border-[#1B1D29] text-black"
                                : activeTrip === tripIndex
                                ? "bg-[#D7B56D] border-[#1B1D29] text-black"
                                : "bg-gray-400 text-white"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span>
                                Trip {tripIndex + 1}
                                <p className="text-[#1B1D29] text-base font-bold">
                                  {trip?.sI[0].da.code} -
                                  {trip.sI.length === 1
                                    ? trip?.sI[0].aa.code
                                    : trip?.sI[trip.sI.length - 1].aa.code}
                                </p>
                              </span>
                            </div>

                            <label className="flex items-center mt-2">
                              <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-[#1B1D29] border-gray-300 rounded focus:ring-[#D7B56D] focus:outline-none"
                                onChange={() => handleTripSelection(tripIndex)}
                                checked={selectedTrips.includes(tripIndex)}
                                disabled={cancelWholeTicket}
                              />
                              <span className="ml-2 text-sm font-semibold">
                                Cancel this trip
                              </span>
                            </label>
                            <button
                              onClick={() => togglePassengers(tripIndex)}
                              className="text-[#D7B56D] bg-[#1B1D29] mt-1 py-1 rounded-lg w-full text-sm font-bold"
                            >
                              {activeTrip === tripIndex
                                ? "Hide Passengers"
                                : "Show Passengers"}
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  {activeTrip !== null && (
                    <div className="mt-4">
                      <h2 className="font-bold p-1 text-[#1B1D29]">
                        Passengers for Trip {activeTrip + 1}
                      </h2>
                      <div className="space-y-2">
                        {fullBookingData?.itemInfos?.AIR?.travellerInfos.map(
                          (traveler, travelerIndex) => (
                            <div
                              key={travelerIndex}
                              className={`flex items-center p-3 rounded-lg border ${
                                selectedTravelers.includes(
                                  `${activeTrip}-${travelerIndex}`
                                )
                                  ? "border-[#1B1D29]"
                                  : "border-gray-200"
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="h-8 w-8 flex items-center justify-center bg-[#1B1D29] text-[#D7B56D] font-medium text-lg rounded-full">
                                  {traveler.fN.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="text-sm font-bold">
                                    {traveler.fN} {traveler.lN}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {traveler.dob} | {traveler.pt}
                                  </div>
                                </div>
                              </div>
                              <div className="ml-auto">
                                <input
                                  type="checkbox"
                                  className="form-checkbox h-5 w-5 text-[#1B1D29] border-gray-300 rounded focus:ring-[#D7B56D] focus:outline-none"
                                  onChange={() =>
                                    handleTravelerSelection(
                                      activeTrip,
                                      travelerIndex
                                    )
                                  }
                                  checked={selectedTravelers.includes(
                                    `${activeTrip}-${travelerIndex}`
                                  )}
                                  disabled={
                                    cancelWholeTicket ||
                                    selectedTrips.includes(activeTrip)
                                  }
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                  <div className="mt-4">
                    <label className="block text-[#1B1D29] font-semibold mb-2">
                      Remarks
                    </label>
                    <textarea
                      className="form-textarea mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#D7B56D] focus:ring focus:ring-[#D7B56D] focus:ring-opacity-50 p-2"
                      rows="3"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mt-6">
                    {amendmentLoading ? (
                      <div className="flex justify-center items-center h-10">
                        <motion.div
                          className="w-10 h-10 border-4 border-t-4 border-t-[#D7B56D] border-gray-200 rounded-full"
                          variants={spinnerVariants}
                          animate="animate"
                        />
                      </div>
                    ) : (
                      <button
                        className="w-full px-4 py-2 bg-[#1B1D29] text-white font-semibold rounded-md transition-colors hover:bg-opacity-90"
                        onClick={openModal}
                      >
                        Submit Cancellation
                      </button>
                    )}
                    <CancelConfirmModal
                      isOpen={isModalOpen}
                      onClose={closeModal}
                      onConfirm={handleConfirm}
                      title="Confirmation"
                      message="Are you sure you want to proceed?"
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitAmendment;
