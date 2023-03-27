import { useLocation, useParams } from "react-router-dom";
import TodoDetail from "../components/TodoDetail";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return;
  }
  const idNumber = parseInt(id, 10);

  const { search } = useLocation(); //브라우저의 현재 위치 정보를 가져옴
  const query = new URLSearchParams(search); //쿼리스트링 추출
  const title = query.get("value"); //todo.value 값 추출

  if (!title) {
    return;
  }

  return <TodoDetail id={idNumber} title={title} />;
};

export default Detail;
