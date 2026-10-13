import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MyForm from "./MyForm.jsx";

test("форма видна пользователю", () => {
  render(<MyForm />);

  expect(screen.getByRole("status")).toBeVisible();
});

test("поле формы не заполнено", () => {
  render(<MyForm />);

  expect(screen.getByRole("status")).toHaveDisplayValue("");
});

test("поле формы обязательно к заполнению", () => {
  render(<MyForm />);

  expect(screen.getByRole("status")).toBeRequired("");
});
