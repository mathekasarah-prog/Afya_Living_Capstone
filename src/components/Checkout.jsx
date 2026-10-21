import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';

function Checkout({ cart, onOrderComplete }) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const safeCart = cart ?? [];

  const total = safeCart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (safeCart.length === 0) {
      setError('Your cart is empty. Please add products before checking out.');
      return;
    }

    if (!name.trim() || !phone.trim()) {
      setError('Please enter your full name and phone number.');
      return;
    }

    if (deliveryMethod === 'delivery' && !address.trim()) {
      setError('Please enter your delivery address.');
      return;
    }

    const orderCart = safeCart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: item.quantity,
    }));

    setSubmitting(true);

    try {
      const data = await apiRequest('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          deliveryMethod,
          paymentMethod,
          address: deliveryMethod === 'delivery' ? address.trim() : null,
          cart: orderCart,
        }),
      });

      onOrderComplete();
      navigate(`/order-confirmation/${data.orderId}`);
    } catch (err) {
      setError(
        err.message || 'Unable to connect to the server. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Show a helpful empty-cart screen.
  if (safeCart.length === 0) {
    return (
      <main className="min-h-[70vh] bg-[#fafbf8] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-lg rounded-2xl border border-[#e3e5dc] bg-white p-8 text-center shadow-sm">
          <span className="text-4xl" aria-hidden="true">🛍️</span>

          <h1 className="mt-4 text-2xl font-bold text-[#102a22]">
            Your cart is empty
          </h1>

          <p className="mt-3 leading-7 text-gray-600">
            Add your favourite self-care products before proceeding to checkout.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#102a22] px-6 py-3 font-semibold text-white transition hover:bg-[#244d38]"
          >
            Explore Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafbf8] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        {/* Page heading */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#708c63]">
            Almost yours
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#102a22] sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
            Enter your details so we can prepare your Afya Living order.
          </p>
        </div>

        <div className="grid min-w-0 grid-cols-1 items-start gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
          {/* Checkout form */}
          <section className="min-w-0 rounded-2xl border border-[#e3e5dc] bg-white p-5 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-[#102a22]">Your details</h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Please provide accurate contact information for your order.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Full name */}
              <div>
                <label
                  htmlFor="checkout-name"
                  className="mb-2 block text-sm font-semibold text-[#102a22]"
                >
                  Full name
                </label>

                <input
                  id="checkout-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="min-h-12 w-full min-w-0 rounded-xl border border-[#d5ddcf] bg-white px-4 py-3 text-base text-[#102a22] outline-none transition placeholder:text-gray-400 focus:border-[#708c63] focus:ring-2 focus:ring-[#e4eadc]"
                />
              </div>

              {/* Phone number */}
              <div>
                <label
                  htmlFor="checkout-phone"
                  className="mb-2 block text-sm font-semibold text-[#102a22]"
                >
                  Phone number
                </label>

                <input
                  id="checkout-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Enter your phone number"
                  required
                  className="min-h-12 w-full min-w-0 rounded-xl border border-[#d5ddcf] bg-white px-4 py-3 text-base text-[#102a22] outline-none transition placeholder:text-gray-400 focus:border-[#708c63] focus:ring-2 focus:ring-[#e4eadc]"
                />
              </div>

              {/* Delivery method */}
              <fieldset>
                <legend className="mb-3 text-sm font-semibold text-[#102a22]">
                  How would you like to receive your order?
                </legend>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                      deliveryMethod === 'pickup'
                        ? 'border-[#708c63] bg-[#f0f3eb]'
                        : 'border-[#e3e5dc] hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={deliveryMethod === 'pickup'}
                      onChange={(event) => setDeliveryMethod(event.target.value)}
                      className="mt-1 accent-[#244d38]"
                    />

                    <span>
                      <span className="block font-semibold text-[#102a22]">
                        Store pickup
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        Collect your order
                      </span>
                    </span>
                  </label>

                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                      deliveryMethod === 'delivery'
                        ? 'border-[#708c63] bg-[#f0f3eb]'
                        : 'border-[#e3e5dc] hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="delivery"
                      checked={deliveryMethod === 'delivery'}
                      onChange={(event) => setDeliveryMethod(event.target.value)}
                      className="mt-1 accent-[#244d38]"
                    />

                    <span>
                      <span className="block font-semibold text-[#102a22]">
                        Delivery
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        Deliver to your address
                      </span>
                    </span>
                  </label>
                </div>
              </fieldset>

              {/* Delivery address (only for delivery) */}
              {deliveryMethod === 'delivery' && (
                <div>
                  <label
                    htmlFor="checkout-address"
                    className="mb-2 block text-sm font-semibold text-[#102a22]"
                  >
                    Delivery address
                  </label>

                  <textarea
                    id="checkout-address"
                    autoComplete="street-address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Enter your full delivery address"
                    required
                    rows={3}
                    className="w-full min-w-0 resize-y rounded-xl border border-[#d5ddcf] bg-white px-4 py-3 text-base text-[#102a22] outline-none transition placeholder:text-gray-400 focus:border-[#708c63] focus:ring-2 focus:ring-[#e4eadc]"
                  />
                </div>
              )}

              {/* Payment method (always shown) */}
              <fieldset>
                <legend className="mb-3 text-sm font-semibold text-[#102a22]">
                  Payment method
                </legend>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                      paymentMethod === 'mpesa'
                        ? 'border-[#708c63] bg-[#f0f3eb]'
                        : 'border-[#e3e5dc] hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mpesa"
                      checked={paymentMethod === 'mpesa'}
                      onChange={(event) => setPaymentMethod(event.target.value)}
                      className="mt-1 accent-[#244d38]"
                    />

                    <span>
                      <span className="block font-semibold text-[#102a22]">
                        M-Pesa
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        Pay using M-Pesa instructions provided after ordering.
                      </span>
                    </span>
                  </label>

                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-[#708c63] bg-[#f0f3eb]'
                        : 'border-[#e3e5dc] hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={(event) => setPaymentMethod(event.target.value)}
                      className="mt-1 accent-[#244d38]"
                    />

                    <span>
                      <span className="block font-semibold text-[#102a22]">
                        Bank transfer
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        Bank payment instructions will be provided after ordering.
                      </span>
                    </span>
                  </label>
                </div>
              </fieldset>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex min-h-12 w-full items-center justify-center rounded-full bg-[#102a22] px-6 py-3 font-semibold text-white transition hover:bg-[#244d38] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102a22] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Placing your order…' : 'Place Order'}
              </button>

              <p className="text-center text-xs leading-5 text-gray-500">
                Please check your details before placing your order.
              </p>
            </form>
          </section>

          {/* Order summary */}
          <aside className="min-w-0 rounded-2xl border border-[#e3e5dc] bg-white p-5 shadow-sm sm:p-8 lg:sticky lg:top-28">
            <h2 className="text-xl font-bold text-[#102a22]">Order summary</h2>

            <p className="mt-2 text-sm text-gray-500">
              {safeCart.length} {safeCart.length === 1 ? 'product' : 'products'}
            </p>

            <div className="mt-6 divide-y divide-[#edf0e9]">
              {safeCart.map((item) => (
                <div
                  key={item.id}
                  className="flex min-w-0 items-start justify-between gap-4 py-4 first:pt-0"
                >
                  <div className="min-w-0">
                    <p className="break-words text-sm font-semibold leading-6 text-[#102a22]">
                      {item.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-[#244d38]">
                    KSh{' '}
                    {(Number(item.price) * Number(item.quantity)).toLocaleString('en-KE')}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-[#e3e5dc] pt-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-gray-600">Subtotal</span>

                <span className="text-xl font-bold text-[#102a22]">
                  KSh {total.toLocaleString('en-KE')}
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-gray-500">
                Any delivery charges should be confirmed before the order is fulfilled.
              </p>
            </div>

            <Link
              to="/"
              className="mt-6 inline-flex text-sm font-semibold text-[#526f4b] hover:text-[#102a22]"
            >
              ← Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
