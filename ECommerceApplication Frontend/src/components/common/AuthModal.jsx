import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AuthModal.css';


const AuthModal = ({ type, closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Customer'); // Default role
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      let data;
      if (type === 'login') {
        data = await login(email, password);
      } else {
        data = await signup(email, password, role);
      }

      // Redirect based on role
      // Backend returns roles like "ROLE_ADMIN" or "ROLE_CUSTOMER"
      const userRole = data.role || '';
      
      if (userRole.includes('ADMIN') || userRole.includes('Admin')) {
        navigate('/admin');
      } else {
        navigate('/');
      }

      closeModal();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };

  return (
    <div className="modal-bg" onClick={closeModal}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={closeModal}>×</span>
        <h3 className="modal-h">{type === 'login' ? 'Login' : 'Sign Up'}</h3>
        <p className="modal-sub">
          Enter your details below.
        </p>
        
        {error && <p className="error-msg" style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{error}</p>}

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
          {type === 'signup' && (
            <div className="inp-grp">
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="Customer">Customer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          )}
           {/* Even for login, we might want role if the API required it, but usually login just needs email/pass. 
               The original code had role selector for login too. I'll hide it for login unless the user wants to specify it, 
               but usually role is determined by the account. My backend LoginRequest doesn't take role. 
               So I will ONLY show role select for signup. */}
          
          <button type="submit" className="submit-btn">
            {type === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>
        
        <p className="terms-text">
          By continuing, you agree to our Terms.
        </p>
      </div>
    </div>
  );
};

export default AuthModal;