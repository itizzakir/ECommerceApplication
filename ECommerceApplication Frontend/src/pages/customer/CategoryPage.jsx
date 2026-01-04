import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGrid from '../../components/home/ProductGrid';
import { getAllProducts } from '../../services/productService';
import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
      setLoading(true);
      getAllProducts()
        .then(data => {
          setProducts(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch products", err);
          setLoading(false);
        });
    }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) => p.category.toLowerCase() === categoryName.toLowerCase()
    );
  }, [categoryName, products]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortOrder === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [filteredProducts, sortOrder]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  }

  return (
    <div className="category-page">
      <div className="category-page__header">
        <h2>{categoryName}</h2>
        <p>Explore our wide range of {categoryName.toLowerCase()} products.</p>
      </div>
      
      {sortedProducts.length > 0 ? (
        <>
            <div className="product-sort-container">
                <div className="sort-group">
                    <label htmlFor="sort-order">Sort by:</label>
                    <select id="sort-order" value={sortOrder} onChange={handleSortChange}>
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                </div>
            </div>
            <ProductGrid products={sortedProducts} />
        </>
      ) : (
        <div className="no-products-found">
            <h2>No Products Found</h2>
            <p>We couldn't find any products in the "{categoryName}" category.</p>
            <Link to="/all-products" className="hero-btn">View All Products</Link>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
