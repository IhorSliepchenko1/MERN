// useAuthorization.js
import { useContext, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./../apiConfig";
import { AuthContext } from "../context/AuthContext";

export const useAuthorization = () => {
     const [form, setForm] = useState({
          email: "",
          password: "",
     });

     const { login } = useContext(AuthContext)

     const changeHandler = (e) => {
          setForm({ ...form, [e.target.name]: e.target.value });
     };

     const apiHandler = async (router) => {
          try {
               const res = await axios.post(
                    `${API_BASE_URL}/api/auth/${router}`,
                    { ...form },
                    {
                         headers: {
                              "Content-Type": "application/json",
                         },
                    }
               );

               await login(res.data.token, res.data.userId);

          } catch (err) {
               console.error(err);
          }


     };

     return { changeHandler, apiHandler };
};


