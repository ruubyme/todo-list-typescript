import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Todo = {
  id: number;
  value: string;
  completed: boolean;
};

type TodoEditProps = {
  todos: Todo[];
  onSave: (todos: Todo[]) => void;
};

const TodoEdit: React.FC<TodoEditProps> = ({ todos, onSave }) => {
  const { id } = useParams<{ id: string }>();
  const todoId = Number(id);
  const navigate = useNavigate();

  const [todo, setTodo] = useState<Todo | undefined>(undefined);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const selectedTodo = todos.find((t) => t.id === todoId);
    if (selectedTodo) {
      setTodo(selectedTodo);
      setContent(selectedTodo.value);
    } else {
      // Todo not found, go back to TodoList
      navigate("/");
    }
  }, [todos, todoId, history]);

  const handleSave = () => {
    if (!todo) return;

    const updatedTodo = { ...todo, value: content };
    const updatedTodos = todos.map((t) => (t.id === todoId ? updatedTodo : t));
    onSave(updatedTodos);
    navigate("/");
  };

  return (
    <div>
      <h2>Todo 수정하기</h2>
      {todo && (
        <>
          <div>ID: {todo.id}</div>
          <div>
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button onClick={handleSave}>저장</button>
        </>
      )}
    </div>
  );
};

export default TodoEdit;
