import { render, screen, fireEvent } from "@testing-library/react";
import MenuList from "../components/MenuList";
import * as api from "../services/api";
import { vi } from "vitest";

vi.mock("../services/api");

describe("MenuList", () => {
  it("renders menu items and allows add to cart", async () => {
    api.getMenu.mockResolvedValue([
      {
        id: "1",
        name: "Pizza",
        description: "Cheese pizza",
        price: 299,
        imageUrl: "https://example.com/pizza.jpg"
      }
    ]);

    const onAddToCart = vi.fn();

    render(<MenuList onAddToCart={onAddToCart} />);

    expect(await screen.findByText("Pizza")).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /add to cart/i })
    );

    expect(onAddToCart).toHaveBeenCalledTimes(1);
  });
});