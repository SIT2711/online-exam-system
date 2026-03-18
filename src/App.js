import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import Exam from "./pages/Exam";
import AddQuestion from "./pages/AddQuestion";
import ExamList from "./pages/ExamList";
import ExamPage from "./pages/ExamPage";
import Register from "./pages/Register";
import ResultHistory from "./pages/ResultHistory";
import ExamTimer from "./pages/ExamTimer";
import SubmitExam from "./pages/SubmitExam";

import "./styles/LoginForm.css";
import "./styles/ExamList.css";
import "./styles/Dashboard.css";
import "./styles/ExamPage.css";
import "./styles/Register.css";
import "./styles/ResultHistory.css";
import "./styles/SubmitExam.css";

function App() {
  return (
    <Router>
      <div style={{ background: "rgb(248,249,250)", minHeight: "100vh", padding: "20px" }}>
        <Routes>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/teacherdashboard" element={<TeacherDashboard />} />

          <Route path="/login" element={<LoginForm />} />
          <Route path="/exams" element={<ExamList />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/addquestion" element={<AddQuestion />} />

          <Route path="/attemptexam" element={<ExamPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resulthistory" element={<ResultHistory />} />
          <Route path="/timer" element={<ExamTimer />} />
          <Route path="/submitexam" element={<SubmitExam />} /> 


          <Route path="/" element={<LoginForm />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;