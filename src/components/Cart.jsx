import { Link } from 'react-router-dom';
import CartItem from './CartItem';

function Cart({ items, onClose, onRemove, onUpdateQuantity }) {
  const safeItems = items ?? [];

  const total = safeItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const itemCount = safeItems.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );

  return (
    <aside
      className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-md flex-col border-l border-[#e3e5dc] bg-white shadow-2xl"
      aria-label="Shopping cart"
    >
      {/* Cart header */}
      <div className="flex items-center justify-between border-b border-[#e3e5dc] px-5 py-5 sm:px-6">
        <div>
          <h2 className="text-xl font-bold text-[#102a22]">
            Your Cart
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your bag
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close shopping cart"
          className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-gray-600 transition hover:bg-[#f0f3eb] hover:text-[#102a22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102a22]"
        >
          ✕
        </button>
      </div>

      {/* Cart contents */}
      <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
        {safeItems.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center text-center">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f3eb] text-3xl"
              aria-hidden="true"
            >
              🛍️
            </span>

            <h3 className="mt-5 text-lg font-bold text-[#102a22]">
              Your cart is waiting
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
              You haven't added any self-care favourites yet. Explore our
              collection and find something you love.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-[#102a22] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#244d38]"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {safeItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={onRemove}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>
        )}
      </div>

      {/* Cart total and checkout */}
      {safeItems.length > 0 && (
        <div className="border-t border-[#e3e5dc] bg-[#fafbf8] px-5 py-5 sm:px-6">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium text-gray-600">
              Subtotal
            </span>
            <span className="text-xl font-bold text-[#102a22]">
              KSh {total.toLocaleString('en-KE')}
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            Delivery charges, if applicable, are confirmed at checkout.
          </p>

          <Link
            to="/checkout"
            onClick={onClose}
            className="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-[#102a22] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#244d38] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102a22]"
          >
            Proceed to Checkout
            <span className="ml-2" aria-hidden="true">→</span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="mt-3 w-full py-2 text-sm font-semibold text-[#526358] transition hover:text-[#102a22]"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </aside>
  );
}

export default Cart;
