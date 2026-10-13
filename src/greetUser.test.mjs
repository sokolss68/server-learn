import { expect, test, vi } from "vitest";
import { greetUser } from "./greetUser.mjs";

test("формирует приветствие для загруженного пользователя", async () => {
  const loadUser = vi.fn().mockResolvedValue({ name: "Анна" });

  const result = await greetUser(42, loadUser);

  expect(result).toBe("Привет, Анна!");
  expect(loadUser).toHaveBeenCalledWith(42);
});
