import express from "express";

export const app = express();

app.use(express.json());

app.post("/api/greet", (req, res) => {
  const name = req.body?.name;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Укажите имя" });
  }

  return res.status(200).json({ message: `Привет, ${name.trim()}!` });
});
