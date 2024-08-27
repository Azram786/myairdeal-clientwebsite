import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ finishLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      finishLoading();
    }, 2000);

    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <svg 
            className="w-32 h-32 mx-auto mb-8" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M14.639 10.258L4.738 7.513C3.822 7.229 3.681 6.053 4.509 5.53L21.276 4.036C22.332 3.646 23.646 4.96 23.256 6.016L21.762 22.783C21.239 23.611 20.063 23.47 19.779 22.554L17.034 12.653"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
          </svg>
        </motion.div>
        <motion.h1
          className="text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          SkyBooker
        </motion.h1>
        <motion.p
          className="text-xl text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Your journey begins here
        </motion.p>
      </div>
    </div>
  );
};

export default SplashScreen;