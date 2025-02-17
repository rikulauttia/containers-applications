import PropTypes from 'prop-types';

import Todo from './Todo';

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos
        .map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
          />
        ))
        .reduce(
          (acc, cur, index) => [...acc, <hr key={`separator-${index}`} />, cur],
          []
        )}
    </>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    })
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
};

export default TodoList;
