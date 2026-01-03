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

    const displayName = user?.name || user?.email?.split('@')[0] || 'Admin';

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
                    <div className="navbar-admin-avatar">{displayName[0].toUpperCase()}</div>
                    <span className="navbar-admin-name">{displayName}</span>
                </div>
                <button className="navbar-logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default AdminNavbar;
