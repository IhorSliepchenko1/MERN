import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";

const privateRoutes = [
  { path: "/", element: <MainPage /> },
  { path: "*", element: <Navigate to="/" /> },
];

const PrivateComponent = () => {
  return (
    <Routes>
      {privateRoutes.map((item, index) => (
        <Route key={index} path={item.path} element={item.element} />
      ))}
    </Routes>
  );
};

const publicRoutes = [
  { path: "/registration", element: <RegistrationPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "*", element: <Navigate to="/login" /> },
];

const PublicComponent = () => {
  return (
    <Routes>
      {publicRoutes.map((item, index) => (
        <Route key={index} path={item.path} element={item.element} />
      ))}
    </Routes>
  );
};

export const useRoutes = (isLogin) => {
  return isLogin ? <PrivateComponent /> : <PublicComponent />;
};
