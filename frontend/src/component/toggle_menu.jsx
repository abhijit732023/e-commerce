import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from '../FilesPaths/all_path';

const ToggleMenu = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNav = (to) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(to);
    }, 2000);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="hover:text-rose-600 transition-colors duration-200 font-semibold focus:outline-none flex items-center gap-2"
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-4 flex flex-col space-y-2 mt-1 text-gray-600 text-sm overflow-hidden"
          >
            {links.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, delay: index * 0.07 }}
              >
                <button
                  onClick={() => handleNav(link.to)}
                  className="hover:text-rose-600 transition-colors duration-200 pl-2 py-1 rounded hover:bg-rose-50 text-left w-full"
                  disabled={loading}
                >
                  {link.label}
                </button>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {loading && (
          
            <Loader />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToggleMenu;