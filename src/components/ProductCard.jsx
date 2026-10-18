import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  const imageUrl = product.image?.startsWith('http')
    ? product.image
    : `http://localhost:3000/${product.image}`;

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={imageUrl} alt={product.name} />
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
      </Link>
      <p className="price">${product.price.toFixed(2)}</p>
      <p className="stock-info">
  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
