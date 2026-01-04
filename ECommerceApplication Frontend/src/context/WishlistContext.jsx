import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getWishlist, addToWishlist as apiAddToWishlist, removeFromWishlist as apiRemoveFromWishlist } from '../services/wishlistService';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.token) {
        fetchWishlist();
    } else {
        setWishlistItems([]); 
    }
  }, [user]);

  const fetchWishlist = async () => {
      try {
          const items = await getWishlist(user.token);
          // Map backend WishlistItem to frontend structure
          const mappedItems = items.map(item => ({
              ...item.product,
              wishlistItemId: item.id
          }));
          setWishlistItems(mappedItems);
      } catch (error) {
          console.error("Failed to fetch wishlist", error);
      }
  };

  const addToWishlist = async (product) => {
    if (user && user.token) {
        // Check if already in wishlist to avoid unnecessary API calls (though backend handles it)
        if (wishlistItems.some(item => item.id === product.id)) return;

        try {
            await apiAddToWishlist(product.id, user.token);
            await fetchWishlist(); 
        } catch (error) {
            console.error("Failed to add to wishlist", error);
        }
    } else {
        setWishlistItems(prevItems => {
            if (prevItems.some(item => item.id === product.id)) return prevItems;
            return [...prevItems, product];
        });
    }
  };

  const removeFromWishlist = async (productId) => {
    if (user && user.token) {
        const item = wishlistItems.find(i => i.id === productId);
        if (item && item.wishlistItemId) {
            try {
                await apiRemoveFromWishlist(item.wishlistItemId, user.token);
                await fetchWishlist();
            } catch (error) {
                console.error("Failed to remove from wishlist", error);
            }
        }
    } else {
        setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};