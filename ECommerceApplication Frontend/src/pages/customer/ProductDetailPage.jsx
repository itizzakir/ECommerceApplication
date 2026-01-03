import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNotification } from '../../context/NotificationContext';
import ProductGrid from '../../components/home/ProductGrid';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { addToWishlist, wishlistItems } = useWishlist();
  const { showNotification } = useNotification();

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
        <div className="not-found-page">
            <h2>Product Not Found</h2>
            <p>Sorry, we couldn't find the product you're looking for.</p>
            <Link to="/all-products" className="hero-btn">Back to All Products</Link>
        </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showNotification(`${quantity} of ${product.title} added to cart!`);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    const isWishlisted = wishlistItems.some(item => item.id === product.id);
    if(isWishlisted){
        showNotification(`${product.title} is already in wishlist!`);
    } else {
        showNotification(`${product.title} added to wishlist!`);
    }
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-layout">
        <div className="product-detail-img">
          <img src={product.img} alt={product.title} />
        </div>
        <div className="product-detail-info">
          <p className="product-detail-info__category">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="product-detail-info__price">
            ₹{product.price} 
            <s>₹{product.price + 500}</s>
          </p>
          <p className="product-detail-info__description">{product.description}</p>
          
          <div className="product-detail-actions">
            <div className="quantity-control">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="product-detail-buttons">
            <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
            <button onClick={handleAddToWishlist} className="add-to-wishlist-btn">
                {wishlistItems.some(item => item.id === product.id) ? 'Already in Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products-section">
            <h2>Related Products</h2>
            <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;