import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cart = [], user = null, logout = () => {} }) => {
    const count = Array.isArray(cart) ? cart.length : 0;

    return (
        <header className="app-navbar">
            <div className="container nav-inner">
                <div style={{ fontWeight: '700', color: '#fff' }}>
                    <Link to="/">AAA Shop</Link>
                </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div className="search-wrapper" style={{ marginRight: 6 }}>
                                <input className="search-input" placeholder="Search products..." />
                                <button className="search-button" aria-label="search">🔍</button>
                            </div>
                            <Link to="/">Home</Link>
                            <Link to="/cart">Cart ({count})</Link>
                            {user ? (
                                <>
                                    <span style={{ marginLeft: 12, color: '#fff' }}>Hi, {user.name}</span>
                                    <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} style={{ marginLeft: 10, color: '#fff' }}>Logout</a>
                                </>
                            ) : (
                                <Link to="/login">Login</Link>
                            )}
                        </div>
            </div>
        </header>
    );
};

export default Navbar;