import { render, screen } from "@testing-library/react";
import OrderStatus from "../components/OrderStatus";
import * as api from "../services/api";
import { vi } from "vitest";

vi.mock("../services/api");

describe("OrderStatus", () => {
  it("shows order status", async () => {
    api.getOrderById.mockResolvedValue({
      status: "Preparing"
    });

    render(<OrderStatus orderId="123" />);

    expect(await screen.findByText("Preparing")).toBeInTheDocument();
  });
});