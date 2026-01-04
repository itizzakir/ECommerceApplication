import React, { useState, useEffect } from 'react';
import './UserManagementPage.css';
import { useAuth } from '../../context/AuthContext';
import { getAllUsers, updateUser } from '../../services/userService';

const StatusBadge = ({ status }) => (
    <span className={`status-badge status-${status ? status.toLowerCase() : 'active'}`}>
        {status || 'Active'}
    </span>
);

const RoleDisplay = ({ role }) => (
    <span className={role === 'ROLE_ADMIN' || role === 'Admin' ? 'role-admin' : ''}>
        {role === 'ROLE_ADMIN' ? 'Admin' : (role === 'ROLE_CUSTOMER' ? 'Customer' : role)}
    </span>
);

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const { user } = useAuth(); // Get current user (for token)

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    try {
        if (!user || !user.token) return;
        setLoading(true);
        const data = await getAllUsers(user.token);
        setUsers(data);
    } catch (err) {
        setError("Failed to load users.");
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  const handleEditClick = (u) => {
    setEditingUser({ ...u });
  };

  const handleSave = async () => {
    try {
        await updateUser(editingUser.id, editingUser, user.token);
        setEditingUser(null);
        fetchUsers(); // Refresh list
    } catch (err) {
        alert("Failed to update user");
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-management-page">
      <h2 className="page-header">User Management</h2>
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td><RoleDisplay role={u.role} /></td>
                <td><StatusBadge status={u.status} /></td>
                <td style={{ textAlign: 'right' }}>
                  <button className="action-btn" onClick={() => handleEditClick(u)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <div className="modal-overlay" onClick={() => setEditingUser(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3>Edit User</h3>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" value={editingUser.email} disabled />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select 
                        value={editingUser.role} 
                        onChange={e => setEditingUser({...editingUser, role: e.target.value})}
                    >
                        <option value="ROLE_CUSTOMER">Customer</option>
                        <option value="ROLE_ADMIN">Admin</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select 
                        value={editingUser.status || 'Active'} 
                        onChange={e => setEditingUser({...editingUser, status: e.target.value})}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Suspended">Suspended</option>
                    </select>
                </div>
                <div className="modal-actions">
                    <button className="btn-cancel" onClick={() => setEditingUser(null)}>Cancel</button>
                    <button className="btn-save" onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;