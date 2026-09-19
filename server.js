const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5015;

let nextId = 0;

let messages = [
  /*{ id: 1, name: 'Message 1' },
                { id: 2, name: 'Message 2' },
                { id: 3, name: 'Another Message 3' },
                { id: 4, name: 'Message 4' }*/
];

// Обработка GET-запроса к /messages — получаем список
app.get("/messages", (req, res) => {
  // Возвращаем список сообщений в формате JSON
  res.json(messages);
});

// Обработка POST-запроса к /messages — добавляем новое сообщение
app.post("/messages", (req, res) => {
  // Получаем новое сообщение из тела запроса
  const newMessage = { id: nextId++, name: req.body.name };
  // Проверяем, что поле 'name' обязательно
  if (!newMessage.name) {
    return res.status(400).json({ error: "Текст сообщения обязателен" });
  }
  // Добавляем сообщение в массив
  messages.push(newMessage);
  // Возвращаем подтверждённое сообщение с статусом 201 (Created)
  res.status(201).json(newMessage);
});

// PUT запрос
app.put("/messages/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  console.log(req.body.name);
  const messageId = req.params.id;
  const updatedData = req.body;
  const hasId = messages.some((mes) => mes.id === Number(messageId));
  console.log(hasId);
  // Проверяем, что id существует и сообщение найдено
  if (!hasId) {
    return res.status(400).json({ error: "Cообщение не найдено" });
  }
  // Получаем новое сообщение из тела запроса
  const newMessage = { id: Number(messageId), name: updatedData.name };
  console.log(newMessage);
  // Проверяем, что поле 'name' обязательно
  if (!newMessage.name) {
    return res.status(400).json({ error: "Текст сообщения обязателен" });
  }
  console.log(`Обновлено сообщение ${messageId}:`, updatedData.name);
  // Находим индекс заменяемого сообщения
  const mesIndex = messages.findIndex((mes) => mes.id == messageId);
  console.log(mesIndex);
  //Заменяем сообщение
  messages.splice(mesIndex, 1, newMessage);
  // Возвращаем подтверждённое сообщение с статусом 201 (Created)
  // res.status(201).json(newMessage);
  res.json({
    message: `Сообщение ${messageId} обновлено`,
    name: updatedData.name,
  });
});

// DELETE запрос
app.delete("/messages/:id", (req, res) => {
  const messageId = req.params.id;
  console.log(messageId);
  const hasId = messages.some((mes) => mes.id === Number(messageId));
  console.log(hasId);
  // Проверяем, что id существует и сообщение найдено
  if (!hasId) {
    return res.status(400).json({ error: "Cообщение не найдено" });
  }
  //Удаляем сообщение
  let somMessages = messages.filter((mes) => mes.id !== Number(messageId));
  messages = somMessages;
  console.log(`Удалено сообщение ${messageId}`);
  res.json({ message: `Сообщение ${messageId} удалено` });
});

// Запускаем сервер на порту 5005
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
