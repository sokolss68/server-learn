import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const MyForm = ({ onListAdd }) => {
  const [formData, setFormData] = useState({ message: "" });
  // const [mesText, setMesText] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, message: e.target.value }); //
    // setMesText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.message) {
      alert("Поле не заполнено");
    } else {
      // Отправляем данные на сервер
      axios
        .post("api/messages", formData)
        .then((response) => {
          console.log("Успешно:", response.data);
          // Здесь можно обработать ответ от сервера
          const newMes = {
            id: response.data.id,
            message: response.data.message,
          };
          onListAdd(newMes);
          setFormData({ message: "" });
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
        value={formData.message}
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
