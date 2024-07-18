import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsuarios(data));
  }, []);

  const agregarUsuario = () => {
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, email, contrasena })
    }).then(() => {
      setUsuarios([...usuarios, { nombre, email, contrasena }]);
      setNombre('');
      setEmail('');
      setContrasena('');
    });
  };

  const eliminarUsuario = (id) => {
    fetch(`/api/users/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    });
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Administrar Usuarios</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-2 mr-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mr-2"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="border p-2 mr-2"
          />
          <button onClick={agregarUsuario} className="bg-blue-500 text-white p-2">Agregar Usuario</button>
        </div>
        <ul className="list-disc list-inside">
          {usuarios.map((usuario) => (
            <li key={usuario.id} className="flex items-center">
              {usuario.nombre} - {usuario.email}
              <button onClick={() => eliminarUsuario(usuario.id)} className="bg-red-500 text-white p-2 ml-2">Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Usuarios;
