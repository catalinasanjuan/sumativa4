const ProductList = ({ products, agregarAlCarrito }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded shadow">
          <img src={`/assets/${product.image}`} alt={product.title} className="w-full h-auto mb-4 rounded" />
          <h2 className="text-xl font-bold text-black">{product.title}</h2>
          <p className="text-black">{product.description}</p>
          <p className="text-black">Disponibilidad: {product.availability}</p>
          <p className="text-black">Ubicación: {product.location}</p>
          <button
            onClick={() => agregarAlCarrito(product)}
            className="bg-blue-500 text-white p-2 mt-2"
          >
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
