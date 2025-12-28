import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNotification } from '../../context/NotificationContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { showNotification } = useNotification();

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showNotification(`${quantity} of ${product.title} added to cart!`);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    showNotification(`${product.title} added to wishlist!`);
  };

  return (
    <div className="section-container" style={{padding: '2rem'}}>
      <div className="product-detail" style={{ display: 'flex', gap: '50px' }}>
        <div className="product-detail-img" style={{ flex: 1 }}>
          <img src={product.img} alt={product.title} style={{ borderRadius: '8px' }} />
        </div>
        <div className="product-detail-info" style={{ flex: 1 }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>{product.title}</h1>
          <p style={{ fontSize: '18px', color: '#666', margin: '10px 0' }}>{product.category}</p>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary)' }}>
            ₹{product.price} 
            <s style={{ color: '#999', marginLeft: '10px', fontSize: '18px' }}>₹{product.price + 500}</s>
          </p>
          <p style={{ margin: '20px 0', lineHeight: '1.6' }}>{product.description}</p>
          <div className="inp-grp" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <label>Quantity:</label>
            <input 
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1" 
              style={{ width: '80px', padding: '10px' }} 
            />
          </div>
          <div style={{ marginTop: '30px' }}>
            <button onClick={handleAddToCart} className="submit-btn" style={{ width: 'auto', padding: '14px 30px' }}>Add to Cart</button>
            <button onClick={handleAddToWishlist} className="auth-btn" style={{ marginLeft: '10px', padding: '14px 30px' }}>Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;