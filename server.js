const express = require("express");
const app = express();
const fs = require("fs"); //импортируем библиотеку fs
const { MongoClient } = require("mongodb");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5015;

let messages = [];
let nextId;

// Строка подключения базы Compass
const url = "mongodb://localhost:27017/myDataFor2";
const client = new MongoClient(url);

//Считываем содержимое из базы для хранения данных Compass
async function writeMessages() {
  try {
    await client.connect();

    const db = client.db("myDataFor2");
    const resultConnect = await db.command({ ping: 1 });
    console.log("Подключение к MongoDB установлено", resultConnect);
    const collection = db.collection("messages");

    // Чтение всех данных
    messages = await collection.find({}).toArray();
    console.log("Список сообщений:", messages);
    //Задаём следующий id
    nextId = messages.length === 0 ? 1 : messages[messages.length - 1]._id + 1;
  } catch (error) {
    console.error("Ошибка подключения:", error);
  } finally {
    await client.close();
    console.log("Подключение закрыто");
  }
  //return messages;
}

writeMessages();

// console.log(messages);

//Задаём функцию для добавления данных в БД Compass
async function addMessages(newMessage) {
  try {
    await client.connect();

    const db = client.db("myDataFor2");

    const resultConnect = await db.command({ ping: 1 });
    console.log("Подключение к MongoDB установлено", resultConnect);

    const collection = db.collection("messages");

    // Вставка одного сообщения
    const addMessage = await collection.insertOne(newMessage);
    console.log("Сообщение добавлено, _id:", addMessage.insertedId);

    // Чтение всех сообщений
    messages = await collection.find({}).toArray();
    //console.log("Список сообщений:", messages);
  } catch (error) {
    console.error("Ошибка подключения:", error);
  } finally {
    await client.close();
    console.log("Подключение закрыто");
  }
}

//Обновление данных (сообщения) в БД
async function updateMessages(updateId, updateMes) {
  try {
    await client.connect();

    const db = client.db("myDataFor2");

    const resultConnect = await db.command({ ping: 1 });
    console.log("Подключение к MongoDB установлено", resultConnect);

    const collection = db.collection("messages");

    // Обновление сообщения
    await collection.findOneAndUpdate(
      { _id: updateId },
      { $set: { message: updateMes } },
      //{ returnDocument: "after" }, ????? Спросить у Саши. Визуально ничего не меняет
    );
    //console.log(messages);
    console.log("Сообщение изменено");

    // Чтение всех данных
    messages = await collection.find({}).toArray();
    console.log("Список сообщений:", messages);
  } catch (error) {
    console.error("Ошибка подключения:", error);
  } finally {
    await client.close();
    console.log("Подключение закрыто");
  }
}

//Удаление данных (сообщения) из БД
async function deleteMessages(delId) {
  try {
    await client.connect();

    const db = client.db("myDataFor2");

    const resultConnect = await db.command({ ping: 1 });
    console.log("Подключение к MongoDB установлено", resultConnect);

    const collection = db.collection("messages");

    // Удаление сообщения
    await collection.findOneAndDelete({ _id: delId });
    console.log("Сообщение удалено");

    // Чтение всех данных
    messages = await collection.find({}).toArray();
    console.log("Список сообщений:", messages);
  } catch (error) {
    console.error("Ошибка подключения:", error);
  } finally {
    await client.close();
    console.log("Подключение закрыто");
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
  const newMessage = { _id: nextId++, message: updatedData.formContent };
  // Проверяем, что поле 'name' обязательно
  if (!newMessage.message) {
    return res.status(400).json({ error: "Текст сообщения обязателен" });
  }
  // Добавляем сообщение в массив
  messages.push(newMessage);
  //Сохраняем в БД
  try {
    addMessages(newMessage);
  } catch (error) {
    console.error("Error saving messages:", error);
    res.status(500).json({ error: "Ошибка при сохранении сообщений" });
    return;
  }
  // Возвращаем подтверждённое сообщение с статусом 201 (Created)
  res.status(201).json(newMessage);
});

// PUT запрос
app.put("/messages/:_id", (req, res) => {
  console.log(req.params._id);
  console.log(req.body);
  console.log(req.body.message);
  const messageId = req.params._id;
  const updatedData = req.body;
  const hasId = messages.some((mes) => mes._id == messageId); //===Number(messageId)???
  console.log(hasId);
  // Проверяем, что id существует и сообщение найдено
  if (!hasId) {
    return res.status(400).json({ error: "Cообщение не найдено" });
  }
  // Получаем новое сообщение из тела запроса
  const newMessage = { _id: Number(messageId), message: updatedData.message };
  console.log(newMessage);
  // Проверяем, что поле 'name' обязательно
  if (!newMessage.message) {
    return res.status(400).json({ error: "Текст сообщения обязателен" });
  }
  console.log(`Обновлено сообщение ${messageId}:`, updatedData.message);
  // Находим индекс заменяемого сообщения
  const mesIndex = messages.findIndex((mes) => mes._id == messageId); //===Number(messageId)???
  console.log(mesIndex);
  //Заменяем сообщение
  messages.splice(mesIndex, 1, newMessage);
  //Сохраняем в БД
  try {
    updateMessages(Number(messageId), updatedData.message);
  } catch (error) {
    console.error("Error saving messages:", error);
    res.status(500).json({ error: "Ошибка при сохранении сообщений" });
    return;
  }
  // Возвращаем подтверждённое сообщение с статусом 201 (Created)
  // res.status(201).json(newMessage);
  res.status(201).json({
    information: `Сообщение ${messageId} обновлено`,
    message: updatedData.message,
  });
});

// DELETE запрос
app.delete("/messages/:_id", (req, res) => {
  const messageId = req.params._id;
  console.log(messageId);
  const hasId = messages.some((mes) => mes._id == messageId); //===Number(messageId)???
  console.log(hasId);
  // Проверяем, что id существует и сообщение найдено
  if (!hasId) {
    return res.status(400).json({ error: "Cообщение не найдено" });
  }
  //Удаляем сообщение
  let somMessages = messages.filter((mes) => mes._id !== messageId); //Number(messageId)???
  messages = somMessages;
  console.log(`Удалено сообщение ${messageId}`);
  //Сохраняем в БД
  try {
    deleteMessages(Number(messageId));
  } catch (error) {
    console.error("Error saving messages:", error);
    res.status(500).json({ error: "Ошибка при сохранении сообщений" });
    return;
  }
  res.status(201).json({ information: `Сообщение ${messageId} удалено` });
});

// Запускаем сервер на порту 5015
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
