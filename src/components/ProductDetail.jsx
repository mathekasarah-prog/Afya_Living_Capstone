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

  if (loading)
    return (
      <p className="mx-auto max-w-6xl px-4 py-16 text-center text-gray-600">
        Loading product...
      </p>
    );

  if (error)
    return (
      <p className="mx-auto max-w-6xl px-4 py-16 text-center text-red-600">
        Error: {error}
      </p>
    );

  const imageUrl = product.image?.startsWith('http')
    ? product.image
    : `http://localhost:3000/${product.image}`;

  const outOfStock = product.stock === 0;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#102a22] transition hover:text-[#708c63]"
      >
        <span aria-hidden="true">←</span> Back to shop
      </Link>

      <div className="grid gap-8 overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-2 md:gap-12 md:p-8">
        <div className="overflow-hidden rounded-2xl bg-[#f7f4ee]">
          <img
            src={imageUrl}
            alt={product.name}
            className="aspect-square h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="w-fit rounded-full bg-[#eef2ea] px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-[#708c63]">
            {product.category}
          </span>
          {product.badge && (
          <span className="w-fit rounded-full bg-[#708c63] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
           {product.badge}
          </span>
         )}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#102a22] sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <span className="text-amber-500">★</span>
            <span className="font-semibold text-[#102a22]">{product.rating}</span>
            <span>({product.reviews} reviews)</span>
          </div>

          <p className="mt-6 text-3xl font-bold text-[#102a22]">
            Ksh{product.price.toFixed(2)}
          </p>

          {product.stock > 0 && product.stock <= 5 && (
         <p className="mt-2 text-sm font-medium text-amber-600">Only {product.stock} left</p>
         )}

          <p className="mt-4 leading-7 text-gray-600">{product.description}</p>

          <button
            onClick={() => onAddToCart(product)}
            disabled={outOfStock}
            className="mt-8 w-full rounded-full bg-[#102a22] px-8 py-3.5 text-base font-semibold text-white transition hover:bg-[#1b4033] focus:outline-none focus:ring-2 focus:ring-[#708c63] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 sm:w-auto"
          >
            {outOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;