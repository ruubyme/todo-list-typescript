import { createContext, Dispatch, useContext, useReducer } from "react";

type TodoType = {
  id: number;
  title: string;
  contents: string | "작성하지 않음";
  completed: boolean;
};

type TodosState = TodoType[];

//todo의 상태를 보유
const TodosStateContext = createContext<TodosState | undefined>(undefined);

// todo 상태를 변경하기 위한 action
type Action =
  | { type: "CREATE"; title: string }
  | { type: "TOGGLE"; id: number }
  | { type: "REMOVE"; id: number }
  | {
      type: "EDIT";
      todos: TodoType[];
      id: number;
      title: string;
      contents: string;
    };

type TodosDispatch = Dispatch<Action>;
const TodosDispatchContext = createContext<TodosDispatch | undefined>(
  undefined
);

//todo상태와 액션 객체를 받아들여서 새로운 상태를 반환. 액션 타입에 따라 다름.
const todosReducer = (state: TodosState, action: Action) => {
  switch (action.type) {
    case "CREATE":
      const newTodo: TodoType = {
        id: state.length + 1,
        title: action.title,
        contents: "",
        completed: false,
      };
      return state.concat({
        ...newTodo,
      });
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    case "EDIT":
      const updatedState = action.todos.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, title: action.title, contents: action.contents };
        }
        return todo;
      });
      return updatedState;
  }
};

const TodosContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);

  return (
    <TodosDispatchContext.Provider value={dispatch}>
      <TodosStateContext.Provider value={todos}>
        {children}
      </TodosStateContext.Provider>
    </TodosDispatchContext.Provider>
  );
};

const useTodosState = () => {
  const state = useContext(TodosStateContext);
  if (!state) throw new Error("TodosProvider not found");
  return state;
};

const useTodosDispatch = () => {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) throw new Error("TodosProvider not found");
  return dispatch;
};

export { type TodoType, TodosContextProvider, useTodosDispatch, useTodosState };
