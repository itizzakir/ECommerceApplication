import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './AdminDashboard.css';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import DashboardOverview from './DashboardOverview';
import ProductManagementPage from './ProductManagementPage';
import CategoryManagementPage from './CategoryManagementPage';
import OrderManagementPage from './OrderManagementPage';
import UserManagementPage from './UserManagementPage';

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Function to toggle sidebar for mobile view
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="velore-admin-dashboard">
            <AdminSidebar isOpen={sidebarOpen} />
            <main className="admin-main-content">
                <AdminNavbar toggleSidebar={toggleSidebar} />
                <div className="dashboard-content-area">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;