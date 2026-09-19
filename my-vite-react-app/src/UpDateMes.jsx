import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const UpDateMes = ({
  changeItemName,
  changeItemId,
  mainList,
  onListChange,
  onEditChange,
}) => {
  const [formData, setFormData] = useState({
    id: changeItemId,
    name: changeItemName,
  });
  const [mesChangeText, setMesChangeText] = useState(changeItemName);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMesChangeText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Отменяем действие по умолчанию (переадресацию страницы)

    // Отправляем данные на сервер
    axios
      .put(`api/messages/${changeItemId}`, formData)
      .then((response) => {
        console.log("Успешно:", response.data);
        // Здесь можно обработать ответ от сервера
        const indexChangeItem = mainList.findIndex(
          (item) => item.id === changeItemId,
        );
        mainList[indexChangeItem].name = response.data.name;
        const newList = mainList;
        onListChange(newList);
        onEditChange();
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
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
