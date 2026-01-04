import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { createOrder } from '../../services/orderService';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    paymentMethod: 'card', // 'card' or 'upi'
    upiId: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
    }
  }, [cartItems, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full Name is required';
    if (!formData.address) newErrors.address = 'Shipping Address is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is not valid';

    if (formData.paymentMethod === 'card') {
      if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Card Number must be 16 digits';
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) newErrors.expiry = 'Expiry Date must be in MM/YY format';
      if (!/^\d{3}$/.test(formData.cvc)) newErrors.cvc = 'CVC must be 3 digits';
    } else if (formData.paymentMethod === 'upi') {
      if (!formData.upiId) newErrors.upiId = 'UPI ID is required';
      if (!/^[\w.-]+@[\w.-]+$/.test(formData.upiId)) newErrors.upiId = 'UPI ID is not valid (e.g., example@bank)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
    setErrors({}); 
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsProcessing(true);
      try {
        if (!user || !user.token) {
           showNotification('You must be logged in to place an order.', 'error');
           setIsProcessing(false);
           return;
        }

        // Call backend API
        await createOrder({
            address: formData.address,
            paymentMethod: formData.paymentMethod === 'card' ? 'Credit Card' : 'UPI' 
        }, user.token);

        showNotification('Payment successful! Your order has been placed.', 'success');
        
        // Wait briefly for UX then redirect
        setTimeout(() => {
            clearCart(); // Local cart clear (if not already handled by context sync)
            navigate('/customer-dashboard'); // Go to dashboard to see new order
        }, 1500);

      } catch (error) {
        console.error(error);
        showNotification(error.message || 'Failed to place order. Please try again.', 'error');
        setIsProcessing(false);
      }
    } else {
        showNotification('Please fix the errors in the form.', 'error');
    }
  };
  
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = 50;
  const total = cartTotal + shippingCost;
  
  return (
    <div className="checkout-page">
      <div className="checkout-page__header">
        <h2>Checkout</h2>
        <p>Complete your purchase by filling out the form below.</p>
      </div>
      <div className="checkout-layout">
        <div className="checkout-form">
          <form onSubmit={handlePlaceOrder} noValidate>
            <h3>Shipping Information</h3>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="address">Shipping Address</label>
              <input type="text" id="address" name="address" placeholder="123 Main St, Anytown, USA" value={formData.address} onChange={handleInputChange} required />
              {errors.address && <p className="error-text">{errors.address}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleInputChange} required />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <h3 style={{marginTop: '40px'}}>Payment Details</h3>
            <div className="payment-method-selection">
              <label>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="card" 
                  checked={formData.paymentMethod === 'card'} 
                  onChange={() => handlePaymentMethodChange('card')} 
                />
                Credit Card
              </label>
              <label>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="upi" 
                  checked={formData.paymentMethod === 'upi'} 
                  onChange={() => handlePaymentMethodChange('upi')} 
                />
                UPI
              </label>
            </div>

            {formData.paymentMethod === 'card' ? (
              <>
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input type="text" id="cardNumber" name="cardNumber" placeholder="•••• •••• •••• ••••" value={formData.cardNumber} onChange={handleInputChange} required />
                  {errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiry">Expiry Date</label>
                    <input type="text" id="expiry" name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} required />
                    {errors.expiry && <p className="error-text">{errors.expiry}</p>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvc">CVC</label>
                    <input type="text" id="cvc" name="cvc" placeholder="•••" value={formData.cvc} onChange={handleInputChange} required />
                    {errors.cvc && <p className="error-text">{errors.cvc}</p>}
                  </div>
                </div>
              </>
            ) : (
              <div className="form-group">
                <label htmlFor="upiId">UPI ID</label>
                <input type="text" id="upiId" name="upiId" placeholder="example@bank" value={formData.upiId} onChange={handleInputChange} required />
                {errors.upiId && <p className="error-text">{errors.upiId}</p>}
              </div>
            )}

            <button type="submit" className="place-order-btn" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>
        <div className="checkout-summary">
          <h3>Your Order</h3>
          <div className="summary-item-list">
            {cartItems.map(item => (
                <div key={item.id} className="summary-item">
                <img src={item.img} alt={item.title} className="summary-item__img"/>
                <div className="summary-item__details">
                    <p>{item.title}</p>
                    <p>Qty: {item.quantity}</p>
                </div>
                <span className="summary-item__price">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
            ))}
          </div>
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