import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
      })
      .then((data) => {
        const found = data.find((p) => String(p.id) === id);
        if (!found) throw new Error('Product not found');
        setProduct(found);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error: {error}</p>;

  const imageUrl = product.image?.startsWith('http')
    ? product.image
    : `http://localhost:3000/${product.image}`;

  return (
    <div className="product-detail">
      <Link to="/" className="back-link">← Back to shop</Link>
      <div className="product-detail-content">
        <img src={imageUrl} alt={product.name} />
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="category">{product.category}</p>
          <p className="rating">★ {product.rating} ({product.reviews} reviews)</p>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>
          <button onClick={() => onAddToCart(product)} disabled={product.stock === 0}>
  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
</button>
          <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;