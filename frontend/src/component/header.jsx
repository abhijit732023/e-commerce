import { useState } from "react";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth, ENV_File } from "../FilesPaths/all_path";
import logo from "../images/logo3.png";
import axios from "axios";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";

const ToggleMenu = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

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
                <Link
                  to={link.to}
                  className="hover:text-rose-600 transition-colors duration-200 pl-2 py-1 rounded hover:bg-rose-50"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // Use SWR to fetch cart data
  const { data: orders } = useSWR(
    user ? `${ENV_File.backendURL}/order` : null,
    async (url) => {
      const response = await axios.get(url);
      return response.data.filter((order) => order.paymentStatus === "pending");
    },
    { refreshInterval: 5000 }
  );

  // Calculate cart count
  const cartCount = orders?.length || 0;

  return (
    <>
      {/* Header */}
      <header className="bg-white sticky flex justify-between items-center px-6 py-3 rounded-b-2xl shadow-lg top-0  border-b border-rose-100">
        {/* Menu Icon */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          className="focus:outline-none"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars className="text-2xl text-rose-700 hover:text-rose-900 transition" />
        </motion.button>
        <Link to="/">
          <img src={logo} alt="Logo" className="w-24 mx-auto drop-shadow" />
        </Link>

        {/* Link to cart */}
        <Link to={user ? `/cart/${user}` : "/login"}>
          <div className="relative">
            <FaShoppingCart className="text-2xl text-rose-700 hover:text-rose-900 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow">
                {cartCount}
              </span>
            )}
          </div>
        </Link>
      </header>

      {/* Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Side Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="fixed top-0 left-0 h-full w-72 bg-gradient-to-br from-rose-50 via-white to-amber-50 text-black shadow-2xl z-50 rounded-r-2xl flex flex-col"
          >
            <div className="flex flex-col items-center py-2  pt-6 border-b border-rose-100">
              <img src={`${logo}?v=1`} className="w-28 mb-2 drop-shadow" alt="logo" />
            </div>
            <nav className="flex flex-col p-6 space-y-4 text-gray-700 font-medium">
              <Link
                to="/"
                className="hover:text-rose-600 font-semibold transition-colors duration-200 py-1"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <ToggleMenu
                title="Company"
                links={[{ to: "/about-company", label: "About Company" }]}
              />
              <ToggleMenu
                title="Need Help"
                links={[
                  { to: "/contact-us", label: "Contact Us" },
                  { to: "/terms-and-conditions", label: "Terms and Conditions" },
                  { to: "/refund-and-returns", label: "Refund and Returns" },
                  { to: "/faq", label: "FAQ" },
                ]}
              />
              <ToggleMenu
                title="Categories"
                links={[
                  { to: "/categories/regular", label: "Regular" },
                  { to: "/categories/premium", label: "Premium" },
                  { to: "/categories/ssspecial", label: "SSspecial" },
                ]}
              />
            </nav>
            <div className="mt-auto flex justify-center pb-8">
              <motion.button
                whileTap={{ scale: 0.65, rotate: 180 }}
                className="cursor-pointer text-3xl text-rose-700 hover:text-rose-900 transition"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <FaTimes />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;