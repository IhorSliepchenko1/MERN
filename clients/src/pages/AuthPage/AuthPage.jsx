import { Link } from "react-router-dom";
import { useAuthorization } from "../../hooks/useAutorisation";
import "./AuthPage.scss";

const AuthPage = (props) => {
  const { changeHandler, apiHandler } = useAuthorization();

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
            <div className="input-field col s12">
              <input
                type="password"
                name="password"
                className="validate"
                onChange={changeHandler}
              />

              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row down-slot">
            <button
              className="waves-effect waves-light btn blue"
              onClick={() => apiHandler(props.link)}
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
