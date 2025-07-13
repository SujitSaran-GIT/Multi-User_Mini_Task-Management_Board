import React from 'react';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl flex flex-col items-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          className="text-4xl mb-4 text-blue-500"
        >
          <FiLoader />
        </motion.div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Loading...</h2>
        <p className="text-gray-500 dark:text-gray-300 mt-2">Please wait while we process your request</p>
        
        {/* Optional progress bar */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="h-1 bg-blue-500 rounded-full mt-4 w-40"
        />
      </motion.div>
    </div>
  );
};

export default Loader;