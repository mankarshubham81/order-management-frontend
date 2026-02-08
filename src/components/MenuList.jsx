import { useEffect, useState } from "react";
import { getMenu } from "../services/api";

const MenuList = ({ onAddToCart }) => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMenu()
      .then(setMenu)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading menu...</p>;

  return (
    <div>
      <h2>Menu</h2>
      {menu.map((item) => (
        <div key={item.id} style={{ borderBottom: "1px solid #ccc", marginBottom: 10 }}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>₹{item.price}</p>
          <button onClick={() => onAddToCart(item)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default MenuList;