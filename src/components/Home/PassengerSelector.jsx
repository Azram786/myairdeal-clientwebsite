import React, { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import ReactToast from "../util/ReactToast";

const PassengerSelector = ({ setModelIsOpen, formData, setFormData }) => {
  const selectorRef = useRef(null);

  const handleCountChange = (type, count) => {
    if (formData.pft !== 'REGULAR' && type === "children" || type === "infant") {
      ReactToast("you have selected special fares")
    }
    if (type === "adult") {
      if (formData.CHILD + count <= 9 && formData.INFANT <= count)
        setFormData((prev) => ({
          ...prev,
          ADULT: count,
        }));
      else
        ReactToast(
          "You can only book 9 seats and number of infant must be lower than Adult"
        );
    }

    if (type === "children" && formData.pft === "REGULAR") {
      if (Number(formData.ADULT) + count <= 9)
        setFormData((prev) => ({
          ...prev,
          CHILD: count,
        }));
      else ReactToast(" You can only book 9 seats");
    }
    if (type === "infant" && formData.pft === "REGULAR") {

      if (count <= formData.ADULT)
        setFormData((prev) => ({
          ...prev,
          INFANT: count,
        }));
      else
        ReactToast(
          "The Number of infant must be less than or equal to number of Adults"
        );
    }
  };

  const handleClassChange = (classType) => {
    setFormData((prev) => ({ ...prev, cabinClass: classType }));
  };

  const renderCountButtons = (type, count, maxCount) => {
    const start = type === "adult" ? 1 : 0;
    return (
      <div className="flex gap-1 bg-red">
        {Array.from({ length: maxCount - start + 1 }, (_, index) => (
          <button
            key={index + start}
            onClick={() => handleCountChange(type, index + start)}
            className={`${count == index + start
              ? "bg-[#1F61BC] text-white"
              : "bg-gray-200 text-black"
              } rounded p-1 w-8`}
          >
            {index + start}
          </button>
        ))}
      </div>
    );
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setModelIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setModelIsOpen]);


  return (
    <div ref={selectorRef} className="pb-4 md:p-5 flex  flex-col   
      rounded-lg bg-white  px-8 mx-4">
      <div className="flex justify-between items-center mt-4 mb-4">
        <h3 className="font-semibold text-sm lg:text-lg">SELECT PASSENGER</h3>
        <FaTimes className="cursor-pointer" onClick={() => setModelIsOpen(false)} />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3">
          <div className="mb-4">
            <h4 className="font-semibold text-[.8rem] lg:text-[1rem]">
              Adult Age 12+
            </h4>
            {renderCountButtons("adult", formData.ADULT, 9)}
          </div>
          <div className="mb-4">
            <h4 className="font-semibold text-[.8rem] lg:text-[1rem]">
              Children Age 2-12
            </h4>
            {renderCountButtons("children", formData.CHILD, 8)}
          </div>
          <div className="mb-4">
            <h4 className="font-semibold text-[.8rem] lg:text-[1rem]">
              Infant Age 0-2
            </h4>
            {renderCountButtons("infant", formData.INFANT, 8)}
          </div>
        </div>
        <div className="md:w-1/3">
          <h4 className="font-semibold mb-2">SELECT CLASS</h4>
          <div className="text-[.8rem] lg:text-[1rem]">
            {["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"].map(
              (classType) => (
                <div
                  key={classType}
                  className="flex justify-between items-center mb-2 cursor-pointer sm:gap-3"
                  onClick={() => handleClassChange(classType)}
                >
                  <span className="text-[.8rem]">{classType}</span>
                  <span
                    className={`${formData.cabinClass === classType
                      ? "bg-[#1F61BC] border-black border"
                      : "border-black border"
                      } w-5 h-5 rounded-full flex items-center justify-center`}
                  >
                    {formData.cabinClass === classType && (
                      <div className="w-3 h-3 rounded-full"></div>
                    )}
                  </span>
                </div>
              )
            )}
          </div>
          <button
            className="bg-[#1F61BC] text-white rounded mt-4 p-1 md:p-2 w-full"
            onClick={() => setModelIsOpen(false)}
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerSelector;
