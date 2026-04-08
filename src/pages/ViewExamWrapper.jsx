import { useParams } from "react-router-dom";
import ViewExam from "./ViewExam";

function ViewExamWrapper() {
  const { id } = useParams();
  return <ViewExam examId={id} />;
}

export default ViewExamWrapper;