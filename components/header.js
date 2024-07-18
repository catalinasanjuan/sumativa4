import Image from 'next/image';

const Header = ({ usuario, contrasena, setUsuario, setContrasena, manejarLogin, manejarLogout, logueado }) => {
  return (
    <header className="flex justify-between items-center p-5 bg-gray-900">
      <div className="flex items-center">
        <Image
          src="/assets/Logo.png"
          alt="INACAPLudi Logo"
          width={50}
          height={50}
        />
        <span className="ml-2 text-2xl text-white">INACAPLudi MarketPlace</span>
      </div>
      <nav>
        <ul className="flex list-none p-0">
          <li className="mr-5"><a href="/catalogo" className="text-white no-underline">Catálogo</a></li>
          <li className="mr-5"><a href="/carrito" className="text-white no-underline">Carrito</a></li>
          <li className="mr-5"><a href="/admin/usuarios" className="text-white no-underline">Administrar Usuarios</a></li>
          <li className="mr-5"><a href="/admin/productos" className="text-white no-underline">Administrar Productos</a></li>
        </ul>
      </nav>
      <div className="flex items-center">
        {!logueado ? (
          <>
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="mr-2 p-2 rounded border border-gray-300"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="mr-2 p-2 rounded border border-gray-300"
            />
            <button onClick={manejarLogin} className="bg-blue-500 text-white p-2 rounded">Acceso</button>
          </>
        ) : (
          <>
            <p className="mr-2">Bienvenido, {usuario}</p>
            <button onClick={manejarLogout} className="bg-red-500 text-white p-2 rounded">Cerrar sesión</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
