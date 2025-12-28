import React, { useState } from 'react';
import './UserManagementPage.css';

const StatusBadge = ({ status }) => (
    <span className={`status-badge status-${status.toLowerCase()}`}>
        {status}
    </span>
);

const RoleDisplay = ({ role }) => (
    <span className={role === 'Admin' ? 'role-admin' : ''}>
        {role}
    </span>
);

const UserManagementPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Customer', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Customer', status: 'Active' },
    { id: 3, name: 'Admin User', email: 'admin@velore.com', role: 'Admin', status: 'Active' },
    { id: 4, name: 'Inactive User', email: 'inactive@example.com', role: 'Customer', status: 'Inactive' },
  ]);

  return (
    <div className="user-management-page">
      <h2 className="page-header">User Management</h2>
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><RoleDisplay role={user.role} /></td>
                <td><StatusBadge status={user.status} /></td>
                <td style={{ textAlign: 'right' }}>
                  <button className="action-btn">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage;
