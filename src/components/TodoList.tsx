import React, { useState } from "react";
//import styled from "styled-components";
import Todo from "./Todo";

type TodoListProps = {
  todos: { id: number; value: string; completed: boolean }[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

// const TodoListContainer = styled.div`
//   margin: 1rem 0;
// `;

// const TodoListTitle = styled.h2`
//   font-size: 1.5rem;
// `;

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onToggle }) => {
  const completedTodos = todos.filter((todo) => todo.completed);
  const incompletedTodos = todos.filter((todo) => !todo.completed);

  const handleDelete = (id: number) => {
    onDelete(id);
  };

  const handleToggle = (id: number) => {
    onToggle(id);
  };

  const handleEdit = (id: number) => {};

  return (
    <>
      <h2>진행 중인 일</h2>
      {incompletedTodos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      ))}
      <h2>완료한 일</h2>
      {completedTodos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      ))}
    </>
  );
};

export default TodoList;
