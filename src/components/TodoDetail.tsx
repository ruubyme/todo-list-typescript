import { useState } from "react";

type TodoDetail = {
  title: string;
  contents: string;
};

type TodoDetailProps = {
  id: number;
  title: string;
};

const TodoDetail: React.FC<TodoDetailProps> = ({ id, title }) => {
  const [contents, setContents] = useState<string>("");

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title == "") {
      return;
    }

    const newTodoDetail: TodoDetail = {
      title,
      contents,
    };
  };
  return (
    <form onSubmit={handleUpdate}>
      <label>
        Title:
        <input type="text" value={title} />
      </label>
      <label>
        Contents:
        <textarea
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default TodoDetail;
