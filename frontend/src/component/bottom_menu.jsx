import React from 'react';
import { FaHome, FaShoppingCart, FaHeart, FaUser, FaStore } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BottomMenuBar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Home', icon: <FaHome />, path: '/' },
    { label: 'Shop', icon: <FaStore />, path: '/shop' },
    { label: 'Cart', icon: <FaShoppingCart />, path: '/cart' },
    { label: 'Wishlist', icon: <FaHeart />, path: '/wishlist' },
    { label: 'Account', icon: <FaUser />, path: '/account' },
  ];

  return (
    <div className=" rounded-t-2xl  fixed bottom-0 left-0 w-full bg-[#fff9f1] shadow-md border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-[10vh] max-h-20 text-gray-600 text-sm">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center hover:text-rose-600 transition"
          >
            <div className="text-xl mb-1">{item.icon}</div>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomMenuBar;
