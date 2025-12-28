import React, { useState, useEffect } from 'react';
import './HeroCarousel.css';


const slides = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1544261482-15f5c6676ddc?q=80&w=1920&auto=format&fit=crop",
    title: "'Tis The Season",
    sub: "THE WINTER EDIT 2025 IS HERE",
    btn: "Shop Collection"
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1523396870717-816a21028c71?q=80&w=1920&auto=format&fit=crop",
    title: "Urban Drift",
    sub: "OVERSIZED TEES & CARGO PANTS",
    btn: "View Drops"
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1485230946086-1d99dcc33d7b?q=80&w=1920&auto=format&fit=crop",
    title: "Accessory Lab",
    sub: "COMPLETE YOUR LOOK",
    btn: "Shop Now"
  }
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  // Auto-play effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <div className="carousel-container">
      {slides.map((slide, index) => (
        <div key={slide.id} className={`carousel-slide ${index === current ? 'active' : ''}`}>
          <img src={slide.img} alt={slide.title} />
          <div className="hero-text">
            <h1 className="hero-title">{slide.title}</h1>
            <p className="hero-sub">{slide.sub}</p>
            <button className="hero-btn">{slide.btn}</button>
          </div>
        </div>
      ))}

      <div className="carousel-control prev" onClick={prevSlide}>&#10094;</div>
      <div className="carousel-control next" onClick={nextSlide}>&#10095;</div>

      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === current ? 'active' : ''}`} 
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;