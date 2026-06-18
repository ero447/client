import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sampleProducts from '../data/products';

const Home = ({ addToCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(res => setProducts(res.data))
            .catch(err => {
                console.error("Սխալ տվյալները ստանալիս:", err);
                // Fallback to local sample data when backend is not running
                setProducts(sampleProducts);
            });
    }, []);

    return (
        <div className="home-container container">
            <div className="hero">
                    <h1>Ապրանքների ցանկ</h1>
                    <p style={{ color: '#375a7f' }}>Ընտրեք արտադրանքը և ավելացրեք զամբյուղ</p>
                    <div style={{ marginTop: 12 }}>
                        <a href="#products" className="cta-button">Shop Now</a>
                    </div>
                </div>
            <div className="product-grid">
                {products.map(product => (
                        <div key={product._id} className="product-card">
                            {products.indexOf(product) === 0 && <div style={{ position: 'absolute', margin: 12 }}><span className="badge">Featured</span></div>}
                            <a href={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <img src={product.image || 'https://via.placeholder.com/300x160?text=Product'} alt={product.name} />
                                <h3>{product.name}</h3>
                            </a>
                            <p style={{ color: '#555', minHeight: 36 }}>{product.description ? product.description.slice(0, 80) + (product.description.length > 80 ? '...' : '') : ''}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontWeight: 700 }}>{product.price} դրամ</div>
                                <button
                                    className="add-button"
                                    onClick={() => addToCart(product)}
                                >
                                    Ավելացնել
                                </button>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    );
};

export default Home;