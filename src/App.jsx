import { useState } from "react";
import MenuList from "./components/MenuList";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import OrderStatus from "./components/OrderStatus";
import { createOrder } from "./services/api";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQty = (id, qty) => {
    if (qty <= 0) {
      handleRemove(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleCheckout = async (customer) => {
    setLoading(true);
    try {
      const payload = {
        customer,
        items: cart.map((item) => ({
          itemId: item.id,
          quantity: item.quantity
        }))
      };

      const order = await createOrder(payload);
      setOrderId(order.id);
      setCart([]);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🍕 Food Order App</h1>
      </header>

      <main className="content">
        {!orderId ? (
          <>
            <section className="menu-section">
              <MenuList onAddToCart={handleAddToCart} />
            </section>

            <aside className="sidebar">
              <Cart
                cart={cart}
                onUpdateQty={handleUpdateQty}
                onRemove={handleRemove}
              />

              {cart.length > 0 && (
                <CheckoutForm
                  onSubmit={handleCheckout}
                  disabled={loading}
                />
              )}
            </aside>
          </>
        ) : (
          <OrderStatus orderId={orderId} />
        )}
      </main>
    </div>
  );
}

export default App;