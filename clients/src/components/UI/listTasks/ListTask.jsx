const ListTask = (props) => {
  return (
    <>
      <h3>Активные задачи:</h3>
      <div className="todos">
        {props.todos.map((todo, index) => {
          let cls = [`row flex todos-item task-item`];

          if (todo.completed) {
            cls.push("completed");
          }

          if (todo.important) {
            cls.push("important");
          }

          return (
            <div className={cls.join(" ")} key={index}>
              <div className="col todos-num">{`${index + 1}.`}</div>
              <div className="col todos-text">{todo.text}</div>
              <div className="col todos-buttons">
                <i
                  className="material-icons blue-text"
                  onClick={() => props.completeTodo(todo._id)}
                >
                  check
                </i>
                <i
                  className="material-icons orange-text"
                  onClick={() => props.importantTodo(todo._id)}
                >
                  warning
                </i>
                <i
                  className="material-icons red-text"
                  onClick={() => {
                    props.removeTodos(todo._id, props.del);
                  }}
                >
                  delete
                </i>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListTask;
