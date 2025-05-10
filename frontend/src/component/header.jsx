import { useEffect, useState } from "react";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth, ENV_File } from "../FilesPaths/all_path";
import logo from '../images/logo3.png'; // Assuming you have a logo image
import axios from "axios";

const Header = () => {
  const { user } = useAuth();  // Assuming `user` comes from your custom `useAuth` hook
  const [userid, setUserid] = useState('');
  const [order, setOrder] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(null); // replace this with actual cart logic

  useEffect(() => {
    if (user) {
      setUserid(user._id);  // Set the user ID if the user is logged in
    }
    try {
      const fetchOrder = async () => {
        try {
          const response = await axios.get(`${ENV_File.backendURL}/order/${userid}`);
          setOrder(response.data);
          setCartCount(response.data.length); // Assuming each order corresponds to a cart item
        } catch (error) {
          console.error("Error fetching order:", error);
        }
      };
      fetchOrder();

    } catch (error) {

    }
  }, [user, setCartCount]);

  return (
    <>
      {/* Header */}
      <header className="bg-white sticky flex justify-between items-center px-6 py-3 rounded-b-xl shadow top-0 z-50">
        <FaBars className="text-xl cursor-pointer" onClick={() => setMenuOpen(true)} />
        <img src={logo} alt="Logo" className="w-20 mx-auto" />

        {/* Link to cart */}
        <Link to={user ? `/cart/${user._id}` : '/login'}>
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
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black shadow-lg z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-center   py-2 border-b">
          {/* <h2>Menu</h2> */}
          <div><img src={`${logo}?v=1`}  className=" mt-4 text-black w-26" alt='logo' /></div>
        </div>
        <nav className="flex flex-col p-4 space-y-4 text-gray-700">
          <Link to="/" className="hover:text-rose-600 transition-colors duration-200">Home</Link>
          <Link to="/product" className="hover:text-rose-600 transition-colors duration-200">Collections</Link>
          <Link to="/special" className="hover:text-rose-600 transition-colors duration-200">Special</Link>
          <Link to="/lookbook" className="hover:text-rose-600 transition-colors duration-200">Lookbook</Link>
          <Link to="/about" className="hover:text-rose-600 transition-colors duration-200">About Us</Link>
          <Link to="/appointment" className="hover:text-rose-600 transition-colors duration-200">Book Appointment</Link>
          <Link to="/contact" className="hover:text-rose-600 transition-colors duration-200">Contact</Link>
        </nav>
       <div className=" mt-10 flex justify-center"> <FaTimes className="cursor-pointer text-3xl text-black" onClick={() => setMenuOpen(false)} />
       </div>
      </div>
    </>
  );
};

export default Header;
