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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex w-full justify-center items-center z-50 ]">
          <div className="bg-white flex justify-center flex-col rounded-lg shadow-xl w-[90%] md:w-1/2 md:mx-auto max-h-[90vh]">
            {loading ? (
              <div className="h-[50vh]">
                <Spinner />
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center p-4 border-b  ">
                  <h2 className="text-2xl font-bold">Amendment Details</h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>
                <div className="p-2 overflow-y-auto no-scroll flex flex-col gap-4 h-80">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-md">
                        <div className="text-sm font-medium text-gray-600">
                          Amendment ID:
                        </div>
                        <div className="text-lg font-semibold text-blue-700">
                          {amendmentData?.amendmentId}
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-md">
                        <div className="text-sm font-medium text-gray-600">
                          Amendment Status:
                        </div>
                        <div className="text-lg font-semibold text-blue-700">
                          {amendmentData?.amendmentStatus}
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-md">
                        <div className="text-sm font-medium text-gray-600">
                          Booking ID:
                        </div>
                        <div className="text-lg font-semibold text-blue-700">
                          {amendmentData?.bookingId}
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-md">
                        <div className="text-sm font-medium text-gray-600">
                          Refundable Amount:
                        </div>
                        <div className="text-lg font-semibold text-blue-700">
                          {amendmentData?.refundableAmount}
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-md md:col-span-2">
                        <div className="text-sm font-medium text-gray-600">
                          Remarks:
                        </div>
                        <div className="text-lg font-semibold text-blue-700">
                          {amendmentData?.remarks}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="text-lg font-semibold text-gray-800 mb-4">
                      Trip Details
                    </div>
                    {trips.map((trip, index) => (
                      <div key={index} className="mb-4 border-b pb-4  px-1">
                        <div className="mb-2">
                          <span className="font-medium  text-gray-700">
                            Source:
                          </span>{" "}
                          {trip.src}
                        </div>
                        <div className="mb-2">
                          <span className="font-medium text-gray-700">
                            Destination:
                          </span>{" "}
                          {trip.dest}
                        </div>
                        <div className="mb-2">
                          <span className="font-medium text-gray-700">
                            Departure Date:
                          </span>{" "}
                          {trip.departureDate}
                        </div>
                        <div className="mb-2">
                          <span className="font-medium text-gray-700">
                            Flight Numbers:
                          </span>{" "}
                          {trip.flightNumbers.join(", ")}
                        </div>
                        <div className="mb-2">
                          <span className="font-medium text-gray-700">
                            Airlines:
                          </span>{" "}
                          {trip.airlines.join(", ")}
                        </div>
                        <div className="mt-4">
                          <div className="font-medium text-gray-700 mb-2">
                            Travellers:
                          </div>
                          {trip.travellers.map((traveller, i) => (
                            <div
                              key={i}
                              className="bg-slate-300 p-2 rounded-md mb-2"
                            >
                              <div>
                                <span className="font-medium text-gray-600">
                                  Name:
                                </span>{" "}
                                {traveller.fn} {traveller.ln}
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">
                                  Amendment Charges:
                                </span>{" "}
                                {traveller.amendmentCharges}
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">
                                  Refundable Amount:
                                </span>{" "}
                                {traveller.refundableamount}
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">
                                  Total Fare:
                                </span>{" "}
                                {traveller.totalFare}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
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
