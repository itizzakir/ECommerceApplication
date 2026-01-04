import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getCart, addToCart as apiAddToCart, updateCartItem as apiUpdateCartItem, removeFromCart as apiRemoveFromCart } from '../services/cartService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.token) {
        fetchCart();
    } else {
        setCartItems([]); // Clear cart or load from local storage if you want offline persistence
    }
  }, [user]);

  const fetchCart = async () => {
      try {
          const items = await getCart(user.token);
          // Map backend CartItem to frontend structure
          const mappedItems = items.map(item => ({
              ...item.product,
              cartItemId: item.id,
              quantity: item.quantity
          }));
          setCartItems(mappedItems);
      } catch (error) {
          console.error("Failed to fetch cart", error);
      }
  };

  const addToCart = async (product, quantity = 1) => {
    if (user && user.token) {
        try {
            await apiAddToCart(product.id, quantity, user.token);
            await fetchCart(); // Refresh cart from server to get correct IDs
        } catch (error) {
            console.error("Failed to add to cart", error);
            alert("Failed to add to cart");
        }
    } else {
        // Local logic for guests (optional, or redirect to login)
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                return [...prevItems, { ...product, quantity }];
            }
        });
    }
  };

  const removeFromCart = async (productId) => {
    if (user && user.token) {
        const item = cartItems.find(i => i.id === productId);
        if (item && item.cartItemId) {
            try {
                await apiRemoveFromCart(item.cartItemId, user.token);
                await fetchCart();
            } catch (error) {
                console.error("Failed to remove from cart", error);
            }
        }
    } else {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    
    if (user && user.token) {
        const item = cartItems.find(i => i.id === productId);
        if (item && item.cartItemId) {
            try {
                await apiUpdateCartItem(item.cartItemId, quantity, user.token);
                // Optimistic update
                setCartItems(prev => prev.map(i => i.id === productId ? { ...i, quantity } : i));
            } catch (error) {
                console.error("Failed to update quantity", error);
                fetchCart(); // Revert on error
            }
        }
    } else {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: quantity } : item
            )
        );
    }
  };

  const clearCart = () => {
      setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};