// import React, { useState } from 'react';
// import { FaInfoCircle } from 'react-icons/fa';


// const FareToolTip = ({ taxDetails }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const { AGST, OT, YR } = taxDetails;

//   const tooltipStyle = {
//     position: 'relative',
//     display: 'inline-block',
//     cursor: 'pointer',
//   };

//   const tooltipTextStyle = {
//     visibility: isVisible ? 'visible' : 'hidden',
//     width: '200px',
//     backgroundColor: '#282828',
//     color: 'white',
//     textAlign: 'left',
//     borderRadius: '6px',
//     padding: '10px',
//     position: 'absolute',
//     zIndex: 1,
//     bottom: '125%',
//     left: '50%',
//     marginLeft: '-100px',
//     boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
//     border: '1px solid #ddd',
//     fontSize: '12px',
//   };

//   return (
//     <div
//       style={tooltipStyle}
//       onMouseEnter={() => setIsVisible(true)}
//       onMouseLeave={() => setIsVisible(false)}
//     >
//       {/* <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="16"
//           height="16"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           style={{ display: 'inline-block', verticalAlign: 'middle' }}
//         >
//           <circle cx="12" cy="12" r="10"></circle>
//           <line x1="12" y1="16" x2="12" y2="12"></line>
//           <line x1="12" y1="8" x2="12.01" y2="8"></line>
//         </svg> */}
//       <FaInfoCircle className="ml-1 text-gray-500" />
//       <div style={tooltipTextStyle}>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
//           <span>Airline GST:</span>
//           <span>₹{AGST.toFixed(2)}</span>
//           <span>Other Taxes:</span>
//           <span>₹{OT.toFixed(2)}</span>
//           <span>YR:</span>
//           <span>₹{YR.toFixed(2)}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FareToolTip;
import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const FareToolTip = ({ taxDetails }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { AGST, OT, YR } = taxDetails;

  return (
    <div
    
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <FaInfoCircle className="ml-1 text-gray-500" />
      <div
        className={`absolute z-10 w-48 p-2 text-white bg-gray-800 rounded-lg shadow-lg transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          bottom: '125%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <div className="grid grid-cols-2 gap-1 text-xs">
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
