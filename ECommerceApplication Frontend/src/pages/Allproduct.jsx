import React, { useState, useMemo } from 'react';
import ProductGrid from '../components/home/ProductGrid';
import './Allproduct.css';

const Allproduct = ({ products = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  const productsPerPage = 8;

  const categories = useMemo(() => ['all', ...new Set(products.map(p => p.category))], [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filterCategory === 'all') return true;
      return product.category === filterCategory;
    });
  }, [filterCategory, products]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortOrder === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [filteredProducts, sortOrder]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  };
  
  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1);
  }
  
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="all-products-page">
        <div className="all-products-page__header">
            <h2>Our Collection</h2>
            <p>Browse through our curated collection of high-quality products.</p>
        </div>

        <div className="product-filters-container">
            <div className="filter-group">
                <label htmlFor="category-filter">Filter by Category:</label>
                <select id="category-filter" value={filterCategory} onChange={handleCategoryChange}>
                    {categories.map(category => (
                        <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                    ))}
                </select>
            </div>
            <div className="sort-group">
                <label htmlFor="sort-order">Sort by:</label>
                <select id="sort-order" value={sortOrder} onChange={handleSortChange}>
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>
            </div>
        </div>

      <ProductGrid products={currentProducts} />

      {totalPages > 1 && (
        <div className="pagination-controls">
            <button 
            onClick={handlePrevPage} 
            disabled={currentPage === 1}
            className="pagination-btn"
            >
            Previous
            </button>
            <span className="pagination-indicator">Page {currentPage} of {totalPages}</span>
            <button 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
            className="pagination-btn"
            >
            Next
            </button>
        </div>
      )}
    </div>
  );
};

export default Allproduct;