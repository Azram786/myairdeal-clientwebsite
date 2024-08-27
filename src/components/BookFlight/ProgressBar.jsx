import React from "react";
import { FaUser } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import { MdPayment } from "react-icons/md";
import { GoChecklist } from "react-icons/go";

const ProgressBar = ({ currentStep, onStepClick }) => {
  const steps = [
    { label: "Itinerary", icon: <GoChecklist size={24} /> },
    { label: "Add Details", icon: <FaUser  size={24} /> },
    { label: "Review", icon: <VscPreview size={24} /> },
    { label: "Payment", icon: <MdPayment  size={24} /> },
  ];

  return (
    <div className="flex justify-center mx-auto mb-8 shadow-lg rounded-sm  border border-slate-50 w-full  py-4">
      <div className="flex  items-center justify-around w-full mx-auto max-w-4xl px-4  overflow-x-auto md:overflow-x-visible snap-x snap-mandatory">
        {" "}
        {/* Added ml-8 sm:ml-16 md:ml-24 */}
        {steps.map((step, index) => (
          <div key={index} className="flex  w-full relative">
            <div className="flex flex-col items-center">
              <div
                className={`relative flex items-center mx-2 sm:mx-4 justify-center w-8 h-8 md:w-12 md:h-12 rounded-full cursor-pointer ${
                  index <= currentStep
                    ? "bg-[#1B1D29] text-[#D7B56D] shadow-lg"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => onStepClick(index)}
              >
                {step.icon}
                {index <= currentStep && (
                  <div className="absolute bottom-[-10px]  left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-[#1B1D29]"></div>
                )}
              </div>
              <div
                className={`mt-4 text-xs md:text-sm ${
                  index <= currentStep
                    ? "font-bold text-[#1B1D29]"
                    : "text-gray-600"
                }`}
              >
                {step.label}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-grow flex items-center">
                <div
                  className={`w-full hidden md:flex h-1 ${
                    index < currentStep ? "bg-[#1B1D29]" : "bg-gray-200"
                  }`}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
