
// import React, { useState } from "react";
// import { FaArrowRight, FaTimes } from "react-icons/fa";
// import SubmitAmendment from "./SubmitAmendment";
// import TicketRaising from "./TicketRaising";

// const TicketLinks = ({ singleBookingData, bookingFilter }) => {

//   console.log({ singleBookingData })
//   const links = [
//     {
//       title: "Raise a Ticket",
//       for: 'raise',
//       description: "Further contact details can be found at",
//     },
//     {
//       title: "Cancel Ticket",
//       for: 'cancel',
//       description: "Further contact details can be found at",
//     },
//     {
//       title: "Check refunds and refund status",
//       for: 'refund',
//       description: "Further contact details can be found at",
//     },
//   ];

//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedLink, setSelectedLink] = useState(null);

//   const openModalHandler = (link) => {
//     setSelectedLink(link);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedLink(null);
//   };

//   const handleButtonClick = (link) => {
//     if (link.for === 'raise' || link.for === 'cancel') {
//       openModalHandler(link);
//     } else if (link.for === 'refund') {
//       return null;
//     }
//   };

//   return (
//     <div className="mx-3 flex flex-col gap-4 my-4">
//       <div className="bg-[#007EC4] text-white font-bold p-4 rounded-md">
//         Quick links
//       </div>
//       {links.map((link, index) => (
//         <div key={index} className="flex flex-col md:flex-row items-center justify-between bg-blue-100 border-t border-blue-200 rounded-lg p-4">
//           <div className="flex-1">
//             <h3 className="text-lg font-semibold">{link.title}</h3>
//             <p className="text-sm text-gray-700">{link.description}</p>
//           </div>
//           <button
//             className="bg-[#007EC4] h-full px-4 py-2 mt-4 md:mt-0 md:px-8 text-white rounded-md md:rounded-r-lg flex items-center"
//             onClick={() => handleButtonClick(link)}
//           >
//             <FaArrowRight className="text-xl" />
//           </button>
//         </div>
//       ))}

//       {modalIsOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex w-full justify-center items-center z-50">
//           <div className="bg-white flex justify-center flex-col rounded-lg shadow-xl w-[90%] md:w-1/2  md:mx-auto max-h-[90vh] ">
//             <div className="flex justify-between items-center p-4 border-b">
//               <h2 className="text-2xl font-bold">
//                 {selectedLink.for === 'raise' ? 'Raise a Ticket' : 'Cancel Ticket'}
//               </h2>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-500 hover:text-gray-700 transition-colors"
//               >
//                 <FaTimes className="text-xl" />
//               </button>
//             </div>
//             <div className="p-2 overflow-y-auto no-scroll flex justify-center items-center h-80 ">
//               {selectedLink.for === 'raise' ? (
//                 <TicketRaising bookingId={singleBookingData?.order?.bookingId} closeModal={closeModal} />
//               ) : (
//                 <SubmitAmendment singleBookingData={singleBookingData} />
//               )}
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TicketLinks;
import React, { useState } from "react";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import SubmitAmendment from "./SubmitAmendment";
import TicketRaising from "./TicketRaising";

const TicketLinks = ({ singleBookingData, bookingFilter }) => {
  console.log({ bookingFilter })

  console.log({ singleBookingData });

  const allLinks = [
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
    // {
    //   title: "Check refunds and refund status",
    //   for: 'refund',
    //   description: "Further contact details can be found at",
    // },
  ];

  // Filter the links based on bookingFilter
  const links = bookingFilter === "UPCOMING"
    ? allLinks
    : allLinks.filter(link => link.for !== 'cancel');

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
    if (link.for === 'raise' || link.for === 'cancel') {
      openModalHandler(link);
    } else if (link.for === 'refund') {
      return null;
    }
  };

  return (
    <div className="mx-3 flex flex-col gap-4 my-4">
      <div className="bg-[#007EC4] text-white font-bold p-4 rounded-md">
        Quick links
      </div>
      {links.map((link, index) => (
        <div key={index} className="flex flex-col sm:flex-row md:items-center justify-none md:justify-between bg-blue-100 border-t border-blue-200 rounded-lg p-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{link.title}</h3>
            <p className="text-sm text-gray-700">{link.description}</p>
          </div>
          <button
            className="bg-[#007EC4] h-full px-4 py-2 mt-4 md:mt-0 md:px-8 text-white rounded-md md:rounded-r-lg flex items-center w-max"
            onClick={() => handleButtonClick(link)}
          >
            <FaArrowRight className="text-xl" />
          </button>
        </div>
      ))}

      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex w-full justify-center items-center z-50">
          <div className="bg-white flex justify-center flex-col rounded-lg shadow-xl w-[90%] md:w-1/2  md:mx-auto ">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-2xl font-bold">
                {selectedLink.for === 'raise' ? 'Raise a Ticket' : 'Cancel Ticket'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="p-2 overflow-y-auto no-scroll flex justify-center items-center ">
              {selectedLink.for === 'raise' ? (
                <TicketRaising bookingId={singleBookingData?.order?.bookingId} closeModal={closeModal} />
              ) : (
                <SubmitAmendment setModalIsOpen={setModalIsOpen} singleBookingData={singleBookingData} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketLinks;

