import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

const ViewTickets = ({ bookingId }) => {
  const { token } = useSelector((state) => state.auth);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!token || !bookingId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }ticket/view-all-tickets/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTickets(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError("Failed to fetch tickets. Please try again later.");
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token, bookingId]);

  if (loading) {
    return (
      <div>
        {" "}
        <FaSpinner className="animate-spin mr-2 text-xs sm:text-base" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!tickets || tickets.length === 0) {
    return null; // Don't render anything if there are no tickets
  }

  return (
    <div className="mx-3 flex flex-col gap-4 my-4  bg-[#f0e1c0] pb-4 rounded-md ">
      <div className=" text-2xl mb-4 text-[#D7B56D] bg-[#1B1D29] font-bold p-4 rounded-t-md">
        Ticket List
      </div>
      <ul className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg-custom:grid-cols-4 gap-4">
        {tickets.map((ticket) => (
          <li
            key={ticket.id}
            className="max-h-20 overflow-scroll no-scroll border-2 p-2 rounded-md border-black"
          >
            {/* Customize this based on your ticket data structure */}
            <p className="text-sm font-bold">
              Type: <span className="font-normal">{ticket.heading}</span>
            </p>
            <p className="text-sm font-bold">
              Description:
              <span className="font-normal"> {ticket.description}</span>
            </p>
            <p className="text-sm font-bold mt-1 ">
              Status:
              <span
                className={`font-normal p-1 text-[14px] rounded-md mx-2 px-2 ${
                  ticket.status === "closed" ? "bg-green-400" : "bg-orange-400"
                }`}
              >
                {ticket.status === "closed" ? "Closed" : "Pending"}
              </span>
            </p>

            {/* Add more ticket details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewTickets;
