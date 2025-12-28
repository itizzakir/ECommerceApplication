import React from 'react';
import HeroCarousel from '../components/home/HeroCarousel';
import CategoryGrid from '../components/home/CategoryGrid';
import ProductGrid from '../components/home/ProductGrid';
import { products } from '../data/products';

const Home = () => {
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
    </main>
  );
};

export default Home;
