import React, { useState } from 'react';

const Login = ({ login }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) return alert('Խնդրում ենք ներմուծել անունը');
        // Very small client-side auth simulation
        login({ name });
    };

    return (
        <div className="container" style={{ maxWidth: 480, marginTop: 32 }}>
            <div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <h2>Մուտք</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 12 }}>
                        <label style={{ display: 'block', marginBottom: 6 }}>Անուն</label>
                        <input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd' }} />
                    </div>
                    <button type="submit" className="checkout-button">Մուտք</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
