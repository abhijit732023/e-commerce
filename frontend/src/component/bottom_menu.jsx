import React, { useState } from 'react';
import {
  FaHome,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaStore,
  FaSignInAlt,
  FaUserPlus
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, useCartWishlist, Loader } from '../FilesPaths/all_path';

const BottomMenuBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { wishlistCount, cartCount } = useCartWishlist();
  const [loading, setLoading] = useState(false);

  const userid = user?._id || '';

  const loggedInMenuItems = [
    { label: 'Home', icon: <FaHome />, path: '/' },
    { label: 'Shop', icon: <FaStore />, path: '/product' },
    { label: 'Cart', icon: <FaShoppingCart />, path: `/cart/${userid}`, count: cartCount },
    { label: 'Wishlist', icon: <FaHeart />, path: `/wishlist/${userid}`, count: wishlistCount },
    { label: 'Account', icon: <FaUser />, path: `/account/${userid}` },
  ];

  const guestMenuItems = [
    { label: 'Home', icon: <FaHome />, path: '/' },
    { label: 'Login', icon: <FaSignInAlt />, path: '/login' },
    { label: 'Sign Up', icon: <FaUserPlus />, path: '/register' },
  ];

  const menuItems = user ? loggedInMenuItems : guestMenuItems;

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path.split('/:')[0]);
  };

  const handleMenuClick = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 2000);
  };

  return (
    <>
      {loading && (
          <Loader />
      )}
      <div className="rounded-t-2xl h-[8vh] fixed bottom-0 w-full border-2 border-b-white border-rose-200/70 bg-white shadow-md ">
        <div className="flex justify-around items-center h-full max-h-20 text-gray-600 text-sm">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleMenuClick(item.path)}
              className={`relative flex flex-col items-center transition duration-200 ${
                isActive(item.path) ? 'text-rose-600' : 'text-gray-600'
              }`}
              disabled={loading}
            >
              <div className="text-xl mb-1">{item.icon}</div>
              {item.count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.count}
                </span>
              )}
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default BottomMenuBar;