import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const MyForm = ({ onListAdd }) => {
  const [formContent, setFormContent] = useState("");

  const handleChange = (e) => {
    setFormContent(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formContent) {
      alert("Поле не заполнено");
    } else {
      // Отправляем данные на сервер
      axios
        .post("api/messages", { formContent })
        .then((response) => {
          console.log("Успешно:", response.data);
          // Здесь можно обработать ответ от сервера
          const newMes = {
            _id: response.data._id,
            message: response.data.message,
          };
          onListAdd(newMes);
          setFormContent("");
        })
        .catch((error) => {
          console.error("Ошибка:", error);
          alert("Не удалось отправить");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Поля формы */}
      <input
        type="text"
        name="message"
        value={formContent}
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
