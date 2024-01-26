import TodoList from "../components/TodoList";
import { TodosContextProvider } from "../Contexts/TodosContext";
import axios from "axios";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [test, setTest] = useState<string>("");
  const testfunction = async () => {
    const response = await axios.get("https://0.0.0.0:7009/print");
    setTest(response.data);
  };

  useEffect(() => {
    testfunction();
  }, []);

  return (
    <>
      <TodosContextProvider>
        <TodoList />
      </TodosContextProvider>
      <h1>test: {test}</h1>
    </>
  );
};

export default Home;
