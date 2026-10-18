import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Admin({ user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!user?.isAdmin) return;

    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user]);

  if (!user?.isAdmin) {
    return (
      <div className="admin-page">
        <h1>Access denied</h1>
        <p>You need an admin account to view this page.</p>
        <Link to="/login" className="back-link">Log in</Link>
      </div>
    );
  }

  const handleStockChange = (id, value) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Number(value) } : p))
    );
  };

  const handleSave = async (product) => {
    setSavingId(product.id);
    setMessage(null);
    try {
      const res = await fetch(`http://localhost:3000/api/products/${product.id}/stock`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ stock: product.stock }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update stock');
      setMessage({ type: 'success', text: `${product.name} updated.` });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSavingId(null);
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="admin-page">
      <h1>Inventory Admin</h1>
      {message && (
        <p className={message.type === 'error' ? 'checkout-error' : 'newsletter-success'}>
          {message.text}
        </p>
      )}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={product.stock ?? 0}
                  onChange={(e) => handleStockChange(product.id, e.target.value)}
                />
              </td>
              <td>
                <button
                  onClick={() => handleSave(product)}
                  disabled={savingId === product.id}
                >
                  {savingId === product.id ? 'Saving...' : 'Save'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;