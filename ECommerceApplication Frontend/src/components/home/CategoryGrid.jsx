import React from 'react';
import './CategoryGrid.css';


const categories = [
  { name: "Women", img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop" },
  { name: "Men", img: "https://media.istockphoto.com/id/638385938/photo/mens-accessories-organized-on-table-in-knolling-arrangement.jpg?s=1024x1024&w=is&k=20&c=aAaS6nUS2TNJekCeaAYEag4oQqMzPp2QZkGltvq9bvY=" },
  { name: "Cosmetics", img: "https://media.istockphoto.com/id/1296705483/photo/make-up-products-prsented-on-white-podiums-on-pink-pastel-background.jpg?s=612x612&w=0&k=20&c=j3Vfpo81L5I2g0uJ5tArBC3l_fcPtPAcLzzT4pq5BLY=" },
  { name: "Accessories", img: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=800&auto=format&fit=crop" }
];

const CategoryGrid = () => {
  return (
    <section className="section-container">
      <div className="section-header">
        <h2>Shop By Category</h2>
        <p>Explore the best fits for your vibe</p>
      </div>
      <div className="cat-grid">
        {categories.map((cat, idx) => (
          <div key={idx} className="cat-card">
            <img src={cat.img} alt={cat.name} />
            <div className="cat-info">{cat.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;