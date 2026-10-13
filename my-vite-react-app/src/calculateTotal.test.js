import { describe, expect, test } from "vitest";
import { calculateTotal } from "./calculateTotal.js";

describe("calculateTotal", () => {
  test("считает стоимость нескольких товаров", () => {
    expect(calculateTotal(200, 3)).toBe(600);
  });

  test("возвращает 0, если товаров нет", () => {
    expect(calculateTotal(200, 0)).toBe(0);
  });

  test("отклоняет отрицательное количество", () => {
    expect(() => calculateTotal(200, -1)).toThrow(
      "Количество не может быть отрицательным",
    );
  });
});
