import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <span>💎</span>
          <span>Velora Admin</span>
        </div>
        <nav>
          <ul>
            <li><NavLink to="/admin" end><span>🏠</span>Dashboard</NavLink></li>
            <li><NavLink to="/admin/products"><span>📦</span>Products</NavLink></li>
            <li><NavLink to="/admin/categories"><span>🏷️</span>Categories</NavLink></li>
            <li><NavLink to="/admin/orders"><span>🛒</span>Orders</NavLink></li>
            <li><NavLink to="/admin/users"><span>👥</span>Users</NavLink></li>
          </ul>
        </nav>
      </div>
      <div className="admin-main-content">
        <header className="admin-header">
          <div className="user-info">
            <span>Welcome, {user ? user.name : 'Admin'}</span>
            <button onClick={logout}>Logout</button>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;