import '@testing-library/jest-dom';

import {
  render,
  screen,
} from '@testing-library/react';

import Todo from '../Todos/Todo';

const mockTodo = {
  _id: "1",
  text: "Write tests",
  done: false,
};

it("renders the todo text", () => {
  render(
    <Todo todo={mockTodo} deleteTodo={() => {}} completeTodo={() => {}} />
  );
  expect(screen.getByText("Write tests")).toBeInTheDocument();
});
