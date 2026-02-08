import { useState } from "react";
import MenuList from "./components/MenuList";

function App() {
  const [cart, setCart] = useState([]);

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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Food Order App</h1>
      <MenuList onAddToCart={handleAddToCart} />
      <p>Items in cart: {cart.length}</p>
    </div>
  );
}

export default App;