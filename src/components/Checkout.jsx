import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout({ cart, onOrderComplete }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !phone) {
      setError('Please fill in your name and phone number.');
      return;
    }
    if (deliveryMethod === 'delivery' && !address) {
      setError('Please provide a delivery address.');
      return;
    }
    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    const orderCart = cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: item.quantity,
    }));

    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          deliveryMethod,
          address: deliveryMethod === 'delivery' ? address : null,
          cart: orderCart,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Order failed');

      onOrderComplete();
      navigate(`/order-confirmation/${data.orderId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>

      <div className="checkout-summary">
        <h3>Order Summary</h3>
        {cart.map((item) => (
          <div key={item.id} className="checkout-item">
            <span>{item.name} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="checkout-total">Total: ${total.toFixed(2)}</div>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Full Name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          Phone Number
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>

        <label>
          Delivery Method
          <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
            <option value="pickup">Pickup</option>
            <option value="delivery">Delivery</option>
          </select>
        </label>

        {deliveryMethod === 'delivery' && (
          <label>
            Delivery Address
            <input value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>
        )}

        {error && <p className="checkout-error">{error}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Placing order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}

export default Checkout;