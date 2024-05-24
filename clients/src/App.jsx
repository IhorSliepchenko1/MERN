import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useRoutes } from "./routers.jsx";
import { AuthContext } from "./context/AuthContext.js";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const { login, logout, token, userId, isReady } = useAuth();
  const isLogin = !!token;
  const routes = useRoutes(isLogin);

  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, isReady, isLogin }}
    >
      <BrowserRouter>
        <Navbar />
        {routes}
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
