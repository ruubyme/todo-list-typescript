import { createContext, useState } from "react";
import { useTodosDispatch, useTodosState } from "../Contexts/TodosContext";
import Todo from "./Todo";
import "tailwindcss/tailwind.css";

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
      <h1 className="text-5xl font-bold text-gray-200 border-b-4 border-gray-400">
        todo-list
      </h1>
      <p className="font-bold text-gray-200 text-xl py-8 ">
        Tasks - {incompletedTodos.length}
      </p>
      <div className="h-64 overflow-auto ">
        <div className="grid space-y-3">
          {incompletedTodos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
      <p className="font-bold text-gray-200 text-xl py-8">
        completed - {completedTodos.length}
      </p>
      <div className="h-64 overflow-auto">
        <div className="grid space-y-3 ">
          {completedTodos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
      <form onSubmit={onSubmit} className="flex rounded-lg ">
        <div className="relative w-80 py-2">
          <input
            type="text"
            placeholder="할 일을 입력해주세요."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-transparent border border-gray-500 rounded-md px-4 py-1 pr-12 text-gray-200"
          ></input>
          <button
            type="submit"
            className="absolute right-0 px-2 py-1 rounded-full hover:bg-slate-300"
          >
            ✔️
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoList;
