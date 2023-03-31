import { useEffect, useState } from "react";
import {
  TodoType,
  useTodosDispatch,
  useTodosState,
} from "../Contexts/TodosContext";

type TodoDetailProps = {
  todo: TodoType;
  todos: TodoType[];
};

const TodoDetail: React.FC<TodoDetailProps> = ({ todo, todos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todo.title);
  const [contents, setContents] = useState(todo.contents);
  const [newTodo, setNewTodo] = useState<TodoType>(todo);

  const dispatch = useTodosDispatch();
  const state = useTodosState();
  // console.log(state);
  // console.log(newTodo);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "EDIT",
      todos,
      id: todo.id,
      title: value,
      contents: contents,
    });

    setIsEditing(false);
  };

  useEffect(() => {
    const currentTodo = state.find((t) => t.id == todo.id);
    if (currentTodo) {
      setNewTodo((prevTodo) => ({ ...prevTodo, ...currentTodo }));
    }
  }, [todo, state]);

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSave}>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <textarea
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
          <button type="submit">Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <h2>{newTodo.title}</h2>
          <p>{newTodo.contents}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </>
  );
};

export default TodoDetail;
