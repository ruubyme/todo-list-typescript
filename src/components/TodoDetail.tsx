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
    <div className="border border-gray-200 bg-gray-600 bg-opacity-10 rounded-lg p-2">
      {isEditing ? (
        <div>
          <form
            onSubmit={handleSave}
            className="flex justify-between flex-wrap"
          >
            <h1 className="text-gray-200 font-bold text-xl m-1 ">title</h1>
            <input
              className=" p-1 m-1 text-sm text-gray-200 bg-transparent rounded-lg border border-gray-300"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div className="py-10 flex-shrink-0 w-full h-full">
              <h1 className="text-gray-200 font-bold text-xl m-1 ">contents</h1>
              <textarea
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                className="block p-2 m-1 w-full text-sm bg-transparent text-gray-200 rounded-lg border border-gray-300 "
              />
            </div>
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-600 text-gray-200 font-bold py-2 px-4 rounded-full self-end"
            >
              Save
            </button>
            <button
              className="bg-blue-400 hover:bg-blue-600 text-gray-200 font-bold py-2 px-4 rounded-full self-end"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div className="py-4 flex flex-col justify-between items-start h-64">
          <h2 className="text-2xl font-bold mb-2 text-gray-200">
            title: {newTodo.title}
          </h2>
          <div className="py-10 flex-shrink-0 w-full h-full">
            <h2 className="text-1xl font-bold mb-2 text-gray-200">contents</h2>
            <p className="text-1xl mb-2 text-gray-400 box-border border-gray-200 bg-gray-800 rounded-lg p-2">
              {newTodo.contents}
            </p>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-400 hover:bg-blue-600 text-gray-200 font-bold py-2 px-4 rounded-full self-end"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoDetail;
