import React from "react";

type Todo = {
  id: number;
  value: string;
  completed: boolean;
};

type TodoProps = {
  todo: Todo;
};

const Todo: React.FC<TodoProps> = ({ todo }) => {
  return (
    <div>
      <input type="checkbox" checked={todo.completed} />
      <span>{todo.value}</span>
    </div>
  );
};

export default Todo;
