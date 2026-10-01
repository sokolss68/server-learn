import { useState } from "react";
import UpDateMes from "./UpDateMes";

const Mes = ({ item, list, handleListEdit, deleteMes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditChange = () => {
    setIsEditing(!isEditing);
  };
  let mesContent;
  if (isEditing) {
    mesContent = (
      <UpDateMes
        changeItemMessage={item.message}
        changeItemId={item.id}
        mainList={list}
        onListChange={handleListEdit}
        onEditChange={handleEditChange}
      />
    );
  } else {
    mesContent = (
      <div>
        <b>{item.message}</b>
        <button
          type="button"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          Изменить
        </button>
        <button
          type="button"
          onClick={() => {
            deleteMes(item.id);
          }}
        >
          Удалить
        </button>
      </div>
    );
  }
  return <>{mesContent}</>;
};

export default Mes;
