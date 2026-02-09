import { useEffect, useState } from "react";
import { getOrderById } from "../services/api";
import "./OrderStatus.css";

const STATUSES = [
  "Order Received",
  "Preparing",
  "Out for Delivery",
  "Delivered"
];

const OrderStatus = ({ orderId }) => {
  const [status, setStatus] = useState("Order Received");
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;

    const fetchStatus = async () => {
      try {
        const order = await getOrderById(orderId);
        setStatus(order.status);

        if (order.status === "Delivered") {
          clearInterval(intervalId);
        }
      } catch {
        setError("Failed to fetch order status");
        clearInterval(intervalId);
      }
    };

    fetchStatus();
    intervalId = setInterval(fetchStatus, 5000);

    return () => clearInterval(intervalId);
  }, [orderId]);

  if (error) return <p className="error">{error}</p>;

  const currentIndex = STATUSES.indexOf(status);

  return (
    <div className="order-status-container">
      <h2>Order Status</h2>
      <p className="order-id">
        Order ID: <strong>{orderId}</strong>
      </p>

      <div className="status-tracker">
        {STATUSES.map((step, index) => {
          let className = "status-step";

          if (index < currentIndex) {
            className += " completed";
          } else if (index === currentIndex) {
            className += " active";
          }

          return (
            <div key={step} className={className}>
              <span className="circle">{index + 1}</span>
              <span className="label">{step}</span>
            </div>
          );
        })}
      </div>

      <div className="current-status">
        Current Status: <strong>{status}</strong>
      </div>
    </div>
  );
};

export default OrderStatus;