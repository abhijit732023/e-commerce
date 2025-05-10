import React,{useState,useEffect} from 'react';
import { FaHome, FaShoppingCart, FaHeart, FaUser, FaStore } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../FilesPaths/all_path';

const BottomMenuBar = () => {
  const {user}=useAuth()
    const [userid, setUserid] = useState('');
    useEffect(() => {
      if (user) {
        console.log('user', user);
        setUserid(user._id);  // Set the user ID if the user is logged in
      }
    }, [user]);
  

  const navigate = useNavigate();

  const menuItems = [
    { label: 'Home', icon: <FaHome />, path: '/' },
    { label: 'Shop', icon: <FaStore />, path: '/product' },
    { label: 'Cart', icon: <FaShoppingCart />, path: `/cart/${userid}` },
    { label: 'Wishlist', icon: <FaHeart />, path: `/wishlist/${userid}` },
    { label: 'Account', icon: <FaUser />, path: '/account' },
  ];

  return (
    <div className=" rounded-t-2xl  fixed  bottom-0  w-full bg-white shadow-md border-t border-gray-200 z-50">
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
