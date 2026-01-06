import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getOrderById } from '../../services/orderService';
import './OrderDetailsPage.css';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        setError('Failed to fetch order details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return { background: '#fef3c7', color: '#92400e' };
      case 'Shipped': return { background: '#dbeafe', color: '#1d4ed8' };
      case 'Delivered': return { background: '#dcfce7', color: '#166534' };
      case 'Cancelled': return { background: '#fee2e2', color: '#991b1b' };
      default: return { background: '#f3f4f6', color: '#374151' };
    }
  };

  if (loading) return <div className="order-details-page loading">Loading order details...</div>;
  
  if (error) return (
    <div className="order-details-page error">
      <p>{error}</p>
      <button onClick={() => navigate('/order-history')} className="back-btn">Back to Orders</button>
    </div>
  );

  if (!order) return <div className="order-details-page">Order not found.</div>;

  return (
    <div className="order-details-page">
      <Link to="/order-history" className="back-btn">
        ← Back to Order History
      </Link>

      <div className="order-details-header">
        <div className="flex justify-between items-start">
            <div>
                <h2>Order #{order.id}</h2>
                <div className="order-meta">
                    <span>Placed on {new Date(order.orderDate).toLocaleDateString()}</span>
                    <span>Tracking ID: {order.trackingId || 'N/A'}</span>
                </div>
            </div>
            <span className="order-status-badge" style={getStatusStyle(order.status)}>
                {order.status}
            </span>
        </div>
      </div>

      <div className="order-content-grid">
        <div className="order-items-section">
          <h3>Items ({order.orderItems.length})</h3>
          {order.orderItems.map((item) => (
            <div key={item.id} className="order-item">
              <img 
                src={item.product.img || '/placeholder-image.png'} 
                alt={item.product.title} 
                className="item-image" 
                onError={(e) => {e.target.src = 'https://placehold.co/100'}}
              />
              <div className="item-details">
                <Link to={`/product/${item.product.id}`} className="item-name">
                  {item.product.title}
                </Link>
                <p className="item-meta">Quantity: {item.quantity}</p>
                <p className="item-meta">Unit Price: ₹{item.price.toFixed(2)}</p>
              </div>
              <div className="item-total-price">
                <p className="item-price">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary-section">
          <div className="summary-card">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-row" style={{marginTop: '1rem', fontSize: '0.9rem'}}>
                <span>Payment Method</span>
                <span style={{textTransform: 'capitalize'}}>{order.paymentMethod}</span>
            </div>
          </div>

          <div className="summary-card">
            <h3>Shipping Address</h3>
            <div className="address-details">
              <p>{order.shippingAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
