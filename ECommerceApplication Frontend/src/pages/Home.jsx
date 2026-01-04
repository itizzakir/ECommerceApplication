import React, { useState, useEffect } from 'react';
import HeroCarousel from '../components/home/HeroCarousel';
import CategoryGrid from '../components/home/CategoryGrid';
import ProductGrid from '../components/home/ProductGrid';
import Allproduct from './Allproduct';
import { getAllProducts } from '../services/productService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{textAlign: 'center', padding: '50px'}}>Loading products...</div>;

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
