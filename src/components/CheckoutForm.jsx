import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <br />

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        required
      />
      <br />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        required
      />
      <br />

      <button type="submit" disabled={disabled}>
        Place Order
      </button>
    </form>
  );
};

export default CheckoutForm;