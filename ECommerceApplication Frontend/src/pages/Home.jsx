import React, { useState } from 'react';
import HeroCarousel from '../components/home/HeroCarousel';
import CategoryGrid from '../components/home/CategoryGrid';
import ProductGrid from '../components/home/ProductGrid';
import { products } from '../data/products';
import Allproduct from './Allproduct';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <main>
      <HeroCarousel />
      <CategoryGrid />
      <section className="section-container" style={{background: '#fafafa', borderRadius: '20px'}}>
        <div className="section-header">
          <h2>New Arrivals</h2>
          <p>Fresh from the design lab</p>
        </div>
        <ProductGrid products={products.slice(0, 8)} />
      </section>

      <section className="section-container">
        <div className="section-header">
          <h2>All Products</h2>
          <p>Check out all our products</p>
        </div>
        <Allproduct products={products} />
      </section>
    </main>
  );
};

export default Home;
