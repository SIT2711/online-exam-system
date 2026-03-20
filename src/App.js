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

import "./styles/LoginForm.css";
import "./styles/ExamList.css";
import "./styles/Dashboard.css";
import "./styles/ExamPage.css";
import "./styles/Register.css";
import "./styles/ResultHistory.css";

import "./styles/Result.css";

import "./styles/SubmitExam.css";


function App() {
  return (
    <Router>
<<<<<<< HEAD
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
=======
      <div
        style={{
          background: "rgb(248,249,250)",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/teacherdashboard" element={<TeacherDashboard />} />
>>>>>>> main

          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
<<<<<<< HEAD
=======
          <Route path="/resulthistory" element={<ResultHistory />} />
          <Route path="/result" element={<Result />} />
          <Route path="/timer" element={<ExamTimer />} />
          <Route path="/submitexam" element={<SubmitExam />} /> 


>>>>>>> main
          <Route path="/" element={<LoginForm />} />


          <Route path="/" element={<h1>Welcome to Online Exam System</h1>} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;