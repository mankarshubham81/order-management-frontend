const Cart = ({ cart, onUpdateQty, onRemove }) => {
    if (cart.length === 0) return <p>Your cart is empty.</p>;
  
    return (
      <div>
        <h2>Cart</h2>
  
        {cart.map((item) => (
          <div
            key={item.id}
            style={{ borderBottom: "1px solid #ccc", marginBottom: 10 }}
          >
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
  
            <button onClick={() => onUpdateQty(item.id, item.quantity - 1)}>
              -
            </button>
            <span style={{ margin: "0 10px" }}>{item.quantity}</span>
            <button onClick={() => onUpdateQty(item.id, item.quantity + 1)}>
              +
            </button>
  
            <button
              style={{ marginLeft: 10 }}
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  export default Cart;