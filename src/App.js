import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ExamTimer from "./pages/ExamTimer";
import SubmitExam from "./pages/SubmitExam";
import Result from "./pages/Result";
import ResultHistory from "./pages/ResultHistory";
import "./styles/theme.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/exam" element={<ExamTimer />} />
        <Route path="/submit" element={<SubmitExam />} />
        <Route path="/result" element={<Result />} />
        <Route path="/history" element={<ResultHistory />} />
      </Routes>
    </Router>
  );
}

export default App;