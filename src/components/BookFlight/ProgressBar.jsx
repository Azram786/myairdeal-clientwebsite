import React from "react";
import { FaUser } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import { MdPayment } from "react-icons/md";
import { GoChecklist } from "react-icons/go";

const ProgressBar = ({ currentStep, onStepClick }) => {
  const steps = [
    {
      label: "Itinerary",
      icon: <GoChecklist className="text-2xl sm:text-3xl" />,
    },
    { label: "Add Details", icon: <FaUser className="text-2xl sm:text-xl" /> },
    { label: "Review", icon: <VscPreview className="text-2xl sm:text-xl" /> },
    { label: "Payment", icon: <MdPayment className="text-2xl sm:text-xl" /> },
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center justify-between w-full max-w-4xl px-4 ml-8 sm:ml-16 md:ml-24">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center w-full relative">
            <div className="flex flex-col items-center">
              <div
                className={`relative flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full cursor-pointer ${
                  index <= currentStep
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => onStepClick(index)}
              >
                {step.icon}
                {index <= currentStep && (
                  <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-blue-500"></div>
                )}
              </div>
              <div
                className={`mt-2 sm:mt-4 text-xs sm:text-sm ${
                  index <= currentStep
                    ? "font-bold text-blue-500"
                    : "text-gray-600"
                }`}
              >
                <span className="hidden sm:block ">{step.label}</span>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden sm:flex flex-grow items-center">
                <div
                  className={`w-full h-1 ${
                    index < currentStep ? "bg-blue-500" : "bg-gray-200"
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
