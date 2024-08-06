

// import PassengerSelector from "../Home/PassengerSelector";

// const CustomModal = ({
//   modalIsOpen,
//   setModelIsOpen,
//   formData,
//   setFormData,
// }) => {
//   if (!modalIsOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
//       <div className="bg-white w-[90vw] md:w-auto  rounded-lg relative lg:left-[20%] lg:top-[-10%]  p-3">
//         <PassengerSelector
//           formData={formData}
//           onClose={() => setModelIsOpen(false)}
//           setFormData={setFormData}
//         />
//       </div>
//     </div>
//   );
// };

// export default CustomModal;


// import { useEffect, useRef } from 'react';
// import PassengerSelector from "../Home/PassengerSelector";

// const CustomModal = ({
//   modalIsOpen,
//   setModelIsOpen,
//   formData,
//   setFormData,
// }) => {
//   const modalRef = useRef(null);

//   const handleClickOutside = (event) => {
//     if (modalRef.current && !modalRef.current.contains(event.target)) {
//       setModelIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (modalIsOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [modalIsOpen]);

//   if (!modalIsOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
//       <div
//         ref={modalRef}
//         className="bg-white w-[90vw] md:w-auto rounded-lg   p-3"
//       >
//         <PassengerSelector
//           formData={formData}
//           onClose={() => setModelIsOpen(false)}
//           setFormData={setFormData}
//         />
//       </div>
//     </div>
//   );
// };

// export default CustomModal;


