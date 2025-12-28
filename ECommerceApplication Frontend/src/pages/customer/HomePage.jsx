import React from 'react';
import HeroCarousel from '../../components/home/HeroCarousel';
import CategoryGrid from '../../components/home/CategoryGrid';
import ProductGrid from '../../components/home/ProductGrid';

const HomePage = () => {
  return (
    <main>
      <HeroCarousel />
      <CategoryGrid />
      <ProductGrid />
    </main>
  );
};

export default HomePage;