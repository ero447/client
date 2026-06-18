import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sampleProducts from '../data/products';

const Home = ({ addToCart, searchTerm }) => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get('/api/products', {
                    params: searchTerm ? { search: searchTerm } : {}
                });
                const items = (res.data && res.data.length) ? res.data : sampleProducts;
                setProducts(items);
            } catch (err) {
                console.error('Սխալ տվյալները ստանալիս:', err);
                setError('Cannot reach backend, using local sample products.');
                const query = (searchTerm || '').toLowerCase();
                setProducts(sampleProducts.filter(product => {
                    return (
                        product.name.toLowerCase().includes(query) ||
                        product.description.toLowerCase().includes(query) ||
                        product.category.toLowerCase().includes(query)
                    );
                }));
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchTerm]);

    const categories = ['All', ...Array.from(new Set(products.map(p => p.category || 'Other'))).sort()];
    const featuredProducts = products.filter(product => product.featured).slice(0, 4);
    const visibleProducts = products.filter(product => selectedCategory === 'All' || product.category === selectedCategory);

    return (
        <div className="home-container container">
            <div className="hero">
                <h1>Car Audio & Autosound Store</h1>
                <p style={{ color: '#375a7f' }}>Upgrade your ride with premium speakers, amps and subwoofers</p>
                <div style={{ marginTop: 12 }}>
                    <a href="#products" className="cta-button">Browse Sound Gear</a>
                </div>
            </div>

            <section style={{ marginTop: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                        <h2 style={{ margin: 0 }}>Featured products</h2>
                        <p style={{ color: '#556', margin: 0 }}>Quick access to popular items</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {categories.slice(0, 4).map(cat => (
                            <button
                                key={cat}
                                className={`category-button ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="featured-grid" style={{ marginTop: 20 }}>
                        {featuredProducts.length > 0 ? featuredProducts.map(product => (
                        <div key={product._id} className="product-card featured-card">
                            <div style={{ position: 'absolute', margin: 12 }}><span className="badge">Featured</span></div>
                            <a href={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <img loading="lazy" src={product.image || 'https://via.placeholder.com/600x400?text=No+Image'} alt={product.name} style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 8 }} onError={(e)=>{e.target.onerror=null; e.target.src='https://via.placeholder.com/600x400?text=No+Image'}} />
                                <h3>{product.name}</h3>
                            </a>
                            <p style={{ color: '#555', minHeight: 36 }}>{product.description ? `${product.description.slice(0, 80)}${product.description.length > 80 ? '...' : ''}` : ''}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontWeight: 700 }}>{product.price.toLocaleString()} դրամ</div>
                                <button className="add-button" onClick={() => addToCart(product)}>Ավելացնել</button>
                            </div>
                        </div>
                    )) : (
                            <p>No featured products available right now.</p>
                        )}
                    </div>
            </section>

            <section style={{ marginTop: 40 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                        <h2 style={{ margin: 0 }}>All products</h2>
                        <p style={{ color: '#556', margin: 0 }}>Browse by category and search results</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`category-button ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                {loading && <p>Loading products...</p>}
                {error && <p style={{ color: '#c00' }}>{error}</p>}
                <div id="products" className="product-grid" style={{ marginTop: 16 }}>
                    {visibleProducts.length > 0 ? visibleProducts.map(product => (
                        <div key={product._id} className="product-card">
                            {product.featured && <div style={{ position: 'absolute', margin: 12 }}><span className="badge">Featured</span></div>}
                            <a href={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <img loading="lazy" src={product.image || 'https://via.placeholder.com/600x400?text=No+Image'} alt={product.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8 }} onError={(e)=>{e.target.onerror=null; e.target.src='https://via.placeholder.com/600x400?text=No+Image'}} />
                                <h3>{product.name}</h3>
                            </a>
                            <p style={{ color: '#555', minHeight: 36 }}>{product.description ? `${product.description.slice(0, 80)}${product.description.length > 80 ? '...' : ''}` : ''}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontWeight: 700 }}>{product.price.toLocaleString()} դրամ</div>
                                <button className="add-button" onClick={() => addToCart(product)}>Ավելացնել</button>
                            </div>
                        </div>
                    )) : (
                        <p>No products match your search or filter.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;