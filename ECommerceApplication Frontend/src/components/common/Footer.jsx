import React from 'react';
import './Footer.css';


const Footer = () => {
  return (
    <footer>
      <div className="footer-grid">
        <div className="f-col">
          <div className="logo-box">
            <svg width="24" height="24" viewBox="0 0 50 50" fill="none"><path d="M25 0L46.65 12.5V37.5L25 50L3.35 37.5V12.5L25 0Z" fill="#e11b23"/></svg>
            <span>VELORA</span>
          </div>
          <p>
            Velora is your one-stop fashion destination. We bring you the coolest merch and the latest trends.
          </p>
          <div className="socials">
            <a href="#" className="soc-btn">fb</a>
            <a href="#" className="soc-btn">ig</a>
            <a href="#" className="soc-btn">tw</a>
          </div>
        </div>
        
        <div className="f-col">
          <h4>Shopping</h4>
          <a href="#" className="f-link">Women</a>
          <a href="#" className="f-link">Men</a>
          <a href="#" className="f-link">Accessories</a>
          <a href="#" className="f-link">Sales</a>
        </div>
        
        <div className="f-col">
          <h4>Customer</h4>
          <a href="#" className="f-link">Track Order</a>
          <a href="#" className="f-link">Returns</a>
          <a href="#" className="f-link">FAQs</a>
          <a href="#" className="f-link">Contact Us</a>
        </div>
        
        <div className="f-col">
          <h4>Newsletter</h4>
          <p className="newsletter-p">Subscribe for exclusive updates.</p>
          <div className="search-box newsletter-input">
            <input type="email" placeholder="Your email" />
            <button className="newsletter-button">→</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © 2025 Velora Fashion Pvt Ltd. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;