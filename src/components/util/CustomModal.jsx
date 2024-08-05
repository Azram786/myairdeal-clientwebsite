// // libraries
// import Modal from "react-modal";

// //custom components
// import PassengerSelector from "../Home/PassengerSelector";
// import { useEffect, useState } from "react";

// // Set the app element for accessibility
// Modal.setAppElement("#root");

// const CustomModal = ({
//   modalIsOpen,
//   setModelIsOpen,
//   formData,
//   setFormData,
// }) => {
//   // state for getting screen size
//   const [screenSize, setScreenSize] = useState();

//   // style for modal
//   const style = {
//     content: {
//       top:
//         screenSize === "small"
//           ? "80%"
//           : screenSize === "medium"
//             ? "53%"
//             : "70%",
//       left:
//         screenSize === "small"
//           ? "50%"
//           : screenSize === "medium"
//             ? "65%"
//             : "73%",
//       transform: "translate(-50%, -50%)",
//       width:
//         screenSize === "small"
//           ? "80vw"
//           : screenSize === "medium"
//             ? "60%"
//             : "45%",
//       height:
//         screenSize === "small"
//           ? "50vh"
//           : screenSize === "medium"
//             ? "40%"
//             : "40%",

//       border: "1px solid black",
//     },
//     overlay: {
//       background: "transparent",
//       position: "absolute",
//     },
//   };

//   //  updating screenSize state
//   const updateScreenSize = () => {
//     if (window.innerWidth < 640) {
//       setScreenSize("small");
//     } else if (window.innerWidth < 1024) {
//       setScreenSize("medium");
//     } else {
//       setScreenSize("large");
//     }
//   };

//   useEffect(() => {
//     updateScreenSize();
//     window.addEventListener("resize", updateScreenSize);

//     return () => {
//       window.removeEventListener("resize", updateScreenSize);
//     };
//   }, []);
//   return (
//     <Modal
//       style={style}
//       isOpen={modalIsOpen}
//       onRequestClose={() => {

//         setModelIsOpen(false)
//       }}
//     >
//       <PassengerSelector
//         formData={formData}
//         onClose={() => {
//           setModelIsOpen(false)
//         }}
//         setFormData={setFormData}
//       />
//     </Modal>
//   );
// };

// export default CustomModal;

// import { useEffect, useState } from "react";
// import PassengerSelector from "../Home/PassengerSelector";

// const CustomModal = ({
//   modalIsOpen,
//   setModelIsOpen,
//   formData,
//   setFormData,
// }) => {
//   // state for getting screen size
//   const [screenSize, setScreenSize] = useState();

//   //  updating screenSize state
//   const updateScreenSize = () => {
//     if (window.innerWidth < 640) {
//       setScreenSize("small");
//     } else if (window.innerWidth < 1024) {
//       setScreenSize("medium");
//     } else {
//       setScreenSize("large");
//     }
//   };

//   useEffect(() => {
//     updateScreenSize();
//     window.addEventListener("resize", updateScreenSize);

//     return () => {
//       window.removeEventListener("resize", updateScreenSize);
//     };
//   }, []);

//   if (!modalIsOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div
//         className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform ${screenSize === "small" ? "w-[80vw] h-[50vh] top-[80%]" :
//           screenSize === "medium" ? "w-[60%] h-[40%] top-[53%]" :
//             "w-[45%] h-[40%] top-[70%]"
//           }`}

//       >
//         <PassengerSelector
//           formData={formData}
//           onClose={() => {
//             setModelIsOpen(false);
//           }}
//           setFormData={setFormData}
//         />
//       </div>
//     </div>
//   );
// };

// export default CustomModal;

import PassengerSelector from "../Home/PassengerSelector";

const CustomModal = ({
  modalIsOpen,
  setModelIsOpen,
  formData,
  setFormData,
}) => {
  if (!modalIsOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white w-[90vw] md:w-auto  rounded-lg relative lg:left-[20%] lg:top-[-10%]  p-3">
        <PassengerSelector
          formData={formData}
          onClose={() => setModelIsOpen(false)}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
};

export default CustomModal;


