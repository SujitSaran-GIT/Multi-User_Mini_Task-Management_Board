import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLogOut, FiLogIn, FiUser } from 'react-icons/fi';
import { logoutUser } from '../../redux/actions/authActions';
import toast from 'react-hot-toast';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      toast.success('Logged out successfully');
      navigate('/auth');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  const getUserInitials = (email) => {
    if (!email) return 'U';
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Project Name */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <h1 className="text-white text-xl font-bold">KanbanFlow</h1>
          </motion.div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* User Avatar */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {getUserInitials(user.email)}
                    </span>
                  </div>
                  <span className="text-white text-sm font-medium hidden md:block">
                    {user.name}
                  </span>
                </motion.div>

                {/* Logout Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span className="hidden sm:block">Logout</span>
                </motion.button>
              </>
            ) : (
              /* Login Button */
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <FiLogIn className="w-4 h-4" />
                <span className="hidden sm:block">Login</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;