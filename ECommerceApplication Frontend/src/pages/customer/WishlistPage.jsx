import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    showNotification(`${product.title} moved to cart!`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="section-container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>Your Wishlist is Empty</h2>
        <p>Save items you love by clicking the heart icon.</p>
        <Link to="/" className="hero-btn" style={{ marginTop: '20px', display: 'inline-block' }}>Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="section-container" style={{ padding: '2rem' }}>
      <div className="section-header">
        <h2>Your Wishlist</h2>
        <p>You have {wishlistItems.length} item(s) saved.</p>
      </div>
      <div className="product-grid">
        {wishlistItems.map(item => (
          <div key={item.id} className="product-card">
            <Link to={`/product/${item.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
              <div className="p-img-box">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="p-title">{item.title}</div>
              <div className="p-cat">{item.category}</div>
              <div className="p-price">₹ {item.price}</div>
            </Link>
            <div className="wishlist-actions" style={{marginTop: '10px', display: 'flex', gap: '10px'}}>
              <button 
                className="submit-btn" 
                style={{flex: 1}}
                onClick={() => handleMoveToCart(item)}
              >
                Move to Cart
              </button>
              <button 
                className="auth-btn" 
                style={{flex: 1}}
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;