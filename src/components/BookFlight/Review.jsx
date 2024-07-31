import React from "react";
import { MdFlight } from "react-icons/md";

const Review = ({ setCurrentStep }) => {
  const handleBack = () => {
    setCurrentStep("previousStep"); // Ensure 'previousStep' is defined in your state management
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md font-poppins">
      <div className="flex flex-col md:flex-row md:space-x-4">
        {/* Plane Information Section */}
        <div className="md:w-1/2 mb-4 md:mb-0">
          <div className="flex items-center border-b pb-4 mb-4">
            <img src={""} alt="Plane" className="w-24 h-24 rounded-lg" />
            <div className="ml-4">
              <h2 className="text-lg font-bold">Emirates A380 Airbus</h2>
              <p>Economy</p>
              <p>(Adult) Check-in: 25 Kg (01 Piece only), Cabin: 7 Kg</p>
            </div>
          </div>
        </div>

        {/* Flight Details Section */}
        <div className="md:w-1/2">
          <div className="flex items-center mb-4">
            <div className="text-center flex-1">
              <h3 className="text-lg font-bold">BNG</h3>
              <p>Bengaluru, India</p>
              <p>Bengaluru Intl Airport</p>
              <p className="text-gray-600">07:00 AM</p>
            </div>
            <div className="flex items-center mx-6">
              <MdFlight className="w-7 h-7 text-gray-600 transform rotate-90" />
            </div>
            <div className="text-center flex-1">
              <h3 className="text-lg font-bold">HYD</h3>
              <p>Hyderabad, India</p>
              <p>Shamshabad Rajiv Gandhi Intl</p>
              <p className="text-gray-600">08:45 AM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="mt-4">
        <p className="text-lg font-semibold">
          Your booking is protected by{" "}
          <span className="font-bold">MY AIR DEAL</span>
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 border-b">
                <th className="py-2 px-4">Sr.</th>
                <th className="py-2 px-4">Name & Age</th>
                <th className="py-2 px-4">Seat Booking</th>
                <th className="py-2 px-4">Meal and Baggage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">1</td>
                <td className="py-2 px-4 border-b">Talla Jayasurya (26)</td>
                <td className="py-2 px-4 border-b">BLR-MJ 223j</td>
                <td className="py-2 px-4 border-b">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-bold">Contact Details</h4>
        <p>Email: Suryaj8999@gmail.com</p>
        <p>Mobile Number: 6305600080</p>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleBack}
          className="bg-gray-300 p-2 rounded hover:bg-gray-400 transition"
        >
          Back
        </button>
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default Review;
