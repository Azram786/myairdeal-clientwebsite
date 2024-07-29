// libraries
import Modal from "react-modal";

//custom components
import PassengerSelector from "../Home/PassengerSelector";
import { useEffect, useState } from "react";

// Set the app element for accessibility
Modal.setAppElement("#root");

const CustomModal = ({
  modalIsOpen,
  setModelIsOpen,
  formData,
  setFormData,
}) => {
  // state for getting screen size
  const [screenSize, setScreenSize] = useState();

  // style for modal
  const style = {
    content: {
      top:
        screenSize === "small"
          ? "80%"
          : screenSize === "medium"
            ? "53%"
            : "70%",
      left:
        screenSize === "small"
          ? "50%"
          : screenSize === "medium"
            ? "65%"
            : "73%",
      transform: "translate(-50%, -50%)",
      width:
        screenSize === "small"
          ? "80vw"
          : screenSize === "medium"
            ? "60%"
            : "45%",
      height:
        screenSize === "small"
          ? "70vh"
          : screenSize === "medium"
            ? "50%"
            : "50%",

      border: "1px solid black",
    },
    overlay: {
      background: "transparent",
      position: "absolute",
    },
  };

  //  updating screenSize state
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
  return (
    <Modal
      style={style}
      isOpen={modalIsOpen}
      onRequestClose={() => {
        setFormData((prev) => ({
          ...prev, ADULT: "1",
          CHILD: 0,
          INFANT: "0",
        }))
        setModelIsOpen(false)
      }}
    >
      <PassengerSelector
        formData={formData}
        onClose={() => {

          setFormData((prev) => ({
            ...prev, ADULT: "1",
            CHILD: 0,
            INFANT: "0",
          }))

          setModelIsOpen(false)
        }}
        setFormData={setFormData}
      />
    </Modal>
  );
};

export default CustomModal;
