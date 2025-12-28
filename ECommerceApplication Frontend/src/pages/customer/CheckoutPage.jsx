import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
    }
  }, [cartItems, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    showNotification('Order placed successfully! Thank you for shopping with us.', 'success');
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 2000);
  };
  
  const shippingCost = 50;
  const total = cartTotal + shippingCost;

  return (
    <div className="section-container" style={{padding: '2rem'}}>
      <div className="section-header">
        <h2>Checkout</h2>
        <p>Complete your purchase.</p>
      </div>
      <div className="checkout-layout">
        <div className="checkout-form">
          <form onSubmit={handlePlaceOrder}>
            <h3>Shipping Information</h3>
            <div className="inp-grp">
              <label>Full Name</label>
              <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="inp-grp">
              <label>Shipping Address</label>
              <input type="text" name="address" placeholder="123 Main St, Anytown, USA" value={formData.address} onChange={handleInputChange} required />
            </div>
            <div className="inp-grp">
              <label>Email Address</label>
              <input type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleInputChange} required />
            </div>

            <h3 style={{marginTop: '30px'}}>Payment Details</h3>
            <div className="inp-grp">
              <label>Card Number</label>
              <input type="text" name="cardNumber" placeholder="•••• •••• •••• ••••" value={formData.cardNumber} onChange={handleInputChange} required />
            </div>
            <div style={{display: 'flex', gap: '20px'}}>
              <div className="inp-grp" style={{flex: 1}}>
                <label>Expiry Date</label>
                <input type="text" name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} required />
              </div>
              <div className="inp-grp" style={{flex: 1}}>
                <label>CVC</label>
                <input type="text" name="cvc" placeholder="•••" value={formData.cvc} onChange={handleInputChange} required />
              </div>
            </div>
            <button type="submit" className="submit-btn" style={{ marginTop: '20px', width: '100%' }}>Place Order</button>
          </form>
        </div>
        <div className="checkout-summary">
          <h3>Your Order</h3>
          {cartItems.map(item => (
            <div key={item.id} className="summary-item">
              <img src={item.img} alt={item.title}/>
              <div>
                <p>{item.title}</p>
                <p>Qty: {item.quantity}</p>
              </div>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>₹{shippingCost.toFixed(2)}</span>
          </div>
          <hr />
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;