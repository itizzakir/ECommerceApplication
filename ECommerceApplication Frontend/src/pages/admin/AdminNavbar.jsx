import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminNavbar.css';

const AdminNavbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to homepage after logout
    };

    return (
        <nav className="admin-navbar">
            <div className="navbar-left">
                <button className="sidebar-toggle-btn" onClick={toggleSidebar}>☰</button>
                <h1 className="navbar-brand">Dashboard</h1>
            </div>
            <div className="navbar-right">
                <div className="navbar-icon">
                    <span>🔔</span>
                    <span className="navbar-notification-count">3</span>
                </div>
                <div className="navbar-admin-profile">
                    <div className="navbar-admin-avatar">{user ? user.name[0].toUpperCase() : 'A'}</div>
                    <span className="navbar-admin-name">{user ? user.name : 'Admin'}</span>
                </div>
                <button className="navbar-logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default AdminNavbar;
