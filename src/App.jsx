import { useEffect, useState } from "react";
import MenuList from "./components/MenuList";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import OrderStatus from "./components/OrderStatus";
import { createOrder } from "./services/api";
import "./App.css";

const CART_KEY = "food_app_cart";
const ORDER_ID_KEY = "food_app_order_id";

function App() {
  // Load cart from localStorage on first render
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(CART_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Load orderId from localStorage on first render
  const [orderId, setOrderId] = useState(() => {
    return localStorage.getItem(ORDER_ID_KEY);
  });

  const [loading, setLoading] = useState(false);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
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
      prev.map((i) =>
        i.id === id ? { ...i, quantity: qty } : i
      )
    );
  };

  const handleResetOrder = () => {
    setOrderId(null);
    setCart([]);
    localStorage.removeItem("food_app_order_id");
    localStorage.removeItem("food_app_cart");
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

      // Persist orderId
      setOrderId(order.id);
      localStorage.setItem(ORDER_ID_KEY, order.id);

      // Clear cart
      setCart([]);
      localStorage.removeItem(CART_KEY);
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
          <OrderStatus
            orderId={orderId}
            onReset={handleResetOrder}
          />
        )}
      </main>
    </div>
  );
}

export default App;