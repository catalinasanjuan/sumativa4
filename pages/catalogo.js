import { useEffect, useState } from 'react';
import ProductList from '../components/productList';

export default function Catalogo() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Catálogo de Productos</h1>
      <ProductList products={products} />
    </div>
  );
}
