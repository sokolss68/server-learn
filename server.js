const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const fs = require("fs"); //импортируем библиотеку fs

const port = process.env.PORT || 5015;

//let nextId = 0;

let messages = [];

//Считываем содержимое из файла для хранения данных
messages = JSON.parse(fs.readFileSync("data.json", "utf8"));

//Задаём следующий id
let nextId = messages.length === 0 ? 1 : messages[messages.length - 1].id + 1;

//Задаём функцию для сохранения данных в файл json
function saveMessages() {
  try {
    fs.writeFileSync("data.json", JSON.stringify(messages, null, 2));
    console.log("data.json created successfully!");
  } catch (error) {
    console.error("Error combining data:", error);
  }
}

// Обработка GET-запроса к /messages — получаем список
app.get("/messages", (req, res) => {
  // Возвращаем список сообщений в формате JSON
  res.json(messages);
  //Сохраняем в файл
  saveMessages();
});

// Обработка POST-запроса к /messages — добавляем новое сообщение
app.post("/messages", (req, res) => {
  const updatedData = req.body;
  // Получаем новое сообщение из тела запроса
  const newMessage = { id: nextId++, name: updatedData.name };
  // Проверяем, что поле 'name' обязательно
  if (!newMessage.name) {
    return res.status(400).json({ error: "Текст сообщения обязателен" });
  }
  // Добавляем сообщение в массив
  messages.push(newMessage);
  // Возвращаем подтверждённое сообщение с статусом 201 (Created)
  res.status(201).json(newMessage);
  //Сохраняем в файл
  saveMessages();
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
  //Сохраняем в файл
  saveMessages();
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
  //Сохраняем в файл
  saveMessages();
});

// Запускаем сервер на порту 5005
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
