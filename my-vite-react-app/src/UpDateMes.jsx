import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const UpDateMes = ({
  changeItemMessage,
  changeItemId,
  //mainList,
  onListChange,
  onEditChange,
}) => {
  const [formContent, setFormContent] = useState({
    id: changeItemId,
    message: changeItemMessage,
  });
  const [mesChangeText, setMesChangeText] = useState(changeItemMessage);

  const handleChange = (e) => {
    setFormContent({ ...formContent, message: e.target.value });
    setMesChangeText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Отменяем действие по умолчанию (переадресацию страницы)
    if (!mesChangeText) {
      alert("Поле не заполнено");
    } else {
      // Отправляем данные на сервер
      axios
        .put(`api/messages/${changeItemId}`, formContent)
        .then((response) => {
          console.log("Успешно:", response.data);
          // Здесь можно обработать ответ от сервера
          const newMes = response.data.message;
          onListChange(newMes, changeItemId);
          onEditChange();
        })
        .catch((error) => {
          console.error("Ошибка:", error);
          alert("Не удалось обновить");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Поля формы */}
      <input
        type="text"
        name="name"
        value={mesChangeText}
        onChange={handleChange}
      />
      <button className="button" type="submit">
        Сохранить
      </button>
    </form>
  );
};

export default UpDateMes;
