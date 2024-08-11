
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../../Home/Header";
import FlightTicket from "../viewBooking/FlightTickets";
import Footer from "../../Home/Footer";
import Spinner from "../../Profile/Spinner";
import { motion } from "framer-motion";

const FlightBookings = () => {
  const [bookingFilter, setBookingFilter] = useState("UPCOMING");
  const { token } = useSelector((state) => state.auth);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBookingData = async () => {
    try {
      setBookingData(() => []);
      let response;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true);
      if (bookingFilter === "COMPLETED") {
        response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}user/completed-user-bookings`,
          config
        );
      } else if (bookingFilter === "CANCELLED") {
        response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}user/cancelled-user-bookings`,
          config
        );
      } else {
        response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}user/upcoming-user-bookings`,
          config
        );
      }
      console.log({ response });
      if (response.status === 200) {
        setLoading(false);
        setBookingData(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      setBookingData([]);
    }
  };

  console.log({ bookingData });

  useEffect(() => {
    getBookingData();
  }, [bookingFilter]);

  return (
    <>
      <Header />
      <div className="xl:mx-[5vw]  min-w-[350px] min-h-screen lg:mx-[3vw] my-5 bg-white xl:p-[2vw] lg:p-[1vw] rounded-md z-50">
        {/* <div className="flex justify-between items-center rounded-lg mb-5 px-3 py-4 border">
          <div className="flex h-12 space-x-[1px] justify-between bg-slate-300 w-full">
            <button className="py-2 px-6 w-1/4 bg-blue-600 text-white">
              Flights
            </button>
            <button className="py-2 w-1/4 px-6 bg-white text-gray-600">
              Helicopters
            </button>
            <button className="py-2 w-1/4 px-6 bg-white text-gray-600">
              Air Ambulance
            </button>
            <button className="py-2 w-1/4 px-6 bg-white text-gray-600">
              Charter Flight
            </button>
          </div>
        </div> */}
        <div className="flex justify-between  h-10 items-center mb-3 p-2 rounded-lg border lg:hidden">
          <select
            className="w-full py-2 px-3 border border-gray-300 rounded-md"
            value={bookingFilter}
            onChange={(e) => setBookingFilter(e.target.value)}
          >
            <option value="UPCOMING">Upcoming</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
        <div className="hidden lg:flex justify-between h-10 items-center mb-3 p-2 rounded-lg border">
          <div className="flex h-full w-full  justify-between">
            <button
              className={`py-2 w-1/3 px-6 text-black  font-semibold  border-b-2 ${bookingFilter === "UPCOMING"
                ? "border-blue-600"
                : "border-transparent"
                }`}
              onClick={() => setBookingFilter("UPCOMING")}
            >
              Upcoming
            </button>
            <button
              className={`py-2 w-1/3 px-6 text-black border-l-2 font-semibold border-l-slate-300 border-b-2 ${bookingFilter === "COMPLETED"
                ? "border-blue-600"
                : "border-transparent"
                }`}
              onClick={() => setBookingFilter("COMPLETED")}
            >
              Completed
            </button>
            <button
              className={`py-2 w-1/3 px-6 border-l-2 border-l-slate-300 font-semibold text-black border-b-2 ${bookingFilter === "CANCELLED"
                ? "border-blue-600"
                : "border-transparent"
                } `}
              onClick={() => setBookingFilter("CANCELLED")}
            >
              Cancelled
            </button>
          </div>
        </div>
        <div className="px-4 pt-3 pb-3 lg:pb-7 rounded-lg  ">
          <h2 className="text-lg font-bold mb-3">
            <a href="">Bookings</a> / <a href="">Flights </a> /{" "}
            <a href="">{bookingFilter}</a>
          </h2>

          {loading ? (
            <div className="h-[85vh] w-full flex justify-center items-center ">
              <Spinner />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-2  w-full   ">
                {bookingData.length > 0 ? (
                  bookingData?.map((booking, index) => (
                    <FlightTicket
                      key={booking.id}
                      index={index}
                      bookingFilter={bookingFilter}
                      bookingID={booking.bookingId}
                      booking={booking}
                      length
                    />
                  ))
                ) : (
                  <p>No {bookingFilter.toLowerCase()} bookings.</p>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
        <Footer />
     
    </>
  );
};

export default FlightBookings;
