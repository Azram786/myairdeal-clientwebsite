import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import SubmitAmendment from "./SubmitAmendment";

const TicketLinks = ({ singleBookingData }) => {
  const links = [
    {
      title: "Raise a Ticket",
      for: 'raise',
      description: "Further contact details can be found at",
    },
    {
      title: "Cancel Ticket",
      for: 'cancel',
      description: "Further contact details can be found at",
    },
    {
      title: "Check refunds and refund status",
      for: 'refund',
      description: "Further contact details can be found at",
    },
  ];

  const [modalIsOpen, setModelIsOpen] = useState(false);
  const [screenSize, setScreenSize] = useState();
  const [selectedLink, setSelectedLink] = useState(null);

  const navigate = useNavigate();

  const openModalHandler = (link) => {
    setSelectedLink(link);
    setModelIsOpen(true);
  };

  const style = {
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: screenSize === "small" ? "80vw" : "80%",
      height: screenSize === "small" ? "70vh" : "60%",
      border: "1px solid gray",
      boxShadow: "0 4px 8px gray",
      borderRadius: "10px",
    },
    overlay: {
      background: "transparent",
    },
  };

  const updateScreenSize = () => {
    if (window.innerWidth < 640) {
      setScreenSize("small");
    } else if (window.innerWidth < 1024) {
      setScreenSize("medium");
    } else {
      setScreenSize("large");
    }
  };

  useEffect(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  const handleButtonClick = (link) => {
    if (link.for === 'raise') {
      navigate('/ticket-raising');
    } else if (link.for === 'cancel') {
      openModalHandler(link);
    } else if (link.for === 'refund') {
      // openModalHandler(link);
      return null
    }
  };

  return (
    <div className="mx-3 flex flex-col gap-4 my-4">
      <div className="bg-[#007EC4] text-white font-bold p-4 rounded-md">
        Quick links
      </div>
      {links.map((link, index) => (
        <div key={index} className="flex items-center justify-between bg-blue-100 border-t border-blue-200 rounded-r-lg">
          <div className="flex items-center justify-between bg-blue-100 border-t border-blue-200 p-4">
            <div>
              <h3 className="text-lg font-semibold">{link.title}</h3>
              <p className="text-sm text-gray-700">{link.description}</p>
            </div>
          </div>
          <button
            className="bg-[#007EC4] h-full px-8 text-white rounded-r-lg"
            onClick={() => handleButtonClick(link)}
          >
            <FaArrowRight className="text-xl" />
          </button>
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        style={style}
        onRequestClose={() => setModelIsOpen(false)}
      >
        <SubmitAmendment singleBookingData={singleBookingData} />
      </Modal>
    </div>
  );
};

export default TicketLinks;

