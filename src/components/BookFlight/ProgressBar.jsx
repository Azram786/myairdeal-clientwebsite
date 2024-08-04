import React from "react";
import { FaUser } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import { MdPayment } from "react-icons/md";
import { GoChecklist } from "react-icons/go";

const ProgressBar = ({ currentStep, onStepClick }) => {
  const steps = [
    { label: "Itinerary", icon: <GoChecklist size={24} /> },
    { label: "Add Details", icon: <FaUser size={24} /> },
    { label: "Review", icon: <VscPreview size={24} /> },
    { label: "Payment", icon: <MdPayment size={24} /> },
  ];

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center w-full relative">
          <div className="flex flex-col items-center">
            <div
              className={`relative flex items-center justify-center w-12 h-12 rounded-full cursor-pointer ${
                index <= currentStep
                  ? "bg-[#007EC4] text-white shadow-lg"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => onStepClick(index)}
            >
              {step.icon}
              {index <= currentStep && (
                <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#007EC4]"></div>
              )}
            </div>
            <div
              className={`mt-4 text-sm ${
                index <= currentStep
                  ? "font-bold text-[#007EC4]"
                  : "text-gray-600"
              }`}
            >
              {step.label}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-grow flex items-center">
              <div
                className={`w-full h-1 ${
                  index < currentStep ? "bg-[#007EC4]" : "bg-gray-200"
                }`}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
