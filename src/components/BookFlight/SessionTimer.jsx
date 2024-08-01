import React, { useState, useEffect } from 'react';
import { CiClock1 } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

const SessionTimer = ({ sessionTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(sessionTimeout);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate('/search');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex w-full fixed bottom-0 right-0 items-center justify-center bg-black p-2 ">
      <div className="text-lg font-bold flex items-center gap-2 text-white">
       <CiClock1/> Your Session will expires in: {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default SessionTimer;