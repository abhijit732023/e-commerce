import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ENV_File, useAuth } from '../FilesPaths/all_path';

const CartWishlistContext = createContext();

export const CartWishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    if (user) {
      const fetchCounts = async () => {
        try {
          const orderResponse = await axios.get(`${ENV_File.backendURL}/order/${user._id}`);
          const wishlistResponse = await axios.get(`${ENV_File.backendURL}/wishlist`);
          setCartCount(orderResponse.data.length || 0);
          setWishlistCount(wishlistResponse.data.length || 0);
        } catch (error) {
          console.error('Error fetching cart or wishlist counts:', error);
        }
      };
      fetchCounts();
    } else {
      setCartCount(0);
      setWishlistCount(0);
    }
  }, [user]);

  return (
    <CartWishlistContext.Provider value={{ cartCount, wishlistCount, setCartCount, setWishlistCount }}>
      {children}
    </CartWishlistContext.Provider>
  );
};

export const useCartWishlist = () => useContext(CartWishlistContext);
