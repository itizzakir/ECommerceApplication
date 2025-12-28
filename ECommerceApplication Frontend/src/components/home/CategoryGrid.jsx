import React from 'react';
import './CategoryGrid.css';


const categories = [
  { name: "Women", img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop" },
  { name: "Men", img: "https://images.unsplash.com/photo-1617137968427-b28d445f18bf?q=80&w=800&auto=format&fit=crop" },
  { name: "Sneakers", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop" },
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