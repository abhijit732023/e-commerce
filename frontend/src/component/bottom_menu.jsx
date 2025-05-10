import React, { useState, useEffect } from 'react';
import { FaHome, FaShoppingCart, FaHeart, FaUser, FaStore } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ENV_File, useAuth } from '../FilesPaths/all_path';
import axios from 'axios';

const BottomMenuBar = () => {
  const { user } = useAuth();
  const [userid, setUserid] = useState('');
  const [orderCount, setOrderCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    if (user) {
      console.log('user', user);
      setUserid(user._id); // Set the user ID if the user is logged in
    }
    try {
      const fetchData = async () => {
        const orderResponse = await axios(`${ENV_File.backendURL}/order`);
        const wishlistResponse = await axios(`${ENV_File.backendURL}/wishlist`);
        // console.log('orderResponse', orderResponse.data);
        // console.log('wishlistResponse', wishlistResponse.data);

        // Set counts for orders and wishlist
        setOrderCount(orderResponse.data.length || 0);
        setWishlistCount(wishlistResponse.data.length || 0);
      };
      fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [user]);

  const navigate = useNavigate();

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
            onClick={() => navigate(item.path)}
            className="relative flex flex-col items-center hover:text-rose-600 transition"
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