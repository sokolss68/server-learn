import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const MyForm = ({ mainList, onListAdd }) => {
  const [formData, setFormData] = useState({});
  const [mesText, setMesText] = useState("");
  //console.log(mainList);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //
    setMesText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Отменяем действие по умолчанию (переадресацию страницы)
    if (!mesText) {
      alert("Поле не заполнено");
    } else {
      // Отправляем данные на сервер
      axios
        .post("api/messages", formData)
        .then((response) => {
          console.log("Успешно:", response.data);
          // Здесь можно обработать ответ от сервера
          const newList = [
            ...mainList,
            { id: response.data.id, name: response.data.name },
          ];
          onListAdd(newList);
          setMesText("");
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
        name="name"
        value={mesText}
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
