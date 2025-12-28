import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Mock data - in a real app, this would be fetched
const mockOrders = [
  { id: 1, date: '2025-12-10', status: 'Delivered', total: 1299.00 },
  { id: 2, date: '2025-12-15', status: 'Shipped', total: 3498.00 },
  { id: 3, date: '2025-12-18', status: 'Pending', total: 799.00 },
];

const getStatusStyle = (status) => {
  switch (status) {
    case 'Pending':
      return { background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' };
    case 'Shipped':
      return { background: '#dbeafe', color: '#1d4ed8', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' };
    case 'Delivered':
      return { background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' };
    default:
      return {};
  }
};

const OrderHistoryPage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="section-container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>Access Denied</h2>
        <p>Please log in to view your order history.</p>
        <Link to="/" className="hero-btn" style={{ marginTop: '20px', display: 'inline-block' }}>Go to Homepage</Link>
      </div>
    );
  }

  return (
    <div className="section-container" style={{padding: '2rem'}}>
      <div className="section-header">
        <h2>Your Orders</h2>
        <p>Track your past and current orders.</p>
      </div>
      {mockOrders.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <p>You have not placed any orders yet.</p>
          <Link to="/" className="hero-btn" style={{ marginTop: '20px', display: 'inline-block' }}>Start Shopping</Link>
        </div>
      ) : (
        <div style={{overflowX: 'auto'}}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <th style={tableHeaderStyle}>Order ID</th>
                <th style={tableHeaderStyle}>Date</th>
                <th style={tableHeaderStyle}>Total</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={tableCellStyle}>#{order.id}</td>
                  <td style={tableCellStyle}>{order.date}</td>
                  <td style={tableCellStyle}>₹{order.total.toFixed(2)}</td>
                  <td style={tableCellStyle}><span style={getStatusStyle(order.status)}>{order.status}</span></td>
                  <td style={tableCellStyle}>
                    <button className="auth-btn">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  fontSize: '12px',
  background: '#f9f9f9',
};

const tableCellStyle = {
  padding: '12px',
  fontSize: '14px'
};

export default OrderHistoryPage;