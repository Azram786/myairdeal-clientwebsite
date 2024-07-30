import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteModalTemplateConfirm from "./DeleteModalTemplateConfirm";
import { PiAirplaneInFlightDuotone } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
const SubmitAmendment = ({ singleBookingData }) => {
  console.log({ singleBookingData, cancelTicke: true })
  const token = useSelector((state) => state.auth.token);
  const apiURL = import.meta.env.VITE_SERVER_URL;
  const [bookingId, setBookingId] = useState(singleBookingData.order.bookingId);
  console.log({ bookingId })
  const [disable, setDisabled] = useState(false);
  const [Remarks, setRemarks] = useState("");
  const [Loading, setLoading] = useState(false);
  const [ErrorDetails, setErrorDetails] = useState([]);
  const [trips, setTrips] = useState(null);
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [checkTrips, setCheckTrips] = useState(null);
  const navigate = useNavigate();
  const [amendmentId, setAmendmentId] = useState(null);
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const getData = async () => {
    if (bookingId === "") {
      toast.warning("Please Enter Booking ID");
      return;
    }
    setLoading(true);
    await axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}booking/retrieve-booking`,
        {
          bookingId: singleBookingData.order.bookingId,
        }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
      )
      .then((res) => {
        setLoading(false);

        // Extract trips information
        const travellers = res.data.data.itemInfos?.AIR?.travellerInfos.map(
          (passenger) => ({
            fn: passenger.fN,
            ln: passenger.lN,
          })
        );
        const extractedTrips = res.data.data.itemInfos?.AIR?.tripInfos.map(
          (tripInfo) => {
            const segments = tripInfo.sI;
            const firstSegment = segments[0];
            const lastSegment = segments[segments.length - 1];
            return {
              src: firstSegment.da.code,
              dest: lastSegment.aa.code,
              departureDate: formatDate(firstSegment.dt),
              travellers,
            };
          }
        );
        setTrips(extractedTrips);
        setDisabled(true);
      })
      .catch((error) => {
        if (error?.response?.data?.action === "logout") {
          setTimeout(() => {
            dispatch({ type: "logout" });
          }, 1000);
        }
        toast.error(error?.response?.data?.error);
        setLoading(false);
        console.log(error)
      });
  };

  const checkAmendment = async () => {
    if (bookingId === "") {
      toast.warning("Please Enter Booking ID");
    }
    setLoading(true);
    await axios
      .post(
        `${apiURL}booking/amendment-charges`,
        {
          bookingId,
          type: "CANCELLATION",
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setCheckTrips(res.data.trips);
      })
      .catch((error) => {
        if (error?.response?.data?.action === "logout") {
          setTimeout(() => {
            dispatch({ type: "logout" });
          }, 1000);
        }
        setLoading(false);
        toast.error(error?.response?.data?.error);
        setErrorDetails(error?.response?.data?.errors);
      });
  };

  const submitAmendment = async () => {
    const finalTripList = selectedTrips.map((selection) => {
      const trip = trips[selection.tripIndex];
      const selectedPassengers = selection.passengerIndices.map(
        (index) => trip.travellers[index]
      );

      const tripDetails = {
        src: trip.src,
        dest: trip.dest,
        departureDate: trip.departureDate,
      };

      if (selectedPassengers.length > 0) {
        tripDetails.travellers = selectedPassengers;
      }

      return tripDetails;
    });

    const requestData = {
      bookingId,
      type: "CANCELLATION",
      remarks: Remarks,
    };

    if (finalTripList.length > 0) {
      requestData.trips = finalTripList;
    }

    console.log(requestData);

    setLoading(true);
    await axios
      .post(`${apiURLbooking}submit-amendment, requestData`, {
        headers: {
          authorization: ` Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        toast.success("Amendment Submitted Successfsully");
        setBookingId("");
        setRemarks("");
        setBookingId("");
        setErrorDetails([]);
        setTrips(null);
        setAmendmentId(res.data.amendmentId);
        setIsDeleteModalOpen(false);
        setDisabled(false);
        setCheckTrips(null);
      })
      .catch((error) => {
        if (error?.response?.data?.action === "logout") {
          setTimeout(() => {
            dispatch({ type: "logout" });
          }, 1000);
        }
        toast.error(error?.response?.data?.error);
        setLoading(false);
        setErrorDetails(error?.response?.data?.errors);
        setIsDeleteModalOpen(false);
      });
  };

  const handleTripSelection = (tripIndex) => {
    setSelectedTrips((prevSelectedTrips) => {
      if (prevSelectedTrips.some((t) => t.tripIndex === tripIndex)) {
        return prevSelectedTrips.filter((t) => t.tripIndex !== tripIndex);
      } else {
        return [...prevSelectedTrips, { tripIndex, passengerIndices: [] }];
      }
    });
  };

  const handlePassengerSelection = (tripIndex, passengerIndex) => {
    setSelectedTrips((prevSelectedTrips) => {
      const trip = prevSelectedTrips.find((t) => t.tripIndex === tripIndex);
      if (trip) {
        if (trip.passengerIndices.includes(passengerIndex)) {
          trip.passengerIndices = trip.passengerIndices.filter(
            (id) => id !== passengerIndex
          );
        } else {
          trip.passengerIndices.push(passengerIndex);
        }
        return [...prevSelectedTrips];
      } else {
        return [
          ...prevSelectedTrips,
          { tripIndex, passengerIndices: [passengerIndex] },
        ];
      }
    });
  };


  const passengers = [
    {
      firstName: 'Talla',
      lastName: 'Jayasurya',
      mailID: 'Surya',
      dob: '20/04/1998'
    },
    // Add more passengers if needed
  ];

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
  useEffect(() => {
    getData();
  }, []);

  return (


    <div className="p-6  bg-white  rounded-xl shadow-md space-y-4">
      {Loading ? <>
        <motion.div
          className="w-4 h-4 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full"
          variants={spinnerVariants}
          animate="animate"
        />  </> : <>
        <h1 className="text-2xl font-bold text-gray-800 ">Ticket Cancellation</h1>

        {checkTrips?.map(() => <>
          <div className="p-2 bg-[#3951b9] rounded-lg flex flex-col">
            <p className="text-white font-bold flex items-center gap-3">
              HYD <PiAirplaneInFlightDuotone /> DEL
            </p>
            <p className="text-white font-semibold">29/07/2024</p>
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                className="form-checkbox h-6 w-6 text-[#ffeb3b] border-gray-300 rounded focus:ring-[#ffeb3b] focus:outline-none"
              />
              <span className="ml-3 text-white font-semibold">Cancel this ticket</span>
            </label>
          </div>


          <div className="grid grid-cols-2 gap-4">
            {passengers.map((passenger, index) => (
              <div key={index} className="flex items-center p-4 bg-blue-100 rounded-lg">
                <div className="h-16 w-16 flex items-center justify-center bg-blue-500 text-white font-bold text-xl rounded-full mr-4">
                  {passenger.firstName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-md font-bold">
                    Name : {passenger.firstName} {passenger.lastName}
                  </div>
                  <div className="text-sm font-bold">
                    Mail ID : {passenger.mailID}
                  </div>
                  <div className="text-sm font-bold">
                    Date of birth : {passenger.dob}
                  </div>
                </div>
                <div className="ml-auto">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                </div>
              </div>
            ))}
          </div>
        </>)}
        <p className="text-gray-600">Select Trips and Passengers to Cancel</p>


        <div className="space-y-2">
          <label className="block text-gray-600">Remarks</label>
          <textarea
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Phone Number"
          ></textarea>
        </div>

        <div className="flex space-x-4">
          <button className="w-full py-2 px-4 bg-[#637adc] border text-white rounded-md">
            Check Amendment Charges
          </button>
          <button className="w-full py-2 px-4 bg-white border-[#3951b9] border text-[#3951b9] rounded-md">
            Submit Amendment Charges
          </button>
        </div>
        {amendmentId && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
            <p>
              Amendment is Submitted: Your Amendment ID is{" "}
              <span className="font-bold">{amendmentId}</span>
            </p>
          </div>
        )}
      </>}

    </div>
  );
};

export default SubmitAmendment;
