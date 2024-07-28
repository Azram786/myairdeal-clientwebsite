import React from 'react';

const TestimonialCard = ({ image, name, position, text }) => {
  return (
    <div className="relative max-w-xs mx-auto m-6">
      {/* Background blue card */}
      <div className="absolute top-4 -left-4 w-full h-full bg-blue-500 rounded-2xl transform rotate-1"></div>
      {/* Foreground white card */}
      <div className="relative bg-white p-4 rounded-2xl shadow-lg">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <img src={image} alt={name} className="w-16 h-16 rounded-full border-4 border-white" />
        </div>
        <div className="pt-12 text-center">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-500">{position}</p>
          <p className="mt-2 text-gray-600 text-sm">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
