import React, { useState } from "react";
import { FaBaby, FaChild, FaUser, FaClock, FaPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import ReactToast from "../util/ReactToast";
import axios from "axios";

const ComboAmendment = ({ singleBookingData }) => {
  const { token } = useSelector((state) => state.auth);
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [selectedPassengers, setSelectedPassengers] = useState([]);
  const [showPassengers, setShowPassengers] = useState(false);
  const [trips, setTrips] = useState(
    singleBookingData?.itemInfos?.AIR.tripInfos || []
  );
  const [passengers, setPassengers] = useState(
    singleBookingData?.itemInfos?.AIR.travellerInfos || []
  );
  const [selectWholeTicket, setSelectWholeTicket] = useState(false);
  const [remarks, setRemarks] = useState("");

  const toggleTripSelection = (trip) => {
    if (selectedTrips.includes(trip)) {
      setSelectedTrips(selectedTrips.filter((t) => t !== trip));
    } else {
      setSelectedTrips([...selectedTrips, trip]);
    }
  };

  const togglePassengerSelection = (passenger) => {
    if (selectedPassengers.includes(passenger)) {
      setSelectedPassengers(selectedPassengers.filter((p) => p !== passenger));
    } else {
      setSelectedPassengers([...selectedPassengers, passenger]);
    }
  };

  const toggleWholeTicketSelection = () => {
    if (selectWholeTicket) {
      setSelectWholeTicket(false);
      setSelectedTrips([]);
      setSelectedPassengers([]);
    } else {
      setSelectWholeTicket(true);
      setSelectedTrips(trips);
      setSelectedPassengers(passengers);
    }
  };

  const getAgeCategory = (age) => {
    if (age < 2)
      return { label: "Infant", icon: <FaBaby className="text-yellow-500" /> };
    if (age >= 2 && age < 12)
      return { label: "Child", icon: <FaChild className="text-green-500" /> };
    return { label: "Adult", icon: <FaUser className="text-blue-500" /> };
  };

  const cancelTicketHandler = async () => {
    try {
      if (!remarks.trim()) {
        ReactToast("Please enter a reason for cancellation");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      let requestData = {
        bookingId: singleBookingData.order.bookingId,
        type: "CANCELLATION",
        remarks,
      };
      console.log({ requestData });

      if (selectWholeTicket) {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}booking/submit-amendment`,
          requestData,
          { headers }
        );
        console.log({ response });
        ReactToast("Whole ticket cancellation request submitted successfully");
      } else if (selectedTrips.length > 0 || selectedPassengers.length > 0) {
        requestData.trips = trips.map((trip) => {
          const tripData = {
            src: trip.sI[0].da.code,
            dest: trip.sI[trip.sI.length - 1].aa.code,
            departureDate: trip.sI[0].dt.split("T")[0],
          };

          if (selectedPassengers.length > 0) {
            tripData.travellers = selectedPassengers.map((passenger) => ({
              fn: passenger.fN,
              ln: passenger.lN,
            }));
          }

          return tripData;
        });

        if (selectedTrips.length > 0) {
          requestData.trips = requestData.trips.filter((trip) =>
            selectedTrips.some(
              (selectedTrip) =>
                selectedTrip.sI[0].da.code === trip.src &&
                selectedTrip.sI[selectedTrip.sI.length - 1].aa.code ===
                  trip.dest
            )
          );
        }
        console.log({ requestData });
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}booking/submit-amendment`,
          requestData,
          { headers }
        );
        console.log({ response });
        window.location.reload();
        ReactToast("Cancellation request submitted successfully");
      } else {
        ReactToast(
          "Please select trips or passengers to cancel, or choose to cancel the whole ticket"
        );
      }
    } catch (error) {
      console.error(error.message);
      ReactToast("An error occurred while processing your request");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <div className="mb-6">
        <label className="flex items-center space-x-2 text-lg">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            onChange={toggleWholeTicketSelection}
            checked={selectWholeTicket}
          />
          <span>Cancel the entire booking</span>
        </label>
      </div>

      {!selectWholeTicket && (
        <>
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2">Select Trips to Cancel</h3>
            <div className="space-y-3">
              {trips.map((trip, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    selectedTrips.includes(trip)
                      ? "bg-blue-100 border-blue-500"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={selectedTrips.includes(trip)}
                        onChange={() => toggleTripSelection(trip)}
                      />
                      <div>
                        <div className="font-semibold">
                          {`${trip.sI[0].da.code} to ${
                            trip.sI[trip.sI.length - 1].aa.code
                          }`}
                        </div>
                        <div className="text-sm text-gray-600">
                          {`Flight ${trip.sI[0].fD.fN} on ${new Date(
                            trip.sI[0].dt
                          ).toLocaleDateString()}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex items-center space-x-1">
                      <FaClock className="text-gray-600" />
                      <span className="text-sm font-semibold">
                        {new Date(trip.sI[0].dt).toLocaleTimeString()}
                      </span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2">
              Select Passengers to Cancel
            </h3>
            <button
              className="text-blue-600 text-sm mb-2"
              onClick={() => setShowPassengers(!showPassengers)}
            >
              {showPassengers ? "Hide passengers" : "Show passengers"}
            </button>
            {showPassengers && (
              <div className="space-y-3">
                {passengers.map((passenger, index) => {
                  const { label, icon } = getAgeCategory(passenger.age);
                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 border rounded-lg ${
                        selectedPassengers.includes(passenger)
                          ? "bg-blue-100 border-blue-500"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600"
                          checked={selectedPassengers.includes(passenger)}
                          onChange={() => togglePassengerSelection(passenger)}
                          disabled={selectedTrips.length > 0}
                        />
                        <div>
                          <div className="font-semibold">{`${passenger.ti} ${passenger.fN} ${passenger.lN}`}</div>
                          <div className="text-sm text-gray-600">{`${passenger.pNum} (${passenger.pNat})`}</div>
                        </div>
                      </label>
                      <div className="flex items-center space-x-2">
                        {icon}
                        <span className="text-sm text-gray-600">{label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      <div className="mb-6">
        <textarea
          placeholder="Reason for Cancellation (required)"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="4"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        ></textarea>
      </div>

      <button
        className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors text-lg font-semibold flex items-center justify-center space-x-2"
        onClick={cancelTicketHandler}
      >
        <FaPlane className="transform rotate-45" />
        <span>Cancel Booking</span>
      </button>
    </div>
  );
};

export default ComboAmendment;
