import "./Cart.css";

const Cart = ({ cart, onUpdateQty, onRemove }) => {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="cart empty">
        <h3>Cart</h3>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h3>Your Cart</h3>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <span className="item-name">{item.name}</span>
              <span className="item-price">₹{item.price}</span>
            </div>

            <div className="item-actions">
              <div className="qty-control">
                <button
                  onClick={() =>
                    onUpdateQty(item.id, item.quantity - 1)
                  }
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    onUpdateQty(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() => onRemove(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <span>Total</span>
        <strong>₹{total}</strong>
      </div>
    </div>
  );
};

export default Cart;