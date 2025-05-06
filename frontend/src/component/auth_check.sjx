import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../FilesPaths/allpath';
import { motion } from 'framer-motion';

const AuthGuard = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      setWarning('Please log in first.');
      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center overflow-hidden relative">

        {/* Animated Background Lights */}
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-600 opacity-20 blur-2xl"></div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4">
          {/* Main heading with RGB animation */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 bg-clip-text text-transparent animate-gradient-x"
          >
            {warning || 'Checking Authentication...'}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300 text-lg mt-4 italic"
          >
            Redirecting you to the login page in a moment...
          </motion.p>

          {/* Loader Animation */}
          <div className="mt-10 flex justify-center items-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360, 0],
                borderRadius: ['20%', '50%', '20%'],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 2,
              }}
              className="w-20 h-20 border-8 border-r-transparent border-yellow-400 border-solid rounded-full"
            />
          </div>
        </div>

      </div>
    );
  }

  return children;
};

export default AuthGuard;
