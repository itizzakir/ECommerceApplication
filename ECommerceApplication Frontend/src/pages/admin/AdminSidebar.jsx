import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = ({ isOpen }) => {
    const menuItems = [
        { name: 'Dashboard', icon: '🏠', path: '/admin/dashboard' },
        { name: 'Products', icon: '📦', path: '/admin/products' },
        { name: 'Categories', icon: '🏷️', path: '/admin/categories' },
        { name: 'Orders', icon: '🛒', path: '/admin/orders' },
        { name: 'Payments', icon: '💳', path: '/admin/payments' },
        { name: 'Users', icon: '👥', path: '/admin/users' },
        { name: 'Reviews', icon: '⭐', path: '/admin/reviews' },
    ];

    return (
        <aside className={`admin-sidebar ${isOpen ? 'is-open' : ''}`}>
            <div className="sidebar-header">
                <NavLink to="/admin" className="sidebar-brand">
                    <svg width="32" height="32" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 0L46.65 12.5V37.5L25 50L3.35 37.5V12.5L25 0Z" fill="#FF69B4"/>
                        <path d="M25 10L35 25L25 40L15 25L25 10Z" fill="white"/>
                    </svg>
                    <div className="logo-text">Velora</div>
                </NavLink>
            </div>
            <nav className="sidebar-nav">
                <ul className="sidebar-nav-list">
                    {menuItems.map((item) => (
                        <li key={item.name} className="sidebar-nav-item">
                            <NavLink to={item.path} className={({ isActive }) => (isActive ? 'active' : '')}>
                                <span className="sidebar-nav-icon">{item.icon}</span>
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
