import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../ui/Navbar';
import Sidebar from './Sidebar';
import ThreeBackground from '../ui/ThreeBackground';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <ThreeBackground />
      
      {/* Navbar */}
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 lg:ml-64 min-h-screen"
        >
          <div className="p-6">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default MainLayout;
