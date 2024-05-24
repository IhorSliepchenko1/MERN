import { useState, useContext, useCallback, useEffect } from "react";
import "./MainPage.scss";
import axios from "axios";
import { AuthContext } from "./../../context/AuthContext";
import { API_BASE_URL } from "../../apiConfig";

const MainPage = () => {
  const [text, setText] = useState(``);
  const { userId } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  const getTodos = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/todo`, {
        headers: { "Content-Type": "application/json" },
        params: { userId },
      });

      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [userId]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const createTodo = useCallback(async () => {
    if (!text) {
      alert("Пустую задачу добавить нельзя!");
      return null;
    }
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/todo/add`,
        {
          text,
          userId,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(res.data);

      setTodos([...todos], res.data);
      setText(``);
      getTodos();
    } catch (err) {
      console.error(err);
    }
  }, [text, userId, todos, getTodos]);

  const removeTodos = useCallback(
    async (id) => {
      if (confirm(`Уверены что хотите удалить задачу?`)) {
        try {
          await axios.delete(
            `${API_BASE_URL}/api/todo/delete/${id}`,
            { id },
            { headers: { "Content-Type": "application/json" } }
          );
          await getTodos();
        } catch (err) {
          console.error(err);
        }
      }
    },
    [getTodos]
  );

  const completeTodo = useCallback(
    async (id) => {
      if (confirm(`Задача выполнена?`)) {
        try {
          const res = await axios.put(
            `${API_BASE_URL}/api/todo/complete/${id}`,
            { id },
            { headers: { "Content-Type": "application/json" } }
          );
          setTodos([...todos], res.data);
          await getTodos();
        } catch (err) {
          console.error(err);
        }
      }
    },
    [getTodos, todos]
  );

  const importantTodo = useCallback(
    async (id) => {
      if (confirm(`Пометить как важную?`)) {
        try {
          const res = await axios.put(
            `${API_BASE_URL}/api/todo/important/${id}`,
            { id },
            { headers: { "Content-Type": "application/json" } }
          );
          setTodos([...todos], res.data);
          await getTodos();
        } catch (err) {
          console.error(err);
        }
      }
    },
    [getTodos, todos]
  );

  return (
    <div className="container">
      <div className="main-page">
        <h4>Добавить задачу:</h4>
        <form className="form form-login" onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                id="text"
                name="input"
                className="validate"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <label htmlFor="input">Задача:</label>
            </div>
          </div>

          <div className="row">
            <button
              className="waves-effect waves-light btn blue"
              onClick={createTodo}
            >
              Добавить
            </button>
          </div>
        </form>

        <h3>Активные задачи:</h3>
        <div className="todos">
          {todos.map((todo, index) => {
            let cls = [`row flex todos-item task-item`];

            if (todo.completed) {
              cls.push("completed");
            }

            if (todo.important) {
              cls.push("important");
            }

            return (
              <div className={cls.join(" ")} key={index}>
                <div className="col todos-num">{`${index + 1}.`}</div>
                <div className="col todos-text">{todo.text}</div>
                <div className="col todos-buttons">
                  <i
                    className="material-icons blue-text"
                    onClick={() => completeTodo(todo._id)}
                  >
                    check
                  </i>
                  <i
                    className="material-icons orange-text"
                    onClick={() => importantTodo(todo._id)}
                  >
                    warning
                  </i>
                  <i
                    className="material-icons red-text"
                    onClick={() => removeTodos(todo._id)}
                  >
                    delete
                  </i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
