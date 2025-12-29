import React, { useState } from 'react';
import ProductGrid from '../components/home/ProductGrid';

const Allproduct = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <div>
      <ProductGrid products={currentProducts} />
      <div className="pagination-controls" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
        <button 
          onClick={handlePrevPage} 
          disabled={currentPage === 1}
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: currentPage === 1 ? '#f0f0f0' : '#fff'
          }}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: currentPage === totalPages ? '#f0f0f0' : '#fff'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Allproduct;