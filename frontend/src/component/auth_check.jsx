import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../FilesPaths/all_path';
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
    <div className="w-full h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 flex flex-col items-center justify-center overflow-hidden relative">

      {/* Animated Background Lights */}
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-rose-200 via-amber-100 to-rose-100 opacity-40 blur-2xl"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Main heading with gradient animation */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-rose-500 via-amber-400 to-rose-400 bg-clip-text text-transparent animate-gradient-x"
        >
          {warning || 'Checking Authentication...'}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-rose-400 text-lg mt-4 italic"
        >
          Redirecting you to the login page in a moment...
        </motion.p>

        {/* Loader Animation */}
       {/* Loader Animation */}
<div className="mt-10 flex justify-center items-center">
  <motion.div
    initial={{ scale: 0.8, opacity: 0.7 }}
    animate={{
      scale: [1, 1.15, 1],
      rotate: [0, 360, 0],
      background:
        [
          "linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)",
          "linear-gradient(225deg, #fbbf24 0%, #f472b6 100%)",
          "linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)"
        ],
      boxShadow: [
        "0 0 0px #f472b6, 0 0 0px #fbbf24",
        "0 0 40px 10px #fbbf24, 0 0 40px 10px #f472b6",
        "0 0 0px #f472b6, 0 0 0px #fbbf24"
      ],
      borderRadius: ['30%', '50%', '30%'],
      opacity: [0.7, 1, 0.7]
    }}
    transition={{
      repeat: Infinity,
      repeatType: "loop",
      duration: 2,
      ease: "easeInOut"
    }}
    className="w-20 h-20 flex items-center justify-center"
    style={{
      background: "linear-gradient(135deg, #f472b6 0%, #fbbf24 100%)",
      borderRadius: "50%",
      boxShadow: "0 0 30px #f472b6, 0 0 30px #fbbf24"
    }}
  >
    <motion.div
      animate={{
        scale: [1, 0.7, 1],
        opacity: [1, 0.5, 1]
      }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 1.2,
        ease: "easeInOut"
      }}
      className="w-8 h-8 rounded-full bg-white/80 shadow-lg"
    />
  </motion.div>
</div>
      </div>
    </div>
  );
}

  return children;
};

export default AuthGuard;
