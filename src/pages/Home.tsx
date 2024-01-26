import TodoList from "../components/TodoList";
import { TodosContextProvider } from "../Contexts/TodosContext";
import axios from "axios";
import { useState } from "react";

const Home: React.FC = () => {
  const [test, setTest] = useState<string>("");
  const testfunction = async () => {
    const response = await axios.get(
      "https://flask-production-5ca5.up.railway.app/print"
    );
    setTest(response.data);
  };

  return (
    <>
      <TodosContextProvider>
        <TodoList />
      </TodosContextProvider>
      <h1>{test}</h1>
    </>
  );
};

export default Home;
