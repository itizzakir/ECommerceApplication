import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AuthModal.css';


const AuthModal = ({ type, closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Customer'); // Default role
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simplified user object, in a real app, you'd have more details
    const userData = { name: email.split('@')[0], email, role };
    
    if (type === 'login') {
      login(userData);
    } else {
      signup(userData);
    }

    // Redirect based on role
    if (role === 'Admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }

    closeModal();
  };

  return (
    <div className="modal-bg" onClick={closeModal}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={closeModal}>×</span>
        <h3 className="modal-h">{type === 'login' ? 'Login' : 'Sign Up'}</h3>
        <p className="modal-sub">
          Enter your details below.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="inp-grp">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="inp-grp">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div className="inp-grp">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">
            {type === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="demo-credentials">
          <p><strong>Admin Demo:</strong> admin@velore.com / admin123</p>
          <p><strong>Customer Demo:</strong> customer@velore.com / customer123</p>
        </div>
        
        <p className="terms-text">
          By continuing, you agree to our Terms.
        </p>
      </div>
    </div>
  );
};

export default AuthModal;