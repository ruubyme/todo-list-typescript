import { createContext, useState } from "react";
import { useTodosDispatch, useTodosState } from "../Contexts/TodosContext";
import Todo from "./Todo";

const TodoList: React.FC = () => {
  const todos = useTodosState();
  const dispatch = useTodosDispatch();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "CREATE",
      title: value,
    });
    setValue("");
  };

  const completedTodos = todos.filter((todo) => todo.completed);
  const incompletedTodos = todos.filter((todo) => !todo.completed);

  return (
    <div>
      <h1>진행 중인 일</h1>
      {incompletedTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
      <h1>완료한 일</h1>
      {completedTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="할 일을 입력해주세요."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <button type="submit">+</button>
      </form>
    </div>
  );
};

export default TodoList;
