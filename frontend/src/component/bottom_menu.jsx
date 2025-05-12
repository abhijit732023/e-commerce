import React, { useState } from 'react';
import { FaHome, FaShoppingCart, FaHeart, FaUser, FaStore } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ENV_File, useAuth } from '../FilesPaths/all_path';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = url => axios.get(url).then(res => res.data);

const BottomMenuBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null); // State to track the active menu item

  const userid = user?._id || '';

  const { data: orders } = useSWR(
    user ? `${ENV_File.backendURL}/order` : null,
    async (url) => {
      const response = await axios.get(url);
      // Filter orders with paymentStatus === "pending"
      return response.data.filter((order) => order.paymentStatus === "pending");
    },
    { refreshInterval: 5000 }
  );

  const { data: wishlist } = useSWR(
    user ? `${ENV_File.backendURL}/wishlist` : null,
    fetcher,
    { refreshInterval: 5000 }
  );

  const orderCount = orders?.length || 0;
  const wishlistCount = wishlist?.length || 0;

  const menuItems = [
    { label: 'Home', icon: <FaHome />, path: '/' },
    { label: 'Shop', icon: <FaStore />, path: '/product' },
    { label: 'Cart', icon: <FaShoppingCart />, path: `/cart/${userid}`, count: orderCount },
    { label: 'Wishlist', icon: <FaHeart />, path: `/wishlist`, count: wishlistCount },
    { label: 'Account', icon: <FaUser />, path: '/account' },
  ];

  return (
    <div className="rounded-t-2xl fixed bottom-0 w-full bg-white shadow-md border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-[10vh] max-h-20 text-gray-600 text-sm">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveMenu(index); // Set the active menu item
              navigate(item.path);
            }}
            className={`relative flex flex-col items-center transition ${
              activeMenu === index ? 'text-rose-600' : 'text-gray-600'
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