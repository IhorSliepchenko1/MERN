import AuthPage from "../AuthPage/AuthPage";

const RegistrationPage = () => {
  return (
    <AuthPage
      title="Регистрация"
      link="registration"
      account="Уже есть аккаунт?"
      linkTogle="login"
      btnText="Регистрация"
    />
  );
};

export default RegistrationPage;
