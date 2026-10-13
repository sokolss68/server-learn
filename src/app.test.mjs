import { expect, test } from "vitest";
import request from "supertest";
import { app } from "./app.mjs";

test("возвращает приветствие для корректного имени", async () => {
  const response = await request(app).post("/api/greet").send({ name: "Анна" });

  expect(response.status).toBe(200);
  expect(response.body).toEqual({ message: "Привет, Анна!" });
});

test("отклоняет имя из пробелов", async () => {
  const response = await request(app).post("/api/greet").send({ name: "   " });

  expect(response.status).toBe(400);
  expect(response.body).toEqual({ error: "Укажите имя" });
});

test("отклоняет запрос без имени", async () => {
  const response = await request(app).post("/api/greet").send({});

  expect(response.status).toBe(400);
  expect(response.body).toEqual({ error: "Укажите имя" });
});
