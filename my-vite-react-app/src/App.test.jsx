import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";

test("показывает титульную надпись", () => {
  render(<App />);

  expect(screen.getByRole("title")).toHaveTextContent("NplusR-SSR-2"); //toBeInTheDocument(); //"Текущий список сообщений"
});

test("существует текущий список сообщений", () => {
  render(<App />);

  expect(screen.getByRole("mesList")).toBeInTheDocument();
});

test("список сообщений виден пользователю", () => {
  render(<App />);

  expect(screen.getByRole("mesList")).toBeVisible();
});
