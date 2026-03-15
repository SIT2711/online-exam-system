import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import LoginForm from "./pages/LoginForm";
import Exam from "./pages/Exam";
import AddQuestion from "./pages/AddQuestion";
import ExamList from "./pages/ExamList";

import './styles/LoginForm.css';
import './styles/ExamList.css';
import './styles/Dashboard.css';

function App() {
  return (
    <Router>
      <div style={{ background: "rgb(248,249,250)", minHeight: "100vh", padding: "20px" }}>
        <Routes>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/exams" element={<ExamList />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/addquestion" element={<AddQuestion />} />

          <Route path="/" element={<h1>Welcome to Online Exam System</h1>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;