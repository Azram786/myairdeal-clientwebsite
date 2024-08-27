import React, { useState } from "react";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import SubmitAmendment from "./SubmitAmendment";
import TicketRaising from "./TicketRaising";

const TicketLinks = ({ singleBookingData, bookingFilter,searchQuery }) => {
  const allLinks = [
    {
      title: "Raise a Ticket",
      for: "raise",
      description: "Further contact details can be found at",
    },
    {
      title: "Cancel Ticket",
      for: "cancel",
      description: "Further contact details can be found at",
    },
  ];

  // Filter the links based on bookingFilter
  const links =
    bookingFilter === "UPCOMING"
      ? allLinks
      : allLinks.filter((link) => link.for !== "cancel");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  const openModalHandler = (link) => {
    setSelectedLink(link);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedLink(null);
  };

  const handleButtonClick = (link) => {
    if (link.for === "raise" || link.for === "cancel") {
      openModalHandler(link);
    } else if (link.for === "refund") {
      return null;
    }
  };

  return (
    <div className="mx-3 flex flex-col gap-4 my-4">
      <div className="text-[#D7B56D] bg-[#1B1D29] font-bold  text-xl md:text-2xl p-4 rounded-md">
        Quick links
      </div>
      {links.map((link, index) => (
        <div
          key={index}
          className="flex flex-row md:items-center justify-none md:justify-between text-[#1B1D29] border-[#1B1D29] border  rounded-lg p-4"
        >
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{link.title}</h3>
            <p className="text-sm ">{link.description}</p>
          </div>
          <button
            className="text-[#D7B56D] h-full px-4 py-2 mt-4 md:mt-0 md:px-8 bg-[#1B1D29] rounded-md md:rounded-r-lg flex items-center w-max"
            onClick={() => handleButtonClick(link)}
          >
            <FaArrowRight className="text-xl" />
          </button>
        </div>
      ))}

      {modalIsOpen && (
        <div className="fixed inset-0   bg-black bg-opacity-50 flex w-full justify-center items-center z-50">
          <div className="bg-white rounded-t-xl text-[#1B1D29] flex justify-center flex-col rounded-lg shadow-xl w-[90%] md:w-1/2  md:mx-auto ">
            <div className="flex justify-between items-center p-4 border-b  bg-[#1B1D29] text-[#D7B56D] rounded-t-xl ">
              <h2 className="text-xl  font-bold">
                {selectedLink.for === "raise"
                  ? "Raise a Ticket"
                  : "Cancel Ticket"}
              </h2>
              <button
                onClick={closeModal}
                className="text-[#D7B56D]  transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="p-2 overflow-y-auto no-scroll flex justify-center items-center ">
              {selectedLink.for === "raise" ? (
                <TicketRaising
                  bookingId={singleBookingData?.order?.bookingId}
                  closeModal={closeModal}
                />
              ) : (
                <SubmitAmendment
                  setModalIsOpen={setModalIsOpen}
                  singleBookingData={singleBookingData}
                  searchQuery={searchQuery}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketLinks;
