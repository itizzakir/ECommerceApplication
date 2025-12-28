import React, { useState, useEffect } from 'react';
import './HeroCarousel.css';


const slides = [
  {
    id: 1,
    img: "/carousel/Crousel_1.jpg",
    title: "Winter Collection",
    sub: "Stay Cozy and Stylish",
    btn: "Shop Now"
  },
  {
    id: 2,
    img: "/carousel/image copy 2.png",
    title: "Urban Style",
    sub: "Elevate Your Streetwear",
    btn: "Explore More"
  },
  {
    id: 3,
    img: "/carousel/image copy 3.png",
    title: "Accessories Galore",
    sub: "Find Your Perfect Match",
    btn: "Discover Now"
  },
  {
    id: 4,
    img: "/carousel/image copy 4.png",
    title: "New Arrivals",
    sub: "Fresh Styles Just Dropped",
    btn: "View All"
  },
  {
    id: 5,
    img: "/carousel/image copy 5.png",
    title: "Limited Edition",
    sub: "Don't Miss Out!",
    btn: "Get Yours"
  },
  {
    id: 6,
    img: "/carousel/image copy.png",
    title: "Seasonal Picks",
    sub: "Curated Just For You",
    btn: "Shop the Look"
  },
  {
    id: 7,
    img: "/carousel/image.png",
    title: "Exclusive Offers",
    sub: "Unbeatable Deals Await",
    btn: "Grab Now"
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