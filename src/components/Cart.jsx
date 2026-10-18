import { Link } from 'react-router-dom';
import CartItem from './CartItem';

function Cart({ items, onClose, onRemove, onUpdateQuantity }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-panel">
      <div className="cart-header">
        <h3>Your Cart</h3>
        <button onClick={onClose}>✕</button>
      </div>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={onRemove}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
          <div className="cart-total">Total: ${total.toFixed(2)}</div>
          <Link to="/checkout" onClick={onClose} className="checkout-btn">
            Proceed to Checkout
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;