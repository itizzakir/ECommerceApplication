import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetailPage from '../pages/customer/ProductDetailPage';
import CartPage from '../pages/customer/CartPage';
import WishlistPage from '../pages/customer/WishlistPage';
import CheckoutPage from '../pages/customer/CheckoutPage';
import OrderHistoryPage from '../pages/customer/OrderHistoryPage';
import ProfilePage from '../pages/customer/ProfilePage';
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import DashboardOverview from '../pages/admin/DashboardOverview';
import ProductManagementPage from '../pages/admin/ProductManagementPage';
import CategoryManagementPage from '../pages/admin/CategoryManagementPage';
import OrderManagementPage from '../pages/admin/OrderManagementPage';
import UserManagementPage from '../pages/admin/UserManagementPage';
import ReviewManagementPage from '../pages/admin/ReviewManagementPage';
import PaymentManagementPage from '../pages/admin/PaymentManagementPage';
import CategoryPage from '../pages/customer/CategoryPage';

// Layouts and Route Protection
import CustomerLayout from '../layouts/CustomerLayout';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* Customer-facing routes */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
        </Route>

        {/* Admin routes */}
        <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="products" element={<ProductManagementPage />} />
            <Route path="categories" element={<CategoryManagementPage />} />
            <Route path="orders" element={<OrderManagementPage />} />
            <Route path="users" element={<UserManagementPage />} />
            {/* Add dummy routes for payments and reviews to avoid errors */}
            <Route path="payments" element={<PaymentManagementPage />} />
            <Route path="reviews" element={<ReviewManagementPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;