import API_BASE_URL from '../api';

function CartItem({ item, onRemove, onUpdateQuantity }) {
  const imageUrl = item.image?.startsWith('http')
  ? item.image
  : `${API_BASE_URL}/${(item.image || '').replace(/^\/+/, '')}`;

  return (
    <article className="flex min-w-0 gap-3 rounded-xl border border-[#e3e5dc] bg-white p-3 sm:gap-4">
      {/* Product image */}
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#f0f3eb] sm:h-24 sm:w-24">
        <img
          src={imageUrl}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-contain p-2"
          onError={(event) => {
            event.currentTarget.style.visibility = 'hidden';
          }}
        />
      </div>

      {/* Product information */}
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="break-words text-sm font-semibold leading-5 text-[#102a22] sm:text-base">
          {item.name}
        </h3>

        <p className="mt-1 text-sm font-bold text-[#526f4b]">
          KSh {Number(item.price).toLocaleString('en-KE')}
        </p>
        {/* Quantity controls */}
        <div className="mt-auto flex items-center gap-3 pt-3">
          <div className="inline-flex items-center rounded-full border border-[#dce2d5]">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label={`Decrease quantity of ${item.name}`}
              className="flex h-9 w-9 items-center justify-center rounded-l-full text-lg text-[#102a22] transition hover:bg-[#f0f3eb] disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>

            <span
              className="min-w-8 text-center text-sm font-semibold text-[#102a22]"
              aria-live="polite"
            >
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              aria-label={`Increase quantity of ${item.name}`}
              className="flex h-9 w-9 items-center justify-center rounded-r-full text-lg text-[#102a22] transition hover:bg-[#f0f3eb]"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.name} from cart`}
            className="ml-auto rounded-lg px-2 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
