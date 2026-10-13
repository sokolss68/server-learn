import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter.jsx";

test("сначала показывает ноль товаров", () => {
  render(<Counter />);

  expect(screen.getByRole("status")).toHaveTextContent("Товаров: 0");
});

test("добавляет товар после нажатия кнопки", async () => {
  const user = userEvent.setup();
  render(<Counter />);

  await user.click(screen.getByRole("button", { name: "Добавить товар" }));

  expect(screen.getByRole("status")).toHaveTextContent("Товаров: 1");
});
