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
    <div>
      <input type="checkbox" checked={todo.completed} onChange={onToggle} />
      <Link to={{ pathname: `/detail/${todo.id}` }} state={{ todo, todos }}>
        {todo.title}
      </Link>
      <button onClick={onDelete}>X</button>
    </div>
  );
};

export default Todo;
