
import { Link } from 'react-router-dom';
import API_BASE_URL from '../api';

function ProductCard({ product, onAddToCart }) {
  const imageUrl = product.image?.startsWith('http')
  ? product.image
  : `${API_BASE_URL}/${(product.image || '').replace(/^\/+/, '')}`;

  const inStock = Number(product.stock) > 0;

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e3e5dc] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        to={`/product/${product.id}`}
        className="block min-w-0 p-3 pb-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102a22]"
      >
        <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-[#f0f3eb]">
          <img
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-3 transition duration-300 hover:scale-105"
            onError={(event) => {
              event.currentTarget.style.visibility = 'hidden';
            }}
          />
        </div>

        <div className="min-w-0 px-1 pt-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#70816f]">
            {product.category}
          </p>

          <h3 className="break-words text-base font-bold leading-snug text-[#102a22] sm:text-lg">
            {product.name}
          </h3>
        </div>
      </Link>

      <div className="mt-auto min-w-0 p-4 pt-3">
        <p className="text-lg font-bold text-[#244d38]">
          KSh {Number(product.price).toLocaleString('en-KE')}
        </p>

        <p
          className={`mt-1 mb-4 text-sm ${
            inStock ? 'text-green-700' : 'text-red-600'
          }`}
        >
          {inStock ? `${product.stock} in stock` : 'Out of stock'}
        </p>

        <button
          type="button"
          disabled={!inStock}
          onClick={() => onAddToCart(product)}
          className="min-h-11 w-full rounded-full bg-[#102a22] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#244d38] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102a22] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
        >
          {inStock ? 'Add to Cart' : 'Currently Unavailable'}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
