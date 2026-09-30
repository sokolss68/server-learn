import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const MyForm = ({ onListAdd }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) {
      alert("Поле не заполнено");
    } else {
      // Отправляем данные на сервер
      axios
        .post("api/messages", { message })
        .then((response) => {
          console.log("Успешно:", response.data);
          // Здесь можно обработать ответ от сервера
          const newMes = {
            id: response.data.id,
            message: response.data.message,
          };
          onListAdd(newMes);
          setMessage("");
        })
        .catch((error) => {
          console.error("Ошибка:", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Поля формы */}
      <input
        type="text"
        name="message"
        value={message}
        placeholder="Сообщение"
        onChange={handleChange}
      />

      <button className="button" type="submit">
        Отправить
      </button>
    </form>
  );
};

export default MyForm;
