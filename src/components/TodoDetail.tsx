import { useState } from "react";
import { TodoType } from "./TodoList";

type TodoDetail = {
  title: string;
  contents: string;
};

type TodoDetailProps = {
  // id: number;
  // title: string;
  todo: TodoType;
  onEdit: (id: number, title: string, contents: string) => void;
};

const TodoDetail: React.FC<TodoDetailProps> = ({ todo, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [contents, setContents] = useState(todo.contents);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onEdit(todo.id, todo.title, todo.contents);
  };
  if (isEditing) {
    return (
      <form onSubmit={handleUpdate}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
        <button type="submit">Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </form>
    );
  } else {
    return (
      <div>
        <h2>{todo.title}</h2>
        <p>{todo.contents}</p>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </div>
    );
  }
};

export default TodoDetail;
