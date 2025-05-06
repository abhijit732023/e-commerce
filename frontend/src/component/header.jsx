import { useEffect, useState } from "react";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../FilesPaths/all_path";


const Header = () => {
  const {user}=useAuth()
  const[userid,setuserid]=useState('')
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2); // replace this with actual cart logic
  useEffect(()=>{

try {
  if (user) {
    console.log(user._id);
    
    setuserid(user._id)
    
  }
  
} catch (error) {
  
}

  },[user,setuserid])

  return (
    <>
      {/* Header */}
      <header className="sticky flex justify-between items-center px-6 py-4 rounded-b-xl bg-white shadow  top-0 z-50">
        <FaBars className="text-xl cursor-pointer" onClick={() => setMenuOpen(true)} />
        <h1 className="text-xl font-bold text-center">SS Collection</h1>
        {/* link to cart */}
        <Link to={`/cart/${userid}`}>
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
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <FaTimes className="cursor-pointer" onClick={() => setMenuOpen(false)} />
        </div>
        <nav className="flex flex-col p-4 space-y-4 text-gray-700">
          <a href="/">Home</a>
          <a href="/product">Collections</a>
          <a href="/special">Special</a>
          <a href="/lookbook">Lookbook</a>
          <a href="/about">About Us</a>
          <a href="/appointment">Book Appointment</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </>
  );
};

export default Header;
