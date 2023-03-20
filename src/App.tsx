import React, { useState } from "react";
import Todo from "./components/Todo";
import TodoList from "./components/TodoList";

type TodoType = {
  id: number;
  value: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [value, setValue] = useState("");

  /**삭제 기능 */
  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  /**todo 추가 기능 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value === "") {
      return;
    }

    const newTodo: TodoType = {
      id: todos.length + 1,
      value,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setValue("");
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList todos={todos} onDelete={handleDelete} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">추가</button>
      </form>
    </div>
  );
}

export default App;
