import React from 'react';
import { useParams } from 'react-router-dom';
import sampleProducts from '../data/products';

const Product = ({ addToCart }) => {
  const { id } = useParams();
  const product = sampleProducts.find(p => p._id === id) || { name: 'Անհայտ ապրանք', price: 0, image: 'https://via.placeholder.com/300x160?text=No+Image', description: '' };

  return (
    <div className="container" style={{ padding: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 8 }} />
        </div>
        <div>
          <h2>{product.name}</h2>
          <p style={{ color: '#475569' }}>{product.description || 'No description available.'}</p>
          <div style={{ fontWeight: 700, marginTop: 12 }}>{product.price} դրամ</div>
          <div style={{ marginTop: 16 }}>
            <button className="add-button" onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
