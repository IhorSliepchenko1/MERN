import axios from "axios";
import { useCallback } from "react";
import { API_BASE_URL } from "../apiConfig";

export const useMethod = ({ setTodos, todos, userId, text, setText }) => {
     const getTodos = useCallback(async () => {
          try {
               const res = await axios.get(`${API_BASE_URL}/api/todo`, {
                    headers: { "Content-Type": "application/json" },
                    params: { userId },
               });

               setTodos(res.data);
          }
          catch (err) {
               console.error(err);
          }
     }, [userId]);

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

          },
          [getTodos, todos]
     );

     const importantTodo = useCallback(
          async (id) => {
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

          },
          [getTodos, todos]
     );


     return { getTodos, createTodo, removeTodos, completeTodo, importantTodo }
}