import AuthPage from "../AuthPage/AuthPage";

const LoginPage = () => {
  return (
    <AuthPage
      title="Авторизация"
      link="login"
      account="Нет аккаунта?"
      linkTogle="registration"
      btnText="Войти"
    />
  );
};

export default LoginPage;
