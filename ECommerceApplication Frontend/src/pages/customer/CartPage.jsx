import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="section-container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="hero-btn" style={{ marginTop: '20px', display: 'inline-block' }}>Continue Shopping</Link>
      </div>
    );
  }

  const shippingCost = 50; // Mock shipping cost
  const total = cartTotal + shippingCost;

  return (
    <div className="section-container" style={{ padding: '2rem' }}>
      <div className="section-header">
        <h2>Your Cart</h2>
        <p>You have {cartItems.length} item(s) in your cart.</p>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.title} className="cart-item-img" />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>Price: ₹{item.price}</p>
                <div className="cart-item-actions">
                  <label>Qty:</label>
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    min="1"
                    className="cart-quantity-input"
                  />
                  <button onClick={() => removeFromCart(item.id)} className="cart-remove-btn">Remove</button>
                </div>
              </div>
              <div className="cart-item-subtotal">
                <p>Subtotal: ₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
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
          <Link to="/checkout">
            <button className="submit-btn" style={{ width: '100%', marginTop: '20px' }}>
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;