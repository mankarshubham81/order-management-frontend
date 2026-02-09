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

  if (loading) return <p style={{ textAlign: "center" }}>Loading menu...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Menu</h2>

      <div style={styles.grid}>
        {menu.map((item) => (
          <div key={item.id} style={styles.card}>
            <img
              src={item.imageUrl}
              alt={item.name}
              style={styles.image}
            />

            <div style={styles.cardBody}>
              <h3 style={styles.title}>{item.name}</h3>
              <p style={styles.description}>{item.description}</p>

              <div style={styles.footer}>
                <span style={styles.price}>₹{item.price}</span>
                <button
                  style={styles.button}
                  onClick={() => onAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "20px"
  },
  heading: {
    marginBottom: "20px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px"
  },
  card: {
    border: "1px solid #eaeaea",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)"
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover"
  },
  cardBody: {
    padding: "14px"
  },
  title: {
    margin: "0 0 6px"
  },
  description: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "12px"
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  price: {
    fontWeight: "bold",
    fontSize: "16px"
  },
  button: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#ff5a5f",
    color: "#fff",
    fontWeight: 500
  }
};

export default MenuList;