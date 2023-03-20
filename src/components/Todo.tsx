import React from "react";
import { Link } from "react-router-dom";

type Todo = {
  id: number;
  value: string;
  completed: boolean;
};

type TodoProps = {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

const Todo: React.FC<TodoProps> = ({ todo, onDelete, onToggle }) => {
  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleToggle = () => {
    onToggle(todo.id);
  };

  return (
    <div>
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      <Link to={`/todos/${todo.id}`}>{todo.value}</Link>
      <button onClick={handleDelete}>X</button>
    </div>
  );
};

export default Todo;
