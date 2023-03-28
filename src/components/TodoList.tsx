import { useState } from "react";
import Todo from "./Todo";

type TodoType = {
  id: number;
  title: string;
  contents: string | "";
  completed: boolean;
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [title, setValue] = useState("");

  /**todo 추가 기능 */

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title == "") {
      return;
    }

    const newTodo: TodoType = {
      id: todos.length + 1,
      title,
      completed: false,
      contents: "",
    };

    setTodos([...todos, newTodo]);
    setValue("");
  };

  /**todo 삭제 기능 */

  const handleDelete = (id: number) => {
    const uqdatedToods = todos.filter((todo) => todo.id! == id);
    setTodos(uqdatedToods);
  };

  /**todo toggle 기능 */

  const handleToggle = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id == id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  /**todo edit 기능 */

  const handleEdit = (id: number, title: string, contents: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title, contents };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const completedTodos = todos.filter((todo) => todo.completed);
  const incompletedTodos = todos.filter((todo) => !todo.completed);

  return (
    <div>
      <h1>진행 중인 일</h1>
      {incompletedTodos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />
      ))}
      <h1>완료한 일</h1>
      {completedTodos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="할 일을 입력해주세요."
          value={title}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <button type="submit">+</button>
      </form>
    </div>
  );
};

export { type TodoType, TodoList };
