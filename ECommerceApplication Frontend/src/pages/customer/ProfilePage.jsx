import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { showNotification } = useNotification();

  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    currentPassword: '',
    newPassword: '',
  });
  
  const [errors, setErrors] = useState({});

  if (!user) {
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <p>Please log in to view your profile.</p>
        <Link to="/" className="hero-btn">Go to Homepage</Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full Name is required';
    if (formData.newPassword && !formData.currentPassword) newErrors.currentPassword = 'Current Password is required to set a new one';
    if (formData.newPassword && formData.newPassword.length < 8) newErrors.newPassword = 'New Password must be at least 8 characters long';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if(validateForm()){
        // In a real app, you'd also send a request to your backend to update the user data
        updateUser({ ...user, name: formData.name });
        showNotification('Profile updated successfully!', 'success');
        setFormData(prev => ({ ...prev, currentPassword: '', newPassword: ''}));
    }
  };


  return (
    <div className="profile-page">
      <div className="profile-page__header">
        <h2>Welcome, {user.name}!</h2>
        <p>Manage your personal information and view your order history.</p>
      </div>
      <div className="profile-form-container">
        <form onSubmit={handleUpdate} className="profile-form" noValidate>
          <h3>Personal Information</h3>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={user.email} disabled />
          </div>
          
          <h3 style={{marginTop: '40px'}}>Change Password</h3>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input type="password" id="currentPassword" name="currentPassword" placeholder="••••••••" value={formData.currentPassword} onChange={handleInputChange}/>
            {errors.currentPassword && <p className="error-text">{errors.currentPassword}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input type="password" id="newPassword" name="newPassword" placeholder="••••••••" value={formData.newPassword} onChange={handleInputChange}/>
            {errors.newPassword && <p className="error-text">{errors.newPassword}</p>}
          </div>
          <button type="submit" className="update-profile-btn">Update Profile</button>
        </form>
      </div>
      <div className="profile-page__actions">
        <Link to="/order-history" className="view-orders-btn">View Order History</Link>
      </div>
    </div>
  );
};

export default ProfilePage;