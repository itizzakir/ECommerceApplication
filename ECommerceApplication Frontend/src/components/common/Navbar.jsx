import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';
import AuthModal from './AuthModal';


const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('login'); // 'login' or 'signup'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  console.log(user);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className="top-bar">Velora Members get Exclusive Early Access to Sale</div>
      <header>
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="logo-box">
            <svg width="32" height="32" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 0L46.65 12.5V37.5L25 50L3.35 37.5V12.5L25 0Z" fill="#FF69B4"/>
              <path d="M25 10L35 25L25 40L15 25L25 10Z" fill="white"/>
            </svg>
            <div className="logo-text">Velora</div>
          </Link>

          <div className="hamburger" onClick={toggleMenu}>
            &#9776;
          </div>

          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li className="nav-item active"><Link to="/category/women">Women</Link></li>
            <li className="nav-item"><Link to="/category/men">Men</Link></li>
            <li className="nav-item"><Link to="/category/sneakers">Sneakers</Link></li>
            <li className="nav-item"><Link to="/">New Drops</Link></li>
            {user && user.role !== 'Admin' && (
              <li className="nav-item"><Link to="/customer-dashboard">Customer Dashboard</Link></li>
            )}
          </ul>

          <div className="nav-right">
            <div className="search-box">
              <span>🔍</span>
              <input type="text" placeholder="Search for products..." />
            </div>

            {user ? (
              <>
                <span className="welcome-msg">Hi, {user.name}</span>
                {user.role === 'Admin' && (
                  <Link to="/admin" className="auth-btn">Admin</Link>
                )}
                <button onClick={handleLogout} className="auth-btn">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => openModal('login')} className="auth-btn">Login</button>
                <button onClick={() => openModal('signup')} className="auth-btn" style={{background: 'var(--dark)', color: 'white', border: 'none'}}>
                  Sign Up
                </button>
              </>
            )}

            <Link to="/wishlist" className="icon-nav">♡</Link>
            <Link to="/cart" className="icon-nav">
              🛒
              <span className="cart-badge">{cartItemCount}</span>
            </Link>
          </div>
        </div>
      </header>
      {isModalOpen && <AuthModal type={modalType} closeModal={closeModal} />}
    </>
  );
};

export default Navbar;