import { useState } from "react";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth,ToggleMenu,useCartWishlist} from "../FilesPaths/all_path";
import logo from "../images/logo3.png";
import { motion, AnimatePresence } from "framer-motion";
// import ToggleMenu from "./ToggleMenu"; // Assuming you extracted it
// import { useCartWishlist } from "../context/CartWishlistContext";

const Header = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCartWishlist();


  const userId = user?._id || "";

  

  return (
    <>
      {/* Header */}
      <header className="bg-white h-[7vh] sticky flex justify-between items-center px-6 py-3 rounded-b-2xl shadow-lg top-0 border-b border-rose-100 z-10">
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

        {/* Cart Icon */}
        <Link to={user ? `/cart/${userId}` : "/login"}>
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
            <div className="flex flex-col items-center py-2 pt-6 border-b border-rose-100">
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

              <ToggleMenu title="Company" links={[{ to: "/about-company", label: "About Company" }]} />
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
