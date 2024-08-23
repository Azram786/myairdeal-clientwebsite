import React from 'react';
import './CustomWalkthrough.css'; // Ensure this path is correct

const CustomWalkthrough = ({ steps, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-tour-overlay">
      {steps.map((step, index) => (
        <div
          key={index}
          className="custom-tour-step"
          style={{
            top: step.position.top,
            left: step.position.left,
          }}
        >
          <div className="custom-tour-arrow" />
          <div className="custom-tour-content">
            {step.content}
          </div>
        </div>
      ))}
      <button className="custom-tour-close" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default CustomWalkthrough;
