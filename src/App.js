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
import Result from "./pages/Result";
import ExamTimer from "./pages/ExamTimer";
import SubmitExam from "./pages/SubmitExam";
import Profile from "./pages/Profile";



import "./styles/LoginForm.css";
import "./styles/ExamList.css";
import "./styles/Dashboard.css";
import "./styles/ExamPage.css";
import "./styles/Register.css";
import "./styles/ResultHistory.css";
import "./styles/Result.css";
import "./styles/SubmitExam.css";
import "./styles/Profile.css";


function App() {
  return (
    <Router>
      <div style={{ background: "#F9FAFB", minHeight: "100vh" }}>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/admindashboard" element={<Layout><AdminDashboard /></Layout>} />
          <Route path="/studentdashboard" element={<Layout><StudentDashboard /></Layout>} />
          <Route path="/teacherdashboard" element={<Layout><TeacherDashboard /></Layout>} />

          {/* Exam Routes */}
          <Route path="/exams" element={<Layout><ExamList /></Layout>} />
          <Route path="/exam" element={<Layout><Exam /></Layout>} />
          <Route path="/addquestion" element={<Layout><AddQuestion /></Layout>} />
          <Route path="/attemptexam" element={<Layout><ExamPage /></Layout>} />
          <Route path="/timer" element={<Layout><ExamTimer /></Layout>} />
          <Route path="/submitexam" element={<Layout><SubmitExam /></Layout>} />
         

          {/* Result Routes */}
          <Route path="/resulthistory" element={<Layout><ResultHistory /></Layout>} />
          <Route path="/result" element={<Layout><Result /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;