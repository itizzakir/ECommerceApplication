import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './OrderHistoryPage.css';
import { fetchOrderHistory } from '../../services/orderService'; // Import the service

const getStatusStyle = (status) => {
  switch (status) {
    case 'Pending': return { background: '#fef3c7', color: '#92400e' };
    case 'Shipped': return { background: '#dbeafe', color: '#1d4ed8' };
    case 'Delivered': return { background: '#dcfce7', color: '#166534' };
    default: return {};
  }
};

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrderHistory();
        setOrders(data);
      } catch (err) {
        setError('Failed to fetch orders.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  if (loading) {
    return <div className="order-history-page">Loading orders...</div>;
  }

  if (error) {
    return <div className="order-history-page error-message">{error}</div>;
  }

  return (
    <div className="order-history-page">
      <div className="order-history-page__header">
        <h2>Your Orders</h2>
        <p>Track your past and current orders with ease.</p>
      </div>
      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>No Orders Yet</h2>
          <p>You have not placed any orders yet. Start shopping to see your orders here.</p>
          <Link to="/" className="hero-btn">Start Shopping</Link>
        </div>
      ) : (
        <div className="order-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-card__info">
                <span>Order ID</span>
                <p className="order-card__id">#{order.id}</p>
              </div>
              <div className="order-card__info">
                <span>Date</span>
                <p>{order.date}</p>
              </div>
              <div className="order-card__info">
                <span>Total</span>
                <p>₹{order.totalAmount.toFixed(2)}</p>
              </div>
              <div className="order-card__info">
                <span>Status</span>
                <p><span className="order-card__status" style={getStatusStyle(order.status)}>{order.status}</span></p>
              </div>
              <div className="order-card__actions">
                <button className="order-card__details-btn" onClick={() => alert('Order details functionality is not implemented yet.')}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;