import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { logout, isLogin } = useContext(AuthContext);

  return (
    <nav>
      <div className="nav-wrapper navbar blue">
        <a href="#" className="brand-logo">
          TODO
        </a>

        {isLogin ? (
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <a href="/" onClick={logout}>
              Выйти
            </a>
          </ul>
        ) : (
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <Link to="/login">Войти</Link>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
