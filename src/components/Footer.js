import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div>© {new Date().getFullYear()} AutoSound Shop</div>
        <div style={{ color: '#8593a5' }}>Car audio gear and installation-ready sound systems</div>
      </div>
    </footer>
  );
};

export default Footer;
