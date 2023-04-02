import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TodoType,
  useTodosDispatch,
  useTodosState,
} from "../Contexts/TodosContext";

type Todoprops = {
  todo: TodoType;
};

const Todo: React.FC<Todoprops> = ({ todo }) => {
  const dispatch = useTodosDispatch();
  const todos = useTodosState();

  const onToggle = () => {
    dispatch({
      type: "TOGGLE",
      id: todo.id,
    });
  };

  const onDelete = () => {
    dispatch({
      type: "REMOVE",
      id: todo.id,
    });
  };

  return (
    <label
      htmlFor="checkbox-in-form"
      className="max-w-xl flex p-3 block w-full bg-gray-600 bg-opacity-20 rounded-md text-sm justify-between"
    >
      <input
        type="checkbox"
        id="checkbox-in-form"
        className="mt-0.5 border-2 border-gray-400 rounded-md h-4 w-4 accent-slate-500 bg-transparent"
        checked={todo.completed}
        onChange={onToggle}
      />
      <Link
        className="text-gray-200 px-2 flex-grow"
        to={{ pathname: `/detail/${todo.id}` }}
        state={{ todo, todos }}
      >
        {todo.title}
      </Link>
      <button onClick={onDelete}>❌</button>
    </label>
  );
};

export default Todo;
