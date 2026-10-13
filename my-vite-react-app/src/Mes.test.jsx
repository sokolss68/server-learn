import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Mes from "./Mes.jsx";

test("сообщение существует", () => {
  //const mockItem = { _id: "test", message: "test" };
  render(
    <Mes
      item={{ _id: "test", message: "test" }}
      handleListEdit={() => {}}
      deleteMes={() => {}}
    />,
  );

  expect(screen.getByRole("status")).toBeInTheDocument();
});

test("сообщение видно пользователю", () => {
  render(
    <Mes
      item={{ _id: "test", message: "test" }}
      handleListEdit={() => {}}
      deleteMes={() => {}}
    />,
  );

  expect(screen.getByRole("status")).toBeVisible();
});

test("показывает форму для внесения изменений после нажатия кнопки Изменить", async () => {
  const user = userEvent.setup();
  render(
    <Mes
      item={{ _id: "test", message: "test" }}
      handleListEdit={() => {}}
      deleteMes={() => {}}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Изменить" }));

  expect(screen.getByRole("formEdit")).toBeVisible();
});
