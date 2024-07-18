import React, { useState, useEffect } from 'react';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(0);
  const [ubicacion, setUbicacion] = useState('');
  const [imagen, setImagen] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProductos(data));
  }, []);

  const agregarProducto = () => {
    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ titulo, descripcion, disponibilidad, ubicacion, imagen })
    }).then(() => {
      setProductos([...productos, { titulo, descripcion, disponibilidad, ubicacion, imagen }]);
      setTitulo('');
      setDescripcion('');
      setDisponibilidad(0);
      setUbicacion('');
      setImagen('');
    });
  };

  const eliminarProducto = (id) => {
    fetch(`/api/products/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setProductos(productos.filter(producto => producto.id !== id));
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Administrar Productos</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Disponibilidad"
          value={disponibilidad}
          onChange={(e) => setDisponibilidad(parseInt(e.target.value))}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={agregarProducto} className="bg-blue-500 text-white p-2">Agregar Producto</button>
      </div>
      <ul className="list-disc list-inside">
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.titulo} - {producto.descripcion} - {producto.disponibilidad} - {producto.ubicacion} - {producto.imagen}
            <button onClick={() => eliminarProducto(producto.id)} className="bg-red-500 text-white p-2 ml-2">Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Productos;
