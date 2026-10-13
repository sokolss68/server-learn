import { useState } from "react";
import UpDateMes from "./UpDateMes";

const Mes = ({ item, handleListEdit, deleteMes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditChange = () => {
    setIsEditing(!isEditing);
  };
  let mesContent;
  if (isEditing) {
    mesContent = (
      <div role="formEdit">
        <UpDateMes
          changeItemMessage={item.message}
          changeItemId={item._id}
          onListChange={handleListEdit}
          onEditChange={handleEditChange}
        />
      </div>
    );
  } else {
    mesContent = (
      <div role="status">
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
            deleteMes(item._id);
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
