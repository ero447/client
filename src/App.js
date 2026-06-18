import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 

// Ներմուծում ենք բաղադրիչները
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Product from './pages/Product';

function App() {
  // Սա մեր "զամբյուղի" վիճակն է
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // load persisted state
  useEffect(() => {
    try {
      const raw = localStorage.getItem('aaa_cart');
      if (raw) setCart(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
    try {
      const u = localStorage.getItem('aaa_user');
      if (u) setUser(JSON.parse(u));
    } catch (e) {}
  }, []);

  // persist cart and user
  useEffect(() => {
    try { localStorage.setItem('aaa_cart', JSON.stringify(cart)); } catch (e) {}
  }, [cart]);
  useEffect(() => {
    try { localStorage.setItem('aaa_user', JSON.stringify(user)); } catch (e) {}
  }, [user]);

  // Ֆունկցիա՝ ապրանք ավելացնելու համար
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} ավելացվեց զամբյուղ`);
  };

  // Ֆունկցիա՝ ապրանքը զամբյուղից ջնջելու համար
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Navbar cart={cart} user={user} logout={logout} />
      <main>
        <Routes>
          {/* Գլխավոր էջին փոխանցում ենք addToCart ֆունկցիան */}
          <Route path="/" element={<Home addToCart={addToCart} />} />
          
          {/* Զամբյուղի էջին փոխանցում ենք cart-ը և removeFromCart ֆունկցիան */}
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/product/:id" element={<Product addToCart={addToCart} />} />
          <Route path="/login" element={<Login login={login} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;