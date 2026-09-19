import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MyForm from "./MyForm";
import UpDateMes from "./UpDateMes";
import axios from "axios";

//let nextId = 3;

function App() {
  const [list, setList] = useState([]);

  const callBackendAPI = async () => {
    try {
      const response = await fetch("api/messages");
      const body = await response.json();
      console.log(body);
      let len = body.length;
      for (let i = 0; i < len; i++) {
        setList((prevList) => [
          ...prevList,
          { id: body[i].id, name: body[i].name },
        ]);
      }
    } catch (error) {
      console.log(`Ошибка HTTP`, error);
    }
  };

  useEffect(() => {
    callBackendAPI();
  }, []);

  console.log(list);

  async function deleteMes(delId) {
    try {
      await axios.delete(`api/messages/${delId}`);
      console.log("Сообщение удалено!");
      setList(list.filter((mes) => mes.id !== delId));
    } catch (err) {
      alert("Не удалось удалить");
      console.error(err);
    }
  }

  const handleListAdd = (mainList) => {
    setList(mainList); // Обновляем массив в состоянии
    console.log("Массив получен:", mainList);
  };

  return (
    <>
      <h1>NplusR-SSR-2</h1>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <ul
        style={{
          padding: "0",
          margin: "0",
          listStyle: "none",
          marginBottom: "20px",
        }}
      >
        {list.map((item) => (
          <li key={item.id} style={{ marginBottom: "5px" }}>
            <Mes item={item} />
          </li>
        ))}
      </ul>
      <MyForm mainList={list} onListAdd={handleListAdd} />
    </>
  );

  function Mes({ item }) {
    console.log(item);
    const [isEditing, setIsEditing] = useState(false);
    const handleEditChange = () => {
      setIsEditing(!isEditing);
    };
    let mesContent;
    if (isEditing) {
      mesContent = (
        <UpDateMes
          changeItemName={item.name}
          changeItemId={item.id}
          mainList={list}
          onListChange={handleListAdd}
          onEditChange={handleEditChange}
        />
      );
    } else {
      mesContent = (
        <div>
          <b>{item.name}</b>
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
  }
}

export default App;
