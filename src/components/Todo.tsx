import React from "react";

type Todo = {
  id: number;
  value: string;
  completed: boolean;
};

type TodoProps = {
  todo: Todo;
  onDelete: (id: number) => void;
};

const Todo: React.FC<TodoProps> = ({ todo, onDelete }) => {
  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <div>
      <input type="checkbox" checked={todo.completed} />
      <span>{todo.value}</span>
      <button onClick={handleDelete}>X</button>
    </div>
  );
};

export default Todo;
