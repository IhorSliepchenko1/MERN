import { useState } from "react";
import AuthPage from "../AuthPage/AuthPage";
import { Navigate } from "react-router-dom";

const RegistrationPage = () => {
  const [infoUser, setInfoUser] = useState("");

  if (infoUser !== "") {
    return <Navigate to="/login" />;
  }

  return (
    <AuthPage
      title="Регистрация"
      link="registration"
      account="Уже есть аккаунт?"
      linkTogle="login"
      btnText="Регистрация"
      setInfoUser={setInfoUser}
    />
  );
};

export default RegistrationPage;
