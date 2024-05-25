import { useState, useContext, useEffect } from "react";
import "./MainPage.scss";
import { AuthContext } from "./../../context/AuthContext";
import MainForm from "../../components/UI/form/MainForm";
import ListTask from "../../components/UI/listTasks/ListTask";
import { useMethod } from "../../hooks/useMethod";

const MainPage = () => {
  const [text, setText] = useState(``);
  const { userId } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  const { getTodos, createTodo, removeTodos, completeTodo, importantTodo } =
    useMethod({ text, setText, userId, todos, setTodos });

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div className="container">
      <div className="main-page">
        <MainForm text={text} setText={setText} createTodo={createTodo} />

        <ListTask
          todos={todos}
          completeTodo={completeTodo}
          importantTodo={importantTodo}
          removeTodos={removeTodos}
        />
      </div>
    </div>
  );
};

export default MainPage;
