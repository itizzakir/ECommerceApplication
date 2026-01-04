import React, { useState, useEffect } from 'react';
import './OrderManagementPage.css';
import { useAuth } from '../../context/AuthContext';
import { getAllOrders, updateOrderStatus } from '../../services/orderService';
import { useNotification } from '../../context/NotificationContext';

const StatusBadge = ({ text }) => {
    // Map backend statuses to CSS classes if needed, or use lowercase
    const className = `status-badge status-${text ? text.toLowerCase() : 'pending'}`;
    return <span className={className}>{text}</span>;
};

const OrderManagementPage = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
      if (user?.token) {
          try {
              const data = await getAllOrders(user.token);
              setOrders(data);
          } catch (error) {
              console.error("Failed to fetch orders", error);
          } finally {
              setLoading(false);
          }
      }
  };

  const handleStatusChange = async (orderId, newStatus) => {
      try {
          await updateOrderStatus(orderId, newStatus, user.token);
          showNotification(`Order #${orderId} status updated to ${newStatus}`, 'success');
          fetchOrders(); // Refresh list
      } catch (error) {
          showNotification("Failed to update status", 'error');
      }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="order-management-page">
      <h2 className="page-header">Order Management</h2>
      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Address</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="order-id">#{order.id}</td>
                <td>{order.user?.email || 'Unknown'}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>₹{order.totalAmount.toFixed(2)}</td>
                <td>{order.shippingAddress}</td>
                <td>
                  <StatusBadge text={order.status} />
                </td>
                <td style={{ textAlign: 'right' }}>
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={{padding: '5px', borderRadius: '4px', border: '1px solid #ddd'}}
                  >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
                <tr>
                    <td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>No orders found.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagementPage;
