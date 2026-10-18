import { useParams, Link } from 'react-router-dom';

function OrderConfirmation() {
  const { orderId } = useParams();

  return (
    <div className="order-confirmation">
      <h1>Order Confirmed!</h1>
      <p>Thank you for your order. Your order ID is:</p>
      <p className="order-id">#{orderId}</p>
      <Link to="/" className="back-link">← Back to shop</Link>
    </div>
  );
}

export default OrderConfirmation;