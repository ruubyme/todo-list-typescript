import { useLocation, useParams } from "react-router-dom";
import TodoDetail from "../components/TodoDetail";
import { TodosContextProvider } from "../Contexts/TodosContext";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <div>id를 찾을 수 없습니다.</div>;
  }
  const idNumber = parseInt(id, 10);

  const { search } = useLocation(); //브라우저의 현재 위치 정보를 가져옴

  const { state } = useLocation(); //state 값 가져오기
  if (!state) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  const { todo, todos } = state;

  return (
    <TodosContextProvider>
      <TodoDetail todo={todo} todos={todos} />
    </TodosContextProvider>
  );
};

export default Detail;
