import React, { useState } from "react";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import SubmitAmendment from "./SubmitAmendment";
import TicketRaising from "./TicketRaising";
import timeFormatChanger from "../../util/timeFormatChanger";
import dateDateFormatChanger from "../../util/dateDateFormatChanger";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinner from "../../Profile/Spinner";

const ViewAmendmentDetails = ({ amendment }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [amendmentData, setAmendmentData] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const [trips] = useState([
    {
      src: "BOM",
      dest: "DEL",
      departureDate: "2020-10-16T00:30",
      flightNumbers: ["329"],
      airlines: ["G8"],
      travellers: [
        {
          fn: "CBD",
          ln: "CBD",
          amendmentCharges: 3000.0,
          refundableamount: 8515.0,
          totalFare: 11515.0,
        },
        {
          fn: "ABC",
          ln: "BISHT",
          amendmentCharges: 3000.0,
          refundableamount: 8515.0,
          totalFare: 11515.0,
        },
        {
          fn: "QWE",
          ln: "QWE",
          amendmentCharges: 3000.0,
          refundableamount: 8515.0,
          totalFare: 11515.0,
        },
        {
          fn: "CVBN",
          ln: "CVB",
          amendmentCharges: 0.0,
          refundableamount: 1500.0,
          totalFare: 1500.0,
        },
        {
          fn: "KSHITIJ",
          ln: "BISHT",
          amendmentCharges: 3000.0,
          refundableamount: 8515.0,
          totalFare: 11515.0,
        },
        {
          fn: "ASD",
          ln: "ASD",
          amendmentCharges: 0.0,
          refundableamount: 1500.0,
          totalFare: 1500.0,
        },
      ],
    },
    {
      src: "DEL",
      dest: "MAA",
      departureDate: "2020-10-18T01:30",
      flightNumbers: ["520"],
      airlines: ["G8"],
      travellers: [
        {
          fn: "KSHITIJ",
          ln: "BISHT",
          amendmentCharges: 3000.0,
          refundableamount: 8024.0,
          totalFare: 11024.0,
        },
        {
          fn: "QWE",
          ln: "QWE",
          amendmentCharges: 3000.0,
          refundableamount: 8024.0,
          totalFare: 11024.0,
        },
        {
          fn: "ABC",
          ln: "BISHT",
          amendmentCharges: 3000.0,
          refundableamount: 8024.0,
          totalFare: 11024.0,
        },
        {
          fn: "CVBN",
          ln: "CVB",
          amendmentCharges: 0.0,
          refundableamount: 1500.0,
          totalFare: 1500.0,
        },
        {
          fn: "CBD",
          ln: "CBD",
          amendmentCharges: 3000.0,
          refundableamount: 8024.0,
          totalFare: 11024.0,
        },
        {
          fn: "ASD",
          ln: "ASD",
          amendmentCharges: 0.0,
          refundableamount: 1500.0,
          totalFare: 1500.0,
        },
      ],
    },
    {
      src: "MAA",
      dest: "HYD",
      departureDate: "2020-10-20T01:30",
      flightNumbers: ["530"],
      airlines: ["G8"],
      travellers: [
        {
          fn: "KSHITIJ",
          ln: "BISHT",
          amendmentCharges: 3000.0,
          refundableamount: 8024.0,
          totalFare: 11024.0,
        },
        {
          fn: "QWE",
          ln: "QWE",
          amendmentCharges: 3000.0,
          refundableamount: 8024.0,
          totalFare: 11024.0,
        },
        {
          fn: "ABC",
          ln: "BISHT",
          amendmentCharges: 3000.0,
          refundableamount: 8024.0,
          totalFare: 11024.0,
        },
        {
          fn: "CVBN",
          ln: "CVB",
          amendmentCharges: 0.0,
          refundableamount: 1500.0,
          totalFare: 1500.0,
        },
        {
          fn: "CBD",
          ln: "CBD",
          amendmentCharges: 3000.0,
          refundableamount: 8024.0,
          totalFare: 11024.0,
        },
        {
          fn: "ASD",
          ln: "ASD",
          amendmentCharges: 0.0,
          refundableamount: 1500.0,
          totalFare: 1500.0,
        },
      ],
    },
  ]);

  const [singleTripDetails, setSingleTripDetails] = useState(trips[0])
  const openModalHandler = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleButtonClick = (link) => {
    openModalHandler();
  };

  const getAmendmentDetails = async (id) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}booking/view-amendment`,
        { amendmentId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAmendmentData(response.data);
      setLoading(false);
    } catch (error) {
      ReactToast(error.message);
    }
  };
  const MyComponent = (departureDate) => {
    const date = new Date(departureDate);
    const formattedDate = date.toLocaleDateString(); // Format date (e.g., "10/20/2020")
    const formattedTime = date.toLocaleTimeString(); // Format time (e.g., "1:30:00 AM")

    return (
      <span className="font-semibold text-[#84724a]">
        {`${formattedDate}  `}
        <span className="text-black">{`  ${formattedTime}`}</span>
      </span>
    );
  };

  if (amendment.length < 1) return;

  return (
    <div className="mx-3 flex flex-col gap-4 my-4">
      <div className="bg-[#D7B56D] text-white font-bold p-4 rounded-md">
        Amendment List
      </div>
      {amendment.map((value) => {
        return (
          <div
            className="flex flex-col md:flex-row items-center justify-between bg-blue-100 border-t border-blue-200 rounded-lg p-4"
            key={value.id}
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{value.id}</h3>
              <p className="text-sm text-gray-700">
                {timeFormatChanger(value.time)}
              </p>
              <p className="text-sm text-gray-700">
                {dateDateFormatChanger(value.time)}
              </p>
            </div>
            <button
              className="bg-[#D7B56D] h-full px-4 py-2 mt-4 md:mt-0 md:px-8 text-white rounded-md md:rounded-r-lg flex items-center"
              onClick={() => {
                getAmendmentDetails(value.id);
                handleButtonClick();
              }}
            >
              View Status
            </button>
          </div>
        );
      })}

      {modalIsOpen && (


        <div className="fixed inset-0 bg-black bg-opacity-50 flex w-full justify-center items-start z-50 overflow-y-auto pt-4 pb-4">
          <div className="bg-gray-200 w-full max-w-4xl m-auto">
            {loading ? (
              <div className="w-full h-[80vh] flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <>

                <div className="bg-white shadow-lg rounded-lg">
                  <div className="bg-gray-900 p-4 flex justify-between items-center sticky top-0 z-10">
                    <h1 className="text-lg text-yellow-400 font-semibold">Amendment Details</h1>
                    <button onClick={closeModal} className="text-yellow-400 text-lg">&times;</button>
                  </div>
                  <div className="p-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                      <div className="bg-white border border-gray-300 p-4 rounded-lg flex flex-col justify-between">
                        <p className="text-sm text-gray-500">Amendment ID:</p>
                        <p className="font-semibold">{amendmentData?.amendmentId}</p>
                      </div>
                      <div className="bg-white border flex flex-col justify-between border-gray-300 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Amendment Status:</p>
                        <p className="font-semibold">{amendmentData?.amendmentStatus}</p>
                      </div>
                      <div className="bg-white border border-gray-300 p-4 flex flex-col justify-between rounded-lg">
                        <p className="text-sm text-gray-500">Booking Id:</p>
                        <p className="font-semibold text-sm">{amendmentData?.bookingId}</p>
                      </div>
                      <div className="bg-white border flex flex-col justify-between border-gray-300 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Refundable Amount:</p>
                        <p className="font-semibold">{amendmentData?.refundableAmount}</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-md md:col-span-2 mb-6">
                      <div className="text-sm font-medium text-gray-600">
                        Remarks:
                      </div>
                      <div className="text-lg font-semibold text-[#9b814a]">
                        {amendmentData?.remarks}
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex space-x-2 flex-wrap">
                        {trips.map((trip, index) => (
                          <button
                            key={index}
                            onClick={() => setSingleTripDetails(trip)}
                            className={`${singleTripDetails === trip ? 'bg-yellow-600 text-gray-800' : 'bg-gray-700 text-white'
                              } ] font-semibold uppercase py-2 px-4 rounded-lg flex flex-col gap-1 mb-2`}
                          >
                            <span>Trip - {index + 1}</span>
                            <span>{trip.src} - {trip.dest}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                      <p className="text-sm text-gray-500">Trip details:</p>
                      <div className="flex justify-between mt-2">
                        <div>
                          <p>Departure: <span className="font-semibold">{singleTripDetails.src}</span></p>
                          <p>Arrival: <span className="font-semibold">{singleTripDetails.dest}</span></p>
                          <p>Flight number: <span className="font-semibold">{singleTripDetails.flightNumbers.join(", ")}</span></p>
                          <p>Airlines: <span className="font-semibold">{singleTripDetails.airlines.join(", ")}</span></p>
                        </div>
                        <div>
                          <p>Departure Time: {MyComponent(singleTripDetails.departureDate)}</p>
                        </div>
                      </div>
                    </div>


                    <div>
                      <p className="text-sm text-gray-500 mb-2">Passengers:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {singleTripDetails.travellers.map((traveller, i) =>
                          <div key={i} className="bg-gray-500 text-white p-4 rounded-lg">
                            <p>Name: <span className="font-semibold">{traveller.fn} {traveller.ln}</span></p>
                            <p>Amendment charges: <span className="font-semibold">{traveller.amendmentCharges}</span></p>
                            <p>Refundable amount: <span className="font-semibold">{traveller.refundableamount}</span></p>
                            <p>Total Fare: <span className="font-semibold">{traveller.totalFare}</span></p>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAmendmentDetails;
