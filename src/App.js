import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

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

import "./styles/LoginForm.css";
import "./styles/ExamList.css";
import "./styles/Dashboard.css";
import "./styles/ExamPage.css";
import "./styles/Register.css";
import "./styles/ResultHistory.css";

function App() {
  return (
    <Router>
      <div style={{ background: "#F9FAFB", minHeight: "100vh" }}>
        <Routes>

          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/admindashboard" element={<Layout><AdminDashboard /></Layout>} />
          <Route path="/studentdashboard" element={<Layout><StudentDashboard /></Layout>} />
          <Route path="/teacherdashboard" element={<Layout><TeacherDashboard /></Layout>} />

          <Route path="/exams" element={<Layout><ExamList /></Layout>} />
          <Route path="/exam" element={<Layout><Exam /></Layout>} />
          <Route path="/addquestion" element={<Layout><AddQuestion /></Layout>} />
          <Route path="/attemptexam" element={<Layout><ExamPage /></Layout>} />
          <Route path="/resulthistory" element={<Layout><ResultHistory /></Layout>} />
          <Route path="/timer" element={<Layout><ExamTimer /></Layout>} />

          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LoginForm />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;