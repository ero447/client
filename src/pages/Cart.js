import React from 'react';
import axios from 'axios'; // Այս import-ը պարտադիր է

const Cart = ({ cart, removeFromCart }) => {
    
    // Ստուգում ենք՝ արդյոք cart-ը գոյություն ունի և դատարկ չէ
    // Սա կկանխի 'Cannot read properties of undefined (reading 'reduce')' սխալը
    const cartItems = cart || []; 
    
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handleCheckout = async () => {
        try {
            const order = { items: cartItems.map(item => ({ productId: item._id, name: item.name, price: item.price })), total };
            await axios.post('/api/orders', order);
            alert("Պատվերը հաջողությամբ ընդունվեց։");
        } catch (err) {
            console.error(err);
            alert('Սխալ պատվիրելու ժամանակ');
        }
    };
    return (
        <div className="cart-container">
            <h1>Ձեր զամբյուղը</h1>

            {cartItems.length === 0 ? (
                <p>Զամբյուղը դատարկ է։</p>
            ) : (
                <div>
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div>
                                <div style={{ fontWeight: 600 }}>{item.name}</div>
                                <div style={{ color: '#666' }}>{item.price} դրամ</div>
                            </div>
                            <div>
                                <button
                                    className="delete-button"
                                    onClick={() => removeFromCart(item._id)}
                                >
                                    Ջնջել
                                </button>
                            </div>
                        </div>
                    ))}
                    <div style={{ marginTop: '20px', fontWeight: 'bold', textAlign: 'right' }}>
                        Ընդհանուր՝ {total} դրամ
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <button onClick={handleCheckout} className="checkout-button">
                            Պատվիրել
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;