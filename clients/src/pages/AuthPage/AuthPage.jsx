import { Link } from "react-router-dom";
import { useAuthorization } from "../../hooks/useAutorisation";
import "./AuthPage.scss";
import { useState } from "react";

const AuthPage = (props) => {
  const { changeHandler, apiHandler } = useAuthorization();
  const [open, setOpen] = useState(false);
  let icon;
  let type;
  // admin@registration.com
  open
    ? (icon = `visibility_off`) && (type = "text")
    : (icon = `visibility`) && (type = "password");

  const openPass = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <div className="container">
      <div className="auth-page">
        <h3>{props.title}</h3>
        <form
          className="form form-login"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="row">
            <div className="input-field col s12">
              <input
                type="email"
                name="email"
                className="validate"
                onChange={changeHandler}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-field col s12 inp-pass">
              <input
                type={type}
                name="password"
                className="validate"
                onChange={changeHandler}
              />

              <i
                className="material-icons"
                onClick={() => {
                  console.log(open, icon, type);
                  openPass();
                }}
              >
                {icon}
              </i>
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row down-slot">
            <button
              className="waves-effect waves-light btn blue"
              onClick={() => {
                apiHandler(props.link).then((item) => {
                  props.setInfoUser(item);
                });
              }}
            >
              {props.btnText}
            </button>
            <Link to={`/${props.linkTogle}`} className="btn-outline btn-reg">
              {props.account}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
