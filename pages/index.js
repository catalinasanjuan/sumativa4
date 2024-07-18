import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import ProductList from '../components/productList';

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [logueado, setLogueado] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProductos(data));
  }, []);

  const agregarAlCarrito = (producto) => {
    const existingProduct = carrito.find(item => item.id === producto.id);
    const sameLocation = carrito.every(item => item.location === producto.location);
    const totalQuantity = existingProduct ? existingProduct.cantidad + 1 : 1;

    if (!sameLocation) {
      alert('Todos los productos en el carrito deben ser de la misma ubicación.');
      return;
    }

    if (totalQuantity > producto.availability) {
      alert('No hay suficiente disponibilidad para agregar este producto.');
      return;
    }

    if (existingProduct) {
      setCarrito(carrito.map(item => 
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const modificarCantidad = (id, cantidad) => {
    const producto = productos.find(p => p.id === id);
    if (cantidad > producto.availability) {
      alert('No hay suficiente disponibilidad para esta cantidad.');
      return;
    }
    setCarrito(carrito.map(item => 
      item.id === id ? { ...item, cantidad: cantidad } : item
    ));
  };

  const manejarLogin = () => {
    setLogueado(true);
  };

  const manejarLogout = () => {
    setLogueado(false);
    setUsuario('');
    setContrasena('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Bienvenido a INACAPLudi</h1>
      <p>Explora nuestro catálogo de productos.</p>
      <ProductList products={productos} agregarAlCarrito={agregarAlCarrito} />
      <h2 className="text-2xl font-bold mt-8">Carrito</h2>
      <ul className="list-disc list-inside text-white">
        {carrito.map((producto, index) => (
          <li key={index}>
            {producto.title} - Cantidad: 
            <input 
              type="number" 
              value={producto.cantidad} 
              onChange={(e) => modificarCantidad(producto.id, parseInt(e.target.value))}
              min="1"
              className="bg-gray-800 text-white border border-gray-700 p-1 ml-2"
            />
            <button 
              onClick={() => eliminarDelCarrito(producto.id)}
              className="bg-red-500 text-white p-1 ml-2"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <Script src="/scripts/catalogo.js" strategy="beforeInteractive" />
      <Script src="/scripts/app.js" strategy="afterInteractive" />
    </div>
  );
};

export default Home;
