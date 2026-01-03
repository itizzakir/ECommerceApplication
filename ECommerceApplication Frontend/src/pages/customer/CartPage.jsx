import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { showNotification } = useNotification();

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemoveFromCart = (productId, productName) => {
    if (window.confirm(`Are you sure you want to remove ${productName} from your cart?`)) {
      removeFromCart(productId);
      showNotification(`${productName} removed from cart!`);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="hero-btn">Continue Shopping</Link>
      </div>
    );
  }

  const shippingCost = 50; // Mock shipping cost
  const total = cartTotal + shippingCost;

  return (
    <div className="cart-page">
      <div className="cart-page__header">
        <h2>Your Cart</h2>
        <p>You have {cartItems.length} item(s) in your cart.</p>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.title} className="cart-item__img" />
              <div className="cart-item__details">
                <h3>{item.title}</h3>
                <p className="cart-item__price">₹{item.price}</p>
                <div className="cart-item__actions">
                    <div className="quantity-control">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                   <button onClick={() => handleRemoveFromCart(item.id, item.title)} className="cart-item__remove-btn">Remove</button>
                </div>
              </div>
              <div className="cart-item__subtotal">
                <p>₹{(item.price * item.quantity).toFixed(2)}</p>
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
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;