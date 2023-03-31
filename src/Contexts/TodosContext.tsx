import { createContext, Dispatch, useContext, useReducer } from "react";

type TodoType = {
  id: number;
  title: string;
  contents: string | "";
  completed: boolean;
};

type TodosState = TodoType[];

const TodosStateContext = createContext<TodosState | undefined>(undefined);

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
