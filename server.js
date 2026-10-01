const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const fs = require("fs"); //импортируем библиотеку fs

const port = process.env.PORT || 5015;

let messages = [];

//Считываем содержимое из файла для хранения данных
try {
  messages = JSON.parse(fs.readFileSync("data.json", "utf8"));
} catch (error) {
  console.lod("Ошибка чтения данных", error);
}

//Задаём следующий id
let nextId = messages.length === 0 ? 1 : messages[messages.length - 1].id + 1;

//Задаём функцию для сохранения данных в файл json
function saveMessages() {
  try {
    fs.writeFileSync("data.json", JSON.stringify(messages, null, 2));
    console.log("data.json обновлён успешно!");
  } catch (error) {
    console.error("Ошибка добавления данных:", error);
    throw error;
  }
}

// Обработка GET-запроса к /messages — получаем список
app.get("/messages", (req, res) => {
  // Возвращаем список сообщений в формате JSON
  res.json(messages);
});

// Обработка POST-запроса к /messages — добавляем новое сообщение
app.post("/messages", (req, res) => {
  const updatedData = req.body;
  // Получаем новое сообщение из тела запроса
  const newMessage = { id: nextId++, message: updatedData.formContent };
  // Проверяем, что поле 'name' обязательно
  if (!newMessage.message) {
    return res.status(400).json({ error: "Текст сообщения обязателен" });
  }
  // Добавляем сообщение в массив
  messages.push(newMessage);
  //Сохраняем в файл
  try {
    saveMessages();
  } catch (error) {
    console.error("Error saving messages:", error);
    res.status(500).json({ error: "Ошибка при сохранении сообщений" });
    return;
  }
  // Возвращаем подтверждённое сообщение с статусом 201 (Created)
  res.status(201).json(newMessage);
});

// PUT запрос
app.put("/messages/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  console.log(req.body.message);
  const messageId = req.params.id;
  const updatedData = req.body;
  const hasId = messages.some((mes) => mes.id === Number(messageId));
  console.log(hasId);
  // Проверяем, что id существует и сообщение найдено
  if (!hasId) {
    return res.status(400).json({ error: "Cообщение не найдено" });
  }
  // Получаем новое сообщение из тела запроса
  const newMessage = { id: Number(messageId), message: updatedData.message };
  console.log(newMessage);
  // Проверяем, что поле 'name' обязательно
  if (!newMessage.message) {
    return res.status(400).json({ error: "Текст сообщения обязателен" });
  }
  console.log(`Обновлено сообщение ${messageId}:`, updatedData.message);
  // Находим индекс заменяемого сообщения
  const mesIndex = messages.findIndex((mes) => mes.id == messageId);
  console.log(mesIndex);
  //Заменяем сообщение
  messages.splice(mesIndex, 1, newMessage);
  //Сохраняем в файл
  try {
    saveMessages();
  } catch (error) {
    console.error("Error saving messages:", error);
    res.status(500).json({ error: "Ошибка при сохранении сообщений" });
    return;
  }
  // Возвращаем подтверждённое сообщение с статусом 201 (Created)
  // res.status(201).json(newMessage);
  res.json({
    information: `Сообщение ${messageId} обновлено`,
    message: updatedData.message,
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
  //Сохраняем в файл
  try {
    saveMessages();
  } catch (error) {
    console.error("Error saving messages:", error);
    res.status(500).json({ error: "Ошибка при сохранении сообщений" });
    return;
  }
  res.json({ information: `Сообщение ${messageId} удалено` });
});

// Запускаем сервер на порту 5005
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
