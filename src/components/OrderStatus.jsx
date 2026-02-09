import { useEffect, useState } from "react";
import { getOrderById } from "../services/api";

const OrderStatus = ({ orderId }) => {
  const [status, setStatus] = useState("Loading...");
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;

    const fetchStatus = async () => {
      try {
        const order = await getOrderById(orderId);
        setStatus(order.status);

        // Stop polling once delivered
        if (order.status === "Delivered") {
          clearInterval(intervalId);
        }
      } catch (err) {
        setError("Failed to fetch order status");
        clearInterval(intervalId);
      }
    };

    fetchStatus(); // initial call
    intervalId = setInterval(fetchStatus, 5000);

    return () => clearInterval(intervalId);
  }, [orderId]);

  if (error) return <p>{error}</p>;

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Order Status</h2>
      <p>
        Order ID: <strong>{orderId}</strong>
      </p>
      <h3>{status}</h3>
    </div>
  );
};

export default OrderStatus;