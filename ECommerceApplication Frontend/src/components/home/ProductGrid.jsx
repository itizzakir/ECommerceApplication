import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNotification } from '../../context/NotificationContext';
import './ProductGrid.css';


const ProductGrid = ({ products }) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { showNotification } = useNotification();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    showNotification(`${product.title} added to cart!`);
  };

  const handleAddToWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
    showNotification(`${product.title} added to wishlist!`);
  };

  return (
    <div className="product-grid">
      {products.map(item => (
        <Link to={`/product/${item.id}`} key={item.id} className="product-card">
          <div className="p-img-box">
            <span className="p-badge">{item.tag}</span>
            <button 
              className="p-wish" 
              onClick={(e) => handleAddToWishlist(e, item)}
            >
              ♡
            </button>
            <img src={item.img} alt={item.title} />
          </div>
          <div className="p-title">{item.title}</div>
          <div className="p-cat">{item.category}</div>
          <div className="p-price">
            ₹ {item.price}
            <s>₹ {item.price + 500}</s>
          </div>
          <button 
            className="add-to-cart-btn" 
            onClick={(e) => handleAddToCart(e, item)}
          >
            Add to Cart
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;