import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UpDateMes from "./UpDateMes.jsx";

test("форма для внесения изменений видна пользователю", () => {
  render(
    <UpDateMes
      changeItemMessage={"Текущее сообщение"}
      changeItemId={"test"}
      onListChange={() => {}}
      onEditChange={() => {}}
    />,
  );

  expect(screen.getByRole("status")).toBeVisible();
});

test("изначально форма содержит текущее сообщение", () => {
  render(
    <UpDateMes
      changeItemMessage={"Текущее сообщение"}
      changeItemId={"test"}
      onListChange={() => {}}
      onEditChange={() => {}}
    />,
  );

  expect(screen.getByRole("status")).toHaveDisplayValue("Текущее сообщение"); //"Текущее сообщение"
});
