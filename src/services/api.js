const API_BASE_URL = "https://order-management-backend-zvv4.onrender.com/api";
// const API_BASE_URL = "http://localhost:4000/api";

export const getMenu = async () => {
  const res = await fetch(`${API_BASE_URL}/menu`);
  if (!res.ok) throw new Error("Failed to fetch menu");
  return res.json();
};

export const createOrder = async (payload) => {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create order");
  }

  return res.json();
};

export const getOrderById = async (orderId) => {
  const res = await fetch(`${API_BASE_URL}/orders/${orderId}`);
  if (!res.ok) throw new Error("Order not found");
  return res.json();
};