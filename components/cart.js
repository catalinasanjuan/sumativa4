
import { useState, useEffect } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }];
      setCart(newCart);
      sessionStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    sessionStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateQuantity = (productId, quantity) => {
    const newCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: parseInt(quantity) } : item
    );
    setCart(newCart);
    sessionStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <h3>{item.title}</h3>
          <p>Cantidad: <input type="number" value={item.quantity} onChange={(e) => updateQuantity(item.id, e.target.value)} /></p>
          <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default cart;
