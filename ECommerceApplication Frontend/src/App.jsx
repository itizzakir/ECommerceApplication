import React from 'react';
import AppRouter from './routes/AppRouter';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <NotificationProvider>
            <AppRouter />
          </NotificationProvider>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;