import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // You can render a loading spinner here
    return <div>Loading...</div>;
  }

  if (!user) {
    // If user is not logged in, redirect to home
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If user's role is not allowed, redirect to home
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
