import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';


const FareToolTip = ({ taxDetails }) => {
    const [isVisible, setIsVisible] = useState(false);
    const { AGST, OT, YR } = taxDetails;
  
    const tooltipStyle = {
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',
    };
  
    const tooltipTextStyle = {
      visibility: isVisible ? 'visible' : 'hidden',
      width: '200px',
      backgroundColor: '#282828',
      color: 'white',
      textAlign: 'left',
      borderRadius: '6px',
      padding: '10px',
      position: 'absolute',
      zIndex: 1,
      bottom: '125%',
      left: '50%',
      marginLeft: '-100px',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
      border: '1px solid #ddd',
      fontSize: '12px',
    };
  
    return (
      <div 
        style={tooltipStyle}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ display: 'inline-block', verticalAlign: 'middle' }}
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg> */}
        <FaInfoCircle className="ml-1 text-gray-500" />
        <div  style={tooltipTextStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
            <span>Airline GST:</span>
            <span>₹{AGST.toFixed(2)}</span>
            <span>Other Taxes:</span>
            <span>₹{OT.toFixed(2)}</span>
            <span>YR:</span>
            <span>₹{YR.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
};

export default FareToolTip;