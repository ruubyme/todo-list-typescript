import TodoList from "../components/TodoList";
import { TodosContextProvider } from "../Contexts/TodosContext";

const Home: React.FC = () => {
  return (
    <TodosContextProvider>
      <TodoList />
    </TodosContextProvider>
  );
};

export default Home;
