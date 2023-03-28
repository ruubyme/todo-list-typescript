import { useLocation, useParams } from "react-router-dom";
import TodoDetail from "../components/TodoDetail";
import { TodoType } from "../components/TodoList";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return;
  }
  const idNumber = parseInt(id, 10);

  const { search } = useLocation(); //브라우저의 현재 위치 정보를 가져옴
  const query = new URLSearchParams(search); //쿼리스트링 추출
  const title = query.get("title"); //todo.value 값 추출

  const { state } = useLocation(); //state 값 가져오기
  if (!state) {
    return;
  }

  if (!title) {
    return;
  }

  const { todo, onEdit } = state;

  console.log(todo);
  console.log(state);

  return <TodoDetail todo={todo} onEdit={onEdit} />;
};

export default Detail;
