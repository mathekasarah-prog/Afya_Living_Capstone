
import ProductCard from './ProductCard';

function ProductList({ products, onAddToCart }) {
  if (!products || products.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-4xl" aria-hidden="true">🌿</p>

        <h2 className="mt-4 text-2xl font-bold text-[#102a22]">
          No products found
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          There are no products to display right now. Please check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;
