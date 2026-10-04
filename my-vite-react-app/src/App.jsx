import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MyForm from "./MyForm";
import Mes from "./Mes";
import axios from "axios";

const getMessagesList = async () => {
  const response = await fetch("api/messages");
  const body = await response.json();

  return body;
};

const delMessageFromList = async (itemId) => {
  await axios.delete(`api/messages/${itemId}`);
  console.log("Сообщение удалено!");
};

function App() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true); //Добавил

  const getMessages = async () => {
    // setLoading(true);
    try {
      const messagesList = await getMessagesList();
      setList(messagesList);
      setLoading(false);
      // console.log(messagesList);
    } catch (error) {
      console.log(`Ошибка`, error);
      alert("Не удалось загрузить");
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  console.log(list);

  async function deleteMes(delId) {
    setLoading(true);
    try {
      delMessageFromList(delId);
      setList(list.filter((mes) => mes._id !== delId));
      setLoading(false);
    } catch (err) {
      alert("Не удалось удалить");
      console.error(err);
    }
  }

  const handleListAdd = (addMes) => {
    setList([...list, addMes]); // Обновляем массив в состоянии
    console.log("Массив получен:", list);
    console.log(addMes);
  };

  const handleListEdit = (updateMessage, updateItemId) => {
    // Обновляем сообщение в массиве
    const indexChangeItem = list.findIndex((item) => item._id === updateItemId);
    list[indexChangeItem].message = updateMessage;
    console.log("Сообщение обновлено:", updateMessage);
  };

  return (
    <>
      <h1>NplusR-SSR-2</h1>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div style={{ height: "40px" }}>{loading ? "Loading..." : ""}</div>
      <ul
        style={{
          padding: "0",
          margin: "0",
          listStyle: "none",
          marginBottom: "20px",
        }}
      >
        {list.map((item) => (
          <li key={item._id} style={{ marginBottom: "5px" }}>
            <Mes
              item={item}
              list={list}
              handleListEdit={handleListEdit}
              deleteMes={deleteMes}
            />
          </li>
        ))}
      </ul>
      <MyForm onListAdd={handleListAdd} />
    </>
  );

  /*  function Mes({ item }) {
    //console.log(item);
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
            className="button"
            type="button"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Изменить
          </button>
          <button
            className="button"
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
  }*/
}

export default App;
