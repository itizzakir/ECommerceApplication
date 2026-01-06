import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import './WishlistPage.css';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    showNotification(`${product.title} moved to cart!`);
  };

  const handleRemoveFromWishlist = (productId, productName) => {
    if (window.confirm(`Are you sure you want to remove ${productName} from your wishlist?`)) {
      removeFromWishlist(productId);
      showNotification(`${productName} removed from wishlist!`);
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <h2>Your Wishlist is Empty</h2>
        <p>Save items you love by clicking the heart icon.</p>
        <Link to="/" className="hero-btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-page__header">
        <h2>Your Wishlist</h2>
        <p>You have {wishlistItems.length} item(s) saved.</p>
      </div>
      <div className="wishlist-grid">
        {wishlistItems.map(item => (
          <div key={item.id} className="wishlist-card">
            <Link to={`/product/${item.id}`}>
              <div className="wishlist-card__image-wrapper">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="wishlist-card__info">
                <div className="wishlist-card__title">{item.title}</div>
                <div className="wishlist-card__category">{item.category}</div>
                <div className="wishlist-card__price">₹ {item.price}</div>
              </div>
            </Link>
            <div className="wishlist-card__actions">
              <button 
                className="wishlist-card__btn wishlist-card__btn--move"
                onClick={() => handleMoveToCart(item)}
              >
                Move to Cart
              </button>
              <button 
                className="wishlist-card__btn wishlist-card__btn--remove"
                onClick={() => handleRemoveFromWishlist(item.id, item.title)}
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