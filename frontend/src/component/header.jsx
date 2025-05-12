import { useState } from "react";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth, ENV_File } from "../FilesPaths/all_path";
import logo from "../images/logo3.png"; // Assuming you have a logo image
import axios from "axios";
import useSWR from "swr";
import { motion } from "framer-motion";

const ToggleMenu = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="hover:text-rose-600 transition-colors duration-200 font-semibold focus:outline-none"
      >
        {title}
      </button>
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
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              <Link
                to={link.to}
                className="hover:text-rose-600 transition-colors duration-200"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      )}
    </div>
  );
};

const Header = () => {
  const { user } = useAuth(); // Assuming `user` comes from your custom `useAuth` hook
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
      <header className="bg-white sticky flex justify-between items-center px-6 py-3 rounded-b-xl shadow top-0 z-50">
        {/* Menu Icon */}
        <FaBars className="text-xl cursor-pointer" onClick={() => setMenuOpen(true)} />
        <img src={logo} alt="Logo" className="w-20 mx-auto" />

        {/* Link to cart */}
        <Link to={user ? `/cart/${user._id}` : "/login"}>
          <div className="relative">
            <FaShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        </Link>
      </header>

      {/* Overlay */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)} // Close menu when overlay is clicked
        ></motion.div>
      )}

      {/* Side Menu */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black shadow-lg z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center py-2 border-b">
          <img src={`${logo}?v=1`} className="mt-4 text-black w-26" alt="logo" />
        </div>
        <nav className="flex flex-col p-4 space-y-4 text-gray-700">
          <Link to="/" className="hover:text-rose-600 font-semibold transition-colors duration-200">
            Home
          </Link>

          {/* Company Menu */}
          <ToggleMenu
            title="Company"
            links={[{ to: "/about-company", label: "About Company" }]}
          />

          {/* Need Help Menu */}
          <ToggleMenu
            title="Need Help"
            links={[
              { to: "/contact-us", label: "Contact Us" },
              { to: "/terms-and-conditions", label: "Terms and Conditions" },
              { to: "/refund-and-returns", label: "Refund and Returns" },
              { to: "/faq", label: "FAQ" },
            ]}
          />

          {/* Categories Menu */}
          <ToggleMenu
            title="Categories"
            links={[
              { to: "/categories/regular", label: "Regular" },
              { to: "/categories/premium", label: "Premium" },
              { to: "/categories/ssspecial", label: "SSspecial" },
            ]}
          />
        </nav>
        <div className="mt-10 flex justify-center">
          {/* Close Icon */}
          <FaTimes
            className="cursor-pointer text-3xl text-black"
            onClick={() => setMenuOpen(false)} // Close menu when cross icon is clicked
          />
        </div>
      </motion.div>
    </>
  );
};

export default Header;