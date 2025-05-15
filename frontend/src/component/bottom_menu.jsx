import React, { useState, useEffect } from 'react';
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
import { ENV_File, useAuth } from '../FilesPaths/all_path';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = url => axios.get(url).then(res => res.data);

const BottomMenuBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // 🔑 Use location to track current path
  const [wishlistlenght, setwishlist] = useState(null);
  const [cartlenght, setcart] = useState(null);

  const userid = user?._id || '';

  const { data: orders } = useSWR(
    user ? `${ENV_File.backendURL}/order` : null,
    async (url) => {
      const response = await axios.get(url);
      return response.data.filter((order) => order.paymentStatus === "pending");
    },
    { refreshInterval: 5000 }
  );

  const { data: wishlist } = useSWR(
    user ? `${ENV_File.backendURL}/wishlist` : null,
    fetcher,
    { refreshInterval: 5000 }
  );

  // Use useEffect to update wishlist and cart lengths
  useEffect(() => {
    if (wishlist) {
      setwishlist(wishlist.filter(item => item.userId === userid));
    }
    if (orders) {
      setcart(orders.filter(item => item.userId === userid));
    }
  }, [wishlist, orders, userid]);

  const loggedInMenuItems = [
    { label: 'Home', icon: <FaHome />, path: '/' },
    { label: 'Shop', icon: <FaStore />, path: '/product' },
    { label: 'Cart', icon: <FaShoppingCart />, path: `/cart/${userid}`, count: cartlenght?.length },
    { label: 'Wishlist', icon: <FaHeart />, path: `/wishlist/${userid}`, count: wishlistlenght?.length },
    { label: 'Account', icon: <FaUser />, path: `/account/${userid}` },
  ];

  const guestMenuItems = [
    { label: 'Home', icon: <FaHome />, path: '/' },
    { label: 'Login', icon: <FaSignInAlt />, path: '/login' },
    { label: 'Sign Up', icon: <FaUserPlus />, path: '/register' },
  ];

  const menuItems = user ? loggedInMenuItems : guestMenuItems;

  const isActive = (path) => {
    // Handle dynamic paths like /cart/:id
    return location.pathname === path || location.pathname.startsWith(path.split('/:')[0]);
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className="rounded-t-2xl fixed bottom-0 w-full border-2 border-b-white border-rose-200/70  bg-white shadow-md   z-40">
      <div className="flex justify-around items-center h-[10vh] max-h-20 text-gray-600 text-sm">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleMenuClick(item.path)}
            className={`relative flex flex-col items-center transition duration-200 ${
              isActive(item.path) ? 'text-rose-600' : 'text-gray-600'
            }`}
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
  );
};

export default BottomMenuBar;