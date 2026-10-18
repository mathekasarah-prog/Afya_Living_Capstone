function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} width={50} />
      <div className="cart-item-info">
        <span>{item.name}</span>
        <span className="cart-item-price">${item.price.toFixed(2)}</span>
      </div>
      <div className="cart-item-qty">
        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>−</button>
        <span>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
      </div>
      <button className="cart-item-remove" onClick={() => onRemove(item.id)}>✕</button>
    </div>
  );
}

export default CartItem;