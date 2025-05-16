// src/context/CartWishlistContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ENV_File, useAuth } from '../src/FilesPaths/all_path';

const CartWishlistContext = createContext();

export const CartWishlistProvider = ({  children }) => {
  const{user}=useAuth()
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const fetchCounts = async () => {
    if (!user) return;
    try {
      const [wishlistRes, orderRes] = await Promise.all([
        axios.get(`${ENV_File.backendURL}/wishlist`),
        axios.get(`${ENV_File.backendURL}/order`),
      ]);
      const userWishlist = wishlistRes.data.filter(item => item.userId === user._id);
      const userOrders = orderRes.data.filter(
        item => item.userId === user._id && item.paymentStatus === 'pending'
      );
      setWishlistCount(userWishlist.length);
      setCartCount(userOrders.length);
    } catch (error) {
      console.error('Error fetching cart/wishlist counts:', error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, [user]);

  return (
    <CartWishlistContext.Provider
      value={{ wishlistCount, cartCount, fetchCounts }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};

export const useCartWishlist = () => useContext(CartWishlistContext);
