
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../api';

function Admin({ user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      if (!user?.isAdmin) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await apiRequest('/api/products');

        if (!Array.isArray(data)) {
          throw new Error('The products API returned an unexpected response.');
        }

        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [user?.isAdmin]);

  if (!user?.isAdmin) {
    return (
      <main className="min-h-[60vh] bg-[#fafbf8] px-4 py-16">
        <section className="mx-auto max-w-lg rounded-2xl border border-[#e3e5dc] bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-[#102a22]">
            Admin access required
          </h1>
          <p className="mt-3 leading-7 text-gray-600">
            Sign in with an authorized administrator account to manage inventory.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-flex rounded-full bg-[#102a22] px-6 py-3 font-semibold text-white hover:bg-[#244d38]"
          >
            Log in
          </Link>
        </section>
      </main>
    );
  }

  function handleStockChange(id, value) {
    setProducts((previous) =>
      previous.map((product) =>
        product.id === id
          ? { ...product, stock: value === '' ? '' : value }
          : product
      )
    );
    setMessage(null);
  }

  async function handleSave(product) {
    const stock = Number(product.stock);

    if (
      product.stock === '' ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      setMessage({
        type: 'error',
        text: 'Stock must be a whole number of zero or more.',
      });
      return;
    }

    setSavingId(product.id);
    setMessage(null);

    try {
      await apiRequest(`/api/products/${product.id}/stock`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ stock }),
      });

      setProducts((previous) =>
        previous.map((item) =>
          item.id === product.id ? { ...item, stock } : item
        )
      );

      setMessage({
        type: 'success',
        text: `${product.name} stock updated successfully.`,
      });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSavingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#fafbf8] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#708c63]">
          Store management
        </p>
        <h1 className="mt-2 text-3xl font-bold text-[#102a22] sm:text-4xl">
          Inventory
        </h1>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          Review your products and update available stock.
        </p>

        {message && (
          <p
            role="status"
            className={`mt-5 rounded-xl p-4 text-sm ${
              message.type === 'error'
                ? 'bg-red-50 text-red-700'
                : 'bg-green-50 text-green-800'
            }`}
          >
            {message.text}
          </p>
        )}

        {loading ? (
          <p className="mt-8 text-gray-600">Loading inventory…</p>
        ) : error ? (
          <div role="alert" className="mt-8 rounded-xl bg-red-50 p-4 text-red-700">
            Could not load products: {error}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="ml-3 font-semibold underline"
            >
              Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          <p className="mt-8 rounded-xl border border-[#e3e5dc] bg-white p-6 text-gray-600">
            No products were found.
          </p>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#e3e5dc] bg-white shadow-sm">
            <table className="w-full min-w-[650px] border-collapse text-left text-sm">
              <thead className="bg-[#f0f3eb] text-[#102a22]">
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold">Product</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Category</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Price</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Stock</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf0e9]">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-[#fafbf8]">
                    <td className="px-5 py-4 font-semibold text-[#102a22]">
                      {product.name}
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-5 py-4 text-gray-700">
                      KSh {Number(product.price).toLocaleString('en-KE')}
                    </td>
                    <td className="px-5 py-4">
                      <label className="sr-only" htmlFor={`stock-${product.id}`}>
                        Stock for {product.name}
                      </label>
                      <input
                        id={`stock-${product.id}`}
                        type="number"
                        min="0"
                        step="1"
                        value={product.stock ?? 0}
                        onChange={(event) =>
                          handleStockChange(product.id, event.target.value)
                        }
                        className="min-h-10 w-24 rounded-lg border border-[#d5ddcf] px-3 outline-none focus:border-[#708c63] focus:ring-2 focus:ring-[#e4eadc]"
                      />
                    </td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => handleSave(product)}
                        disabled={savingId !== null}
                        className="min-h-10 rounded-full bg-[#102a22] px-4 py-2 font-semibold text-white hover:bg-[#244d38] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {savingId === product.id ? 'Saving…' : 'Save stock'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

export default Admin;
