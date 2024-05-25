const MainForm = (props) => {
  return (
    <>
      <h4>Добавить задачу:</h4>
      <form className="form form-login" onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="text"
              id="text"
              name="input"
              className="validate"
              value={props.text}
              onChange={(e) => props.setText(e.target.value)}
            />
            <label htmlFor="input">Задача:</label>
          </div>
        </div>

        <div className="row">
          <button
            className="waves-effect waves-light btn blue"
            onClick={props.createTodo}
          >
            Добавить
          </button>
        </div>
      </form>
    </>
  );
};

export default MainForm;
