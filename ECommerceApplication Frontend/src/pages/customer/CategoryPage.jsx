import React from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../../components/home/ProductGrid';
import { products } from '../../data/products';

const CategoryPage = () => {
  const { categoryName } = useParams();

  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="page-container" style={{padding: '2rem'}}>
      <h1 style={{textTransform: 'capitalize', marginBottom: '2rem'}}>{categoryName}</h1>
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
