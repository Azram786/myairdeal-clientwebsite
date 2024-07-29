import React from 'react';
import { motion } from 'framer-motion';

const Spinner = () => {
    return (
        <div className={`flex items-center justify-center h-full `}>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                <motion.div
                    className="w-20 h-20 bg-blue-500 rounded-full"
                    animate={{
                        scale: [1, 1.2, 1.2, 1, 1],
                        rotate: [0, 0, 270, 270, 0],
                        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                />
            </motion.div>
        </div>
    );
};

export default Spinner;