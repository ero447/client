import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Product = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError('Ապրանքը չի գտնվել');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="container" style={{ padding: 24 }}>Loading...</div>;
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: 24 }}>
        <p>{error || 'Ապրանքը չի գտնվել'}</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <img loading="lazy" src={product.image || 'https://via.placeholder.com/800x480?text=No+Image'} alt={product.name} style={{ width: '100%', maxHeight: 480, objectFit: 'contain', borderRadius: 8 }} onError={(e)=>{e.target.onerror=null; e.target.src='https://via.placeholder.com/800x480?text=No+Image'}} />
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
