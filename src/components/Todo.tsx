import { Link } from "react-router-dom";
import { TodoType } from "./TodoList";

type Todoprops = {
  todo: TodoType;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

const Todo: React.FC<Todoprops> = ({ todo, onDelete, onToggle }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <Link
        to={{ pathname: `/detail/${todo.id}`, search: `value=${todo.title}` }}
      >
        {todo.title}
      </Link>
      <button onClick={() => onDelete(todo.id)}>X</button>
    </div>
  );
};

export default Todo;
