import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "../components/CheckoutForm";

describe("CheckoutForm", () => {
  it("submits customer details", () => {
    const onSubmit = vi.fn();

    render(<CheckoutForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Shubham" }
    });
    fireEvent.change(screen.getByPlaceholderText("Address"), {
      target: { value: "Pune" }
    });
    fireEvent.change(screen.getByPlaceholderText("Phone"), {
      target: { value: "9999999999" }
    });

    fireEvent.click(screen.getByText("Place Order"));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Shubham",
      address: "Pune",
      phone: "9999999999"
    });
  });
});