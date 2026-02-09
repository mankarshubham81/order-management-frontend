import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "../components/Cart";

describe("Cart", () => {
  it("updates quantity and removes item", () => {
    const cart = [
      { id: "1", name: "Burger", price: 150, quantity: 1 }
    ];

    const onUpdateQty = vi.fn();
    const onRemove = vi.fn();

    render(
      <Cart
        cart={cart}
        onUpdateQty={onUpdateQty}
        onRemove={onRemove}
      />
    );

    fireEvent.click(screen.getByText("+"));
    expect(onUpdateQty).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Remove"));
    expect(onRemove).toHaveBeenCalled();
  });
});