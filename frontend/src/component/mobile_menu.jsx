import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaTrophy,
  FaUserCircle,
  FaSignOutAlt,
  FaClipboardList,
  FaSignInAlt,
  FaUserPlus,
  FaCommentDots
} from "react-icons/fa";
import { useAuth } from "../FilesPaths/all_path.js";
import { motion, AnimatePresence } from "framer-motion";

const MobileMenu = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const userId = user?._id;

  const navigateTo = (path) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(path);
      setIsLoading(false);
      setIsMenuOpen(false);
    }, 1200);
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      setIsLoading(true);
      try {
        await logout();
        setTimeout(() => {
          navigate("/login");
          setIsLoading(false);
        }, 1200);
      } catch (error) {
        console.error("Logout failed:", error);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="relative">
      {/* Loader
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[70]">
          <Loading size="80" speed="2" color="#FACC15" />
        </div>
      )} */}

      {/* Menu Toggle Button (Visible on mobile only) */}
      <div className="fixed bottom-6 right-6 z-[60] block md:hidden">
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-yellow-400 p-4 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </motion.button>
      </div>

      {/* AnimatePresence for menu (Visible on mobile only) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-[50]"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Bottom Drawer Menu */}
            <motion.div
              key="drawer"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="fixed bottom-0 left-0 right-0 bg-white/20 backdrop-blur-md rounded-t-3xl p-8 z-[55] shadow-2xl"
            >
              <div className="flex flex-col space-y-6 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <MenuItem icon={<FaHome />} label="Home" onClick={() => navigateTo("/")} />
                </motion.div>

                {user ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <MenuItem icon={<FaTrophy />} label="Tournaments" onClick={() => navigateTo("/tournament")} />
                    </motion.div>

                    {/* <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <MenuItem icon={<FaUserCircle />} label="Profile" onClick={() => navigateTo("/profile")} />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <MenuItem icon={<FaClipboardList />} label="My Tournaments" onClick={() => navigateTo(`/mytournament/${userId}`)} />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }} // slightly different delay for better flow
                    >
                      <MenuItem
                        icon={<FaCommentDots />}
                        label="Feedback"
                        onClick={() => navigateTo("/feedback")}
                      />
                    </motion.div> */}

                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <MenuItem icon={<FaSignOutAlt />} label="Logout" onClick={handleLogout} color="text-red-400" />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <MenuItem icon={<FaSignInAlt />} label="Login" onClick={() => navigateTo("/login")} />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <MenuItem icon={<FaUserPlus />} label="Signup" onClick={() => navigateTo("/register")} />
                    </motion.div>

                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const MenuItem = ({ icon, label, onClick, color = "text-white" }) => (
  <div
    className={`flex items-center justify-center gap-3 text-lg font-semibold ${color} cursor-pointer`}
    onClick={onClick}
  >
    {icon}
    {label}
  </div>
);

export default MobileMenu;
