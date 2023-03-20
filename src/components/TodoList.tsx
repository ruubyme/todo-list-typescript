import React, { useState } from "react";
import styled from "styled-components";
import Todo from "./Todo";

type TodoListProps = {
  todos: { id: number; value: string; completed: boolean }[];
};

const TodoListContainer = styled.div`
  margin: 1rem 0;
`;

const TodoListTitle = styled.h2`
  font-size: 1.5rem;
`;

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const completedTodos = todos.filter((todo) => todo.completed);
  const incompletedTodos = todos.filter((todo) => !todo.completed);

  return (
    <TodoListContainer>
      <TodoListTitle>진행 중인 일</TodoListTitle>
      {incompletedTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
      <TodoListTitle>완료한 일</TodoListTitle>
      {completedTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </TodoListContainer>
  );
};

export default TodoList;
