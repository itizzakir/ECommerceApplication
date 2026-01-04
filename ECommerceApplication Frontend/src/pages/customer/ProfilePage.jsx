import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, updateUser, logout } = useAuth();
  const { showNotification } = useNotification();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    email: '' // Read-only
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
        setFormData({
            fullName: user.fullName || '',
            phoneNumber: user.phoneNumber || '',
            address: user.address || '',
            email: user.email || ''
        });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          address: formData.address
      });
      showNotification('Profile updated successfully!', 'success');
      setIsEditing(false);
    } catch (error) {
      showNotification('Failed to update profile.', 'error');
    }
  };

  if (!user) return <div className="profile-page">Please log in to view your profile.</div>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
            <div className="profile-avatar">
                {user.fullName ? user.fullName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </div>
            <h2>{user.fullName || 'User Profile'}</h2>
            <p className="profile-email">{user.email}</p>
        </div>

        {isEditing ? (
            <form onSubmit={handleUpdate} className="profile-form">
                <div className="form-group">
                    <label>Full Name</label>
                    <input 
                        type="text" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange} 
                        placeholder="John Doe"
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                        type="tel" 
                        name="phoneNumber" 
                        value={formData.phoneNumber} 
                        onChange={handleChange} 
                        placeholder="+91 98765 43210"
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <textarea 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                        placeholder="123 Main St, City, Country"
                        rows="3"
                    />
                </div>
                <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                    <button type="submit" className="btn-save">Save Changes</button>
                </div>
            </form>
        ) : (
            <div className="profile-details">
                <div className="detail-row">
                    <span className="detail-label">Full Name:</span>
                    <span className="detail-value">{user.fullName || 'Not set'}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{user.phoneNumber || 'Not set'}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">{user.address || 'Not set'}</span>
                </div>
                
                <div className="profile-actions">
                    <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    <button className="btn-logout" onClick={logout}>Logout</button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
