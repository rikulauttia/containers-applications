import PropTypes from 'prop-types';

const Todo = ({ todo, deleteTodo, completeTodo }) => {
  return (
    <div
      key={todo._id}
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "70%",
        margin: "auto",
      }}
    >
      <span>{todo.text}</span>
      {todo.done ? (
        <>
          <span>This todo is done</span>
          <span>
            <button onClick={() => deleteTodo(todo)}> Delete </button>
          </span>
        </>
      ) : (
        <>
          <span>This todo is not done</span>
          <span>
            <button onClick={() => deleteTodo(todo)}> Delete </button>
            <button onClick={() => completeTodo(todo)}> Set as done </button>
          </span>
        </>
      )}
    </div>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
};

export default Todo;
