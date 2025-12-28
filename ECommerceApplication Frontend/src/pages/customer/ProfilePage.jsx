import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();

  const handleUpdate = (e) => {
    e.preventDefault();
    showNotification('Profile updated successfully!', 'success');
  };

  if (!user) {
    return (
      <div className="section-container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>Access Denied</h2>
        <p>Please log in to view your profile.</p>
        <Link to="/" className="hero-btn" style={{ marginTop: '20px', display: 'inline-block' }}>Go to Homepage</Link>
      </div>
    );
  }

  return (
    <div className="section-container" style={{padding: '2rem'}}>
      <div className="section-header">
        <h2>Welcome, {user.name}!</h2>
        <p>Manage your personal information and view your order history.</p>
      </div>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleUpdate}>
          <div className="inp-grp">
            <label>Full Name</label>
            <input type="text" defaultValue={user.name} required />
          </div>
          <div className="inp-grp">
            <label>Email Address</label>
            <input type="email" value={user.email} required disabled />
          </div>
          <div className="inp-grp">
            <label>Current Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="inp-grp">
            <label>New Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button type="submit" className="submit-btn" style={{ marginTop: '20px' }}>Update Profile</button>
        </form>
        <div style={{marginTop: '30px', textAlign: 'center'}}>
          <Link to="/orders" className="auth-btn">View Order History</Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;