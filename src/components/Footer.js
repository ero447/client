import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div>© {new Date().getFullYear()} AAA Shop</div>
        <div style={{ color: '#8593a5' }}>Built with care · Simple demo store</div>
      </div>
    </footer>
  );
};

export default Footer;
