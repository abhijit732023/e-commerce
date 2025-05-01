import React, { useState } from 'react';
import { FaHome, FaShoppingBag, FaInfoCircle, FaPhone, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#', icon: <FaHome /> },
    { name: 'Shop', href: '#', icon: <FaShoppingBag /> },
    { name: 'About', href: '#', icon: <FaInfoCircle /> },
    { name: 'Contact', href: '#', icon: <FaPhone /> },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900">
            SS Collection
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-gray-700 hover:text-red-600 focus:outline-none"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Side Menu */}
          <div className="relative bg-white w-1/2 h-full shadow-lg">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-red-600 focus:outline-none"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            <nav className="px-4 space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
