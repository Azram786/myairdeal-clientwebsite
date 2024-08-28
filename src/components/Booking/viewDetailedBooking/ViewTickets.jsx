import React from "react";
import { useSelector } from "react-redux";

const ViewTickets = ({ bookingId }) => {

  const { token } = useSelector((state) => state.auth);
  return (
    <div className="w-full h-max">
      <div className=" font-semibold text-xl ">Ticket List</div>
    </div>
  );
};

export default ViewTickets;
