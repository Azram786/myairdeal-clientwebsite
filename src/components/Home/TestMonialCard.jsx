import React from 'react';

const TestimonialCard = ({ name, title, quote, imageUrl }) => {
  const cardStyle = {
    width: '302px',
    height: '342px',
    transform: 'rotate(-7.35deg)',
    top: '209px',
    left: '141.74px',
    position: 'absolute',
  };

  const shadowStyle = {
    ...cardStyle,
    backgroundColor: '#4a90e2',
    // transform: 'rotate(-1.35deg)',
    opacity: 0.2,
    filter: 'blur(10px)',
    zIndex: 1,
  };

  return (
    <>
      {/* Shadow div */}
      <div style={shadowStyle}></div>
      
      {/* Main card div */}
      <div style={{...cardStyle, zIndex: 2}}>
        <svg viewBox="0 0 302 342" className="absolute top-0 left-0 w-full h-full">
          <path
            d="M20,10 Q10,10 10,20 L10,322 Q10,332 20,332 L282,332 Q292,332 292,322 L292,20 Q292,10 282,10 Z"
            fill="white"
            stroke="#4a90e2"
            strokeWidth="2"
          />
        </svg>
        
        <div className="relative z-10 p-6 flex flex-col items-center h-full">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-300 mb-3">
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-xs text-gray-600 mb-3">{title}</p>
          <div className="text-left">
            <span className="text-3xl text-purple-400">"</span>
            <p className="italic text-xs text-gray-700 px-3 overflow-hidden" style={{ maxHeight: '180px' }}>{quote}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialCard