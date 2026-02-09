import { useState } from "react";
import "./CheckoutForm.css";

const CheckoutForm = ({ onSubmit, disabled }) => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="checkout" onSubmit={handleSubmit}>
      <h3>Checkout</h3>

      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="address"
        placeholder="Delivery Address"
        value={form.address}
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={disabled}>
        {disabled ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
};

export default CheckoutForm;